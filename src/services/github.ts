import { cached } from "@/lib/cache";
import { siteConfig } from "@/config/site";
import type {
  GitHubIntelligence,
  GitHubRepository,
  GitHubContributionCalendar,
  GitHubPinnedItem,
  GitHubYearlyStats,
  GitHubOrganization,
} from "@/types";

// ─── GraphQL Query ─────────────────────────────────────────────────────────
const GITHUB_GRAPHQL_QUERY = `
query GitHubProfile($username: String!) {
  user(login: $username) {
    name
    bio
    avatarUrl
    websiteUrl
    company
    location
    followers { totalCount }
    following { totalCount }
    repositories(first: 100, orderBy: { field: UPDATED_AT, direction: DESC }, ownerAffiliations: OWNER) {
      totalCount
      nodes {
        name
        description
        url
        homepageUrl
        stargazerCount
        forkCount
        isPrivate
        isFork
        isArchived
        createdAt
        updatedAt
        pushedAt
        diskUsage
        primaryLanguage { name color }
        topics: repositoryTopics(first: 10) {
          nodes { topic { name } }
        }
        languages(first: 10, orderBy: { field: SIZE, direction: DESC }) {
          totalSize
          edges { size node { name color } }
        }
        issues(states: OPEN) { totalCount }
        pullRequests(states: OPEN) { totalCount }
      }
    }
    pinnedItems(first: 6, types: REPOSITORY) {
      nodes {
        ... on Repository {
          name
          description
          url
          stargazerCount
          forkCount
          primaryLanguage { name color }
        }
      }
    }
    contributionsCollection {
      totalCommitContributions
      totalPullRequestContributions
      totalIssueContributions
      contributionCalendar {
        totalContributions
        weeks {
          contributionDays {
            date
            contributionCount
            weekday
          }
        }
      }
    }
    organizations(first: 10) {
      nodes {
        login
        name
        avatarUrl
        url
      }
    }
  }
  rateLimit { remaining resetAt }
}
`;

// Years query for historical contribution data
function buildYearsQuery(years: number[]): string {
  const fragments = years.map(
    (year) => `
    year${year}: user(login: $username) {
      contributionsCollection(
        from: "${year}-01-01T00:00:00Z"
        to: "${year}-12-31T23:59:59Z"
      ) {
        totalCommitContributions
      }
    }
  `
  );
  return `query YearlyContributions($username: String!) { ${fragments.join("\n")} }`;
}

// ─── Fetch Helpers ─────────────────────────────────────────────────────────
async function graphqlFetch<T>(query: string, variables: Record<string, unknown>): Promise<T> {
  const token = process.env.GITHUB_TOKEN;

  const response = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      "X-GitHub-Api-Version": "2022-11-28",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify({ query, variables }),
    next: { revalidate: 1800 },
  });

  if (!response.ok) {
    throw new Error(`GitHub GraphQL request failed: ${response.status}`);
  }

  const json = await response.json();
  if (json.errors) {
    throw new Error(`GitHub GraphQL errors: ${JSON.stringify(json.errors)}`);
  }

  return json.data as T;
}

