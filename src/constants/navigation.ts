import {
  BarChart3,
  Bot,
  BriefcaseBusiness,
  FileText,
  Home,
  Inbox,
  LayoutDashboard,
  Settings,
  Sparkles,
  Trophy,
  UserRoundCog
} from "lucide-react";
import { Github } from "@/components/icons";

export const publicNav = [
  { label: "Home", href: "/", icon: Home },
  { label: "Projects", href: "/projects", icon: BriefcaseBusiness },
  { label: "GitHub", href: "/github", icon: Github },
  { label: "Blog", href: "/blog", icon: FileText }
];

export const dashboardNav = [
  { label: "Overview", href: "/dashboard", icon: LayoutDashboard },
  { label: "Projects", href: "/dashboard/projects", icon: BriefcaseBusiness },
  { label: "Analytics", href: "/dashboard/analytics", icon: BarChart3 },
  { label: "Messages", href: "/dashboard/messages", icon: Inbox },
  { label: "Content", href: "/dashboard/content", icon: Sparkles },
  { label: "Profile", href: "/dashboard/profile", icon: UserRoundCog },
  { label: "Achievements", href: "/dashboard/achievements", icon: Trophy },
  { label: "Settings", href: "/dashboard/settings", icon: Settings }
];
