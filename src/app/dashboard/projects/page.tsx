import type { Metadata } from "next";
import { FolderKanban, Plus, ExternalLink, Tag, Pencil, Trash2 } from "lucide-react";
import { Github } from "@/components/icons";
import Link from "next/link";
import { getProjectCatalog } from "@/lib/projects";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = { title: "Projects" };

export default function DashboardProjectsPage() {
  const projects = getProjectCatalog();

  return (
    <div className="space-y-6 page-enter">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black flex items-center gap-2">
            <FolderKanban className="w-6 h-6 text-cyan-300" />
            Projects
          </h1>
          <p className="text-sm text-foreground/40 mt-0.5">{projects.length} projects in your portfolio</p>
        </div>
        <Button size="sm" className="flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Add Project
        </Button>
      </div>

      {/* Table */}
      <div className="glass-card rounded-2xl overflow-hidden">
        <table className="data-table">
          <thead>
            <tr>
              <th>Project</th>
              <th>Category</th>
              <th>Status</th>
              <th>Technologies</th>
              <th>Links</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((project) => (
              <tr key={project.slug}>
                <td>
                  <div>
                    <p className="font-semibold text-foreground">{project.title}</p>
                    <p className="text-xs text-foreground/35 mt-0.5 max-w-xs truncate">
                      {project.summary}
                    </p>
                  </div>
                </td>
                <td>
                  <span className="badge-cyan">{project.category}</span>
                </td>
                <td>
                  <span
                    className={`badge-${project.status === "Production" ? "green" : project.status === "Beta" ? "cyan" : "amber"}`}
                  >
                    {project.status}
                  </span>
                </td>
                <td>
                  <div className="flex flex-wrap gap-1 max-w-[180px]">
                    {project.technologies.slice(0, 3).map((tech) => (
                      <span key={tech} className="text-[10px] text-foreground/50 bg-foreground/5 px-1.5 py-0.5 rounded">
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 3 && (
                      <span className="text-[10px] text-foreground/30">+{project.technologies.length - 3}</span>
                    )}
                  </div>
                </td>
                <td>
                  <div className="flex items-center gap-2">
                    {project.github && (
                      <Link href={project.github} target="_blank" className="text-foreground/40 hover:text-foreground transition-colors">
                        <Github className="w-4 h-4" />
                      </Link>
                    )}
                    {project.deploy && (
                      <Link href={project.deploy} target="_blank" className="text-foreground/40 hover:text-foreground transition-colors">
                        <ExternalLink className="w-4 h-4" />
                      </Link>
                    )}
                  </div>
                </td>
                <td>
                  <div className="flex items-center gap-2">
                    <button className="text-foreground/30 hover:text-cyan-300 transition-colors" title="Edit">
                      <Pencil className="w-4 h-4" />
                    </button>
                    <button className="text-foreground/30 hover:text-red-400 transition-colors" title="Delete">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
