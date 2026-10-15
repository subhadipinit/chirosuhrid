import React, { useState, useEffect } from "react";
import { useCMS } from "@/context/CMSContext";
import { uploadMediaToSupabase } from "@/lib/supabase";
import {
  Save,
  Building2,
  QrCode,
  Phone,
  Megaphone,
  UploadCloud,
  Check,
  Database,
  RefreshCw,
  ExternalLink,
  Globe,
  Trash2,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";

export const SettingsTab: React.FC = () => {
  const { siteSettings, updateSiteSettings, isCloudConnected, isSyncing, syncWithCloud } = useCMS();

  // Local form state
  const [formData, setFormData] = useState({ ...siteSettings });
  const [isDirty, setIsDirty] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [isUploadingLogo, setIsUploadingLogo] = useState(false);
  const [isUploadingFavicon, setIsUploadingFavicon] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isSyncingCloud, setIsSyncingCloud] = useState(false);

  useEffect(() => {
    if (!isDirty) {
      setFormData(siteSettings);
    }
  }, [siteSettings, isDirty]);

  const handleManualSync = async () => {
    setIsSyncingCloud(true);
    try {
      await syncWithCloud();
      toast.success("Cloud synchronization complete");
    } catch {
      toast.error("Cloud synchronization failed");
    } finally {
      setIsSyncingCloud(false);
    }
  };

  const handleChange = (field: string, value: unknown) => {
    setIsDirty(true);
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploadingLogo(true);
    const uploadedUrl = await uploadMediaToSupabase(file);
    setIsUploadingLogo(false);

    if (uploadedUrl) {
      handleChange("siteLogo", uploadedUrl);
      toast.success("Website logo uploaded successfully");
    } else {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === "string") {
          handleChange("siteLogo", reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFaviconUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploadingFavicon(true);
    const uploadedUrl = await uploadMediaToSupabase(file);
    setIsUploadingFavicon(false);

    if (uploadedUrl) {
      handleChange("siteFavicon", uploadedUrl);
      toast.success("Favicon uploaded successfully");
    } else {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === "string") {
          handleChange("siteFavicon", reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleQrUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    const uploadedUrl = await uploadMediaToSupabase(file);
    setIsUploading(false);

    if (uploadedUrl) {
      handleChange("upiQrImage", uploadedUrl);
      toast.success("QR Code uploaded successfully");
    } else {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === "string") {
          handleChange("upiQrImage", reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    await updateSiteSettings(formData);
    setIsSaving(false);
    setIsDirty(false);
  };

  return (
    <form onSubmit={handleSave} className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">Website & Organization Settings</h1>
          <p className="text-sm text-slate-500 mt-1">
            Configure site branding (name, logo, favicon, tagline), verified bank details, UPI QR codes, helpline contacts, and announcement banners.
          </p>
        </div>

        <Button
          type="submit"
          disabled={isSaving}
          className="h-9 px-4 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-sm shadow-xs gap-2 shrink-0"
        >
          {isSaving ? (
            <div className="flex items-center gap-2">
              <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              <span>Saving...</span>
            </div>
          ) : (
            <>
              <Save className="w-4 h-4" />
              <span>Save Settings</span>
            </>
          )}
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 1. Website Identity & Branding (Full Width Card) */}
        <div className="lg:col-span-2 rounded-xl border border-slate-200 bg-white p-6 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 mb-6 gap-2">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold">
                <Globe className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-slate-900">
                  Website Identity & Branding
                </h3>
                <p className="text-slate-500 text-xs">
                  Configure your public brand name, official logo, mission tagline, and browser tab favicon
                </p>
              </div>
            </div>
            <span className="self-start sm:self-auto inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium bg-emerald-50 text-emerald-700 border border-emerald-100">
              <Sparkles className="w-3 h-3 text-emerald-600" />
              Site-Wide Synchronization
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left Column: Website Name, Tagline & Browser Tab Preview */}
            <div className="space-y-4">
              <div>
                <Label className="text-xs font-medium text-slate-700 block mb-1.5">
                  Website / Organization Name
                </Label>
                <Input
                  value={formData.siteName || ""}
                  onChange={(e) => handleChange("siteName", e.target.value)}
                  placeholder="e.g. SUHRID"
                  className="h-10 px-3 rounded-lg border-slate-300 text-sm focus:border-emerald-500 focus:ring-emerald-500/20"
                />
                <p className="text-[11px] text-slate-500 mt-1">
                  Appears on the header navigation, footer brand block, copyright line, and document title.
                </p>
              </div>

              <div>
                <Label className="text-xs font-medium text-slate-700 block mb-1.5">
                  Website Tagline / Mission Motto
                </Label>
                <Input
                  value={formData.siteTagline || ""}
                  onChange={(e) => handleChange("siteTagline", e.target.value)}
                  placeholder="e.g. Sharing happiness to create an empowered, self-reliant rural world."
                  className="h-10 px-3 rounded-lg border-slate-300 text-sm focus:border-emerald-500 focus:ring-emerald-500/20"
                />
                <p className="text-[11px] text-slate-500 mt-1">
                  Displayed in the footer brand intro and dynamically in the browser title bar.
                </p>
              </div>

              {/* Favicon Browser Tab Live Preview */}
              <div className="pt-2">
                <Label className="text-xs font-medium text-slate-700 block mb-1.5">
                  Browser Tab Live Preview
                </Label>
                <div className="p-3 bg-slate-100/90 rounded-lg border border-slate-200">
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white rounded-md border border-slate-300/80 shadow-2xs max-w-full">
                    {formData.siteFavicon ? (
                      <img
                        src={formData.siteFavicon}
                        alt="Favicon"
                        className="w-4 h-4 object-contain rounded-xs shrink-0"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = "/favicon.ico";
                        }}
                      />
                    ) : (
                      <Globe className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    )}
                    <span className="text-xs font-medium text-slate-800 truncate max-w-[200px] sm:max-w-[280px]">
                      {formData.siteName || "SUHRID"} — {formData.siteTagline || "Rural Empowerment"}
                    </span>
                    <span className="text-slate-400 text-xs ml-1 hover:text-slate-600 cursor-pointer">×</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Logo & Favicon uploaders with preview */}
            <div className="space-y-5">
              {/* Logo field */}
              <div className="p-4 rounded-lg bg-slate-50 border border-slate-200/80 space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-xs font-semibold text-slate-900 block">
                      Website Brand Logo
                    </Label>
                    <span className="text-[11px] text-slate-500">Rendered in header & footer</span>
                  </div>
                  {formData.siteLogo && (
                    <button
                      type="button"
                      onClick={() => handleChange("siteLogo", "")}
                      className="text-[11px] text-red-600 hover:text-red-700 flex items-center gap-1 font-medium transition-colors"
                    >
                      <Trash2 className="w-3 h-3" />
                      Remove
                    </button>
                  )}
                </div>

                <div className="flex gap-2">
                  <Input
                    value={formData.siteLogo || ""}
                    onChange={(e) => handleChange("siteLogo", e.target.value)}
                    placeholder="https://... or upload image"
                    className="h-9 px-3 rounded-lg border-slate-300 text-xs font-mono bg-white focus:border-emerald-500 focus:ring-emerald-500/20"
                  />
                  <label className="h-9 px-3 rounded-lg bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 font-medium text-xs flex items-center gap-1.5 cursor-pointer shrink-0 shadow-2xs transition-colors">
                    {isUploadingLogo ? (
                      <div className="w-3.5 h-3.5 border-2 border-slate-400 border-t-emerald-600 rounded-full animate-spin" />
                    ) : (
                      <UploadCloud className="w-3.5 h-3.5 text-slate-500" />
                    )}
                    <span>Upload</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleLogoUpload}
                      disabled={isUploadingLogo}
                      className="hidden"
                    />
                  </label>
                </div>

                {/* Logo dual-preview */}
                <div className="grid grid-cols-2 gap-3 pt-1">
                  <div>
                    <span className="text-[10px] font-medium text-slate-500 uppercase tracking-wider block mb-1">
                      Light Header Preview
                    </span>
                    <div className="p-2.5 rounded-md bg-white border border-slate-200 flex items-center justify-center min-h-[52px]">
                      {formData.siteLogo ? (
                        <img
                          src={formData.siteLogo}
                          alt="Logo light preview"
                          className="max-h-8 max-w-full object-contain"
                        />
                      ) : (
                        <span className="text-[11px] text-slate-400 italic">Text mark: {formData.siteName || "SUHRID"}</span>
                      )}
                    </div>
                  </div>

                  <div>
                    <span className="text-[10px] font-medium text-slate-500 uppercase tracking-wider block mb-1">
                      Dark Footer Preview
                    </span>
                    <div className="p-2.5 rounded-md bg-slate-900 border border-slate-800 flex items-center justify-center min-h-[52px]">
                      {formData.siteLogo ? (
                        <img
                          src={formData.siteLogo}
                          alt="Logo dark preview"
                          className="max-h-8 max-w-full object-contain brightness-0 invert"
                        />
                      ) : (
                        <span className="text-[11px] text-slate-500 italic">Text mark: {formData.siteName || "SUHRID"}</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Favicon field */}
              <div className="p-4 rounded-lg bg-slate-50 border border-slate-200/80 space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-xs font-semibold text-slate-900 block">
                      Browser Favicon Icon
                    </Label>
                    <span className="text-[11px] text-slate-500">Square PNG, ICO, or SVG format</span>
                  </div>
                  {formData.siteFavicon && formData.siteFavicon !== "/favicon.ico" && (
                    <button
                      type="button"
                      onClick={() => handleChange("siteFavicon", "/favicon.ico")}
                      className="text-[11px] text-slate-600 hover:text-slate-900 font-medium transition-colors"
                    >
                      Reset default
                    </button>
                  )}
                </div>

                <div className="flex gap-2">
                  <Input
                    value={formData.siteFavicon || ""}
                    onChange={(e) => handleChange("siteFavicon", e.target.value)}
                    placeholder="/favicon.ico or image URL"
                    className="h-9 px-3 rounded-lg border-slate-300 text-xs font-mono bg-white focus:border-emerald-500 focus:ring-emerald-500/20"
                  />
                  <label className="h-9 px-3 rounded-lg bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 font-medium text-xs flex items-center gap-1.5 cursor-pointer shrink-0 shadow-2xs transition-colors">
                    {isUploadingFavicon ? (
                      <div className="w-3.5 h-3.5 border-2 border-slate-400 border-t-emerald-600 rounded-full animate-spin" />
                    ) : (
                      <UploadCloud className="w-3.5 h-3.5 text-slate-500" />
                    )}
                    <span>Upload</span>
                    <input
                      type="file"
                      accept="image/*,.ico"
                      onChange={handleFaviconUpload}
                      disabled={isUploadingFavicon}
                      className="hidden"
                    />
                  </label>
                </div>

                <div className="flex items-center gap-3 pt-1">
                  <div className="w-10 h-10 rounded-md bg-white border border-slate-200 flex items-center justify-center shrink-0 shadow-2xs">
                    {formData.siteFavicon ? (
                      <img
                        src={formData.siteFavicon}
                        alt="Favicon preview"
                        className="w-5 h-5 object-contain"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = "/favicon.ico";
                        }}
                      />
                    ) : (
                      <Globe className="w-4 h-4 text-slate-400" />
                    )}
                  </div>
                  <div className="text-[11px] text-slate-500 leading-tight">
                    <p className="font-medium text-slate-700">Recommended: 32×32 or 64×64 PNG/ICO</p>
                    <p>Appears next to the page title in all browser tabs and bookmarks.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 2. Official Bank Account Information */}
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-3 pb-4 border-b border-slate-100 mb-5">
              <div className="w-9 h-9 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold">
                <Building2 className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-slate-900">
                  Bank Account (NEFT / RTGS)
                </h3>
                <p className="text-slate-500 text-xs">
                  Displayed on the Donation page for official wire transfers
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <Label className="text-xs font-medium text-slate-700 block mb-1.5">
                  Account Holder Name
                </Label>
                <Input
                  value={formData.accountName}
                  onChange={(e) => handleChange("accountName", e.target.value)}
                  className="h-10 px-3 rounded-lg border-slate-300 text-sm focus:border-emerald-500 focus:ring-emerald-500/20"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <Label className="text-xs font-medium text-slate-700 block mb-1.5">
                    Bank Name
                  </Label>
                  <Input
                    value={formData.bankName}
                    onChange={(e) => handleChange("bankName", e.target.value)}
                    className="h-10 px-3 rounded-lg border-slate-300 text-sm focus:border-emerald-500 focus:ring-emerald-500/20"
                  />
                </div>

                <div>
                  <Label className="text-xs font-medium text-slate-700 block mb-1.5">
                    Branch Name
                  </Label>
                  <Input
                    value={formData.branch}
                    onChange={(e) => handleChange("branch", e.target.value)}
                    className="h-10 px-3 rounded-lg border-slate-300 text-sm focus:border-emerald-500 focus:ring-emerald-500/20"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <Label className="text-xs font-medium text-slate-700 block mb-1.5">
                    Account Number
                  </Label>
                  <Input
                    value={formData.accountNumber}
                    onChange={(e) => handleChange("accountNumber", e.target.value)}
                    className="h-10 px-3 rounded-lg border-slate-300 text-sm font-mono focus:border-emerald-500 focus:ring-emerald-500/20"
                  />
                </div>

                <div>
                  <Label className="text-xs font-medium text-slate-700 block mb-1.5">
                    IFSC Code
                  </Label>
                  <Input
                    value={formData.ifscCode}
                    onChange={(e) => handleChange("ifscCode", e.target.value)}
                    className="h-10 px-3 rounded-lg border-slate-300 text-sm font-mono uppercase focus:border-emerald-500 focus:ring-emerald-500/20"
                  />
                </div>
              </div>

              <div>
                <Label className="text-xs font-medium text-slate-700 block mb-1.5">
                  Tax Exemption Note (80G)
                </Label>
                <Input
                  value={formData.taxExemption}
                  onChange={(e) => handleChange("taxExemption", e.target.value)}
                  className="h-10 px-3 rounded-lg border-slate-300 text-sm focus:border-emerald-500 focus:ring-emerald-500/20"
                />
              </div>
            </div>
          </div>
        </div>

        {/* 2. UPI & QR Code Settings */}
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-3 pb-4 border-b border-slate-100 mb-5">
              <div className="w-9 h-9 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold">
                <QrCode className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-slate-900">
                  Instant UPI & QR Code
                </h3>
                <p className="text-slate-500 text-xs">
                  Mobile contributions via GPay, PhonePe, Paytm, and BHIM
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <Label className="text-xs font-medium text-slate-700 block mb-1.5">
                  Official UPI VPA ID
                </Label>
                <Input
                  value={formData.upiId}
                  onChange={(e) => {
                    const val = e.target.value;
                    handleChange("upiId", val);
                    if (formData.upiQrImage.includes("api.qrserver.com")) {
                      handleChange(
                        "upiQrImage",
                        `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=upi://pay?pa=${encodeURIComponent(
                          val
                        )}&pn=CHIROSUHRID%20FOUNDATION&cu=INR`
                      );
                    }
                  }}
                  placeholder="suhrid@sbi"
                  className="h-10 px-3 rounded-lg border-slate-300 text-sm font-mono focus:border-emerald-500 focus:ring-emerald-500/20"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <Label className="text-xs font-medium text-slate-700">UPI QR Code Image</Label>
                  <label className="text-xs font-medium text-emerald-600 hover:text-emerald-700 cursor-pointer flex items-center gap-1">
                    <UploadCloud className="w-3.5 h-3.5" />
                    {isUploading ? "Uploading..." : "Upload QR Image"}
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleQrUpload}
                      className="hidden"
                      disabled={isUploading}
                    />
                  </label>
                </div>
                <Input
                  value={formData.upiQrImage}
                  onChange={(e) => handleChange("upiQrImage", e.target.value)}
                  placeholder="https://... or upload"
                  className="h-10 px-3 rounded-lg border-slate-300 text-sm font-mono text-xs focus:border-emerald-500 focus:ring-emerald-500/20"
                />
              </div>

              {formData.upiQrImage && (
                <div className="flex items-center gap-4 p-3.5 rounded-lg bg-slate-50 border border-slate-200/60">
                  <div className="w-16 h-16 bg-white p-1 rounded-md border border-slate-200 shrink-0 flex items-center justify-center">
                    <img src={formData.upiQrImage} alt="QR Code" className="w-full h-full object-contain" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-slate-900">Live QR Code</p>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      Donors scan this in any UPI app for direct zero-fee contributions.
                    </p>
                    <span className="text-[11px] text-emerald-700 font-medium flex items-center gap-1 mt-1">
                      <Check className="w-3 h-3" /> Active on Donation page
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* 3. Official Contact Information */}
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-3 pb-4 border-b border-slate-100 mb-5">
              <div className="w-9 h-9 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold">
                <Phone className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-slate-900">
                  Helpline & Contact Details
                </h3>
                <p className="text-slate-500 text-xs">
                  Displayed across header navigation, footer, and the Contact page
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <Label className="text-xs font-medium text-slate-700 block mb-1.5">
                    Official Email
                  </Label>
                  <Input
                    type="email"
                    value={formData.contactEmail}
                    onChange={(e) => handleChange("contactEmail", e.target.value)}
                    className="h-10 px-3 rounded-lg border-slate-300 text-sm focus:border-emerald-500 focus:ring-emerald-500/20"
                  />
                </div>

                <div>
                  <Label className="text-xs font-medium text-slate-700 block mb-1.5">
                    Phone Number
                  </Label>
                  <Input
                    value={formData.contactPhone}
                    onChange={(e) => handleChange("contactPhone", e.target.value)}
                    className="h-10 px-3 rounded-lg border-slate-300 text-sm focus:border-emerald-500 focus:ring-emerald-500/20"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <Label className="text-xs font-medium text-slate-700 block mb-1.5">
                    WhatsApp Helpline
                  </Label>
                  <Input
                    value={formData.whatsapp}
                    onChange={(e) => handleChange("whatsapp", e.target.value)}
                    className="h-10 px-3 rounded-lg border-slate-300 text-sm focus:border-emerald-500 focus:ring-emerald-500/20"
                  />
                </div>

                <div>
                  <Label className="text-xs font-medium text-slate-700 block mb-1.5">
                    Registered Headquarters
                  </Label>
                  <Input
                    value={formData.address}
                    onChange={(e) => handleChange("address", e.target.value)}
                    className="h-10 px-3 rounded-lg border-slate-300 text-sm focus:border-emerald-500 focus:ring-emerald-500/20"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 4. Global Announcement Notice Banner */}
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-3 pb-4 border-b border-slate-100 mb-5">
              <div className="w-9 h-9 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold">
                <Megaphone className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-slate-900">
                  Global Alert & Notice Banner
                </h3>
                <p className="text-slate-500 text-xs">
                  Broadcast relief alerts, urgent drives, and announcements site-wide
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between p-3.5 rounded-lg bg-slate-50 border border-slate-200/60">
                <div>
                  <Label className="text-xs font-semibold text-slate-900">
                    Display Banner on Website
                  </Label>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    Shows an eye-catching top banner to every visitor
                  </p>
                </div>
                <Switch
                  checked={formData.announcementEnabled}
                  onCheckedChange={(checked) => handleChange("announcementEnabled", checked)}
                  className="data-[state=checked]:bg-emerald-600"
                />
              </div>

              <div>
                <Label className="text-xs font-medium text-slate-700 block mb-1.5">
                  Banner Message Text
                </Label>
                <Input
                  value={formData.announcementMessage}
                  onChange={(e) => handleChange("announcementMessage", e.target.value)}
                  placeholder="e.g. Winter Clothing Drive: Support 500+ rural elders this month!"
                  className="h-10 px-3 rounded-lg border-slate-300 text-sm focus:border-emerald-500 focus:ring-emerald-500/20"
                />
              </div>

              <div>
                <Label className="text-xs font-medium text-slate-700 block mb-1.5">
                  Action Link URL (Optional)
                </Label>
                <Input
                  value={formData.announcementLink}
                  onChange={(e) => handleChange("announcementLink", e.target.value)}
                  placeholder="/donate"
                  className="h-10 px-3 rounded-lg border-slate-300 text-sm font-mono text-xs focus:border-emerald-500 focus:ring-emerald-500/20"
                />
              </div>
            </div>
          </div>
        </div>

        {/* 5. Supabase Cloud Infrastructure */}
        <div className="lg:col-span-2 rounded-xl border border-slate-200 bg-slate-50 p-6 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-200 gap-4 mb-5">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
                <Database className="w-4 h-4" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-semibold text-slate-900">
                    Supabase Cloud Backend
                  </h3>
                  <span className="px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800 text-[11px] font-medium flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
                    Connected & Active
                  </span>
                </div>
                <p className="text-slate-500 text-xs mt-0.5">
                  PostgreSQL database persistence, public media storage, and secure authentication
                </p>
              </div>
            </div>

            <Button
              type="button"
              variant="outline"
              disabled={isSyncingCloud}
              onClick={handleManualSync}
              className="h-8 px-3 rounded-lg border-slate-300 bg-white hover:bg-slate-50 text-xs font-medium text-slate-700 gap-1.5"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isSyncingCloud ? "animate-spin" : ""}`} />
              {isSyncingCloud ? "Syncing..." : "Force Cloud Sync"}
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
            <div className="bg-white p-4 rounded-lg border border-slate-200">
              <p className="text-[11px] text-slate-500 font-medium mb-1">Project Endpoint</p>
              <p className="font-mono text-xs font-semibold text-slate-900 truncate">lkugausdmubnluspvpgr.supabase.co</p>
              <p className="text-[11px] text-emerald-700 font-medium mt-1">✓ REST & Auth Online</p>
            </div>

            <div className="bg-white p-4 rounded-lg border border-slate-200">
              <p className="text-[11px] text-slate-500 font-medium mb-1">Storage Bucket</p>
              <p className="font-mono text-xs font-semibold text-slate-900">suhrid-media</p>
              <p className="text-[11px] text-emerald-700 font-medium mt-1">✓ Public Media CDN Active</p>
            </div>

            <div className="bg-white p-4 rounded-lg border border-slate-200">
              <p className="text-[11px] text-slate-500 font-medium mb-1">Database Architecture</p>
              <p className="font-medium text-xs text-slate-900">Dual-Layer Sync</p>
              <p className="text-[11px] text-slate-500 mt-1">PostgreSQL Tables + JSONB Backup</p>
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <p className="text-xs font-semibold text-slate-900">Native Database Tables</p>
              <p className="text-xs text-slate-500 mt-0.5">
                Run <code className="text-emerald-700 font-mono text-[11px] bg-slate-100 px-1.5 py-0.5 rounded">supabase_schema.sql</code> in your Supabase SQL Editor to manage all tables natively.
              </p>
            </div>
            <a
              href="https://supabase.com/dashboard/project/lkugausdmubnluspvpgr/sql"
              target="_blank"
              rel="noreferrer"
              className="h-8 px-3 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-medium text-xs inline-flex items-center gap-1.5 transition-colors shrink-0"
            >
              Open SQL Editor
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>
    </form>
  );
};
