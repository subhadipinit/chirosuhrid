import React, { useState } from "react";
import { useCMS } from "@/context/CMSContext";
import { Center } from "@/data/centers";
import { uploadMediaToSupabase } from "@/lib/supabase";
import {
  MapPin,
  Plus,
  Edit2,
  Trash2,
  Phone,
  Mail,
  Clock,
  Check,
  UploadCloud,
  ExternalLink,
  Users,
  BookOpen,
  Target,
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
import { Link } from "react-router-dom";

export const CentersTab: React.FC = () => {
  const { centers, addCenter, updateCenter, deleteCenter } = useCMS();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCenter, setEditingCenter] = useState<Center | null>(null);

  // Form State
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [beneficiaries, setBeneficiaries] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  const handleOpenAddModal = () => {
    setEditingCenter(null);
    setName("");
    setLocation("");
    setBeneficiaries("300+");
    setDescription("");
    setImage("https://images.unsplash.com/photo-1577896851231-70ef18881754?q=80&w=2070&auto=format&fit=crop");
    setAddress("");
    setPhone("+91 97327 34055");
    setEmail("contact@suhrid.org");
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (center: Center) => {
    setEditingCenter(center);
    setName(center.name);
    setLocation(center.location);
    setBeneficiaries(center.beneficiaries || "300+");
    setDescription(center.description);
    setImage(center.image);
    setAddress(center.contact?.address || "");
    setPhone(center.contact?.phone || "");
    setEmail(center.contact?.email || "");
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
      toast.success("Center photo uploaded successfully");
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

  const handleSaveCenter = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !location.trim() || !description.trim()) {
      toast.error("Please provide Center Name, Location, and Description");
      return;
    }

    if (editingCenter) {
      await updateCenter(editingCenter.id, {
        name: name.trim(),
        location: location.trim(),
        beneficiaries: beneficiaries.trim(),
        description: description.trim(),
        image: image.trim(),
        contact: {
          ...editingCenter.contact,
          address: address.trim() || editingCenter.contact?.address || location,
          phone: phone.trim() || editingCenter.contact?.phone || "",
          email: email.trim() || editingCenter.contact?.email || "",
        },
      });
    } else {
      const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
      const newCenter: Center = {
        id: slug || `center-${Date.now()}`,
        name: name.trim(),
        location: location.trim(),
        description: description.trim(),
        longDescription: [description.trim()],
        beneficiaries: beneficiaries.trim() || "100+",
        programs: [
          {
            title: "SUGYAN Coaching",
            description: "Free study coaching and academic mentorship.",
            icon: BookOpen,
            timing: "Mon - Sat | 4 PM - 7 PM",
          },
        ],
        stats: [
          { label: "Direct Beneficiaries", value: beneficiaries.trim() || "100+", icon: Users },
          { label: "Mentors Active", value: "8+", icon: Target },
        ],
        gallery: [
          {
            src: image.trim(),
            caption: `${name.trim()} field activities`,
          },
        ],
        contact: {
          address: address.trim() || location.trim(),
          phone: phone.trim() || "+91 97327 34055",
          email: email.trim() || "contact@suhrid.org",
          hours: [{ days: "Monday - Saturday", time: "9:00 AM - 6:00 PM" }],
        },
        image: image.trim(),
        route: `/centers#${slug}`,
      };
      await addCenter(newCenter);
    }
    setIsModalOpen(false);
  };

  const handleDelete = async (id: string, centerName: string) => {
    if (window.confirm(`Are you sure you want to remove "${centerName}"?`)) {
      await deleteCenter(id);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header and Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">Grassroots Centers</h1>
          <p className="text-sm text-slate-500 mt-1">
            Manage regional learning centers, local coordinator contacts, and schedules.
          </p>
        </div>

        <Button
          onClick={handleOpenAddModal}
          className="h-9 px-4 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-sm shadow-xs gap-2 shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Add Center</span>
        </Button>
      </div>

      {/* Centers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {centers.map((center) => (
          <div
            key={center.id}
            className="rounded-xl border border-slate-200 bg-white shadow-xs hover:border-slate-300 hover:shadow-sm transition-all overflow-hidden flex flex-col justify-between"
          >
            <div>
              {/* Cover Image */}
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-100">
                <img
                  src={center.image}
                  alt={center.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 left-3 flex items-center gap-1.5">
                  <span className="px-2.5 py-0.5 rounded-md text-xs font-medium bg-white/95 text-slate-800 shadow-xs backdrop-blur-xs flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-emerald-600" />
                    {center.location.split(",")[0]}
                  </span>
                </div>
                {center.beneficiaries && (
                  <div className="absolute bottom-3 right-3">
                    <span className="px-2 py-0.5 rounded-md text-xs font-medium bg-slate-900/80 text-white backdrop-blur-xs flex items-center gap-1">
                      <Users className="w-3 h-3" />
                      {center.beneficiaries}
                    </span>
                  </div>
                )}
              </div>

              {/* Center Info */}
              <div className="p-5 space-y-3">
                <h3 className="text-base font-semibold text-slate-900 leading-snug">
                  {center.name}
                </h3>
                <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                  {center.description}
                </p>

                <div className="pt-3 border-t border-slate-100 space-y-1.5 text-xs text-slate-600">
                  {center.contact?.phone && (
                    <div className="flex items-center gap-2">
                      <Phone className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span>{center.contact.phone}</span>
                    </div>
                  )}
                  {center.contact?.email && (
                    <div className="flex items-center gap-2">
                      <Mail className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span className="truncate">{center.contact.email}</span>
                    </div>
                  )}
                  {center.contact?.hours?.[0] && (
                    <div className="flex items-center gap-2">
                      <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span>{center.contact.hours[0].days}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="p-3 px-5 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
              <Link
                to={center.route || "/centers"}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs font-medium text-slate-600 hover:text-slate-900 transition-colors"
              >
                <span>View Page</span>
                <ExternalLink className="w-3 h-3" />
              </Link>

              <div className="flex items-center gap-1.5">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleOpenEditModal(center)}
                  className="h-8 px-2.5 rounded-lg border-slate-200 bg-white hover:bg-slate-100 text-xs font-medium text-slate-700 gap-1.5"
                >
                  <Edit2 className="w-3 h-3" />
                  Edit
                </Button>
                <button
                  type="button"
                  onClick={() => handleDelete(center.id, center.name)}
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                  title="Delete Center"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add / Edit Center Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-lg bg-white border border-slate-200 text-slate-900 rounded-2xl shadow-xl p-6 max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-lg font-semibold text-slate-900">
              {editingCenter ? "Edit Center" : "Add Center"}
            </DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSaveCenter} className="space-y-4 pt-2">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <Label className="text-xs font-medium text-slate-700 block mb-1.5">
                  Center Name <span className="text-red-500">*</span>
                </Label>
                <Input
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Midnapore Center"
                  className="h-10 px-3 rounded-lg border-slate-300 text-sm focus:border-emerald-500 focus:ring-emerald-500/20"
                />
              </div>

              <div>
                <Label className="text-xs font-medium text-slate-700 block mb-1.5">
                  District / Location <span className="text-red-500">*</span>
                </Label>
                <Input
                  required
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="Midnapore, Paschim Medinipur"
                  className="h-10 px-3 rounded-lg border-slate-300 text-sm focus:border-emerald-500 focus:ring-emerald-500/20"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <Label className="text-xs font-medium text-slate-700 block mb-1.5">
                  Beneficiaries Metric
                </Label>
                <Input
                  value={beneficiaries}
                  onChange={(e) => setBeneficiaries(e.target.value)}
                  placeholder="e.g. 400+"
                  className="h-10 px-3 rounded-lg border-slate-300 text-sm focus:border-emerald-500 focus:ring-emerald-500/20"
                />
              </div>

              <div>
                <Label className="text-xs font-medium text-slate-700 block mb-1.5">
                  Coordinator Phone
                </Label>
                <Input
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+91 97327 34055"
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

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <Label className="text-xs font-medium text-slate-700 block mb-1.5">
                  Coordinator Email
                </Label>
                <Input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="contact@suhrid.org"
                  className="h-10 px-3 rounded-lg border-slate-300 text-sm focus:border-emerald-500 focus:ring-emerald-500/20"
                />
              </div>

              <div>
                <Label className="text-xs font-medium text-slate-700 block mb-1.5">
                  Address
                </Label>
                <Input
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Village / Block address"
                  className="h-10 px-3 rounded-lg border-slate-300 text-sm focus:border-emerald-500 focus:ring-emerald-500/20"
                />
              </div>
            </div>

            <div>
              <Label className="text-xs font-medium text-slate-700 block mb-1.5">
                Description & Impact <span className="text-red-500">*</span>
              </Label>
              <Textarea
                required
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe key programs, achievements, and communities served..."
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
                {editingCenter ? "Save Changes" : "Create Center"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};
