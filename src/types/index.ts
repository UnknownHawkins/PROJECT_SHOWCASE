// ─── Primitive Enums ───────────────────────────────────────────────────────
export type Role = "ADMIN" | "VISITOR";
export type ProjectStatus = "PLANNING" | "ACTIVE" | "SHIPPED" | "ARCHIVED";
export type ProjectCategory = "FRONTEND" | "BACKEND" | "AI" | "FULLSTACK" | "MOBILE";
export type MessageStatus = "NEW" | "READ" | "ARCHIVED";
export type NotificationType = "INFO" | "SUCCESS" | "WARNING" | "ERROR";

// ─── GitHub ────────────────────────────────────────────────────────────────
export type GitHubLanguage = {
  name: string;
  size: number;
  color?: string;
  percentage?: number;
};

export type GitHubRepository = {
  name: string;
  description: string;
  url: string;
  homepageUrl?: string;
  stars: number;
  forks: number;
  issues: number;
  pullRequests: number;
  isPrivate: boolean;
  isFork?: boolean;
  isArchived?: boolean;
  createdAt: string;
  updatedAt: string;
  pushedAt?: string;
  topics: string[];
  languages: GitHubLanguage[];
  primaryLanguage?: string;
  diskUsage?: number;
};

export type GitHubContributionDay = {
  date: string;
  contributionCount: number;
  weekday: number;
};

export type GitHubContributionWeek = {
  contributionDays: GitHubContributionDay[];
};

export type GitHubContributionCalendar = {
  totalContributions: number;
  weeks: GitHubContributionWeek[];
};

export type GitHubYearlyStats = {
  year: number;
  totalContributions: number;
};

export type GitHubOrganization = {
  login: string;
  name: string;
  avatarUrl: string;
  url: string;
};

export type GitHubPinnedItem = {
  name: string;
  description: string;
  url: string;
  stars: number;
  forks: number;
  primaryLanguage?: string;
  languageColor?: string;
};

export type GitHubIntelligence = {
  username: string;
  name?: string;
  bio?: string;
  avatarUrl?: string;
  websiteUrl?: string;
  company?: string;
  location?: string;
  totalRepositories: number;
  publicRepositories: number;
  privateRepositories: number;
  stars: number;
  forks: number;
  followers: number;
  following: number;
  issues: number;
  pullRequests: number;
  contributions: number;
  totalCommits: number;
  currentStreak: number;
  longestStreak: number;
  lastActivity: string;
  organizations: string[];
  topLanguages: GitHubLanguage[];
  repositories: GitHubRepository[];
  pinnedItems?: GitHubPinnedItem[];
  contributionCalendar?: GitHubContributionCalendar;
  yearlyStats?: GitHubYearlyStats[];
  cachedAt: string;
};

// ─── Projects ──────────────────────────────────────────────────────────────
export type ProjectTechnology = {
  name: string;
  icon?: string;
  color?: string;
};

export type Project = {
  id: string;
  slug: string;
  title: string;
  description: string;
  summary?: string;
  demoUrl?: string;
  githubUrl?: string;
  coverImage?: string;
  status: ProjectStatus;
  category: ProjectCategory;
  featured: boolean;
  features: string[];
  challenges: string[];
  architecture?: string;
  screenshots: string[];
  metrics?: Record<string, string | number>;
  timeline?: { phase: string; description: string; date: string }[];
  tags: string[];
  startedAt?: string;
  shippedAt?: string;
  technologies: ProjectTechnology[];
  createdAt: string;
  updatedAt: string;
};

// ─── Skills ────────────────────────────────────────────────────────────────
export type SkillCategory =
  | "Frontend"
  | "Backend"
  | "Database"
  | "DevOps"
  | "AI/ML"
  | "Mobile"
  | "Tools"
  | "Languages";

export type Skill = {
  id: string;
  name: string;
  level: number; // 0-100
  category: SkillCategory;
  years?: number;
  technologyId?: string;
  icon?: string;
  color?: string;
};

// ─── Experience ────────────────────────────────────────────────────────────
export type Experience = {
  id: string;
  company: string;
  role: string;
  location?: string;
  description: string;
  startDate: string;
  endDate?: string;
  current: boolean;
  highlights: string[];
  technologies?: string[];
  logoUrl?: string;
};

// ─── Education ─────────────────────────────────────────────────────────────
export type Education = {
  id: string;
  institution: string;
  degree: string;
  field?: string;
  startYear: number;
  endYear?: number;
  grade?: string;
  logoUrl?: string;
  highlights?: string[];
};

