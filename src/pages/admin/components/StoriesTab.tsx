import React, { useState } from "react";
import { useCMS } from "@/context/CMSContext";
import { Story } from "@/data/stories";
import { uploadMediaToSupabase } from "@/lib/supabase";
import {
  Plus,
  Search,
  Star,
  Edit2,
  Trash2,
  UploadCloud,
  Quote,
  Check,
  ImageIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { toast } from "sonner";

export const StoriesTab: React.FC = () => {
  const { stories, addStory, updateStory, deleteStory } = useCMS();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingStory, setEditingStory] = useState<Story | null>(null);

  // Form State
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Education");
  const [author, setAuthor] = useState("");
  const [role, setRole] = useState("");
  const [image, setImage] = useState("");
  const [quote, setQuote] = useState("");
  const [description, setDescription] = useState("");
  const [featured, setFeatured] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const categories = ["All", "Education", "Health", "Livelihoods", "Community"];

  const filteredStories = stories.filter((story) => {
    const matchesSearch =
      story.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      story.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
      story.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || story.category.toLowerCase() === selectedCategory.toLowerCase();
    return matchesSearch && matchesCategory;
  });

  const handleOpenCreateModal = () => {
    setEditingStory(null);
    setTitle("");
    setCategory("Education");
    setAuthor("");
    setRole("");
    setImage("https://images.unsplash.com/photo-1542810634-71277d95dcbb?q=80&w=1170&auto=format&fit=crop");
    setQuote("");
    setDescription("");
    setFeatured(false);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (story: Story) => {
    setEditingStory(story);
    setTitle(story.title);
    setCategory(story.category || "Education");
    setAuthor(story.author);
    setRole(story.role);
    setImage(story.image);
    setQuote(story.quote || "");
    setDescription(story.description);
    setFeatured(!!story.featured);
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

  const handleSaveStory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim() || !author.trim()) {
      toast.error("Please fill in Title, Description, and Author fields");
      return;
    }

    if (editingStory) {
      await updateStory(editingStory.id, {
        title: title.trim(),
        category,
        author: author.trim(),
        role: role.trim(),
        image: image.trim(),
        quote: quote.trim() || undefined,
        description: description.trim(),
        featured,
      });
    } else {
      await addStory({
        title: title.trim(),
        category,
        author: author.trim(),
        role: role.trim(),
        image: image.trim(),
        quote: quote.trim() || undefined,
        description: description.trim(),
        featured,
      });
    }
    setIsModalOpen(false);
  };

  const handleDelete = async (id: string, storyTitle: string) => {
    if (window.confirm(`Are you sure you want to delete "${storyTitle}"?`)) {
      await deleteStory(id);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header and Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">Stories & Narratives</h1>
          <p className="text-sm text-slate-500 mt-1">
            Manage authentic beneficiary journeys, testimonials, and case studies.
          </p>
        </div>

        <Button
          onClick={handleOpenCreateModal}
          className="h-9 px-4 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-sm shadow-xs gap-2 shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Add Story</span>
        </Button>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <Input
            placeholder="Search stories by title, author, or content..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="h-9 pl-9 pr-3 rounded-lg border-slate-300 bg-white text-sm text-slate-900 placeholder:text-slate-400 focus:border-emerald-500 focus:ring-emerald-500/20"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
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
      </div>

      {/* Stories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredStories.map((story) => (
          <div
            key={story.id}
            className="rounded-xl border border-slate-200 bg-white shadow-xs hover:border-slate-300 hover:shadow-sm transition-all overflow-hidden flex flex-col justify-between"
          >
            <div>
              {/* Cover Image */}
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-100">
                <img
                  src={story.image}
                  alt={story.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 left-3 flex items-center gap-1.5">
                  <span className="px-2.5 py-0.5 rounded-md text-xs font-medium bg-white/95 text-slate-800 shadow-xs backdrop-blur-xs">
                    {story.category}
                  </span>
                  {story.featured && (
                    <span className="px-2 py-0.5 rounded-md text-xs font-medium bg-amber-500 text-white flex items-center gap-1 shadow-xs">
                      <Star className="w-3 h-3 fill-current" />
                      Featured
                    </span>
                  )}
                </div>
              </div>

              {/* Story Details */}
              <div className="p-5 space-y-3">
                <h3 className="text-base font-semibold text-slate-900 leading-snug line-clamp-2">
                  {story.title}
                </h3>
                <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                  {story.description}
                </p>

                {story.quote && (
                  <div className="p-3 rounded-lg bg-slate-50 border border-slate-200/60 flex items-start gap-2.5">
                    <Quote className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <p className="text-xs text-slate-700 italic line-clamp-2">"{story.quote}"</p>
                  </div>
                )}

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                  <div>
                    <span className="font-semibold text-slate-900 block">{story.author}</span>
                    <span className="text-slate-500 text-[11px]">{story.role}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Bar */}
            <div className="p-3 px-5 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
              <button
                type="button"
                onClick={() => updateStory(story.id, { featured: !story.featured })}
                className={`text-xs font-medium flex items-center gap-1.5 transition-colors ${
                  story.featured ? "text-amber-600" : "text-slate-500 hover:text-slate-900"
                }`}
                title="Toggle featured status"
              >
                <Star className={`w-3.5 h-3.5 ${story.featured ? "fill-current" : ""}`} />
                <span>{story.featured ? "Featured" : "Feature"}</span>
              </button>

              <div className="flex items-center gap-1.5">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleOpenEditModal(story)}
                  className="h-8 px-2.5 rounded-lg border-slate-200 bg-white hover:bg-slate-100 text-xs font-medium text-slate-700 gap-1.5"
                >
                  <Edit2 className="w-3 h-3" />
                  Edit
                </Button>
                <button
                  type="button"
                  onClick={() => handleDelete(story.id, story.title)}
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                  title="Delete story"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredStories.length === 0 && (
        <div className="text-center py-16 border border-dashed border-slate-200 rounded-xl bg-white">
          <p className="text-sm font-medium text-slate-700">No stories found</p>
          <p className="text-xs text-slate-500 mt-1">Try modifying your search or filter criteria.</p>
          <Button
            onClick={() => {
              setSearchQuery("");
              setSelectedCategory("All");
            }}
            variant="link"
            className="text-xs text-emerald-600 font-medium mt-2"
          >
            Reset Filters
          </Button>
        </div>
      )}

      {/* Story Edit / Add Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-lg bg-white border border-slate-200 text-slate-900 rounded-2xl shadow-xl p-6 max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-lg font-semibold text-slate-900">
              {editingStory ? "Edit Story" : "Add New Story"}
            </DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSaveStory} className="space-y-4 pt-2">
            <div>
              <Label className="text-xs font-medium text-slate-700 block mb-1.5">
                Story Title <span className="text-red-500">*</span>
              </Label>
              <Input
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Breaking the Cycle: Priya's Journey"
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
                  <option value="Education">Education</option>
                  <option value="Health">Health</option>
                  <option value="Livelihoods">Livelihoods</option>
                  <option value="Community">Community</option>
                </select>
              </div>

              <div>
                <Label className="text-xs font-medium text-slate-700 block mb-1.5">Featured</Label>
                <div className="flex items-center justify-between h-10 px-3 rounded-lg border border-slate-300 bg-slate-50">
                  <span className="text-xs text-slate-700">Show on homepage</span>
                  <Switch checked={featured} onCheckedChange={setFeatured} />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <Label className="text-xs font-medium text-slate-700 block mb-1.5">
                  Author / Beneficiary <span className="text-red-500">*</span>
                </Label>
                <Input
                  required
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  placeholder="e.g. Priya Sharma"
                  className="h-10 px-3 rounded-lg border-slate-300 text-sm focus:border-emerald-500 focus:ring-emerald-500/20"
                />
              </div>

              <div>
                <Label className="text-xs font-medium text-slate-700 block mb-1.5">Role / Location</Label>
                <Input
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  placeholder="e.g. Primary Teacher, Paschim Medinipur"
                  className="h-10 px-3 rounded-lg border-slate-300 text-sm focus:border-emerald-500 focus:ring-emerald-500/20"
                />
              </div>
            </div>

            {/* Photo / Image */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <Label className="text-xs font-medium text-slate-700">Photo URL</Label>
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
              <Label className="text-xs font-medium text-slate-700 block mb-1.5">
                Key Quote (Optional)
              </Label>
              <Input
                value={quote}
                onChange={(e) => setQuote(e.target.value)}
                placeholder="e.g. Education gave me wings. Now I want to help others fly too."
                className="h-10 px-3 rounded-lg border-slate-300 text-sm italic focus:border-emerald-500 focus:ring-emerald-500/20"
              />
            </div>

            <div>
              <Label className="text-xs font-medium text-slate-700 block mb-1.5">
                Story Content <span className="text-red-500">*</span>
              </Label>
              <Textarea
                required
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Write the beneficiary's journey and community impact..."
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
                {editingStory ? "Save Changes" : "Publish Story"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};
