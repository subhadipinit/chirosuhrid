import React from "react";
import {
  LayoutDashboard,
  Sparkles,
  BookOpen,
  Image as ImageIcon,
  GraduationCap,
  TrendingUp,
  MessageSquareQuote,
  Settings,
  Inbox,
  Cloud,
  ChevronRight,
  Shield,
  LogOut,
  User,
  MapPin,
  Calendar,
  Users,
  FileText,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useCMS } from "@/context/CMSContext";
import { useAuth } from "@/context/AuthContext";

export type AdminTab =
  | "dashboard"
  | "hero"
  | "stories"
  | "gallery"
  | "programs"
  | "centers"
  | "events"
  | "team"
  | "reports"
  | "stats"
  | "testimonials"
  | "settings"
  | "inquiries"
  | "sync";

interface AdminSidebarProps {
  activeTab: AdminTab;
  onSelectTab: (tab: AdminTab) => void;
}

interface NavGroup {
  groupLabel: string;
  items: {
    id: AdminTab;
    label: string;
    icon: React.ElementType;
    badge?: string | number;
    badgeColor?: string;
  }[];
}

export const AdminSidebar: React.FC<AdminSidebarProps> = ({ activeTab, onSelectTab }) => {
  const { inquiries, stories, gallery, programs, centers, teamMembers, reports, events } = useCMS();
  const { user, logout } = useAuth();
  const unreadInquiries = inquiries.filter((i) => i.status === "new").length;

  const navGroups: NavGroup[] = [
    {
      groupLabel: "General",
      items: [
        { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
      ],
    },
    {
      groupLabel: "Content",
      items: [
        { id: "hero", label: "Homepage Hero", icon: Sparkles },
        { id: "stories", label: "Stories", icon: BookOpen, badge: stories.length },
        { id: "gallery", label: "Gallery", icon: ImageIcon, badge: gallery.length },
        { id: "programs", label: "Programs", icon: GraduationCap, badge: programs.length },
        { id: "stats", label: "Impact Stats", icon: TrendingUp },
        { id: "testimonials", label: "Testimonials", icon: MessageSquareQuote },
      ],
    },
    {
      groupLabel: "Operations",
      items: [
        { id: "centers", label: "Centers", icon: MapPin, badge: centers.length },
        { id: "events", label: "Events & Camps", icon: Calendar, badge: events.length },
        { id: "team", label: "Team Members", icon: Users, badge: teamMembers.length },
        { id: "reports", label: "Annual Reports", icon: FileText, badge: reports.length },
      ],
    },
    {
      groupLabel: "Settings & Inquiries",
      items: [
        {
          id: "inquiries",
          label: "Inquiries",
          icon: Inbox,
          badge: unreadInquiries > 0 ? unreadInquiries : undefined,
          badgeColor: "bg-amber-100 text-amber-800",
        },
        { id: "settings", label: "Site Settings", icon: Settings },
        { id: "sync", label: "Backups & Cloud", icon: Cloud },
      ],
    },
  ];

  return (
    <aside className="w-64 lg:w-72 bg-white border-r border-slate-200 flex flex-col justify-between shrink-0 h-full z-20 select-none">
      {/* Brand Header */}
      <div className="h-16 px-6 flex items-center justify-between border-b border-slate-200 shrink-0 bg-white">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-primary text-white flex items-center justify-center font-bold shadow-xs">
            <Shield className="w-4 h-4 stroke-[2.5]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold text-slate-900 tracking-tight">SUHRID</span>
              <span className="text-[10px] font-semibold uppercase px-2 py-0.5 rounded-md bg-slate-100 text-slate-600">
                Admin
              </span>
            </div>
            <p className="text-[11px] text-slate-500 font-medium">Content Management</p>
          </div>
        </div>
      </div>

      {/* Navigation List */}
      <div className="p-4 space-y-6 flex-1 min-h-0 overflow-y-auto">
        {navGroups.map((group) => (
          <div key={group.groupLabel} className="space-y-1">
            <span className="px-3 text-[11px] font-semibold uppercase tracking-wider text-slate-400 block mb-1">
              {group.groupLabel}
            </span>

            {group.items.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onSelectTab(item.id)}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                    isActive
                      ? "bg-primary text-white font-semibold shadow-xs"
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                  }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <Icon className={`w-4 h-4 shrink-0 ${isActive ? "text-white" : "text-slate-400"}`} />
                    <span className="truncate">{item.label}</span>
                  </div>

                  {item.badge !== undefined && (
                    <span
                      className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${
                        isActive
                          ? "bg-white/20 text-white"
                          : item.badgeColor || "bg-slate-100 text-slate-600"
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        ))}
      </div>

      {/* User Footer */}
      <div className="p-4 border-t border-slate-200 shrink-0 bg-white">
        <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-8 h-8 rounded-lg bg-primary text-white flex items-center justify-center font-bold text-xs shrink-0">
              <User className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <p className="text-xs font-semibold text-slate-900 truncate">
                {user?.email || "admin@suhrid.org"}
              </p>
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                <span className="text-[10px] text-slate-500 font-medium truncate">Administrator</span>
              </div>
            </div>
          </div>

          <button
            onClick={logout}
            className="w-8 h-8 rounded-lg border border-slate-200 bg-white hover:bg-rose-50 hover:text-rose-600 hover:border-rose-200 text-slate-500 flex items-center justify-center transition-colors shrink-0"
            title="Sign Out"
          >
            <LogOut className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </aside>
  );
};
