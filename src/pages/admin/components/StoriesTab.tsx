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
  AlertTriangle,
  RotateCcw,
  BookOpen,
  Sparkles,
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

const DEMO_STORY_IDS = ["priya-journey", "lakshmi-relief", "ramesh-entrepreneur", "digital-literacy"];

export const StoriesTab: React.FC = () => {
  const { stories, addStory, updateStory, deleteStory, clearAllDemoStories, restoreDemoStories } = useCMS();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingStory, setEditingStory] = useState<Story | null>(null);

  // Deletion Modal States (replaces unreliable window.confirm)
  const [storyToDelete, setStoryToDelete] = useState<Story | null>(null);
  const [showClearDemoModal, setShowClearDemoModal] = useState(false);

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

  const hasDemoStories = stories.some((s) => DEMO_STORY_IDS.includes(s.id));
  const demoStoriesCount = stories.filter((s) => DEMO_STORY_IDS.includes(s.id)).length;

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

  const handleConfirmDelete = async () => {
    if (!storyToDelete) return;
    await deleteStory(storyToDelete.id);
    setStoryToDelete(null);
  };

  return (
    <div className="space-y-6">
      {/* Header and Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold tracking-tight text-slate-900">Stories & Narratives</h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-100 text-slate-700 border border-slate-200">
              Total: {stories.length}
            </span>
          </div>
          <p className="text-sm text-slate-500 mt-1">
            Manage authentic beneficiary journeys, testimonials, and case studies published on the public website.
          </p>
        </div>

        <div className="flex items-center gap-2.5 shrink-0 flex-wrap">
          {hasDemoStories && (
            <Button
              variant="outline"
              onClick={() => setShowClearDemoModal(true)}
              className="h-9 px-3.5 rounded-lg border-red-200 text-red-700 bg-red-50/70 hover:bg-red-100 text-xs font-semibold gap-1.5 shadow-xs transition-colors"
              title="Delete all 4 initial sample placeholder stories"
            >
              <Trash2 className="w-3.5 h-3.5 text-red-600" />
              <span>Delete {demoStoriesCount} Demo {demoStoriesCount === 1 ? "Story" : "Stories"}</span>
            </Button>
          )}

          <Button
            onClick={handleOpenCreateModal}
            className="h-9 px-4 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs shadow-xs gap-1.5 shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span>Add Story</span>
          </Button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <Input
            placeholder="Search stories by title, author, or content..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="h-9 pl-9 pr-3 rounded-lg border-slate-300 bg-white text-xs text-slate-900 placeholder:text-slate-400 focus:border-emerald-500 focus:ring-emerald-500/20"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors shrink-0 ${
                selectedCategory === cat
                  ? "bg-slate-900 text-white shadow-xs"
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
        {filteredStories.map((story) => {
          const isDemo = DEMO_STORY_IDS.includes(story.id);
          return (
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
                  <div className="absolute top-3 left-3 flex items-center gap-1.5 flex-wrap">
                    <span className="px-2.5 py-0.5 rounded-md text-xs font-medium bg-white/95 text-slate-800 shadow-xs backdrop-blur-xs">
                      {story.category}
                    </span>
                    {story.featured && (
                      <span className="px-2 py-0.5 rounded-md text-xs font-medium bg-amber-500 text-white flex items-center gap-1 shadow-xs">
                        <Star className="w-3 h-3 fill-current" />
                        Featured
                      </span>
                    )}
                    {isDemo && (
                      <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-amber-100/90 text-amber-900 border border-amber-300 shadow-xs">
                        Demo Story
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
                    story.featured ? "text-amber-600 font-semibold" : "text-slate-500 hover:text-slate-900"
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
                    onClick={() => setStoryToDelete(story)}
                    className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-red-600 hover:bg-red-50 border border-transparent hover:border-red-100 transition-colors"
                    title="Delete story"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Empty State */}
      {filteredStories.length === 0 && (
        <div className="text-center py-16 border border-dashed border-slate-200 rounded-2xl bg-white p-8">
          {stories.length === 0 ? (
            <div className="max-w-md mx-auto space-y-3">
              <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-3">
                <BookOpen className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-slate-900">No Stories Published Yet</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                All placeholder demo stories have been cleared. You now have a clean slate to publish authentic stories from your centers and field visits.
              </p>
              <div className="flex items-center justify-center gap-3 pt-3">
                <Button
                  onClick={handleOpenCreateModal}
                  className="h-9 px-4 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold gap-1.5 shadow-xs"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Publish New Story</span>
                </Button>
                <Button
                  variant="outline"
                  onClick={restoreDemoStories}
                  className="h-9 px-4 rounded-lg border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-semibold gap-1.5"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Restore Demo Stories</span>
                </Button>
              </div>
            </div>
          ) : (
            <div>
              <p className="text-sm font-medium text-slate-700">No stories match your filter criteria</p>
              <p className="text-xs text-slate-500 mt-1">Try modifying your search query or category filter.</p>
              <Button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("All");
                }}
                variant="link"
                className="text-xs text-emerald-600 font-semibold mt-2"
              >
                Reset Filters
              </Button>
            </div>
          )}
        </div>
      )}

      {/* Delete Single Story Confirmation Dialog */}
      <Dialog open={!!storyToDelete} onOpenChange={(open) => !open && setStoryToDelete(null)}>
        <DialogContent className="max-w-md bg-white border border-slate-200 text-slate-900 rounded-2xl shadow-2xl p-6">
          <DialogHeader>
            <div className="w-10 h-10 rounded-full bg-red-50 text-red-600 flex items-center justify-center mb-2">
              <Trash2 className="w-5 h-5" />
            </div>
            <DialogTitle className="text-lg font-bold text-slate-900">
              Delete Story?
            </DialogTitle>
            <div className="text-xs text-slate-500 space-y-2 mt-1">
              <p>
                Are you sure you want to permanently delete:
              </p>
              <p className="p-2.5 rounded-lg bg-slate-50 border border-slate-200/80 font-semibold text-slate-800 text-xs">
                "{storyToDelete?.title}"
              </p>
              {DEMO_STORY_IDS.includes(storyToDelete?.id || "") && (
                <p className="text-amber-700 bg-amber-50 p-2 rounded-md border border-amber-200 text-[11px] font-medium">
                  This demo story will be permanently removed from cloud database and will not reappear on refresh.
                </p>
              )}
            </div>
          </DialogHeader>

          <DialogFooter className="mt-4 flex items-center justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setStoryToDelete(null)}
              className="h-9 px-4 rounded-lg text-xs font-semibold border-slate-200"
            >
              Cancel
            </Button>
            <Button
              type="button"
              onClick={handleConfirmDelete}
              className="h-9 px-4 rounded-lg bg-red-600 hover:bg-red-700 text-white text-xs font-semibold gap-1.5 shadow-xs"
            >
              <Trash2 className="w-3.5 h-3.5" />
              Delete Story
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Clear All Demo Stories Confirmation Dialog */}
      <Dialog open={showClearDemoModal} onOpenChange={setShowClearDemoModal}>
        <DialogContent className="max-w-md bg-white border border-slate-200 text-slate-900 rounded-2xl shadow-2xl p-6">
          <DialogHeader>
            <div className="w-10 h-10 rounded-full bg-red-50 text-red-600 flex items-center justify-center mb-2">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <DialogTitle className="text-lg font-bold text-slate-900">
              Delete All Demo Stories?
            </DialogTitle>
            <div className="text-xs text-slate-500 space-y-2 mt-1 leading-relaxed">
              <p>
                This will delete all <strong>{demoStoriesCount} placeholder demo stories</strong> (Priya, Lakshmi, Ramesh, and Anoop).
              </p>
              <p className="text-slate-600 bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                Your database and public site will be left clean, showing only real stories you publish. You can restore sample stories later from Settings if needed.
              </p>
            </div>
          </DialogHeader>

          <DialogFooter className="mt-4 flex items-center justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setShowClearDemoModal(false)}
              className="h-9 px-4 rounded-lg text-xs font-semibold border-slate-200"
            >
              Cancel
            </Button>
            <Button
              type="button"
              onClick={async () => {
                await clearAllDemoStories();
                setShowClearDemoModal(false);
              }}
              className="h-9 px-4 rounded-lg bg-red-600 hover:bg-red-700 text-white text-xs font-semibold gap-1.5 shadow-xs"
            >
              <Trash2 className="w-3.5 h-3.5" />
              Delete All Demo Stories
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

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
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Breaking the Cycle: Priya's Journey"
                className="h-9 text-xs"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-xs font-medium text-slate-700 block mb-1.5">Category</Label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full h-9 rounded-md border border-input bg-background px-3 py-1 text-xs shadow-xs focus:ring-1 focus:ring-emerald-500"
                >
                  <option value="Education">Education</option>
                  <option value="Health">Health</option>
                  <option value="Livelihoods">Livelihoods</option>
                  <option value="Community">Community</option>
                </select>
              </div>

              <div>
                <Label className="text-xs font-medium text-slate-700 block mb-1.5">
                  Beneficiary / Author <span className="text-red-500">*</span>
                </Label>
                <Input
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  placeholder="e.g. Priya Sharma"
                  className="h-9 text-xs"
                  required
                />
              </div>
            </div>

            <div>
              <Label className="text-xs font-medium text-slate-700 block mb-1.5">Role / Location</Label>
              <Input
                value={role}
                onChange={(e) => setRole(e.target.value)}
                placeholder="e.g. Primary School Teacher, Medinipur"
                className="h-9 text-xs"
              />
            </div>

            {/* Image Upload / URL */}
            <div className="space-y-2">
              <Label className="text-xs font-medium text-slate-700 block">Cover Photo</Label>
              <div className="flex gap-2">
                <Input
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                  placeholder="Image URL or upload from device"
                  className="h-9 text-xs flex-1"
                />
                <label className="h-9 px-3 rounded-lg border border-slate-300 hover:bg-slate-50 text-xs font-medium text-slate-700 flex items-center gap-1.5 cursor-pointer shrink-0">
                  <UploadCloud className={`w-3.5 h-3.5 ${isUploading ? "animate-spin" : ""}`} />
                  <span>{isUploading ? "Uploading..." : "Upload"}</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="hidden"
                    disabled={isUploading}
                  />
                </label>
              </div>
              {image && (
                <div className="relative aspect-[16/9] w-full rounded-lg overflow-hidden border border-slate-200 bg-slate-50">
                  <img src={image} alt="Preview" className="w-full h-full object-cover" />
                </div>
              )}
            </div>

            <div>
              <Label className="text-xs font-medium text-slate-700 block mb-1.5">Key Quote (Optional)</Label>
              <Input
                value={quote}
                onChange={(e) => setQuote(e.target.value)}
                placeholder="Memorable takeaway statement from the beneficiary"
                className="h-9 text-xs"
              />
            </div>

            <div>
              <Label className="text-xs font-medium text-slate-700 block mb-1.5">
                Story Body / Description <span className="text-red-500">*</span>
              </Label>
              <Textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe the full story, background, and transformation..."
                rows={4}
                className="text-xs"
                required
              />
            </div>

            <div className="flex items-center justify-between p-3 rounded-lg bg-slate-50 border border-slate-200">
              <div>
                <Label htmlFor="featured-toggle" className="text-xs font-medium text-slate-900 block cursor-pointer">
                  Feature on Homepage
                </Label>
                <span className="text-[11px] text-slate-500 block">
                  Prominently spotlight this story on the home screen
                </span>
              </div>
              <Switch
                id="featured-toggle"
                checked={featured}
                onCheckedChange={setFeatured}
              />
            </div>

            <DialogFooter className="pt-3 border-t border-slate-200 flex items-center justify-end gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsModalOpen(false)}
                className="h-9 px-4 rounded-lg text-xs font-semibold border-slate-200 text-slate-700 hover:bg-slate-100"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="h-9 px-4 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold gap-1.5 shadow-xs"
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
