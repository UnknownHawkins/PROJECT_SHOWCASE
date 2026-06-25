import type { Metadata } from "next";
import { MessageSquare, Clock, Mail, MailOpen, Archive } from "lucide-react";

export const metadata: Metadata = { title: "Messages" };

const sampleMessages = [
  {
    id: "1",
    name: "Alice Johnson",
    email: "alice@example.com",
    subject: "Collaboration opportunity",
    body: "Hi! I love your portfolio. Would you be interested in collaborating on a React project?",
    status: "NEW",
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "2",
    name: "Bob Smith",
    email: "bob@company.com",
    subject: "Job opportunity — Senior Frontend",
    body: "We have a senior frontend role that matches your skills perfectly. Let's connect!",
    status: "READ",
    createdAt: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "3",
    name: "Carol Dev",
    email: "carol@startup.io",
    subject: "Open source contribution",
    body: "I saw your GitHub profile and would love to discuss contributing to your projects.",
    status: "NEW",
    createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "4",
    name: "David Lee",
    email: "david@agency.co",
    subject: "Freelance project inquiry",
    body: "Looking for a Next.js developer for a 3-month project. Are you available?",
    status: "ARCHIVED",
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
  },
];

function timeAgo(dateStr: string) {
  const diff = Date.now() - new Date(dateStr).getTime();
  const hours = Math.floor(diff / 3600000);
  if (hours < 1) return "just now";
  if (hours < 24) return `${hours}h ago`;
  return `${Math.floor(hours / 24)}d ago`;
}

export default function DashboardMessagesPage() {
  const unread = sampleMessages.filter((m) => m.status === "NEW").length;

  return (
    <div className="space-y-6 page-enter">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black flex items-center gap-2">
            <MessageSquare className="w-6 h-6 text-pink-400" />
            Messages
          </h1>
          <p className="text-sm text-foreground/40 mt-0.5">
            {unread} unread · {sampleMessages.length} total
          </p>
        </div>
        {/* Filters */}
        <div className="flex gap-2">
          {["All", "Unread", "Archived"].map((f) => (
            <button
              key={f}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                f === "All"
                  ? "bg-foreground/10 text-foreground"
                  : "text-foreground/40 hover:text-foreground hover:bg-foreground/5"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Message list */}
      <div className="space-y-3">
        {sampleMessages.map((msg) => (
          <div
            key={msg.id}
            className={`glass-card rounded-2xl p-5 transition-all hover:border-foreground/20 ${
              msg.status === "NEW" ? "border-cyan-400/20" : ""
            }`}
          >
            <div className="flex items-start gap-4">
              {/* Avatar */}
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500/30 to-blue-500/30 border border-foreground/10 flex items-center justify-center text-sm font-bold text-foreground flex-shrink-0">
                {msg.name.charAt(0)}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-semibold text-foreground text-sm">{msg.name}</p>
                    <p className="text-xs text-foreground/40">{msg.email}</p>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    {msg.status === "NEW" && (
                      <span className="badge-cyan text-[9px]">New</span>
                    )}
                    <span className="text-xs text-foreground/30 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {timeAgo(msg.createdAt)}
                    </span>
                  </div>
                </div>
                {msg.subject && (
                  <p className="text-sm font-medium text-foreground/80 mt-2">{msg.subject}</p>
                )}
                <p className="text-sm text-foreground/50 mt-1 line-clamp-2">{msg.body}</p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-2 mt-4 pl-14">
              <button className="flex items-center gap-1.5 text-xs text-foreground/40 hover:text-foreground transition-colors px-3 py-1.5 rounded-lg hover:bg-foreground/5">
                <MailOpen className="w-3.5 h-3.5" />
                Mark Read
              </button>
              <button className="flex items-center gap-1.5 text-xs text-foreground/40 hover:text-foreground transition-colors px-3 py-1.5 rounded-lg hover:bg-foreground/5">
                <Mail className="w-3.5 h-3.5" />
                Reply
              </button>
              <button className="flex items-center gap-1.5 text-xs text-foreground/40 hover:text-red-400 transition-colors px-3 py-1.5 rounded-lg hover:bg-foreground/5">
                <Archive className="w-3.5 h-3.5" />
                Archive
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
