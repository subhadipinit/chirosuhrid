import React from "react";
import { Link } from "react-router-dom";
import { useCMS } from "@/context/CMSContext";
import { RefreshCw, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface AdminHeaderProps {
  activeTabTitle: string;
}

export const AdminHeader: React.FC<AdminHeaderProps> = ({ activeTabTitle }) => {
  const { isCloudConnected, isSyncing, syncWithCloud } = useCMS();

  return (
    <header className="h-16 bg-white border-b border-slate-200 px-6 md:px-8 flex items-center justify-between sticky top-0 z-30">
      {/* Breadcrumb Title */}
      <div className="flex items-center gap-2 text-sm">
        <span className="font-medium text-slate-400">Admin</span>
        <span className="text-slate-300">/</span>
        <h1 className="font-semibold text-slate-900 text-base">{activeTabTitle}</h1>
      </div>

      <div className="flex items-center gap-3">
        {/* Cloud Connection Status Badge */}
        <div className="hidden sm:inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium bg-slate-50 border border-slate-200 text-slate-600">
          <span className={`w-2 h-2 rounded-full ${isCloudConnected ? "bg-emerald-500" : "bg-amber-500"}`} />
          <span>{isCloudConnected ? "Supabase Connected" : "Local Mode"}</span>
        </div>

        {/* Sync Button */}
        <Button
          variant="outline"
          size="sm"
          onClick={() => syncWithCloud()}
          disabled={isSyncing}
          className="h-9 px-3 rounded-lg border-slate-200 text-xs font-medium gap-1.5 bg-white hover:bg-slate-50 text-slate-700"
          title="Refresh content from database"
        >
          <RefreshCw className={`w-3.5 h-3.5 text-slate-500 ${isSyncing ? "animate-spin" : ""}`} />
          <span>{isSyncing ? "Syncing..." : "Sync"}</span>
        </Button>

        {/* View Public Website */}
        <Link
          to="/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-700 hover:text-slate-900 h-9 px-3 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 transition-colors"
        >
          <span>View Site</span>
          <ArrowUpRight className="w-3.5 h-3.5 text-slate-400" />
        </Link>
      </div>
    </header>
  );
};
