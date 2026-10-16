import React from "react";
import { useCMS } from "@/context/CMSContext";
import { AdminTab } from "./AdminSidebar";
import {
  BookOpen,
  Image as ImageIcon,
  GraduationCap,
  Inbox,
  PlusCircle,
  Settings,
  Cloud,
  ArrowRight,
  Clock,
  Sparkles,
  HeartHandshake,
  ArrowUpRight,
  MapPin,
  Calendar,
  Users,
  FileText,
  Database,
  CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface DashboardOverviewTabProps {
  onNavigateTab: (tab: AdminTab) => void;
}

export const DashboardOverviewTab: React.FC<DashboardOverviewTabProps> = ({ onNavigateTab }) => {
  const { stories, gallery, programs, inquiries, centers, teamMembers, reports, events, isCloudConnected } = useCMS();

  const newInquiries = inquiries.filter((i) => i.status === "new");
  const featuredStories = stories.filter((s) => s.featured);

  return (
    <div className="space-y-8">
      {/* Page Title & Quick Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Overview</h2>
          <p className="text-sm text-slate-500 mt-1">
            Real-time summary of website content, rural center operations, and community inquiries.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Button
            size="sm"
            onClick={() => onNavigateTab("hero")}
            className="h-9 px-3.5 rounded-lg bg-primary hover:bg-primary-dark text-white font-medium text-xs gap-1.5 shadow-xs"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Edit Hero</span>
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() => onNavigateTab("stories")}
            className="h-9 px-3.5 rounded-lg border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-medium text-xs gap-1.5"
          >
            <PlusCircle className="w-3.5 h-3.5 text-slate-400" />
            <span>Add Story</span>
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() => onNavigateTab("events")}
            className="h-9 px-3.5 rounded-lg border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-medium text-xs gap-1.5"
          >
            <Calendar className="w-3.5 h-3.5 text-slate-400" />
            <span>Add Event</span>
          </Button>
        </div>
      </div>

      {/* KPI Cards: 4 columns */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Stories */}
        <div
          onClick={() => onNavigateTab("stories")}
          className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs hover:border-slate-300 hover:shadow-sm transition-all cursor-pointer flex flex-col justify-between"
        >
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Stories</span>
            <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-600">
              <BookOpen className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-4">
            <div className="text-3xl font-bold text-slate-900">{stories.length}</div>
            <p className="text-xs text-slate-500 mt-1">
              <span className="font-semibold text-emerald-600">{featuredStories.length}</span> featured on home
            </p>
          </div>
        </div>

        {/* Learning Centers */}
        <div
          onClick={() => onNavigateTab("centers")}
          className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs hover:border-slate-300 hover:shadow-sm transition-all cursor-pointer flex flex-col justify-between"
        >
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Centers</span>
            <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-600">
              <MapPin className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-4">
            <div className="text-3xl font-bold text-slate-900">{centers.length}</div>
            <p className="text-xs text-slate-500 mt-1">Midnapore, Nasra, Gama</p>
          </div>
        </div>

        {/* Camps & Events */}
        <div
          onClick={() => onNavigateTab("events")}
          className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs hover:border-slate-300 hover:shadow-sm transition-all cursor-pointer flex flex-col justify-between"
        >
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Events & Camps</span>
            <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-600">
              <Calendar className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-4">
            <div className="text-3xl font-bold text-slate-900">{events.length}</div>
            <p className="text-xs text-slate-500 mt-1">Health drives & summits</p>
          </div>
        </div>

        {/* Inquiries */}
        <div
          onClick={() => onNavigateTab("inquiries")}
          className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs hover:border-slate-300 hover:shadow-sm transition-all cursor-pointer flex flex-col justify-between"
        >
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Inquiries</span>
            <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-600">
              <Inbox className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-4">
            <div className="text-3xl font-bold text-slate-900">{inquiries.length}</div>
            <p className="text-xs text-slate-500 mt-1">
              <span className={`font-semibold ${newInquiries.length > 0 ? "text-amber-600" : "text-slate-500"}`}>
                {newInquiries.length} new
              </span>{" "}
              awaiting review
            </p>
          </div>
        </div>

        {/* Team Members */}
        <div
          onClick={() => onNavigateTab("team")}
          className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs hover:border-slate-300 hover:shadow-sm transition-all cursor-pointer flex flex-col justify-between"
        >
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Team</span>
            <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-600">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-4">
            <div className="text-3xl font-bold text-slate-900">{teamMembers.length}</div>
            <p className="text-xs text-slate-500 mt-1">Directors & mentors</p>
          </div>
        </div>

        {/* Reports */}
        <div
          onClick={() => onNavigateTab("reports")}
          className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs hover:border-slate-300 hover:shadow-sm transition-all cursor-pointer flex flex-col justify-between"
        >
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Reports</span>
            <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-600">
              <FileText className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-4">
            <div className="text-3xl font-bold text-slate-900">{reports.length}</div>
            <p className="text-xs text-slate-500 mt-1">Audits & 80G filings</p>
          </div>
        </div>

        {/* Gallery */}
        <div
          onClick={() => onNavigateTab("gallery")}
          className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs hover:border-slate-300 hover:shadow-sm transition-all cursor-pointer flex flex-col justify-between"
        >
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Gallery</span>
            <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-600">
              <ImageIcon className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-4">
            <div className="text-3xl font-bold text-slate-900">{gallery.length}</div>
            <p className="text-xs text-slate-500 mt-1">Fieldwork photographs</p>
          </div>
        </div>

        {/* Programs */}
        <div
          onClick={() => onNavigateTab("programs")}
          className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs hover:border-slate-300 hover:shadow-sm transition-all cursor-pointer flex flex-col justify-between"
        >
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Programs</span>
            <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-600">
              <GraduationCap className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-4">
            <div className="text-3xl font-bold text-slate-900">{programs.length}</div>
            <p className="text-xs text-slate-500 mt-1">Core pillars</p>
          </div>
        </div>
      </div>

      {/* Two Columns: Recent Inquiries + System Status */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Inquiries */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 p-6 shadow-xs">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
            <div>
              <h3 className="text-base font-semibold text-slate-900">Recent Inquiries</h3>
              <p className="text-xs text-slate-500">Submissions from Contact and Volunteer forms</p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onNavigateTab("inquiries")}
              className="text-xs font-medium text-primary hover:text-primary-dark gap-1 h-8"
            >
              <span>View all</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Button>
          </div>

          {inquiries.length === 0 ? (
            <div className="text-center py-12 text-slate-400">
              <Inbox className="w-8 h-8 mx-auto mb-2 opacity-50" />
              <p className="text-sm font-medium text-slate-600">No inquiries yet</p>
              <p className="text-xs text-slate-400 mt-0.5">New messages from website visitors will appear here.</p>
            </div>
          ) : (
            <div className="divide-y divide-slate-100">
              {inquiries.slice(0, 5).map((inq) => (
                <div
                  key={inq.id}
                  onClick={() => onNavigateTab("inquiries")}
                  className="py-3 flex items-center justify-between gap-4 hover:bg-slate-50/60 rounded-lg px-2 -mx-2 transition-colors cursor-pointer"
                >
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold text-slate-900 truncate">{inq.name}</span>
                      <span
                        className={`text-[10px] font-semibold px-2 py-0.5 rounded-full capitalize ${
                          inq.status === "new"
                            ? "bg-amber-100 text-amber-800"
                            : inq.status === "in_progress"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-emerald-100 text-emerald-800"
                        }`}
                      >
                        {inq.status.replace("_", " ")}
                      </span>
                      <span className="text-[10px] uppercase font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-600">
                        {inq.type}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 truncate mt-0.5">
                      {inq.type === "volunteer"
                        ? ((inq.data?.note as string) || (inq.message?.replace(/^\[Volunteer Application\].*?Note:\s*/is, "").trim()) || inq.message || "Volunteer application submitted")
                        : (inq.message?.replace(/^\[Subject:\s*[^\]]+\]\s*/i, "").trim() || inq.email || inq.phone || "No message body")}
                    </p>
                  </div>

                  <span className="text-xs text-slate-400 shrink-0 flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {new Date(inq.createdAt).toLocaleDateString()}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Database & System Info */}
        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs flex flex-col justify-between">
          <div>
            <h3 className="text-base font-semibold text-slate-900 pb-4 border-b border-slate-100 mb-4">
              System & Database
            </h3>

            <div className="space-y-3">
              <div className="p-3 rounded-lg bg-slate-50 border border-slate-200/60 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-500">Database Engine</span>
                  <span className="font-semibold text-slate-800">Supabase PostgreSQL</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-500">Cloud Sync Status</span>
                  <span className="inline-flex items-center gap-1.5 font-semibold text-emerald-700">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    Connected
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-500">Storage Bucket</span>
                  <span className="font-mono text-[11px] font-semibold text-slate-700">suhrid-media</span>
                </div>
              </div>

              <p className="text-xs text-slate-500 leading-relaxed">
                Changes made in the admin console are automatically synchronized with Supabase and cached locally for offline reliability.
              </p>
            </div>
          </div>

          <div className="pt-6 border-t border-slate-100 mt-6 space-y-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onNavigateTab("settings")}
              className="w-full h-9 rounded-lg text-xs font-medium justify-between text-slate-700 hover:text-slate-900"
            >
              <span>Manage Site Settings</span>
              <Settings className="w-3.5 h-3.5 text-slate-400" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onNavigateTab("sync")}
              className="w-full h-9 rounded-lg text-xs font-medium justify-between text-slate-700 hover:text-slate-900"
            >
              <span>Backups & Cloud</span>
              <Cloud className="w-3.5 h-3.5 text-slate-400" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
