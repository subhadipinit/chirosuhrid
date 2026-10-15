import React, { useState, useEffect, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import { AdminSidebar, AdminTab } from "./components/AdminSidebar";
import { AdminHeader } from "./components/AdminHeader";
import { DashboardOverviewTab } from "./components/DashboardOverviewTab";
import { HomepageHeroTab } from "./components/HomepageHeroTab";
import { StoriesTab } from "./components/StoriesTab";
import { GalleryTab } from "./components/GalleryTab";
import { ProgramsTab } from "./components/ProgramsTab";
import { CentersTab } from "./components/CentersTab";
import { EventsTab } from "./components/EventsTab";
import { TeamTab } from "./components/TeamTab";
import { ReportsTab } from "./components/ReportsTab";
import { StatsHeroTab } from "./components/StatsHeroTab";
import { TestimonialsTab } from "./components/TestimonialsTab";
import { SettingsTab } from "./components/SettingsTab";
import { InquiriesTab } from "./components/InquiriesTab";
import { CloudSyncTab } from "./components/CloudSyncTab";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const AdminDashboard: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialTab = (searchParams.get("tab") as AdminTab) || "dashboard";
  const [activeTab, setActiveTab] = useState<AdminTab>(initialTab);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const mainContentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tabParam = searchParams.get("tab") as AdminTab;
    if (tabParam && tabParam !== activeTab) {
      setActiveTab(tabParam);
    }
  }, [searchParams, activeTab]);

  const handleSelectTab = (tab: AdminTab) => {
    setActiveTab(tab);
    setSearchParams({ tab });
    setMobileMenuOpen(false);
    if (mainContentRef.current) {
      mainContentRef.current.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const getTabTitle = (tab: AdminTab): string => {
    switch (tab) {
      case "dashboard":
        return "Dashboard";
      case "hero":
        return "Homepage Hero";
      case "stories":
        return "Stories";
      case "gallery":
        return "Gallery";
      case "programs":
        return "Programs";
      case "centers":
        return "Learning Centers";
      case "events":
        return "Events & Health Camps";
      case "team":
        return "Team Members";
      case "reports":
        return "Annual Reports";
      case "stats":
        return "Impact Stats";
      case "testimonials":
        return "Testimonials";
      case "settings":
        return "Site Settings";
      case "inquiries":
        return "Inquiries & Submissions";
      case "sync":
        return "Backups & Cloud";
      default:
        return "Dashboard";
    }
  };

  return (
    <div className="h-screen w-full overflow-hidden bg-slate-50 text-slate-800 flex flex-col md:flex-row antialiased">
      {/* Desktop Sidebar - Static Fixed on Left */}
      <div className="hidden md:flex h-full shrink-0">
        <AdminSidebar activeTab={activeTab} onSelectTab={handleSelectTab} />
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex">
          <div
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="relative z-10 w-72 max-w-[85vw] h-full bg-white flex flex-col shadow-2xl">
            <div className="absolute top-4 right-4 z-30">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setMobileMenuOpen(false)}
                className="text-slate-400 hover:text-slate-700 h-8 w-8 p-0 rounded-lg hover:bg-slate-100"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
            <AdminSidebar activeTab={activeTab} onSelectTab={handleSelectTab} />
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <div ref={mainContentRef} className="flex-1 flex flex-col min-w-0 h-full overflow-y-auto bg-slate-50">
        {/* Mobile Header trigger */}
        <div className="md:hidden flex items-center justify-between px-4 h-14 bg-white border-b border-slate-200 shrink-0 sticky top-0 z-30">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setMobileMenuOpen(true)}
            className="text-slate-700 p-1 h-9 w-9 rounded-lg"
          >
            <Menu className="w-5 h-5" />
          </Button>
          <span className="text-sm font-bold text-slate-900">SUHRID Admin</span>
          <div className="w-9" />
        </div>

        <AdminHeader activeTabTitle={getTabTitle(activeTab)} />

        <main className="flex-1 p-6 md:p-8 max-w-7xl w-full mx-auto">
          {activeTab === "dashboard" && <DashboardOverviewTab onNavigateTab={handleSelectTab} />}
          {activeTab === "hero" && <HomepageHeroTab />}
          {activeTab === "stories" && <StoriesTab />}
          {activeTab === "gallery" && <GalleryTab />}
          {activeTab === "programs" && <ProgramsTab />}
          {activeTab === "centers" && <CentersTab />}
          {activeTab === "events" && <EventsTab />}
          {activeTab === "team" && <TeamTab />}
          {activeTab === "reports" && <ReportsTab />}
          {activeTab === "stats" && <StatsHeroTab onNavigateHero={() => handleSelectTab("hero")} />}
          {activeTab === "testimonials" && <TestimonialsTab />}
          {activeTab === "settings" && <SettingsTab />}
          {activeTab === "inquiries" && <InquiriesTab />}
          {activeTab === "sync" && <CloudSyncTab />}
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
