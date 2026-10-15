import React, { useState } from "react";
import { useCMS, DynamicImpactStat } from "@/context/CMSContext";
import { uploadMediaToSupabase } from "@/lib/supabase";
import { TrendingUp, Edit2, Check, UploadCloud, ArrowRight } from "lucide-react";
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

export interface StatsHeroTabProps {
  onNavigateHero?: () => void;
}

export const StatsHeroTab: React.FC<StatsHeroTabProps> = ({ onNavigateHero }) => {
  const { impactStats, updateImpactStat, homepageHero, updateHomepageHero } = useCMS();

  // Impact Stat Edit Modal
  const [editingStat, setEditingStat] = useState<DynamicImpactStat | null>(null);
  const [statValue, setStatValue] = useState("");
  const [statLabel, setStatLabel] = useState("");

  // Hero Slide Modal
  const [isSlideModalOpen, setIsSlideModalOpen] = useState(false);
  const [slideTitle, setSlideTitle] = useState("");
  const [slideHighlight, setSlideHighlight] = useState("");
  const [slideDescription, setSlideDescription] = useState("");
  const [slideImage, setSlideImage] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  // Impact Stat Handlers
  const handleOpenStatModal = (stat: DynamicImpactStat) => {
    setEditingStat(stat);
    setStatValue(stat.value);
    setStatLabel(stat.label);
  };

  const handleSaveStat = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingStat) return;
    await updateImpactStat(editingStat.id, {
      value: statValue.trim(),
      label: statLabel.trim(),
    });
    setEditingStat(null);
  };

  // Hero Slide Handlers
  const handleOpenEditSlideModal = () => {
    if (onNavigateHero) {
      onNavigateHero();
      return;
    }
    setSlideTitle(homepageHero.title);
    setSlideHighlight(homepageHero.highlightWord);
    setSlideDescription(homepageHero.description);
    setSlideImage(homepageHero.image);
    setIsSlideModalOpen(true);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    const uploadedUrl = await uploadMediaToSupabase(file);
    setIsUploading(false);

    if (uploadedUrl) {
      setSlideImage(uploadedUrl);
      toast.success("Image uploaded successfully");
    } else {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === "string") {
          setSlideImage(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveSlide = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!slideTitle.trim() || !slideDescription.trim() || !slideImage.trim()) {
      toast.error("Please fill in Title, Description, and Image");
      return;
    }

    await updateHomepageHero({
      title: slideTitle.trim(),
      highlightWord: slideHighlight.trim(),
      description: slideDescription.trim(),
      image: slideImage.trim(),
    });
    setIsSlideModalOpen(false);
  };

  return (
    <div className="space-y-8">
      {/* 1. Key Impact Statistics Section */}
      <section className="space-y-4">
        <div className="pb-4 border-b border-slate-200">
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">Impact Metrics & Counters</h1>
          <p className="text-sm text-slate-500 mt-1">
            Live metric figures displayed prominently across the homepage counter, impact report, and annual disclosures.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {impactStats.map((stat) => (
            <div
              key={stat.id}
              className="rounded-xl border border-slate-200 bg-white p-5 shadow-xs hover:border-slate-300 hover:shadow-sm transition-all flex flex-col justify-between"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold text-xs">
                  <TrendingUp className="w-4 h-4" />
                </div>
                <button
                  type="button"
                  onClick={() => handleOpenStatModal(stat)}
                  className="w-8 h-8 rounded-lg border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-600 flex items-center justify-center transition-colors"
                  title="Edit Stat"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                </button>
              </div>

              <div>
                <div className="text-2xl font-bold text-slate-900 tracking-tight">
                  {stat.value}
                </div>
                <div className="text-xs font-medium text-slate-500 mt-1 leading-snug">
                  {stat.label}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 2. Hero Banner Quick View */}
      <section className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
          <div>
            <h2 className="text-lg font-bold tracking-tight text-slate-900">
              Homepage Hero Showcase
            </h2>
            <p className="text-sm text-slate-500 mt-0.5">
              The primary split cover photo and headline on the website homepage.
            </p>
          </div>

          <Button
            onClick={handleOpenEditSlideModal}
            className="h-9 px-4 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-sm shadow-xs gap-2 shrink-0"
          >
            <Edit2 className="w-3.5 h-3.5" />
            <span>Edit Hero Content</span>
          </Button>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white shadow-xs overflow-hidden flex flex-col lg:flex-row">
          <div className="relative h-56 lg:h-auto lg:w-5/12 bg-slate-100 overflow-hidden shrink-0">
            <img
              src={homepageHero.image}
              alt={homepageHero.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-3 left-3">
              <span className="px-2.5 py-0.5 rounded-md text-xs font-medium bg-slate-900/80 text-white backdrop-blur-xs">
                Active Cover
              </span>
            </div>
          </div>

          <div className="p-6 lg:p-8 flex-1 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2 py-0.5 rounded-md text-xs font-medium bg-emerald-50 text-emerald-800 border border-emerald-200/60">
                  Homepage Section
                </span>
              </div>

              <h3 className="text-xl font-bold text-slate-900 leading-snug mb-2">
                {homepageHero.highlightWord && (
                  <span className="text-emerald-700">{homepageHero.highlightWord} </span>
                )}
                {homepageHero.title}
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed max-w-xl">
                {homepageHero.description}
              </p>
            </div>

            <div className="pt-5 mt-5 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs text-slate-500">
                Primary headline for all website visitors
              </span>

              <Button
                variant="outline"
                size="sm"
                onClick={handleOpenEditSlideModal}
                className="h-8 px-3 rounded-lg border-slate-200 text-xs font-medium text-slate-700 gap-1.5"
              >
                <span>Edit in Full Form</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Edit Stat Modal */}
      <Dialog open={!!editingStat} onOpenChange={(open) => !open && setEditingStat(null)}>
        <DialogContent className="max-w-md bg-white border border-slate-200 text-slate-900 rounded-2xl shadow-xl p-6">
          <DialogHeader>
            <DialogTitle className="text-lg font-semibold text-slate-900">
              Edit Metric Counter
            </DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSaveStat} className="space-y-4 pt-2">
            <div>
              <Label className="text-xs font-medium text-slate-700 block mb-1.5">
                Metric Value (e.g. 2,000+ or 15+) <span className="text-red-500">*</span>
              </Label>
              <Input
                required
                value={statValue}
                onChange={(e) => setStatValue(e.target.value)}
                placeholder="2,000+"
                className="h-10 px-3 rounded-lg border-slate-300 text-sm font-semibold focus:border-emerald-500 focus:ring-emerald-500/20"
              />
            </div>

            <div>
              <Label className="text-xs font-medium text-slate-700 block mb-1.5">
                Label / Description <span className="text-red-500">*</span>
              </Label>
              <Input
                required
                value={statLabel}
                onChange={(e) => setStatLabel(e.target.value)}
                placeholder="Youth Mentored & Educated"
                className="h-10 px-3 rounded-lg border-slate-300 text-sm focus:border-emerald-500 focus:ring-emerald-500/20"
              />
            </div>

            <DialogFooter className="pt-3 border-t border-slate-200 gap-2 sm:gap-0">
              <Button
                type="button"
                variant="outline"
                onClick={() => setEditingStat(null)}
                className="h-9 px-4 rounded-lg text-sm border-slate-200 text-slate-700 hover:bg-slate-100"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="h-9 px-4 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-medium gap-1.5"
              >
                <Check className="w-4 h-4" />
                Save Metric
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Hero Slide Modal */}
      <Dialog open={isSlideModalOpen} onOpenChange={setIsSlideModalOpen}>
        <DialogContent className="max-w-lg bg-white border border-slate-200 text-slate-900 rounded-2xl shadow-xl p-6">
          <DialogHeader>
            <DialogTitle className="text-lg font-semibold text-slate-900">
              Edit Homepage Hero Banner
            </DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSaveSlide} className="space-y-4 pt-2">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <Label className="text-xs font-medium text-emerald-800 block mb-1.5">Accent Word</Label>
                <Input
                  value={slideHighlight}
                  onChange={(e) => setSlideHighlight(e.target.value)}
                  placeholder="Intentional"
                  className="h-10 px-3 rounded-lg border-emerald-300 bg-emerald-50/50 text-sm font-semibold text-emerald-900 focus:border-emerald-500 focus:ring-emerald-500/20"
                />
              </div>

              <div className="sm:col-span-2">
                <Label className="text-xs font-medium text-slate-700 block mb-1.5">
                  Headline Remainder <span className="text-red-500">*</span>
                </Label>
                <Input
                  required
                  value={slideTitle}
                  onChange={(e) => setSlideTitle(e.target.value)}
                  placeholder="Living."
                  className="h-10 px-3 rounded-lg border-slate-300 text-sm font-semibold focus:border-emerald-500 focus:ring-emerald-500/20"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <Label className="text-xs font-medium text-slate-700">Cover Photo <span className="text-red-500">*</span></Label>
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
                value={slideImage}
                onChange={(e) => setSlideImage(e.target.value)}
                placeholder="https://..."
                className="h-10 px-3 rounded-lg border-slate-300 text-sm font-mono text-xs focus:border-emerald-500 focus:ring-emerald-500/20"
              />
              {slideImage && (
                <div className="mt-2 h-28 rounded-lg overflow-hidden bg-slate-100 border border-slate-200">
                  <img src={slideImage} alt="Preview" className="w-full h-full object-cover" />
                </div>
              )}
            </div>

            <div>
              <Label className="text-xs font-medium text-slate-700 block mb-1.5">
                Description / Mission Statement <span className="text-red-500">*</span>
              </Label>
              <Textarea
                required
                rows={3}
                value={slideDescription}
                onChange={(e) => setSlideDescription(e.target.value)}
                placeholder="Hero mission paragraph..."
                className="rounded-lg border-slate-300 text-sm p-3 focus:border-emerald-500 focus:ring-emerald-500/20"
              />
            </div>

            <DialogFooter className="pt-3 border-t border-slate-200 gap-2 sm:gap-0">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsSlideModalOpen(false)}
                className="h-9 px-4 rounded-lg text-sm border-slate-200 text-slate-700 hover:bg-slate-100"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="h-9 px-4 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-medium gap-1.5"
              >
                <Check className="w-4 h-4" />
                Save Changes
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};
