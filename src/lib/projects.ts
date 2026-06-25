export type ProjectCategory = "fullstack" | "frontend" | "ai";

export type ProjectPhase = {
  title: string;
  duration: string;
  description: string;
  technologies: string[];
};

export type Project = {
  slug: string;
  title: string;
  category: ProjectCategory;
  status: "Production" | "Beta" | "Prototype";
  summary: string;
  impact: string;
  role: string;
  developmentTime: string;
  complexity: "Intermediate" | "Advanced" | "Expert";
  technologies: string[];
  github: string;
  deploy: string;
  highlights: string[];
  risksSolved: string[];
  phases: ProjectPhase[];
};

export type ProjectStats = {
  projectCount: number;
  technologyCount: number;
  liveDeployments: number;
  fullstackCount: number;
};

const projects: Project[] = [
  {
    slug: "bookhub",
    title: "BookHub",
    category: "fullstack",
    status: "Production",
    summary:
      "Digital library and social reading platform with book discovery, personal shelves, reviews, ratings, and Google Books integration.",
    impact: "Turns a static book list into a searchable, review-driven reading product.",
    role: "Full-stack engineer",
    developmentTime: "7 weeks",
    complexity: "Expert",
    technologies: ["React", "Node.js", "Express", "MongoDB", "Google Books API", "JWT", "Docker", "Jest"],
    github: "https://github.com/UnknownHawkins/BOOK_REVIEW_APP",
    deploy: "https://book-review-app-8sur.onrender.com",
    highlights: [
      "Secure user authentication and password hashing",
      "Search and enrichment through Google Books API",
      "Container-ready backend deployment workflow"
    ],
    risksSolved: [
      "External API failure handling",
      "Review data integrity",
      "Protected user library operations"
    ],
    phases: [
      {
        title: "Architecture Design",
        duration: "1 week",
        description: "Defined the client, API, database, authentication flow, and deployment boundaries.",
        technologies: ["Node.js", "MongoDB", "Docker"]
      },
      {
        title: "Frontend Development",
        duration: "2 weeks",
        description: "Built responsive views for discovery, reviews, and personal reading lists.",
        technologies: ["React", "Tailwind CSS", "REST"]
      },
      {
        title: "Backend Integration",
        duration: "3 weeks",
        description: "Implemented API endpoints, authentication, validation, and external book data integration.",
        technologies: ["Express", "JWT", "Google Books API"]
      },
      {
        title: "Testing and Deployment",
        duration: "1 week",
        description: "Added tests, deployment configuration, and production hardening.",
        technologies: ["Jest", "Render", "GitHub"]
      }
    ]
  },
  {
    slug: "codebuddy",
    title: "CodeBuddy",
    category: "fullstack",
    status: "Beta",
    summary:
      "Developer and student collaboration platform for finding coding partners, forming teams, and coordinating projects.",
    impact: "Helps early developers move from solo learning to team-based building.",
    role: "Product and full-stack developer",
    developmentTime: "5 weeks",
    complexity: "Advanced",
    technologies: ["HTML5", "CSS3", "JavaScript", "Node.js", "WebSockets", "Firebase"],
    github: "https://github.com/UnknownHawkins/CODEBUDDY",
    deploy: "https://codebuddy-eight.vercel.app",
    highlights: [
      "Real-time collaboration primitives",
      "Team discovery and matching workflow",
      "Responsive interface for students and builders"
    ],
    risksSolved: ["Realtime connection stability", "User onboarding friction", "Project discovery filtering"],
    phases: [
      {
        title: "Planning and Design",
        duration: "1 week",
        description: "Mapped collaboration journeys, profiles, and matching needs.",
        technologies: ["Figma", "User Stories", "Draw.io"]
      },
      {
        title: "Frontend Development",
        duration: "2 weeks",
        description: "Built the interactive collaboration interface and project browsing screens.",
        technologies: ["HTML5", "CSS3", "JavaScript"]
      },
      {
        title: "Backend Development",
        duration: "1 week",
        description: "Connected user flows to realtime services and backend APIs.",
        technologies: ["Node.js", "WebSockets", "Firebase"]
      },
      {
        title: "Testing and Deployment",
        duration: "1 week",
        description: "Validated the core collaboration flow and deployed the public beta.",
        technologies: ["Vercel", "GitHub Actions"]
      }
    ]
  },
  {
    slug: "hostel-management-system",
    title: "Hostel Management System",
    category: "fullstack",
    status: "Production",
    summary:
      "Operations dashboard for room allocation, student records, hostel administration, and payment tracking.",
    impact: "Centralizes manual hostel workflows into a maintainable management system.",
    role: "Full-stack developer",
    developmentTime: "6 weeks",
    complexity: "Advanced",
    technologies: ["PHP", "MySQL", "JavaScript", "Bootstrap", "REST API"],
    github: "https://github.com/UnknownHawkins/HOSTEL-MANAGEMENT-SYSTEM",
    deploy: "https://hostel-management-system-pearl.vercel.app",
    highlights: ["Admin dashboard", "Relational data model", "Room and student record management"],
    risksSolved: ["Duplicate room allocation", "Payment status tracking", "Role-based admin workflows"],
    phases: [
      {
        title: "Requirements Analysis",
        duration: "1 week",
        description: "Collected hostel workflows and administrator requirements.",
        technologies: ["User Interviews", "Use Cases"]
      },
      {
        title: "Database Design",
        duration: "1 week",
        description: "Designed normalized tables for students, rooms, payments, and admin records.",
        technologies: ["MySQL", "ER Diagrams"]
      },
      {
        title: "Application Build",
        duration: "3 weeks",
        description: "Implemented UI, business logic, and database interactions.",
        technologies: ["PHP", "JavaScript", "Bootstrap"]
      },
      {
        title: "Deployment",
        duration: "1 week",
        description: "Tested workflows and deployed the production build.",
        technologies: ["Manual Testing", "Vercel"]
      }
    ]
  },
  {
    slug: "careerpath-ai",
    title: "CareerPath AI",
    category: "ai",
    status: "Prototype",
    summary:
      "Career guidance product that recommends paths from skills, interests, and market trend signals.",
    impact: "Makes career exploration more structured and personalized for students.",
    role: "AI product developer",
    developmentTime: "4 weeks",
    complexity: "Advanced",
    technologies: ["JavaScript", "Python", "Scikit-learn", "TensorFlow", "Flask", "Chart.js"],
    github: "https://github.com/UnknownHawkins/CAREERPATH-AI",
    deploy: "https://careerpath-ai-neon.vercel.app",
    highlights: ["Career assessment flow", "AI recommendation layer", "Visual result breakdown"],
    risksSolved: ["Unclear recommendation explanations", "Frontend to model API integration", "Assessment UX"],
    phases: [
      {
        title: "Research and Planning",
        duration: "1 week",
        description: "Compared career prediction methods and mapped assessment inputs.",
        technologies: ["Data Analysis", "Market Research"]
      },
      {
        title: "AI Model Development",
        duration: "1 week",
        description: "Built early recommendation models and scoring logic.",
        technologies: ["Python", "Scikit-learn", "TensorFlow"]
      },
      {
        title: "Frontend and API",
        duration: "1 week",
        description: "Connected the assessment UI to backend prediction services.",
        technologies: ["JavaScript", "Flask", "REST API"]
      },
      {
        title: "Optimization",
        duration: "1 week",
        description: "Improved performance and clarity of recommendation outputs.",
        technologies: ["Chart.js", "User Feedback"]
      }
    ]
  },
  {
    slug: "life-ruination-protocol",
    title: "Life Ruination Protocol",
    category: "frontend",
    status: "Production",
    summary:
      "Experimental logic-art project using interactive digital effects, abstract systems, and creative coding.",
    impact: "Shows creative frontend range beyond standard dashboard interfaces.",
    role: "Creative frontend engineer",
    developmentTime: "3 weeks",
    complexity: "Intermediate",
    technologies: ["JavaScript", "Canvas API", "CSS3", "SVG", "Creative Coding"],
    github: "https://github.com/UnknownHawkins/LIFE_RUINATION_PROTOCOL",
    deploy: "https://life-ruination-protocol.vercel.app",
    highlights: ["Canvas-based interaction", "Custom visual language", "Performance-focused animations"],
    risksSolved: ["Animation jank", "Visual consistency", "Responsive interaction states"],
    phases: [
      {
        title: "Concept Development",
        duration: "1 week",
        description: "Defined the interactive metaphor and visual behavior.",
        technologies: ["Sketching", "Prototyping"]
      },
      {
        title: "Interactive Development",
        duration: "1 week",
        description: "Built the core interactions and animation loops.",
        technologies: ["JavaScript", "Canvas API"]
      },
      {
        title: "Launch",
        duration: "1 week",
        description: "Polished visual effects and optimized runtime performance.",
        technologies: ["CSS3", "Vercel"]
      }
    ]
  },
  {
    slug: "personal-portfolio",
    title: "Personal Portfolio",
    category: "frontend",
    status: "Production",
    summary:
      "Personal portfolio that presents skills, projects, experience, and deployment links in a polished package.",
    impact: "Gives recruiters and collaborators a clear path through the work.",
    role: "Frontend developer",
    developmentTime: "2 weeks",
    complexity: "Intermediate",
    technologies: ["HTML5", "CSS3", "JavaScript", "Responsive Design", "GitHub Pages"],
    github: "https://github.com/UnknownHawkins/MY_PORTFOLIO",
    deploy: "https://unknownhawkins.github.io/MY_PORTFOLIO",
    highlights: ["Responsive layout", "Project storytelling", "SEO-friendly content"],
    risksSolved: ["Mobile readability", "Content hierarchy", "Deployment reliability"],
    phases: [
      {
        title: "Design and Planning",
        duration: "3 days",
        description: "Created the layout, structure, and portfolio content strategy.",
        technologies: ["Figma", "Wireframing"]
      },
      {
        title: "Development",
        duration: "1 week",
        description: "Built responsive pages and project sections.",
        technologies: ["HTML5", "CSS3", "JavaScript"]
      },
      {
        title: "Optimization and Deployment",
        duration: "4 days",
        description: "Improved performance, SEO, and production deployment.",
        technologies: ["GitHub Pages", "Analytics"]
      }
    ]
  }
];

export function getProjectCatalog() {
  return projects;
}

export function getProjectBySlug(slug: string) {
  return projects.find((project) => project.slug === slug);
}

export function getProjectStats(): ProjectStats {
  const technologies = new Set(projects.flatMap((project) => project.technologies));

  return {
    projectCount: projects.length,
    technologyCount: technologies.size,
    liveDeployments: projects.filter((project) => project.deploy.startsWith("https://")).length,
    fullstackCount: projects.filter((project) => project.category === "fullstack").length
  };
}

export function searchProjects(query = "", category?: ProjectCategory) {
  const normalizedQuery = query.trim().toLowerCase();

  return projects.filter((project) => {
    const matchesCategory = category ? project.category === category : true;
    const searchable = [
      project.title,
      project.summary,
      project.impact,
      project.role,
      project.category,
      ...project.technologies
    ]
      .join(" ")
      .toLowerCase();

    return matchesCategory && (!normalizedQuery || searchable.includes(normalizedQuery));
  });
}
