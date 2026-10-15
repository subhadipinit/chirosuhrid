import React, { useState } from "react";
import { useCMS, CommunityEvent } from "@/context/CMSContext";
import { uploadMediaToSupabase } from "@/lib/supabase";
import {
  Calendar,
  Plus,
  Edit2,
  Trash2,
  MapPin,
  Clock,
  User,
  Phone,
  Check,
  UploadCloud,
  Activity,
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

export const EventsTab: React.FC = () => {
  const { events, addEvent, updateEvent, deleteEvent } = useCMS();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<CommunityEvent | null>(null);

  // Form State
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState<CommunityEvent["category"]>("Health Camp");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [location, setLocation] = useState("");
  const [centerName, setCenterName] = useState("Midnapore Center");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [status, setStatus] = useState<CommunityEvent["status"]>("upcoming");
  const [coordinatorName, setCoordinatorName] = useState("");
  const [coordinatorContact, setCoordinatorContact] = useState("+91 97327 34055");
  const [isUploading, setIsUploading] = useState(false);

  const handleOpenAddModal = () => {
    setEditingEvent(null);
    setTitle("");
    setCategory("Health Camp");
    setDate("Upcoming Sunday, 9:00 AM");
    setTime("09:00 AM - 04:00 PM");
    setLocation("Midnapore Center, Paschim Medinipur");
    setCenterName("Midnapore Center");
    setDescription("");
    setImage("https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?q=80&w=2070&auto=format&fit=crop");
    setStatus("upcoming");
    setCoordinatorName("Arun Tarai");
    setCoordinatorContact("+91 97327 34055");
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (event: CommunityEvent) => {
    setEditingEvent(event);
    setTitle(event.title);
    setCategory(event.category);
    setDate(event.date);
    setTime(event.time || "");
    setLocation(event.location);
    setCenterName(event.centerName || "Midnapore Center");
    setDescription(event.description);
    setImage(event.image || "");
    setStatus(event.status);
    setCoordinatorName(event.coordinatorName || "");
    setCoordinatorContact(event.coordinatorContact || "");
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
      toast.success("Event banner uploaded successfully");
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
    if (!title.trim() || !date.trim() || !location.trim()) {
      toast.error("Please provide Event Title, Date, and Location");
      return;
    }

    if (editingEvent) {
      await updateEvent(editingEvent.id, {
        title: title.trim(),
        category,
        date: date.trim(),
        time: time.trim(),
        location: location.trim(),
        centerName: centerName.trim(),
        description: description.trim(),
        image: image.trim(),
        status,
        coordinatorName: coordinatorName.trim(),
        coordinatorContact: coordinatorContact.trim(),
      });
    } else {
      await addEvent({
        title: title.trim(),
        category,
        date: date.trim(),
        time: time.trim(),
        location: location.trim(),
        centerName: centerName.trim(),
        description: description.trim(),
        image: image.trim(),
        status,
        coordinatorName: coordinatorName.trim(),
        coordinatorContact: coordinatorContact.trim(),
      });
    }
    setIsModalOpen(false);
  };

  const handleDelete = async (id: string, eventTitle: string) => {
    if (window.confirm(`Are you sure you want to delete "${eventTitle}"?`)) {
      await deleteEvent(id);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">Events & Camps</h1>
          <p className="text-sm text-slate-500 mt-1">
            Schedule upcoming free health clinics, distribution drives, and youth summits.
          </p>
        </div>

        <Button
          onClick={handleOpenAddModal}
          className="h-9 px-4 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-sm shadow-xs gap-2 shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Add Event</span>
        </Button>
      </div>

      {/* Events Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {events.map((evt) => (
          <div
            key={evt.id}
            className="rounded-xl border border-slate-200 bg-white shadow-xs hover:border-slate-300 hover:shadow-sm transition-all overflow-hidden flex flex-col justify-between"
          >
            <div>
              {/* Image banner with status tag */}
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-100">
                {evt.image ? (
                  <img
                    src={evt.image}
                    alt={evt.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-slate-100 text-slate-400">
                    <Activity className="w-10 h-10" />
                  </div>
                )}

                <div className="absolute top-3 left-3 flex items-center gap-1.5">
                  <span className="px-2.5 py-0.5 rounded-md text-xs font-medium bg-white/95 text-slate-800 shadow-xs backdrop-blur-xs">
                    {evt.category}
                  </span>
                  <span
                    className={`px-2 py-0.5 rounded-md text-xs font-medium text-white shadow-xs ${
                      evt.status === "upcoming" ? "bg-emerald-600" : "bg-slate-700"
                    }`}
                  >
                    {evt.status === "upcoming" ? "Upcoming" : "Completed"}
                  </span>
                </div>
              </div>

              {/* Event Content */}
              <div className="p-5 space-y-3">
                <div className="text-xs font-medium text-emerald-700 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{evt.date}</span>
                </div>

                <h3 className="text-base font-semibold text-slate-900 leading-snug">
                  {evt.title}
                </h3>
                <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                  {evt.description}
                </p>

                <div className="pt-3 border-t border-slate-100 space-y-1.5 text-xs text-slate-600">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span className="truncate">{evt.location}</span>
                  </div>
                  {evt.time && (
                    <div className="flex items-center gap-2">
                      <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span>{evt.time}</span>
                    </div>
                  )}
                  {evt.coordinatorName && (
                    <div className="flex items-center gap-2">
                      <User className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span>Coordinator: {evt.coordinatorName}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="p-3 px-5 bg-slate-50 border-t border-slate-100 flex items-center justify-end gap-1.5">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleOpenEditModal(evt)}
                className="h-8 px-2.5 rounded-lg border-slate-200 bg-white hover:bg-slate-100 text-xs font-medium text-slate-700 gap-1.5"
              >
                <Edit2 className="w-3 h-3" />
                Edit
              </Button>
              <button
                type="button"
                onClick={() => handleDelete(evt.id, evt.title)}
                className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                title="Delete Event"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add / Edit Event Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-lg bg-white border border-slate-200 text-slate-900 rounded-2xl shadow-xl p-6 max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-lg font-semibold text-slate-900">
              {editingEvent ? "Edit Event" : "Add Event / Camp"}
            </DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSave} className="space-y-4 pt-2">
            <div>
              <Label className="text-xs font-medium text-slate-700 block mb-1.5">
                Event Title <span className="text-red-500">*</span>
              </Label>
              <Input
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Free Eye Screening & General Health Camp"
                className="h-10 px-3 rounded-lg border-slate-300 text-sm focus:border-emerald-500 focus:ring-emerald-500/20"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <Label className="text-xs font-medium text-slate-700 block mb-1.5">Category</Label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as CommunityEvent["category"])}
                  className="w-full h-10 px-3 rounded-lg border border-slate-300 bg-white text-sm text-slate-900 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                >
                  <option value="Health Camp">Health Camp</option>
                  <option value="Education Drive">Education Drive</option>
                  <option value="Relief & Food">Relief & Food</option>
                  <option value="Artisan Fair">Artisan Fair</option>
                  <option value="Community Meet">Community Meet</option>
                </select>
              </div>

              <div>
                <Label className="text-xs font-medium text-slate-700 block mb-1.5">Status</Label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value as CommunityEvent["status"])}
                  className="w-full h-10 px-3 rounded-lg border border-slate-300 bg-white text-sm text-slate-900 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                >
                  <option value="upcoming">Upcoming</option>
                  <option value="completed">Completed</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <Label className="text-xs font-medium text-slate-700 block mb-1.5">
                  Date / Schedule <span className="text-red-500">*</span>
                </Label>
                <Input
                  required
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  placeholder="e.g. Sunday, Oct 26, 2024"
                  className="h-10 px-3 rounded-lg border-slate-300 text-sm focus:border-emerald-500 focus:ring-emerald-500/20"
                />
              </div>

              <div>
                <Label className="text-xs font-medium text-slate-700 block mb-1.5">Timings</Label>
                <Input
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  placeholder="e.g. 09:00 AM - 04:00 PM"
                  className="h-10 px-3 rounded-lg border-slate-300 text-sm focus:border-emerald-500 focus:ring-emerald-500/20"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <Label className="text-xs font-medium text-slate-700 block mb-1.5">
                  Location / Venue <span className="text-red-500">*</span>
                </Label>
                <Input
                  required
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="e.g. Midnapore Rural Center"
                  className="h-10 px-3 rounded-lg border-slate-300 text-sm focus:border-emerald-500 focus:ring-emerald-500/20"
                />
              </div>

              <div>
                <Label className="text-xs font-medium text-slate-700 block mb-1.5">Associated Center</Label>
                <Input
                  value={centerName}
                  onChange={(e) => setCenterName(e.target.value)}
                  placeholder="Midnapore Center"
                  className="h-10 px-3 rounded-lg border-slate-300 text-sm focus:border-emerald-500 focus:ring-emerald-500/20"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <Label className="text-xs font-medium text-slate-700">Banner Photo</Label>
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
                <Label className="text-xs font-medium text-slate-700 block mb-1.5">Coordinator Name</Label>
                <Input
                  value={coordinatorName}
                  onChange={(e) => setCoordinatorName(e.target.value)}
                  placeholder="e.g. Arun Tarai"
                  className="h-10 px-3 rounded-lg border-slate-300 text-sm focus:border-emerald-500 focus:ring-emerald-500/20"
                />
              </div>

              <div>
                <Label className="text-xs font-medium text-slate-700 block mb-1.5">Coordinator Phone</Label>
                <Input
                  value={coordinatorContact}
                  onChange={(e) => setCoordinatorContact(e.target.value)}
                  placeholder="+91 97327 34055"
                  className="h-10 px-3 rounded-lg border-slate-300 text-sm focus:border-emerald-500 focus:ring-emerald-500/20"
                />
              </div>
            </div>

            <div>
              <Label className="text-xs font-medium text-slate-700 block mb-1.5">Description</Label>
              <Textarea
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Event agenda, requirements, and target audience..."
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
                {editingEvent ? "Save Changes" : "Create Event"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};
