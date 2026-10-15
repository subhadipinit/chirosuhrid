import React, { useState } from "react";
import { useCMS, DynamicTeamMember } from "@/context/CMSContext";
import { uploadMediaToSupabase } from "@/lib/supabase";
import {
  Users,
  Plus,
  Edit2,
  Trash2,
  Check,
  UploadCloud,
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

export const TeamTab: React.FC = () => {
  const { teamMembers, addTeamMember, updateTeamMember, deleteTeamMember } = useCMS();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingMember, setEditingMember] = useState<DynamicTeamMember | null>(null);

  // Form State
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [category, setCategory] = useState("Leadership");
  const [image, setImage] = useState("");
  const [bio, setBio] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  const handleOpenAddModal = () => {
    setEditingMember(null);
    setName("");
    setRole("Director / Mentor");
    setCategory("Leadership");
    setImage("https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1064&auto=format&fit=crop");
    setBio("");
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (member: DynamicTeamMember) => {
    setEditingMember(member);
    setName(member.name);
    setRole(member.role);
    setCategory(member.category || "Leadership");
    setImage(member.image);
    setBio(member.bio);
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
      toast.success("Profile photo uploaded successfully");
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

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !bio.trim()) {
      toast.error("Please enter Name and Bio");
      return;
    }

    if (editingMember) {
      await updateTeamMember(editingMember.id, {
        name: name.trim(),
        role: role.trim(),
        category,
        image: image.trim(),
        bio: bio.trim(),
      });
    } else {
      await addTeamMember({
        name: name.trim(),
        role: role.trim(),
        category,
        image: image.trim(),
        bio: bio.trim(),
      });
    }
    setIsModalOpen(false);
  };

  const handleDelete = async (id: string, memberName: string) => {
    if (window.confirm(`Are you sure you want to remove "${memberName}"?`)) {
      await deleteTeamMember(id);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">Leadership & Team</h1>
          <p className="text-sm text-slate-500 mt-1">
            Manage directors, advisors, mentor collective profiles, and bios displayed on the About page.
          </p>
        </div>

        <Button
          onClick={handleOpenAddModal}
          className="h-9 px-4 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-sm shadow-xs gap-2 shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Add Member</span>
        </Button>
      </div>

      {/* Team Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {teamMembers.map((member) => (
          <div
            key={member.id}
            className="rounded-xl border border-slate-200 bg-white shadow-xs hover:border-slate-300 hover:shadow-sm transition-all overflow-hidden flex flex-col justify-between"
          >
            <div className="p-5">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-16 h-16 rounded-xl overflow-hidden bg-slate-100 shrink-0 border border-slate-200">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="px-2 py-0.5 rounded-md text-[11px] font-medium bg-slate-100 text-slate-700">
                      {member.category || "Team"}
                    </span>
                  </div>
                  <h3 className="text-base font-semibold text-slate-900 leading-snug truncate">
                    {member.name}
                  </h3>
                  <p className="text-xs text-emerald-700 font-medium truncate mt-0.5">
                    {member.role}
                  </p>
                </div>
              </div>

              <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                {member.bio}
              </p>
            </div>

            {/* Bottom Actions */}
            <div className="p-3 px-5 bg-slate-50 border-t border-slate-100 flex items-center justify-end gap-1.5">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleOpenEditModal(member)}
                className="h-8 px-2.5 rounded-lg border-slate-200 bg-white hover:bg-slate-100 text-xs font-medium text-slate-700 gap-1.5"
              >
                <Edit2 className="w-3 h-3" />
                Edit
              </Button>
              <button
                type="button"
                onClick={() => handleDelete(member.id, member.name)}
                className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                title="Remove Member"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add / Edit Member Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-lg bg-white border border-slate-200 text-slate-900 rounded-2xl shadow-xl p-6 max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-lg font-semibold text-slate-900">
              {editingMember ? "Edit Team Member" : "Add Team Member"}
            </DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSave} className="space-y-4 pt-2">
            <div>
              <Label className="text-xs font-medium text-slate-700 block mb-1.5">
                Full Name <span className="text-red-500">*</span>
              </Label>
              <Input
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Dr. Anirban Mukherjee"
                className="h-10 px-3 rounded-lg border-slate-300 text-sm focus:border-emerald-500 focus:ring-emerald-500/20"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <Label className="text-xs font-medium text-slate-700 block mb-1.5">
                  Designation / Role
                </Label>
                <Input
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  placeholder="e.g. Managing Trustee & Founder"
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
                  <option value="Leadership">Leadership</option>
                  <option value="Advisory Board">Advisory Board</option>
                  <option value="Mentors">Mentors</option>
                  <option value="Field Coordinators">Field Coordinators</option>
                </select>
              </div>
            </div>

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
                <div className="mt-2 w-16 h-16 rounded-xl overflow-hidden bg-slate-100 border border-slate-200">
                  <img src={image} alt="Preview" className="w-full h-full object-cover" />
                </div>
              )}
            </div>

            <div>
              <Label className="text-xs font-medium text-slate-700 block mb-1.5">
                Biography & Background <span className="text-red-500">*</span>
              </Label>
              <Textarea
                required
                rows={4}
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                placeholder="Brief summary of experience, qualifications, and role at the Foundation..."
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
                {editingMember ? "Save Changes" : "Save Member"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};