async function restFetch<T>(path: string): Promise<T> {
  const token = process.env.GITHUB_TOKEN;

  const response = await fetch(`https://api.github.com${path}`, {
    headers: {
      Accept: "application/vnd.github+json",
      "X-GitHub-Api-Version": "2022-11-28",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    next: { revalidate: 1800 },
  });

  if (!response.ok) {
    throw new Error(`GitHub REST request failed: ${response.status}`);
  }

  return response.json() as Promise<T>;
}

// ─── Streak Calculator ─────────────────────────────────────────────────────
function calculateStreaks(calendar: GitHubContributionCalendar): {
  currentStreak: number;
  longestStreak: number;
} {
  const days = calendar.weeks
    .flatMap((week) => week.contributionDays)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  let current = 0;
  let longest = 0;
  let streak = 0;
  const today = new Date().toISOString().slice(0, 10);

  for (let i = days.length - 1; i >= 0; i--) {
    const day = days[i];
    if (!day || day.date > today) continue;

    if (day.contributionCount > 0) {
      streak++;
      if (i === days.length - 1 || day.date >= today) current = streak;
      if (streak > longest) longest = streak;
    } else {
      if (current === 0 && streak > 0) {
        // streak ended before today
      }
      streak = 0;
    }
  }

  return { currentStreak: current, longestStreak: longest };
}

// ─── Fallback Data ─────────────────────────────────────────────────────────
const fallback: GitHubIntelligence = {
  username: siteConfig.githubUsername,
  name: "Anubhav Singh",
  bio: "Full-Stack Developer | Building things with code",
  totalRepositories: 20,
  publicRepositories: 18,
  privateRepositories: 2,
  stars: 42,
  forks: 11,
  followers: 20,
  following: 10,
  issues: 18,
  pullRequests: 24,
  contributions: 1267,
  totalCommits: 1267,
  currentStreak: 8,
  longestStreak: 41,
  lastActivity: new Date().toISOString(),
  organizations: ["Open Source"],
  topLanguages: [
    { name: "TypeScript", size: 48, color: "#3178c6", percentage: 48 },
    { name: "JavaScript", size: 28, color: "#f7df1e", percentage: 28 },
    { name: "Python", size: 14, color: "#3776ab", percentage: 14 },
    { name: "CSS", size: 10, color: "#663399", percentage: 10 },
  ],
  repositories: [],
  pinnedItems: [],
  contributionCalendar: undefined,
  yearlyStats: [],
  cachedAt: new Date().toISOString(),
};

// ─── GraphQL Intelligence Fetcher ──────────────────────────────────────────
async function fetchGraphQLIntelligence(username: string): Promise<GitHubIntelligence> {
  type GraphQLResponse = {
    user: {
      name: string | null;
      bio: string | null;
      avatarUrl: string;
      websiteUrl: string | null;
      company: string | null;
      location: string | null;
      followers: { totalCount: number };
      following: { totalCount: number };
      repositories: {
        totalCount: number;
        nodes: Array<{
          name: string;
          description: string | null;
          url: string;
          homepageUrl: string | null;
          stargazerCount: number;
          forkCount: number;
          isPrivate: boolean;
          isFork: boolean;
          isArchived: boolean;
          createdAt: string;
          updatedAt: string;
          pushedAt: string;
          diskUsage: number | null;
          primaryLanguage: { name: string; color: string } | null;
          topics: { nodes: Array<{ topic: { name: string } }> };
          languages: {
            totalSize: number;
            edges: Array<{ size: number; node: { name: string; color: string } }>;
          };
          issues: { totalCount: number };
          pullRequests: { totalCount: number };
        }>;
      };
      pinnedItems: {
        nodes: Array<{
          name: string;
          description: string | null;
          url: string;
          stargazerCount: number;
          forkCount: number;
          primaryLanguage: { name: string; color: string } | null;
        }>;
      };
      contributionsCollection: {
        totalCommitContributions: number;
        totalPullRequestContributions: number;
        totalIssueContributions: number;
        contributionCalendar: GitHubContributionCalendar;
      };
      organizations: {
        nodes: GitHubOrganization[];
      };
    };
    rateLimit: { remaining: number; resetAt: string };
  };

  const data = await graphqlFetch<GraphQLResponse>(GITHUB_GRAPHQL_QUERY, { username });
  const user = data.user;

  // Build repositories
  const repositories: GitHubRepository[] = user.repositories.nodes.map((repo) => {
    const totalLangSize = repo.languages.totalSize || 1;
    return {
      name: repo.name,
      description: repo.description ?? "No description provided.",
      url: repo.url,
      homepageUrl: repo.homepageUrl ?? undefined,
      stars: repo.stargazerCount,
      forks: repo.forkCount,
      issues: repo.issues.totalCount,
      pullRequests: repo.pullRequests.totalCount,
      isPrivate: repo.isPrivate,
      isFork: repo.isFork,
      isArchived: repo.isArchived,
      createdAt: repo.createdAt,
      updatedAt: repo.updatedAt,
      pushedAt: repo.pushedAt,
      diskUsage: repo.diskUsage ?? undefined,
      primaryLanguage: repo.primaryLanguage?.name,
      topics: repo.topics.nodes.map((t) => t.topic.name),
      languages: repo.languages.edges.map((edge) => ({
        name: edge.node.name,
        color: edge.node.color,
        size: edge.size,
        percentage: Math.round((edge.size / totalLangSize) * 100),
      })),
    };
  });

  // Build pinned items
  const pinnedItems: GitHubPinnedItem[] = user.pinnedItems.nodes.map((item) => ({
    name: item.name,
    description: item.description ?? "",
    url: item.url,
    stars: item.stargazerCount,
    forks: item.forkCount,
    primaryLanguage: item.primaryLanguage?.name,
    languageColor: item.primaryLanguage?.color,
  }));

  // Aggregate language stats across all repos
  const langMap = new Map<string, { size: number; color: string }>();
  repositories.forEach((repo) => {
    repo.languages.forEach((lang) => {
      const existing = langMap.get(lang.name);
      langMap.set(lang.name, {
        size: (existing?.size ?? 0) + lang.size,
        color: lang.color ?? existing?.color ?? "#888",
      });
    });
  });
  const totalLangBytes = Array.from(langMap.values()).reduce((s, l) => s + l.size, 0) || 1;
  const topLanguages = Array.from(langMap.entries())
    .sort((a, b) => b[1].size - a[1].size)
    .slice(0, 10)
    .map(([name, { size, color }]) => ({
      name,
      size,
      color,
      percentage: Math.round((size / totalLangBytes) * 100),
    }));

  // Streaks
  const { currentStreak, longestStreak } = calculateStreaks(
    user.contributionsCollection.contributionCalendar
  );

  // Yearly stats (current year GraphQL data)
  const currentYear = new Date().getFullYear();
  const yearlyStats: GitHubYearlyStats[] = [
    {
      year: currentYear,
      totalContributions: user.contributionsCollection.totalCommitContributions,
    },
  ];

  // Try to get a few more years via secondary REST/GraphQL
  try {
    const years = [currentYear - 1, currentYear - 2, currentYear - 3];
    const yearlyQuery = buildYearsQuery(years);
    type YearlyResp = Record<string, { contributionsCollection: { totalCommitContributions: number } }>;
    const yearlyData = await graphqlFetch<YearlyResp>(yearlyQuery, { username });
    years.forEach((year) => {
      const key = `year${year}`;
      const yearData = yearlyData[key];
      if (yearData) {
        yearlyStats.unshift({
          year,
          totalContributions: yearData.contributionsCollection.totalCommitContributions,
        });
      }
    });
  } catch {
    // Yearly history is optional
  }

  const totalStars = repositories.reduce((s, r) => s + r.stars, 0);
  const totalForks = repositories.reduce((s, r) => s + r.forks, 0);
  const totalIssues = repositories.reduce((s, r) => s + r.issues, 0);
  const publicRepos = repositories.filter((r) => !r.isPrivate).length;
  const privateRepos = repositories.filter((r) => r.isPrivate).length;

  return {
    username,
    name: user.name ?? username,
    bio: user.bio ?? undefined,
    avatarUrl: user.avatarUrl,
    websiteUrl: user.websiteUrl ?? undefined,
    company: user.company ?? undefined,
    location: user.location ?? undefined,
    totalRepositories: user.repositories.totalCount,
    publicRepositories: publicRepos,
    privateRepositories: privateRepos,
    stars: totalStars,
    forks: totalForks,
    followers: user.followers.totalCount,
    following: user.following.totalCount,
    issues: totalIssues,
    pullRequests: user.contributionsCollection.totalPullRequestContributions,
    contributions: user.contributionsCollection.contributionCalendar.totalContributions,
    totalCommits: user.contributionsCollection.totalCommitContributions,
    currentStreak,
    longestStreak,
    lastActivity: repositories[0]?.updatedAt ?? new Date().toISOString(),
    organizations: user.organizations.nodes.map((o) => o.login),
    topLanguages,
    repositories,
    pinnedItems,
    contributionCalendar: user.contributionsCollection.contributionCalendar,
    yearlyStats,
    cachedAt: new Date().toISOString(),
  };
}

// ─── REST Fallback (no token GraphQL) ─────────────────────────────────────
async function fetchRESTIntelligence(username: string): Promise<GitHubIntelligence> {
  const [user, repos] = await Promise.all([
    restFetch<{
      name: string | null;
      bio: string | null;
      avatar_url: string;
      blog: string | null;
      company: string | null;
      location: string | null;
      followers: number;
      following: number;
      public_repos: number;
      updated_at: string;
    }>(`/users/${username}`),
    restFetch<
      Array<{
        name: string;
        description: string | null;
        html_url: string;
        homepage: string | null;
        stargazers_count: number;
        forks_count: number;
        open_issues_count: number;
        private: boolean;
        fork: boolean;
        archived: boolean;
        created_at: string;
        updated_at: string;
        pushed_at: string;
        topics?: string[];
        language: string | null;
      }>
    >(`/users/${username}/repos?per_page=100&sort=updated`),
  ]);

  const repositories: GitHubRepository[] = repos.map((repo) => ({
    name: repo.name,
    description: repo.description ?? "No description provided.",
    url: repo.html_url,
    homepageUrl: repo.homepage ?? undefined,
    stars: repo.stargazers_count,
    forks: repo.forks_count,
    issues: repo.open_issues_count,
    pullRequests: 0,
    isPrivate: repo.private,
    isFork: repo.fork,
    isArchived: repo.archived,
    createdAt: repo.created_at,
    updatedAt: repo.updated_at,
    pushedAt: repo.pushed_at,
    primaryLanguage: repo.language ?? undefined,
    topics: repo.topics ?? [],
    languages: repo.language ? [{ name: repo.language, size: 1, percentage: 100 }] : [],
  }));

  const langMap = new Map<string, number>();
  repositories.forEach((repo) => {
    if (repo.primaryLanguage) {
      langMap.set(repo.primaryLanguage, (langMap.get(repo.primaryLanguage) ?? 0) + 1);
    }
  });
  const totalLang = Array.from(langMap.values()).reduce((s, v) => s + v, 0) || 1;
  const topLanguages = Array.from(langMap.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .map(([name, size]) => ({ name, size, percentage: Math.round((size / totalLang) * 100) }));

  return {
    ...fallback,
    username,
    name: user.name ?? username,
    bio: user.bio ?? undefined,
    websiteUrl: user.blog ?? undefined,
    company: user.company ?? undefined,
    location: user.location ?? undefined,
    totalRepositories: repositories.length,
    publicRepositories: user.public_repos,
    privateRepositories: repositories.filter((r) => r.isPrivate).length,
    followers: user.followers,
    following: user.following,
    stars: repositories.reduce((s, r) => s + r.stars, 0),
    forks: repositories.reduce((s, r) => s + r.forks, 0),
    issues: repositories.reduce((s, r) => s + r.issues, 0),
    lastActivity: user.updated_at,
    topLanguages,
    repositories,
    cachedAt: new Date().toISOString(),
  };
}

// ─── Main Export ───────────────────────────────────────────────────────────
export async function getGitHubIntelligence(
  username: string = siteConfig.githubUsername
): Promise<GitHubIntelligence> {
  return cached(`github:intelligence:v2:${username}`, 30 * 60, async () => {
    try {
      // Try GraphQL first (richer data)
      return await fetchGraphQLIntelligence(username);
    } catch (graphqlError) {
      console.warn("[GitHub] GraphQL failed, falling back to REST:", graphqlError);
      try {
        return await fetchRESTIntelligence(username);
      } catch (restError) {
        console.error("[GitHub] REST also failed:", restError);
        return { ...fallback, username, cachedAt: new Date().toISOString() };
      }
    }
  });
}

export async function getGitHubRepository(
  username: string,
  repoName: string
): Promise<GitHubRepository | null> {
  try {
    const intel = await getGitHubIntelligence(username);
    return intel.repositories.find((r) => r.name === repoName) ?? null;
  } catch {
    return null;
  }
}
