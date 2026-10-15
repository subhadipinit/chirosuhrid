import React, { useState } from "react";
import { useCMS } from "@/context/CMSContext";
import { GalleryImage } from "@/data/gallery";
import { uploadMediaToSupabase } from "@/lib/supabase";
import { Plus, Trash2, Edit2, UploadCloud, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { toast } from "sonner";

export const GalleryTab: React.FC = () => {
  const { gallery, addGalleryImage, updateGalleryImage, deleteGalleryImage } = useCMS();

  const [selectedCategory, setSelectedCategory] = useState("All");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  // Form State
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("SUGYAN");
  const [src, setSrc] = useState("");
  const [size, setSize] = useState<"small" | "medium" | "large">("medium");
  const [isUploading, setIsUploading] = useState(false);

  const categories = ["All", "SUGYAN", "SRICHARANESHU", "UNMESH", "SUHRID SWANIRBHAR"];

  const filteredGallery = gallery
    .map((img, index) => ({ img, originalIndex: index }))
    .filter(({ img }) => {
      if (selectedCategory === "All") return true;
      return img.category.toLowerCase() === selectedCategory.toLowerCase();
    });

  const handleOpenAddModal = () => {
    setEditingIndex(null);
    setTitle("");
    setCategory("SUGYAN");
    setSrc("");
    setSize("medium");
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (img: GalleryImage, originalIndex: number) => {
    setEditingIndex(originalIndex);
    setTitle(img.title);
    setCategory(img.category || "SUGYAN");
    setSrc(img.src);
    setSize(img.size || "medium");
    setIsModalOpen(true);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    const uploadedUrl = await uploadMediaToSupabase(file);
    setIsUploading(false);

    if (uploadedUrl) {
      setSrc(uploadedUrl);
      toast.success("Image uploaded successfully");
    } else {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === "string") {
          setSrc(reader.result);
          toast.info("Image loaded locally");
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveImage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!src.trim() || !title.trim()) {
      toast.error("Please provide an image and title");
      return;
    }

    if (editingIndex !== null) {
      await updateGalleryImage(editingIndex, {
        title: title.trim(),
        category,
        src: src.trim(),
        size,
      });
    } else {
      await addGalleryImage({
        title: title.trim(),
        category,
        src: src.trim(),
        size,
      });
    }
    setIsModalOpen(false);
  };

  const handleDelete = async (originalIndex: number, imgTitle: string) => {
    if (window.confirm(`Delete "${imgTitle}" from gallery?`)) {
      await deleteGalleryImage(originalIndex);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header and Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">Photo Gallery</h1>
          <p className="text-sm text-slate-500 mt-1">
            Manage fieldwork photos, medical camps, classrooms, and artisan workshops.
          </p>
        </div>

        <Button
          onClick={handleOpenAddModal}
          className="h-9 px-4 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-sm shadow-xs gap-2 shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Add Photo</span>
        </Button>
      </div>

      {/* Categories Filter Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors shrink-0 ${
              selectedCategory === cat
                ? "bg-slate-900 text-white"
                : "bg-white text-slate-600 hover:bg-slate-100 hover:text-slate-900 border border-slate-200"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {filteredGallery.map(({ img, originalIndex }) => (
          <div
            key={`${img.src}-${originalIndex}`}
            className="rounded-xl border border-slate-200 bg-white shadow-xs hover:border-slate-300 hover:shadow-sm transition-all overflow-hidden flex flex-col justify-between"
          >
            <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100">
              <img
                src={img.src}
                alt={img.title}
                className="w-full h-full object-cover"
              />
              <span className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-md text-[11px] font-medium bg-white/95 text-slate-800 shadow-xs backdrop-blur-xs">
                {img.category}
              </span>
            </div>

            <div className="p-3.5 space-y-2">
              <h4 className="text-sm font-semibold text-slate-900 truncate">
                {img.title}
              </h4>

              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-[11px] text-slate-400 capitalize">{img.size || "medium"}</span>

                <div className="flex items-center gap-1">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleOpenEditModal(img, originalIndex)}
                    className="h-7 px-2 rounded-md border-slate-200 bg-white hover:bg-slate-100 text-xs font-medium text-slate-700"
                  >
                    <Edit2 className="w-3 h-3" />
                  </Button>
                  <button
                    type="button"
                    onClick={() => handleDelete(originalIndex, img.title)}
                    className="w-7 h-7 rounded-md flex items-center justify-center text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                    title="Delete image"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredGallery.length === 0 && (
        <div className="text-center py-16 border border-dashed border-slate-200 rounded-xl bg-white">
          <p className="text-sm font-medium text-slate-700">No photos in this category</p>
          <Button
            onClick={() => setSelectedCategory("All")}
            variant="link"
            className="text-xs text-emerald-600 font-medium mt-2"
          >
            Show All Photos
          </Button>
        </div>
      )}

      {/* Photo Add / Edit Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-lg bg-white border border-slate-200 text-slate-900 rounded-2xl shadow-xl p-6 max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-lg font-semibold text-slate-900">
              {editingIndex !== null ? "Edit Photo Details" : "Add Photo"}
            </DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSaveImage} className="space-y-4 pt-2">
            <div>
              <Label className="text-xs font-medium text-slate-700 block mb-1.5">
                Photo Caption / Title <span className="text-red-500">*</span>
              </Label>
              <Input
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Free Eye Exam at Gopiballavpur"
                className="h-10 px-3 rounded-lg border-slate-300 text-sm focus:border-emerald-500 focus:ring-emerald-500/20"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <Label className="text-xs font-medium text-slate-700 block mb-1.5">Category</Label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full h-10 px-3 rounded-lg border border-slate-300 bg-white text-sm text-slate-900 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                >
                  <option value="SUGYAN">SUGYAN (Education)</option>
                  <option value="SRICHARANESHU">SRICHARANESHU (Health)</option>
                  <option value="UNMESH">UNMESH (Women & Youth)</option>
                  <option value="SUHRID SWANIRBHAR">SUHRID SWANIRBHAR (Livelihood)</option>
                </select>
              </div>

              <div>
                <Label className="text-xs font-medium text-slate-700 block mb-1.5">Grid Span</Label>
                <select
                  value={size}
                  onChange={(e) => setSize(e.target.value as "small" | "medium" | "large")}
                  className="w-full h-10 px-3 rounded-lg border border-slate-300 bg-white text-sm text-slate-900 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                >
                  <option value="small">Small</option>
                  <option value="medium">Medium</option>
                  <option value="large">Large</option>
                </select>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <Label className="text-xs font-medium text-slate-700">Image File / URL <span className="text-red-500">*</span></Label>
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
                required
                value={src}
                onChange={(e) => setSrc(e.target.value)}
                placeholder="https://..."
                className="h-10 px-3 rounded-lg border-slate-300 text-sm font-mono text-xs focus:border-emerald-500 focus:ring-emerald-500/20"
              />
              {src && (
                <div className="mt-2 h-28 rounded-lg overflow-hidden bg-slate-100 border border-slate-200">
                  <img src={src} alt="Preview" className="w-full h-full object-cover" />
                </div>
              )}
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
                {editingIndex !== null ? "Save Changes" : "Add to Gallery"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};
