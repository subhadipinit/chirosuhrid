import React, { useState } from "react";
import { useCMS, TransparencyReport } from "@/context/CMSContext";
import { uploadMediaToSupabase } from "@/lib/supabase";
import {
  FileText,
  Plus,
  Edit2,
  Trash2,
  Download,
  UploadCloud,
  Check,
  Calendar,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { toast } from "sonner";

export const ReportsTab: React.FC = () => {
  const { reports, addReport, updateReport, deleteReport } = useCMS();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingReport, setEditingReport] = useState<TransparencyReport | null>(null);

  // Form State
  const [title, setTitle] = useState("");
  const [year, setYear] = useState("2023-2024");
  const [category, setCategory] = useState<"Annual Impact" | "Financial Audit" | "Legal & 80G">("Annual Impact");
  const [fileUrl, setFileUrl] = useState("");
  const [fileSize, setFileSize] = useState("1.2 MB");
  const [description, setDescription] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  const handleOpenAddModal = () => {
    setEditingReport(null);
    setTitle("");
    setYear("2023-2024");
    setCategory("Annual Impact");
    setFileUrl("/suhrid-impact-report.xlsx");
    setFileSize("1.2 MB");
    setDescription("");
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (report: TransparencyReport) => {
    setEditingReport(report);
    setTitle(report.title);
    setYear(report.year);
    setCategory(report.category);
    setFileUrl(report.fileUrl);
    setFileSize(report.fileSize || "1.0 MB");
    setDescription(report.description || "");
    setIsModalOpen(true);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    const uploadedUrl = await uploadMediaToSupabase(file);
    setIsUploading(false);

    if (uploadedUrl) {
      setFileUrl(uploadedUrl);
      const sizeMb = (file.size / (1024 * 1024)).toFixed(1);
      setFileSize(`${sizeMb} MB`);
      toast.success("Document uploaded successfully");
    } else {
      setFileUrl(URL.createObjectURL(file));
      setFileSize(`${(file.size / 1024).toFixed(0)} KB`);
      toast.info("Document loaded locally");
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !fileUrl.trim()) {
      toast.error("Please provide Document Title and File URL");
      return;
    }

    if (editingReport) {
      await updateReport(editingReport.id, {
        title: title.trim(),
        year: year.trim(),
        category,
        fileUrl: fileUrl.trim(),
        fileSize: fileSize.trim(),
        description: description.trim(),
      });
    } else {
      await addReport({
        title: title.trim(),
        year: year.trim(),
        category,
        fileUrl: fileUrl.trim(),
        fileSize: fileSize.trim(),
        description: description.trim(),
      });
    }
    setIsModalOpen(false);
  };

  const handleDelete = async (id: string, reportTitle: string) => {
    if (window.confirm(`Are you sure you want to delete "${reportTitle}"?`)) {
      await deleteReport(id);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">Annual Reports & Audits</h1>
          <p className="text-sm text-slate-500 mt-1">
            Manage public downloadable impact reports, audited balance sheets, and 80G tax exemptions.
          </p>
        </div>

        <Button
          onClick={handleOpenAddModal}
          className="h-9 px-4 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-sm shadow-xs gap-2 shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Upload Report</span>
        </Button>
      </div>

      {/* Reports Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {reports.map((report) => (
          <div
            key={report.id}
            className="rounded-xl border border-slate-200 bg-white p-5 shadow-xs hover:border-slate-300 hover:shadow-sm transition-all flex flex-col justify-between"
          >
            <div>
              {/* Category & Year Tag */}
              <div className="flex items-center justify-between gap-2 mb-4">
                <span className="px-2 py-0.5 rounded-md text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200/60">
                  {report.category}
                </span>
                <span className="text-xs text-slate-500 font-medium flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-slate-400" />
                  {report.year}
                </span>
              </div>

              {/* Title & Description */}
              <div className="space-y-2 mb-4">
                <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center text-slate-700 mb-3">
                  <FileText className="w-5 h-5" />
                </div>
                <h3 className="text-base font-semibold text-slate-900 leading-snug">
                  {report.title}
                </h3>
                {report.description && (
                  <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                    {report.description}
                  </p>
                )}
              </div>
            </div>

            {/* Bottom File Actions */}
            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs text-slate-400 font-mono">
                {report.fileSize || "PDF"}
              </span>

              <div className="flex items-center gap-1.5">
                <a
                  href={report.fileUrl}
                  download
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 h-8 px-2.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-medium text-xs transition-colors"
                >
                  <Download className="w-3.5 h-3.5" />
                  Download
                </a>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleOpenEditModal(report)}
                  className="h-8 px-2.5 rounded-lg border-slate-200 bg-white hover:bg-slate-100 text-xs font-medium text-slate-700"
                  title="Edit details"
                >
                  <Edit2 className="w-3 h-3" />
                </Button>
                <button
                  type="button"
                  onClick={() => handleDelete(report.id, report.title)}
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                  title="Delete Report"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Upload / Edit Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-lg bg-white border border-slate-200 text-slate-900 rounded-2xl shadow-xl p-6 max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-lg font-semibold text-slate-900">
              {editingReport ? "Edit Document Details" : "Upload Compliance Report"}
            </DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSave} className="space-y-4 pt-2">
            <div>
              <Label className="text-xs font-medium text-slate-700 block mb-1.5">
                Document Title <span className="text-red-500">*</span>
              </Label>
              <Input
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Annual Activity Report 2023-24"
                className="h-10 px-3 rounded-lg border-slate-300 text-sm focus:border-emerald-500 focus:ring-emerald-500/20"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <Label className="text-xs font-medium text-slate-700 block mb-1.5">Financial Year</Label>
                <Input
                  required
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                  placeholder="2023-2024"
                  className="h-10 px-3 rounded-lg border-slate-300 text-sm focus:border-emerald-500 focus:ring-emerald-500/20"
                />
              </div>

              <div>
                <Label className="text-xs font-medium text-slate-700 block mb-1.5">Category</Label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as TransparencyReport["category"])}
                  className="w-full h-10 px-3 rounded-lg border border-slate-300 bg-white text-sm text-slate-900 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                >
                  <option value="Annual Impact">Annual Impact</option>
                  <option value="Financial Audit">Financial Audit</option>
                  <option value="Legal & 80G">Legal & 80G</option>
                </select>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <Label className="text-xs font-medium text-slate-700">Document URL / File</Label>
                <label className="text-xs font-medium text-emerald-600 hover:text-emerald-700 cursor-pointer flex items-center gap-1">
                  <UploadCloud className="w-3.5 h-3.5" />
                  {isUploading ? "Uploading..." : "Upload file (PDF/XLS)"}
                  <input
                    type="file"
                    accept=".pdf,.xlsx,.xls,.doc,.docx"
                    onChange={handleFileUpload}
                    className="hidden"
                    disabled={isUploading}
                  />
                </label>
              </div>
              <Input
                required
                value={fileUrl}
                onChange={(e) => setFileUrl(e.target.value)}
                placeholder="/suhrid-impact-report.xlsx or https://..."
                className="h-10 px-3 rounded-lg border-slate-300 text-sm font-mono text-xs focus:border-emerald-500 focus:ring-emerald-500/20"
              />
            </div>

            <div>
              <Label className="text-xs font-medium text-slate-700 block mb-1.5">File Size Display</Label>
              <Input
                value={fileSize}
                onChange={(e) => setFileSize(e.target.value)}
                placeholder="e.g. 1.2 MB"
                className="h-10 px-3 rounded-lg border-slate-300 text-sm focus:border-emerald-500 focus:ring-emerald-500/20"
              />
            </div>

            <div>
              <Label className="text-xs font-medium text-slate-700 block mb-1.5">Description (Optional)</Label>
              <Textarea
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Brief summary of audited disclosures or auditor sign-off..."
                className="rounded-lg border-slate-300 text-sm p-3 focus:border-emerald-500 focus:ring-emerald-500/20"
              />
            </div>

            <DialogFooter className="pt-3 border-t border-slate-200 gap-2 sm:gap-0">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsModalOpen(false)}
                className="h-9 px-4 rounded-lg text-sm border-slate-200 text-slate-700 hover:bg-slate-100"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="h-9 px-4 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-medium gap-1.5"
              >
                <Check className="w-4 h-4" />
                {editingReport ? "Save Changes" : "Save Report"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};
