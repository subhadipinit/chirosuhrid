import React, { useState } from "react";
import { useCMS, DynamicTestimonial } from "@/context/CMSContext";
import { Plus, Edit2, Trash2, Quote, Check } from "lucide-react";
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

export const TestimonialsTab: React.FC = () => {
  const { testimonials, addTestimonial, updateTestimonial, deleteTestimonial } = useCMS();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTestimonial, setEditingTestimonial] = useState<DynamicTestimonial | null>(null);

  // Form State
  const [quote, setQuote] = useState("");
  const [author, setAuthor] = useState("");
  const [role, setRole] = useState("");
  const [category, setCategory] = useState("Education");

  const handleOpenAddModal = () => {
    setEditingTestimonial(null);
    setQuote("");
    setAuthor("");
    setRole("");
    setCategory("Education");
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (t: DynamicTestimonial) => {
    setEditingTestimonial(t);
    setQuote(t.quote);
    setAuthor(t.author);
    setRole(t.role);
    setCategory(t.category || "Education");
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!quote.trim() || !author.trim()) {
      toast.error("Please fill in Quote and Author");
      return;
    }

    if (editingTestimonial) {
      await updateTestimonial(editingTestimonial.id, {
        quote: quote.trim(),
        author: author.trim(),
        role: role.trim(),
        category,
      });
    } else {
      await addTestimonial({
        quote: quote.trim(),
        author: author.trim(),
        role: role.trim(),
        category,
      });
    }
    setIsModalOpen(false);
  };

  const handleDelete = async (id: string, authorName: string) => {
    if (window.confirm(`Delete testimonial from "${authorName}"?`)) {
      await deleteTestimonial(id);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">Voices & Testimonials</h1>
          <p className="text-sm text-slate-500 mt-1">
            Manage authentic quotes from local teachers, village elders, grassroots leaders, and youth.
          </p>
        </div>

        <Button
          onClick={handleOpenAddModal}
          className="h-9 px-4 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-sm shadow-xs gap-2 shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Add Quote</span>
        </Button>
      </div>

      {/* Testimonials List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {testimonials.map((t) => (
          <div
            key={t.id}
            className="rounded-xl border border-slate-200 bg-white p-5 shadow-xs hover:border-slate-300 hover:shadow-sm transition-all flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Quote className="w-7 h-7 text-emerald-600/40" />
                {t.category && (
                  <span className="px-2 py-0.5 rounded-md text-xs font-medium bg-emerald-50 text-emerald-800 border border-emerald-200/60">
                    {t.category}
                  </span>
                )}
              </div>

              <p className="text-sm text-slate-700 italic leading-relaxed">
                "{t.quote}"
              </p>
            </div>

            <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-slate-900">{t.author}</p>
                <p className="text-xs text-slate-500 mt-0.5">{t.role}</p>
              </div>

              <div className="flex items-center gap-1">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleOpenEditModal(t)}
                  className="h-8 px-2.5 rounded-lg border-slate-200 bg-white hover:bg-slate-100 text-xs font-medium text-slate-700"
                  title="Edit"
                >
                  <Edit2 className="w-3 h-3" />
                </Button>
                <button
                  type="button"
                  onClick={() => handleDelete(t.id, t.author)}
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                  title="Delete"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Edit / Add Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-lg bg-white border border-slate-200 text-slate-900 rounded-2xl shadow-xl p-6">
          <DialogHeader>
            <DialogTitle className="text-lg font-semibold text-slate-900">
              {editingTestimonial ? "Edit Testimonial" : "Add Testimonial"}
            </DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSave} className="space-y-4 pt-2">
            <div>
              <Label className="text-xs font-medium text-slate-700 block mb-1.5">
                Quote Text <span className="text-red-500">*</span>
              </Label>
              <Textarea
                required
                rows={3}
                value={quote}
                onChange={(e) => setQuote(e.target.value)}
                placeholder="The coaching program transformed my confidence and learning..."
                className="rounded-lg border-slate-300 text-sm p-3 italic focus:border-emerald-500 focus:ring-emerald-500/20"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <Label className="text-xs font-medium text-slate-700 block mb-1.5">
                  Author Name <span className="text-red-500">*</span>
                </Label>
                <Input
                  required
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  placeholder="e.g. Anjali Verma"
                  className="h-10 px-3 rounded-lg border-slate-300 text-sm focus:border-emerald-500 focus:ring-emerald-500/20"
                />
              </div>

              <div>
                <Label className="text-xs font-medium text-slate-700 block mb-1.5">Category</Label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full h-10 px-3 rounded-lg border border-slate-300 bg-white text-sm text-slate-900 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                >
                  <option value="Education">Education</option>
                  <option value="Health">Health</option>
                  <option value="Livelihoods">Livelihoods</option>
                  <option value="Community">Community</option>
                  <option value="General">General</option>
                </select>
              </div>
            </div>

            <div>
              <Label className="text-xs font-medium text-slate-700 block mb-1.5">
                Role / Designation
              </Label>
              <Input
                value={role}
                onChange={(e) => setRole(e.target.value)}
                placeholder="e.g. Primary School Teacher, Paschim Medinipur"
                className="h-10 px-3 rounded-lg border-slate-300 text-sm focus:border-emerald-500 focus:ring-emerald-500/20"
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
                <span>{editingTestimonial ? "Save Changes" : "Save Quote"}</span>
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};
