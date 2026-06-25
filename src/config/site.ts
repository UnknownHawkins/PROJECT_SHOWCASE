export const siteConfig = {
  name: "Anubhav Singh",
  title: "Anubhav Singh | Full-Stack Developer Portfolio Platform",
  description:
    "A production-grade full-stack developer portfolio platform with GitHub intelligence, analytics, admin dashboard, AI tools, and secure backend APIs.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  githubUsername: process.env.GITHUB_USERNAME ?? "UnknownHawkins",
  links: {
    github: "https://github.com/UnknownHawkins",
    linkedin: "https://www.linkedin.com/",
    email: "mailto:hello@anubhav.dev"
  }
};
