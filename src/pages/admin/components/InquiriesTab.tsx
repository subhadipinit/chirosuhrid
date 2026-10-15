import React, { useState } from "react";
import { useCMS, Inquiry } from "@/context/CMSContext";
import {
  Inbox,
  Mail,
  Phone,
  Trash2,
  CheckCircle2,
  Clock,
  Eye,
  Filter,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

export const InquiriesTab: React.FC = () => {
  const { inquiries, updateInquiryStatus, deleteInquiry } = useCMS();

  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [activeInquiry, setActiveInquiry] = useState<Inquiry | null>(null);

  const filteredInquiries = inquiries.filter((inq) => {
    const matchesStatus = statusFilter === "all" || inq.status === statusFilter;
    const matchesType = typeFilter === "all" || inq.type === typeFilter;
    return matchesStatus && matchesType;
  });

  const handleDelete = async (id: string, name: string) => {
    if (window.confirm(`Delete inquiry from "${name}"?`)) {
      await deleteInquiry(id);
      if (activeInquiry?.id === id) setActiveInquiry(null);
    }
  };

  const newCount = inquiries.filter((i) => i.status === "new").length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">Inquiries & Applications</h1>
          <p className="text-sm text-slate-500 mt-1">
            Review incoming requests submitted from the Contact and Volunteer forms across the public site.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <span className="px-3 py-1 rounded-lg text-xs font-medium bg-slate-100 text-slate-700 border border-slate-200">
            Total: {inquiries.length}
          </span>
          {newCount > 0 && (
            <span className="px-3 py-1 rounded-lg text-xs font-medium bg-amber-50 text-amber-800 border border-amber-200 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
              {newCount} New
            </span>
          )}
        </div>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-wrap items-center gap-3 p-3 bg-white border border-slate-200 rounded-xl">
        <div className="flex items-center gap-1.5 text-xs font-medium text-slate-500 pl-1">
          <Filter className="w-3.5 h-3.5" />
          <span>Status:</span>
        </div>

        <div className="flex items-center gap-1.5">
          {["all", "new", "in_progress", "resolved"].map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`h-7 px-2.5 rounded-md text-xs font-medium capitalize transition-colors ${
                statusFilter === st
                  ? "bg-slate-900 text-white"
                  : "bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200"
              }`}
            >
              {st.replace("_", " ")}
            </button>
          ))}
        </div>

        <div className="h-4 w-px bg-slate-200 hidden sm:block" />

        <div className="flex items-center gap-1.5 text-xs font-medium text-slate-500 pl-1">
          <span>Type:</span>
        </div>

        <div className="flex items-center gap-1.5">
          {["all", "contact", "volunteer"].map((tp) => (
            <button
              key={tp}
              onClick={() => setTypeFilter(tp)}
              className={`h-7 px-2.5 rounded-md text-xs font-medium capitalize transition-colors ${
                typeFilter === tp
                  ? "bg-slate-900 text-white"
                  : "bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200"
              }`}
            >
              {tp}
            </button>
          ))}
        </div>
      </div>

      {/* Inquiries List */}
      <div className="space-y-3">
        {filteredInquiries.map((inq) => (
          <div
            key={inq.id}
            className="rounded-xl border border-slate-200 bg-white p-5 shadow-xs hover:border-slate-300 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4"
          >
            <div className="space-y-2 min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-sm font-semibold text-slate-900">
                  {inq.name}
                </span>

                <span
                  className={`text-[11px] font-medium px-2 py-0.5 rounded-md border capitalize ${
                    inq.status === "new"
                      ? "bg-amber-50 text-amber-800 border-amber-200"
                      : inq.status === "in_progress"
                      ? "bg-blue-50 text-blue-800 border-blue-200"
                      : "bg-emerald-50 text-emerald-800 border-emerald-200"
                  }`}
                >
                  {inq.status.replace("_", " ")}
                </span>

                <span className="px-2 py-0.5 rounded-md text-[11px] font-medium bg-slate-100 text-slate-600 capitalize">
                  {inq.type}
                </span>

                <span className="text-xs text-slate-400 flex items-center gap-1 ml-auto md:ml-2">
                  <Clock className="w-3 h-3" />
                  {new Date(inq.createdAt).toLocaleDateString()}
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-4 text-xs text-slate-600">
                {inq.email && (
                  <a
                    href={`mailto:${inq.email}`}
                    className="flex items-center gap-1.5 hover:text-emerald-600 transition-colors"
                  >
                    <Mail className="w-3.5 h-3.5 text-slate-400" />
                    <span>{inq.email}</span>
                  </a>
                )}
                {inq.phone && (
                  <a
                    href={`tel:${inq.phone}`}
                    className="flex items-center gap-1.5 hover:text-emerald-600 transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5 text-slate-400" />
                    <span>{inq.phone}</span>
                  </a>
                )}
              </div>

              {inq.message && (
                <p className="text-xs text-slate-600 line-clamp-2 bg-slate-50 p-2.5 rounded-lg border border-slate-100 leading-relaxed">
                  {inq.message}
                </p>
              )}
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setActiveInquiry(inq)}
                className="h-8 px-3 rounded-lg border-slate-200 hover:bg-slate-100 text-xs font-medium text-slate-700 gap-1.5"
              >
                <Eye className="w-3.5 h-3.5" />
                View Details
              </Button>

              {inq.status !== "resolved" && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => updateInquiryStatus(inq.id, "resolved")}
                  className="h-8 px-3 rounded-lg bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border-emerald-200 text-xs font-medium gap-1.5"
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Resolve
                </Button>
              )}

              <button
                type="button"
                onClick={() => handleDelete(inq.id, inq.name)}
                className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                title="Delete Inquiry"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredInquiries.length === 0 && (
        <div className="text-center py-16 border border-dashed border-slate-200 rounded-xl bg-white">
          <Inbox className="w-10 h-10 text-slate-300 mx-auto mb-2" />
          <p className="text-sm font-medium text-slate-700">No submissions found</p>
          <p className="text-xs text-slate-500 mt-1">
            Incoming contact messages and volunteer applications will be displayed here.
          </p>
        </div>
      )}

      {/* Detail Dialog */}
      <Dialog open={!!activeInquiry} onOpenChange={(open) => !open && setActiveInquiry(null)}>
        <DialogContent className="max-w-lg bg-white border border-slate-200 text-slate-900 rounded-2xl shadow-xl p-6">
          <DialogHeader>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2 py-0.5 rounded-md text-[11px] font-medium bg-slate-100 text-slate-600 capitalize">
                {activeInquiry?.type} Application
              </span>
            </div>
            <DialogTitle className="text-lg font-semibold text-slate-900">
              {activeInquiry?.name}
            </DialogTitle>
            <p className="text-xs text-slate-500">
              Received on {activeInquiry && new Date(activeInquiry.createdAt).toLocaleString()}
            </p>
          </DialogHeader>

          {activeInquiry && (
            <div className="space-y-4 py-2">
              <div className="grid grid-cols-2 gap-3 p-3 rounded-lg bg-slate-50 border border-slate-200/60 text-xs">
                <div>
                  <span className="text-slate-400 text-[11px] block">Email</span>
                  <span className="text-slate-900 font-medium">{activeInquiry.email || "N/A"}</span>
                </div>
                <div>
                  <span className="text-slate-400 text-[11px] block">Phone</span>
                  <span className="text-slate-900 font-medium">{activeInquiry.phone || "N/A"}</span>
                </div>
              </div>

              <div>
                <Label className="text-xs font-medium text-slate-700 block mb-1.5">
                  Message / Submission Details
                </Label>
                <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200/60 text-xs text-slate-800 leading-relaxed whitespace-pre-wrap">
                  {activeInquiry.message || "No message body provided."}
                </div>
              </div>

              {activeInquiry.data && Object.keys(activeInquiry.data).length > 0 && (
                <div>
                  <Label className="text-xs font-medium text-slate-700 block mb-1.5">
                    Additional Submitted Payload
                  </Label>
                  <pre className="p-3 rounded-lg bg-slate-50 border border-slate-200/60 text-xs font-mono text-slate-700 overflow-x-auto">
                    {JSON.stringify(activeInquiry.data, null, 2)}
                  </pre>
                </div>
              )}

              <DialogFooter className="pt-3 border-t border-slate-200 flex items-center justify-end gap-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setActiveInquiry(null)}
                  className="h-9 px-4 rounded-lg text-sm border-slate-200 text-slate-700 hover:bg-slate-100"
                >
                  Close
                </Button>
                {activeInquiry.status !== "resolved" && (
                  <Button
                    type="button"
                    onClick={() => {
                      updateInquiryStatus(activeInquiry.id, "resolved");
                      setActiveInquiry(null);
                    }}
                    className="h-9 px-4 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-medium gap-1.5"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    Mark as Resolved
                  </Button>
                )}
              </DialogFooter>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};
