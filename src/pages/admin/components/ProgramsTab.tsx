import React, { useState } from "react";
import { useCMS } from "@/context/CMSContext";
import { Program } from "@/data/programs";
import { uploadMediaToSupabase } from "@/lib/supabase";
import { Plus, Edit2, Trash2, GraduationCap, Check, UploadCloud } from "lucide-react";
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

export const ProgramsTab: React.FC = () => {
  const { programs, addProgram, updateProgram, deleteProgram } = useCMS();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProgram, setEditingProgram] = useState<Program | null>(null);

  // Form State
  const [title, setTitle] = useState("");
  const [label, setLabel] = useState("");
  const [metric, setMetric] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [href, setHref] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  const handleOpenAddModal = () => {
    setEditingProgram(null);
    setTitle("");
    setLabel("EDUCATION");
    setMetric("");
    setDescription("");
    setImage("https://images.unsplash.com/photo-1542810634-71277d95dcbb?q=80&w=1170&auto=format&fit=crop");
    setHref("/programs");
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (prog: Program) => {
    setEditingProgram(prog);
    setTitle(prog.title);
    setLabel(prog.label || "EDUCATION");
    setMetric(prog.metric || "");
    setDescription(prog.description);
    setImage(prog.image || "");
    setHref(prog.href || "/programs");
    setIsModalOpen(true);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    const uploadedUrl = await uploadMediaToSupabase(file);
    setIsUploading(false);

    if (uploadedUrl) {
      setImage(uploadedUrl);
      toast.success("Image uploaded successfully");
    } else {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === "string") {
          setImage(reader.result);
          toast.info("Image loaded locally");
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveProgram = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) {
      toast.error("Please provide Title and Description");
      return;
    }

    if (editingProgram && editingProgram.id) {
      await updateProgram(editingProgram.id, {
        title: title.trim(),
        label: label.trim(),
        metric: metric.trim(),
        description: description.trim(),
        image: image.trim(),
        href: href.trim(),
      });
    } else {
      await addProgram({
        title: title.trim(),
        label: label.trim(),
        metric: metric.trim(),
        description: description.trim(),
        image: image.trim(),
        href: href.trim(),
      });
    }
    setIsModalOpen(false);
  };

  const handleDelete = async (id: string, progTitle: string) => {
    if (window.confirm(`Delete program "${progTitle}"?`)) {
      await deleteProgram(id);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">Programs & Initiatives</h1>
          <p className="text-sm text-slate-500 mt-1">
            Configure flagship programs, student metrics, and community welfare descriptions.
          </p>
        </div>

        <Button
          onClick={handleOpenAddModal}
          className="h-9 px-4 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-sm shadow-xs gap-2 shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Add Program</span>
        </Button>
      </div>

      {/* Programs Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {programs.map((prog, idx) => (
          <div
            key={prog.id || `prog-${idx}`}
            className="rounded-xl border border-slate-200 bg-white shadow-xs hover:border-slate-300 hover:shadow-sm transition-all overflow-hidden flex flex-col justify-between"
          >
            <div>
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-100">
                {prog.image ? (
                  <img
                    src={prog.image}
                    alt={prog.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-slate-100 text-slate-400">
                    <GraduationCap className="w-12 h-12" />
                  </div>
                )}

                <div className="absolute top-3 left-3 flex items-center gap-1.5">
                  <span className="px-2.5 py-0.5 rounded-md text-xs font-medium bg-emerald-600 text-white shadow-xs">
                    {prog.label || "PROGRAM"}
                  </span>
                  {prog.metric && (
                    <span className="px-2.5 py-0.5 rounded-md text-xs font-medium bg-white/95 text-slate-800 shadow-xs backdrop-blur-xs">
                      {prog.metric}
                    </span>
                  )}
                </div>
              </div>

              <div className="p-5 space-y-2.5">
                <h3 className="text-base font-semibold text-slate-900 leading-snug">
                  {prog.title}
                </h3>
                <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                  {prog.description}
                </p>
                {prog.href && (
                  <span className="text-xs font-mono text-slate-400 block pt-1">
                    Link: {prog.href}
                  </span>
                )}
              </div>
            </div>

            <div className="p-3 px-5 bg-slate-50 border-t border-slate-100 flex items-center justify-end gap-1.5">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleOpenEditModal(prog)}
                className="h-8 px-2.5 rounded-lg border-slate-200 bg-white hover:bg-slate-100 text-xs font-medium text-slate-700 gap-1.5"
              >
                <Edit2 className="w-3 h-3" />
                Edit
              </Button>
              {prog.id && (
                <button
                  type="button"
                  onClick={() => handleDelete(prog.id!, prog.title)}
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                  title="Delete program"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Edit / Add Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-lg bg-white border border-slate-200 text-slate-900 rounded-2xl shadow-xl p-6 max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-lg font-semibold text-slate-900">
              {editingProgram ? "Edit Program Details" : "Add New Program"}
            </DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSaveProgram} className="space-y-4 pt-2">
            <div>
              <Label className="text-xs font-medium text-slate-700 block mb-1.5">
                Program Title <span className="text-red-500">*</span>
              </Label>
              <Input
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. SUGYAN - Rural Education"
                className="h-10 px-3 rounded-lg border-slate-300 text-sm focus:border-emerald-500 focus:ring-emerald-500/20"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <Label className="text-xs font-medium text-slate-700 block mb-1.5">Category Tag</Label>
                <Input
                  value={label}
                  onChange={(e) => setLabel(e.target.value)}
                  placeholder="EDUCATION"
                  className="h-10 px-3 rounded-lg border-slate-300 text-sm uppercase focus:border-emerald-500 focus:ring-emerald-500/20"
                />
              </div>

              <div>
                <Label className="text-xs font-medium text-slate-700 block mb-1.5">Impact Metric</Label>
                <Input
                  value={metric}
                  onChange={(e) => setMetric(e.target.value)}
                  placeholder="e.g. 350+ Students Supported"
                  className="h-10 px-3 rounded-lg border-slate-300 text-sm focus:border-emerald-500 focus:ring-emerald-500/20"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <Label className="text-xs font-medium text-slate-700">Cover Photo</Label>
                <label className="text-xs font-medium text-emerald-600 hover:text-emerald-700 cursor-pointer flex items-center gap-1">
                  <UploadCloud className="w-3.5 h-3.5" />
                  {isUploading ? "Uploading..." : "Upload photo"}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="hidden"
                    disabled={isUploading}
                  />
                </label>
              </div>
              <Input
                value={image}
                onChange={(e) => setImage(e.target.value)}
                placeholder="https://..."
                className="h-10 px-3 rounded-lg border-slate-300 text-sm font-mono text-xs focus:border-emerald-500 focus:ring-emerald-500/20"
              />
              {image && (
                <div className="mt-2 h-24 rounded-lg overflow-hidden bg-slate-100 border border-slate-200">
                  <img src={image} alt="Preview" className="w-full h-full object-cover" />
                </div>
              )}
            </div>

            <div>
              <Label className="text-xs font-medium text-slate-700 block mb-1.5">Target Link</Label>
              <Input
                value={href}
                onChange={(e) => setHref(e.target.value)}
                placeholder="/programs#sugyan"
                className="h-10 px-3 rounded-lg border-slate-300 text-sm font-mono text-xs focus:border-emerald-500 focus:ring-emerald-500/20"
              />
            </div>

            <div>
              <Label className="text-xs font-medium text-slate-700 block mb-1.5">
                Description <span className="text-red-500">*</span>
              </Label>
              <Textarea
                required
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Program mission, target communities, and core activities..."
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
                {editingProgram ? "Save Changes" : "Save Program"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};