// ─── Certificate ───────────────────────────────────────────────────────────
export type Certificate = {
  id: string;
  title: string;
  issuer: string;
  credential?: string;
  url?: string;
  issuedAt: string;
  expiresAt?: string;
  badgeUrl?: string;
};

// ─── Achievement ───────────────────────────────────────────────────────────
export type Achievement = {
  id: string;
  title: string;
  description: string;
  date?: string;
  url?: string;
  icon?: string;
};

// ─── Blog ──────────────────────────────────────────────────────────────────
export type BlogCategory = {
  id: string;
  name: string;
  slug: string;
};

export type BlogPost = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  coverImage?: string;
  published: boolean;
  publishedAt?: string;
  readingTime: number;
  likes: number;
  tags: string[];
  category?: BlogCategory;
  comments?: BlogComment[];
  createdAt: string;
  updatedAt: string;
};

export type BlogComment = {
  id: string;
  postId: string;
  name: string;
  email: string;
  body: string;
  approved: boolean;
  createdAt: string;
};

// ─── Analytics ─────────────────────────────────────────────────────────────
export type VisitorSnapshot = {
  liveVisitors: number;
  totalVisitors: number;
  todayVisitors: number;
  countries: Array<{ name: string; value: number; code?: string }>;
  devices: Array<{ name: string; value: number }>;
  browsers: Array<{ name: string; value: number }>;
  os: Array<{ name: string; value: number }>;
  traffic: Array<{ source: string; value: number }>;
  pageViews: Array<{ date: string; value: number }>;
  topPages: Array<{ path: string; views: number }>;
  bounceRate?: number;
  avgSessionDuration?: number;
};

// ─── Messages / Contact ────────────────────────────────────────────────────
export type Message = {
  id: string;
  userId?: string;
  name: string;
  email: string;
  subject?: string;
  body: string;
  status: MessageStatus;
  ipHash?: string;
  createdAt: string;
};

// ─── Testimonials ──────────────────────────────────────────────────────────
export type Testimonial = {
  id: string;
  name: string;
  role?: string;
  company?: string;
  avatarUrl?: string;
  quote: string;
  rating: number;
  approved: boolean;
};

// ─── Notifications ─────────────────────────────────────────────────────────
export type Notification = {
  id: string;
  userId?: string;
  type: NotificationType;
  title: string;
  body: string;
  readAt?: string;
  createdAt: string;
};

// ─── Dashboard ─────────────────────────────────────────────────────────────
export type DashboardMetric = {
  label: string;
  value: string | number;
  delta?: string;
  deltaType?: "up" | "down" | "neutral";
  icon?: string;
  color?: string;
};

export type DashboardStats = {
  totalProjects: number;
  totalBlogPosts: number;
  totalMessages: number;
  newMessages: number;
  totalVisitors: number;
  recentActivity: ActivityLogEntry[];
};

export type ActivityLogEntry = {
  id: string;
  userId?: string;
  action: string;
  entity?: string;
  entityId?: string;
  ipHash?: string;
  metadata?: Record<string, unknown>;
  createdAt: string;
};

// ─── AI Features ──────────────────────────────────────────────────────────
export type ChatMessage = {
  id: string;
  role: "user" | "assistant" | "system";
  content: string;
  timestamp: string;
};

export type AIAnalysisResult = {
  type: "resume" | "skillgap" | "roadmap" | "recommendation";
  summary: string;
  details: string[];
  score?: number;
  suggestions?: string[];
  timeline?: string;
};

export type SkillGapResult = {
  targetRole: string;
  currentSkills: string[];
  missingSkills: string[];
  partialSkills: string[];
  recommendations: string[];
  estimatedTime: string;
};

// ─── SEO / Metadata ────────────────────────────────────────────────────────
export type SEOMetadata = {
  title: string;
  description: string;
  keywords?: string[];
  ogImage?: string;
  canonicalUrl?: string;
  noIndex?: boolean;
};

// ─── UI State ──────────────────────────────────────────────────────────────
export type FilterOption = {
  label: string;
  value: string;
  count?: number;
};

export type SortOption = {
  label: string;
  value: string;
  direction: "asc" | "desc";
};

export type PaginationMeta = {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
};

export type APIResponse<T> = {
  data: T;
  meta?: PaginationMeta;
  error?: string;
};
