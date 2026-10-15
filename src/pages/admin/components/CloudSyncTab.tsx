import React, { useState, useEffect, useCallback } from "react";
import { useCMS } from "@/context/CMSContext";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";
import schemaSql from "../../../../supabase_schema.sql?raw";
import {
  Cloud,
  Database,
  Download,
  Upload,
  Copy,
  Check,
  RotateCcw,
  RefreshCw,
  FileCode,
  ShieldCheck,
  AlertTriangle,
  ExternalLink,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export const CloudSyncTab: React.FC = () => {
  const { exportDataJSON, importDataJSON, resetToDefaults, syncWithCloud, isSyncing } = useCMS();
  const isCloud = isSupabaseConfigured();

  const [copiedSql, setCopiedSql] = useState(false);
  const [dbStatus, setDbStatus] = useState<"checking" | "connected" | "needs_migration">("checking");

  const checkTables = useCallback(async () => {
    if (!isCloud || !supabase) {
      setDbStatus("needs_migration");
      return;
    }
    try {
      const { error } = await supabase.from("site_settings").select("key").limit(1);
      if (error) {
        setDbStatus("needs_migration");
      } else {
        setDbStatus("connected");
      }
    } catch {
      setDbStatus("needs_migration");
    }
  }, [isCloud]);

  useEffect(() => {
    checkTables();
  }, [checkTables]);

  const handleCopySqlInstructions = () => {
    navigator.clipboard.writeText(schemaSql);
    setCopiedSql(true);
    toast.success("Complete SQL migration script copied to clipboard!");
    setTimeout(() => setCopiedSql(false), 3000);
  };

  const handleExport = () => {
    const jsonStr = exportDataJSON();
    const blob = new Blob([jsonStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `chirosuhrid-cms-backup-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success("Backup downloaded as JSON file");
  };

  const handleImportFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      if (content) {
        importDataJSON(content);
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">Database & Cloud Sync</h1>
          <p className="text-sm text-slate-500 mt-1">
            Manage PostgreSQL database synchronization, manual JSON backups, and local state restore.
          </p>
        </div>
      </div>

      {/* Cloud Status Card */}
      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-xs space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div
              className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                isCloud ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-700"
              }`}
            >
              {isCloud ? <Cloud className="w-5 h-5" /> : <Database className="w-5 h-5" />}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-semibold text-slate-900">
                  {isCloud ? "Supabase Cloud Connected" : "Local Browser Storage Active"}
                </h3>
                <span
                  className={`px-2 py-0.5 rounded-md text-[11px] font-medium ${
                    isCloud ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-700"
                  }`}
                >
                  {isCloud ? "Live PostgreSQL" : "Offline / Local"}
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                {isCloud
                  ? "All CMS updates sync automatically with your remote database & media bucket."
                  : "Changes persist in browser local storage. Connect Supabase to sync cloud-wide."}
              </p>
            </div>
          </div>

          <Button
            onClick={() => syncWithCloud()}
            disabled={isSyncing}
            className="h-9 px-4 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-sm shadow-xs gap-2 shrink-0"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? "animate-spin" : ""}`} />
            <span>{isSyncing ? "Syncing..." : "Sync Database Now"}</span>
          </Button>
        </div>
      </div>

      {/* Backup and Restore Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Export JSON */}
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-xs flex flex-col justify-between">
          <div className="space-y-2 mb-4">
            <div className="w-9 h-9 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center">
              <Download className="w-4 h-4" />
            </div>
            <h4 className="text-sm font-semibold text-slate-900">Export JSON Backup</h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              Download a complete snapshot of all stories, centers, events, team members, and settings.
            </p>
          </div>
          <Button
            onClick={handleExport}
            variant="outline"
            className="w-full h-9 rounded-lg border-slate-200 hover:bg-slate-50 text-xs font-medium text-slate-700 gap-1.5"
          >
            <Download className="w-3.5 h-3.5" />
            Download Snapshot
          </Button>
        </div>

        {/* Import JSON */}
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-xs flex flex-col justify-between">
          <div className="space-y-2 mb-4">
            <div className="w-9 h-9 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center">
              <Upload className="w-4 h-4" />
            </div>
            <h4 className="text-sm font-semibold text-slate-900">Restore from File</h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              Upload a previously downloaded JSON snapshot to replace current CMS data.
            </p>
          </div>
          <label className="w-full h-9 rounded-lg border border-slate-200 hover:bg-slate-50 text-xs font-medium text-slate-700 flex items-center justify-center gap-1.5 cursor-pointer">
            <Upload className="w-3.5 h-3.5" />
            <span>Select JSON File</span>
            <input
              type="file"
              accept=".json,application/json"
              onChange={handleImportFile}
              className="hidden"
            />
          </label>
        </div>

        {/* Reset to Default */}
        <div className="rounded-xl border border-red-200/80 bg-red-50/40 p-5 shadow-xs flex flex-col justify-between">
          <div className="space-y-2 mb-4">
            <div className="w-9 h-9 rounded-lg bg-red-100 text-red-700 flex items-center justify-center">
              <RotateCcw className="w-4 h-4" />
            </div>
            <h4 className="text-sm font-semibold text-red-950">Reset to Defaults</h4>
            <p className="text-xs text-red-700/80 leading-relaxed">
              Clear custom changes and restore all records to baseline foundation defaults.
            </p>
          </div>
          <Button
            onClick={() => {
              if (window.confirm("Are you sure? This will reset all records to the original initial seed data.")) {
                resetToDefaults();
              }
            }}
            variant="outline"
            className="w-full h-9 rounded-lg border-red-300 text-red-700 hover:bg-red-100 text-xs font-medium gap-1.5"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Reset All Data
          </Button>
        </div>
      </div>

      {/* Live Supabase Database Connection & Migration Box */}
      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-3">
          <div className="flex items-center gap-3">
            <div className={`w-9 h-9 rounded-lg flex items-center justify-center font-bold ${
              dbStatus === "connected" ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-700"
            }`}>
              <FileCode className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-semibold text-slate-900">
                  Supabase PostgreSQL Tables
                </h3>
                {dbStatus === "connected" ? (
                  <span className="px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800 text-[11px] font-medium flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
                    All 12 Tables Active
                  </span>
                ) : dbStatus === "checking" ? (
                  <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 text-[11px] font-medium">
                    Checking Schema...
                  </span>
                ) : (
                  <span className="px-2 py-0.5 rounded-md bg-amber-100 text-amber-800 text-[11px] font-medium flex items-center gap-1">
                    <AlertTriangle className="w-3 h-3 text-amber-600" />
                    Setup / SQL Run Needed
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Database schema contains stories, centers, events, team, reports, inquiries, gallery, and settings tables.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <Button
              variant="outline"
              size="sm"
              onClick={checkTables}
              className="h-8 px-2.5 rounded-lg border-slate-200 text-xs font-medium text-slate-700 gap-1.5"
            >
              <RefreshCw className="w-3 h-3 text-slate-500" />
              Check Status
            </Button>
            <Button
              variant="default"
              size="sm"
              onClick={handleCopySqlInstructions}
              className="h-8 px-3 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-medium gap-1.5 shadow-2xs"
            >
              {copiedSql ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              {copiedSql ? "SQL Script Copied!" : "Copy Full SQL Script"}
            </Button>
          </div>
        </div>

        {dbStatus !== "connected" && (
          <div className="p-4 rounded-lg bg-amber-50/70 border border-amber-200/80 space-y-3">
            <div className="flex items-start gap-2.5">
              <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-semibold text-amber-900">
                  Tables need to be created in your Supabase project
                </p>
                <p className="text-xs text-amber-800/90 mt-0.5 leading-relaxed">
                  Your project URL and API keys are verified, but the PostgreSQL tables have not been created yet in your Supabase dashboard.
                </p>
              </div>
            </div>

            <div className="bg-white p-3.5 rounded-lg border border-amber-200 text-xs text-slate-700 space-y-2">
              <p className="font-semibold text-slate-900 text-xs">Easy 2-Step Activation:</p>
              <ol className="list-decimal list-inside space-y-1 text-slate-600 text-xs pl-1">
                <li>
                  Click the <strong>"Copy Full SQL Script"</strong> button above (copies all 318 lines of <code className="bg-slate-100 px-1 py-0.5 rounded font-mono text-[11px]">supabase_schema.sql</code>).
                </li>
                <li>
                  Click the button below to open your Supabase SQL Editor, paste the code, and click <strong>"Run"</strong>.
                </li>
              </ol>
              <div className="pt-1">
                <a
                  href="https://supabase.com/dashboard/project/lkugausdmubnluspvpgr/sql"
                  target="_blank"
                  rel="noreferrer"
                  className="h-8 px-3 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-medium text-xs inline-flex items-center gap-1.5 transition-colors"
                >
                  <span>Open Supabase SQL Editor</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>
        )}

        {dbStatus === "connected" && (
          <div className="p-3.5 rounded-lg bg-emerald-50 border border-emerald-200/80 flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-medium text-emerald-900">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Native PostgreSQL tables active. Reads and writes sync with Supabase in real time.</span>
            </div>
            <a
              href="https://supabase.com/dashboard/project/lkugausdmubnluspvpgr/sql"
              target="_blank"
              rel="noreferrer"
              className="text-xs text-emerald-700 hover:text-emerald-900 font-medium inline-flex items-center gap-1"
            >
              SQL Editor
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        )}
      </div>
    </div>
  );
};
