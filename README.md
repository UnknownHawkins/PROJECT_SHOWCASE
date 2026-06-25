# World-Class Full-Stack Developer Portfolio Platform

A secure, high-performance developer portfolio, administrative dashboard, and AI playground built with Next.js 15 App Router, React 19, TypeScript, Tailwind CSS v4, and Prisma ORM.

## Key Features

1. **Frontend & Styling**
   - Next.js 15 (App Router) & React 19
   - Tailwind CSS v4 with curated dark-mode theme
   - Aceternity UI components & custom glassmorphism effects
   - Gsap Reveal scroll animations & particles using Three.js

2. **GitHub Intelligence**
   - GitHub GraphQL API integration (with REST fallback)
   - Contribution heatmaps, repository status cards, language breakdowns, and commit frequency charts
   - Upstash/Redis caching layer for rate-limit protection

3. **Admin Dashboard**
   - Collapsible navigation sidebar
   - Metrics overview (Projects, Blog, Messages, Visitors)
   - CRUD management for projects & blog posts
   - Live visitor tracking charts & geographic distribution maps
   - System settings (Profile, GitHub Sync, PWA toggles, Security preferences)

4. **AI Playground**
   - Streamlined AI chat, resume analyzer, skill gap, and roadmap generators powered by the Gemini API

5. **Security & Production Best Practices**
   - Rate limiting, honeypot fields, and same-origin checks on form submissions
   - Strict Content Security Policy (CSP) headers in `next.config.ts`
   - Progressive Web App (PWA) manifest and background caching service worker
   - Dynamic sitemap.xml and robots.txt generation

6. **DevOps & CI/CD**
   - Multi-stage Dockerfile for minimized production image size
   - GitHub Actions workflows for continuous integration validation and automated deployment to Vercel
   - Local database and caching services configured via `docker-compose.yml`

## Environment Variables

Copy `.env.example` to `.env` and fill in the required keys:

```bash
cp .env.example .env
```

Refer to `.env.example` for details on database connection strings (`DATABASE_URL`), Redis URL (`REDIS_URL`), and API keys (`GITHUB_TOKEN`, `GEMINI_API_KEY`, etc.).

## Getting Started

### Local Development

1. Install dependencies:
   ```bash
   npm install
   ```

2. Boot local PostgreSQL and Redis services (optional, fallback data is used if services are disconnected):
   ```bash
   docker-compose up -d
   ```

3. Spin up the dev server:
   ```bash
   npm run dev
   ```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## Verification

To verify code quality and build compilation:

```bash
npm run typecheck   # Strict TypeScript checks
npm run build       # Full production build
```
