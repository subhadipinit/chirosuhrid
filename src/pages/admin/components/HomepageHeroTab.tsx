import React, { useState, useEffect } from "react";
import { useCMS, defaultHomepageHero, HomepageHero } from "@/context/CMSContext";
import { uploadMediaToSupabase } from "@/lib/supabase";
import {
  Save,
  UploadCloud,
  Check,
  RotateCcw,
  Eye,
  Image as ImageIcon,
  Type,
  Link2,
  ArrowUpRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Link } from "react-router-dom";

const PRESET_PHOTOS = [
  {
    name: "Rural Child (Default)",
    url: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=2070&auto=format&fit=crop",
  },
  {
    name: "Volunteer Teaching",
    url: "https://images.unsplash.com/photo-1577896851231-70ef18881754?q=80&w=2070&auto=format&fit=crop",
  },
  {
    name: "Healthcare Camp",
    url: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?q=80&w=2070&auto=format&fit=crop",
  },
  {
    name: "Community Gathering",
    url: "https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?q=80&w=2070&auto=format&fit=crop",
  },
];

export const HomepageHeroTab: React.FC = () => {
  const { homepageHero, updateHomepageHero } = useCMS();

  // Local form state
  const [formData, setFormData] = useState<HomepageHero>({ ...homepageHero });
  const [isUploading, setIsUploading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    setFormData({ ...homepageHero });
  }, [homepageHero]);

  const handleChange = (field: keyof HomepageHero, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    const uploadedUrl = await uploadMediaToSupabase(file);
    setIsUploading(false);

    if (uploadedUrl) {
      handleChange("image", uploadedUrl);
      toast.success("Image uploaded to Supabase storage!");
    } else {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === "string") {
          handleChange("image", reader.result);
          toast.success("Image loaded locally");
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.image.trim()) {
      toast.error("Please provide a photo URL or upload an image");
      return;
    }
    if (!formData.title.trim()) {
      toast.error("Please enter a headline title");
      return;
    }

    setIsSaving(true);
    await updateHomepageHero(formData);
    setIsSaving(false);
  };

  const handleResetToDefault = async () => {
    if (window.confirm("Reset homepage hero back to default?")) {
      setFormData({ ...defaultHomepageHero });
      await updateHomepageHero(defaultHomepageHero);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header and Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Homepage Hero</h2>
          <p className="text-sm text-slate-500 mt-1">
            Update the primary cover image, display headline, and call-to-action buttons.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link
            to="/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-700 hover:text-slate-900 bg-white border border-slate-200 px-3.5 py-2 rounded-lg transition-colors"
          >
            <Eye className="w-3.5 h-3.5 text-slate-400" />
            <span>View Live</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-slate-400" />
          </Link>

          <Button
            onClick={handleSave}
            disabled={isSaving}
            className="h-9 px-4 rounded-lg bg-primary hover:bg-primary-dark text-white font-medium text-xs gap-1.5 shadow-xs"
          >
            {isSaving ? (
              <span>Saving...</span>
            ) : (
              <>
                <Save className="w-3.5 h-3.5" />
                <span>Save Changes</span>
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Main Grid: Form Editor & Preview */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
        {/* Editor Form (7 columns) */}
        <form onSubmit={handleSave} className="xl:col-span-7 space-y-5">
          {/* 1. Photo Selection */}
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-4">
            <div className="flex items-center gap-2.5 pb-3 border-b border-slate-100">
              <ImageIcon className="w-4 h-4 text-primary" />
              <div>
                <h3 className="text-sm font-semibold text-slate-900">Cover Photograph</h3>
                <p className="text-xs text-slate-500">The feature image displayed on the homepage</p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <Label className="text-xs font-medium text-slate-700">Image URL or File Upload *</Label>
                  <label className="text-xs font-medium text-primary hover:text-primary-dark cursor-pointer flex items-center gap-1">
                    <UploadCloud className="w-3.5 h-3.5" />
                    <span>{isUploading ? "Uploading..." : "Upload from device"}</span>
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
                  value={formData.image}
                  onChange={(e) => handleChange("image", e.target.value)}
                  placeholder="https://images.unsplash.com/..."
                  className="h-10 text-xs font-mono rounded-lg border-slate-300"
                />
              </div>

              {/* Presets */}
              <div>
                <span className="text-xs font-medium text-slate-500 block mb-2">Preset Options:</span>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {PRESET_PHOTOS.map((preset) => (
                    <button
                      key={preset.name}
                      type="button"
                      onClick={() => handleChange("image", preset.url)}
                      className={`p-2 rounded-lg border text-left transition-all ${
                        formData.image === preset.url
                          ? "border-primary bg-primary/5 ring-1 ring-primary"
                          : "border-slate-200 hover:border-slate-300 bg-slate-50"
                      }`}
                    >
                      <div className="h-14 rounded-md overflow-hidden mb-1.5 bg-slate-200">
                        <img src={preset.url} alt={preset.name} className="w-full h-full object-cover" />
                      </div>
                      <span className="text-[11px] font-medium text-slate-700 block truncate">
                        {preset.name}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* 2. Headline & Narrative */}
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-4">
            <div className="flex items-center gap-2.5 pb-3 border-b border-slate-100">
              <Type className="w-4 h-4 text-primary" />
              <div>
                <h3 className="text-sm font-semibold text-slate-900">Headline & Description</h3>
                <p className="text-xs text-slate-500">The primary display title and opening summary</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <Label className="text-xs font-medium text-slate-700 mb-1.5 block">
                    Accent Word <span className="text-emerald-600 font-bold">(Emerald)</span>
                  </Label>
                  <Input
                    value={formData.highlightWord}
                    onChange={(e) => handleChange("highlightWord", e.target.value)}
                    placeholder="e.g. Intentional"
                    className="h-10 text-xs font-medium rounded-lg border-emerald-300 bg-emerald-50/50 text-emerald-800"
                  />
                </div>

                <div className="sm:col-span-2">
                  <Label className="text-xs font-medium text-slate-700 mb-1.5 block">
                    Headline Title *
                  </Label>
                  <Input
                    required
                    value={formData.title}
                    onChange={(e) => handleChange("title", e.target.value)}
                    placeholder="e.g. Living. or Transformation."
                    className="h-10 text-xs font-medium rounded-lg border-slate-300"
                  />
                </div>
              </div>

              <div>
                <Label className="text-xs font-medium text-slate-700 mb-1.5 block">
                  Mission Statement Description *
                </Label>
                <Textarea
                  required
                  rows={3}
                  value={formData.description}
                  onChange={(e) => handleChange("description", e.target.value)}
                  placeholder="Describe your organization's mission and philosophy..."
                  className="p-3 rounded-lg border-slate-300 text-xs resize-none"
                />
              </div>
            </div>
          </div>

          {/* 3. Call-to-Action Buttons */}
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-4">
            <div className="flex items-center gap-2.5 pb-3 border-b border-slate-100">
              <Link2 className="w-4 h-4 text-primary" />
              <div>
                <h3 className="text-sm font-semibold text-slate-900">Action Buttons</h3>
                <p className="text-xs text-slate-500">Links displayed below the headline description</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Primary */}
              <div className="p-4 rounded-lg bg-slate-50 border border-slate-200 space-y-3">
                <span className="text-xs font-semibold text-emerald-700 block">Primary Button (Solid)</span>
                <div>
                  <Label className="text-[11px] text-slate-600 mb-1 block">Label</Label>
                  <Input
                    value={formData.primaryActionText}
                    onChange={(e) => handleChange("primaryActionText", e.target.value)}
                    placeholder="Join the Movement"
                    className="h-9 text-xs rounded-md border-slate-300 bg-white"
                  />
                </div>
                <div>
                  <Label className="text-[11px] text-slate-600 mb-1 block">Link URL</Label>
                  <Input
                    value={formData.primaryActionHref}
                    onChange={(e) => handleChange("primaryActionHref", e.target.value)}
                    placeholder="/volunteer"
                    className="h-9 text-xs font-mono rounded-md border-slate-300 bg-white"
                  />
                </div>
              </div>

              {/* Secondary */}
              <div className="p-4 rounded-lg bg-slate-50 border border-slate-200 space-y-3">
                <span className="text-xs font-semibold text-slate-700 block">Secondary Button (Outline)</span>
                <div>
                  <Label className="text-[11px] text-slate-600 mb-1 block">Label</Label>
                  <Input
                    value={formData.secondaryActionText}
                    onChange={(e) => handleChange("secondaryActionText", e.target.value)}
                    placeholder="Learn Our Story"
                    className="h-9 text-xs rounded-md border-slate-300 bg-white"
                  />
                </div>
                <div>
                  <Label className="text-[11px] text-slate-600 mb-1 block">Link URL</Label>
                  <Input
                    value={formData.secondaryActionHref}
                    onChange={(e) => handleChange("secondaryActionHref", e.target.value)}
                    placeholder="/about"
                    className="h-9 text-xs font-mono rounded-md border-slate-300 bg-white"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex items-center justify-between pt-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handleResetToDefault}
              className="h-9 rounded-lg text-xs text-slate-600 gap-1.5 border-slate-200"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Defaults</span>
            </Button>

            <Button
              type="submit"
              disabled={isSaving}
              className="h-9 px-5 rounded-lg bg-primary hover:bg-primary-dark text-white font-medium text-xs gap-1.5 shadow-xs"
            >
              <Check className="w-3.5 h-3.5" />
              <span>{isSaving ? "Saving..." : "Save Changes"}</span>
            </Button>
          </div>
        </form>

        {/* Live Preview (5 columns) */}
        <div className="xl:col-span-5 sticky top-24">
          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <span className="text-xs font-semibold text-slate-900">Live Preview</span>
              <span className="text-[10px] font-semibold uppercase px-2 py-0.5 rounded bg-slate-100 text-slate-600">
                Split Layout
              </span>
            </div>

            <div className="space-y-4">
              {/* Photo */}
              <div className="relative aspect-[4/3] rounded-lg overflow-hidden bg-slate-100 border border-slate-200">
                <img
                  src={formData.image || defaultHomepageHero.image}
                  alt="Hero Preview"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Text */}
              <div className="space-y-2">
                <h3 className="text-2xl font-black text-slate-900 tracking-tight leading-tight">
                  {formData.highlightWord && (
                    <span className="text-primary-dark">{formData.highlightWord} </span>
                  )}
                  {formData.title || "Living."}
                </h3>

                <p className="text-xs text-slate-600 leading-relaxed">
                  {formData.description || "A group of young people who believe in sharing happiness with others."}
                </p>

                {/* Buttons */}
                <div className="pt-2 flex flex-wrap gap-2">
                  <span className="px-4 py-2 rounded-full bg-primary text-white text-[10px] font-bold uppercase tracking-wider">
                    {formData.primaryActionText || "Join the Movement"}
                  </span>
                  <span className="px-4 py-2 rounded-full border border-slate-300 text-slate-700 text-[10px] font-bold uppercase tracking-wider">
                    {formData.secondaryActionText || "Learn Our Story"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
