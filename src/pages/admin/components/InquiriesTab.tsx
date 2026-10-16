import React, { useState } from "react";
import { useCMS, Inquiry } from "@/context/CMSContext";
import {
  Inbox,
  Mail,
  Phone,
  Trash2,
  CheckCircle2,
  Clock,
  Eye,
  Filter,
  MapPin,
  GraduationCap,
  HeartHandshake,
  UserCheck,
  Edit3,
  Save,
  X,
  Search,
  MessageSquare,
  AlertCircle,
  RotateCcw,
  Send,
  Building2,
  ChevronDown,
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

const ROLE_LABELS: Record<string, string> = {
  education: "Education Support",
  health: "Health Camps",
  livelihood: "Livelihood Support",
  events: "Events & Outreach",
};

const AVAILABILITY_LABELS: Record<string, string> = {
  weekends: "Weekends only",
  flexible: "Flexible hours",
  occasional: "Occasional Events",
};

interface ParsedInquiry {
  displayType: string;
  isVolunteer: boolean;
  isContact: boolean;
  city: string;
  roleInterest: string;
  roleLabel: string;
  availability: string;
  availabilityLabel: string;
  note: string;
  subject: string;
  cleanMessage: string;
}

export function parseInquiry(inq: Inquiry): ParsedInquiry {
  const data = inq.data || {};
  const isVolunteer = inq.type === "volunteer";
  const isContact = inq.type === "contact";

  let city = String(data.city || data.location || "").trim();
  let roleInterest = String(data.interest || data.role || "").trim();
  let availability = String(data.availability || "").trim();
  let note = String(data.note || "").trim();
  let subject = String(data.subject || "").trim();
  let cleanMessage = String(inq.message || "").trim();

  // If legacy formatted string: "[Volunteer Application] Location: ... | Role Interest: ... | Availability: ... | Note: ..."
  if (cleanMessage.startsWith("[Volunteer Application]")) {
    const locMatch = cleanMessage.match(/Location:\s*([^|]+)/i);
    const intMatch = cleanMessage.match(/Role Interest:\s*([^|]+)/i);
    const avMatch = cleanMessage.match(/Availability:\s*([^|]+)/i);
    const noteMatch = cleanMessage.match(/Note:\s*([\s\S]+)$/i);

    if (!city && locMatch) city = locMatch[1].trim();
    if (!roleInterest && intMatch) roleInterest = intMatch[1].trim();
    if (!availability && avMatch) availability = avMatch[1].trim();
    if (!note && noteMatch) {
      const extracted = noteMatch[1].trim();
      if (extracted.toLowerCase() !== "none") {
        note = extracted;
      }
    }
  } else if (cleanMessage.startsWith("[Subject:")) {
    const subMatch = cleanMessage.match(/\[Subject:\s*([^\]]+)\]/i);
    if (!subject && subMatch) subject = subMatch[1].trim();
    cleanMessage = cleanMessage.replace(/^\[Subject:\s*[^\]]+\]\s*/i, "").trim();
  }

  const roleKey = roleInterest.toLowerCase();
  const roleLabel = ROLE_LABELS[roleKey] || (roleInterest ? roleInterest.charAt(0).toUpperCase() + roleInterest.slice(1) : "Community Service");

  const avKey = availability.toLowerCase();
  const availabilityLabel = AVAILABILITY_LABELS[avKey] || (availability ? availability.charAt(0).toUpperCase() + availability.slice(1) : "Flexible");

  if (isVolunteer) {
    cleanMessage = note || cleanMessage.replace(/^\[Volunteer Application\].*?Note:\s*/is, "").trim();
    if (!cleanMessage || cleanMessage.toLowerCase() === "none") {
      cleanMessage = `Volunteer Application for ${roleLabel}`;
    }
  }

  return {
    displayType: isVolunteer ? "Volunteer Application" : isContact ? "Contact Inquiry" : "General Submission",
    isVolunteer,
    isContact,
    city,
    roleInterest,
    roleLabel,
    availability,
    availabilityLabel,
    note,
    subject: subject || (isContact ? "General Inquiry" : ""),
    cleanMessage: cleanMessage || "No message provided",
  };
}

export const InquiriesTab: React.FC = () => {
  const { inquiries, updateInquiry, updateInquiryStatus, deleteInquiry } = useCMS();

  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [activeInquiry, setActiveInquiry] = useState<Inquiry | null>(null);

  // Edit State
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editFormData, setEditFormData] = useState({
    name: "",
    email: "",
    phone: "",
    city: "",
    interest: "education",
    availability: "occasional",
    note: "",
    subject: "",
    status: "new" as Inquiry["status"],
  });

  const filteredInquiries = inquiries.filter((inq) => {
    const matchesStatus = statusFilter === "all" || inq.status === statusFilter;
    const matchesType = typeFilter === "all" || inq.type === typeFilter;
    
    if (!matchesStatus || !matchesType) return false;
    if (!searchQuery.trim()) return true;

    const parsed = parseInquiry(inq);
    const q = searchQuery.toLowerCase();
    return (
      inq.name.toLowerCase().includes(q) ||
      (inq.email && inq.email.toLowerCase().includes(q)) ||
      (inq.phone && inq.phone.toLowerCase().includes(q)) ||
      parsed.city.toLowerCase().includes(q) ||
      parsed.cleanMessage.toLowerCase().includes(q) ||
      parsed.roleLabel.toLowerCase().includes(q)
    );
  });

  const handleOpenDetail = (inq: Inquiry) => {
    setActiveInquiry(inq);
    setIsEditing(false);
    const parsed = parseInquiry(inq);
    setEditFormData({
      name: inq.name,
      email: inq.email || "",
      phone: inq.phone || "",
      city: parsed.city,
      interest: parsed.roleInterest || "education",
      availability: parsed.availability || "occasional",
      note: parsed.note || parsed.cleanMessage,
      subject: parsed.subject,
      status: inq.status,
    });
  };

  const handleSaveEdit = async () => {
    if (!activeInquiry) return;
    try {
      const isVolunteer = activeInquiry.type === "volunteer";
      const cleanNote = editFormData.note.trim();
      const roleTitle = ROLE_LABELS[editFormData.interest] || editFormData.interest;

      const updatedPayload: Partial<Inquiry> = {
        name: editFormData.name.trim(),
        email: editFormData.email.trim(),
        phone: editFormData.phone.trim(),
        status: editFormData.status,
        message: isVolunteer
          ? (cleanNote || `Volunteer application for ${roleTitle}`)
          : (cleanNote || editFormData.subject),
        data: {
          ...activeInquiry.data,
          city: editFormData.city.trim(),
          location: editFormData.city.trim(),
          interest: editFormData.interest,
          interestTitle: roleTitle,
          availability: editFormData.availability,
          note: cleanNote,
          subject: editFormData.subject.trim(),
        },
      };

      await updateInquiry(activeInquiry.id, updatedPayload);
      setActiveInquiry({
        ...activeInquiry,
        ...updatedPayload,
      } as Inquiry);
      setIsEditing(false);
    } catch (err) {
      console.error("Failed to update inquiry:", err);
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (window.confirm(`Delete submission from "${name}"? This action cannot be undone.`)) {
      await deleteInquiry(id);
      if (activeInquiry?.id === id) setActiveInquiry(null);
    }
  };

  const newCount = inquiries.filter((i) => i.status === "new").length;
  const inProgressCount = inquiries.filter((i) => i.status === "in_progress").length;
  const resolvedCount = inquiries.filter((i) => i.status === "resolved").length;

  const parsedActive = activeInquiry ? parseInquiry(activeInquiry) : null;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">Inquiries & Applications</h1>
          <p className="text-sm text-slate-500 mt-1">
            Review, manage, and respond to incoming volunteer applications and visitor messages.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <span className="px-3 py-1 rounded-lg text-xs font-medium bg-slate-100 text-slate-700 border border-slate-200">
            Total: {inquiries.length}
          </span>
          {newCount > 0 && (
            <span className="px-3 py-1 rounded-lg text-xs font-medium bg-amber-50 text-amber-800 border border-amber-200 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
              {newCount} New
            </span>
          )}
        </div>
      </div>

      {/* Search and Filters Bar */}
      <div className="bg-white border border-slate-200 rounded-xl p-3.5 space-y-3 shadow-xs">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by name, email, phone, city, or message keyword..."
            className="pl-9 h-9.5 text-xs bg-slate-50 border-slate-200 focus-visible:bg-white rounded-lg transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 pt-1 border-t border-slate-100">
          {/* Status Filters */}
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-xs font-medium text-slate-400 mr-1 flex items-center gap-1">
              <Filter className="w-3.5 h-3.5" />
              Status:
            </span>
            {[
              { id: "all", label: "All", count: inquiries.length },
              { id: "new", label: "New", count: newCount },
              { id: "in_progress", label: "In Progress", count: inProgressCount },
              { id: "resolved", label: "Resolved", count: resolvedCount },
            ].map((st) => (
              <button
                key={st.id}
                onClick={() => setStatusFilter(st.id)}
                className={`h-7 px-2.5 rounded-md text-xs font-medium transition-all flex items-center gap-1.5 ${
                  statusFilter === st.id
                    ? "bg-slate-900 text-white shadow-xs"
                    : "bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200/80"
                }`}
              >
                <span>{st.label}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                    statusFilter === st.id ? "bg-white/20 text-white" : "bg-slate-200/70 text-slate-600"
                  }`}
                >
                  {st.count}
                </span>
              </button>
            ))}
          </div>

          {/* Type Filters */}
          <div className="flex items-center gap-1.5">
            <span className="text-xs font-medium text-slate-400 mr-1">Type:</span>
            {[
              { id: "all", label: "All" },
              { id: "volunteer", label: "Volunteer" },
              { id: "contact", label: "Contact" },
            ].map((tp) => (
              <button
                key={tp.id}
                onClick={() => setTypeFilter(tp.id)}
                className={`h-7 px-2.5 rounded-md text-xs font-medium capitalize transition-all ${
                  typeFilter === tp.id
                    ? "bg-slate-900 text-white shadow-xs"
                    : "bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200/80"
                }`}
              >
                {tp.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Inquiries List */}
      <div className="space-y-3">
        {filteredInquiries.map((inq) => {
          const parsed = parseInquiry(inq);
          return (
            <div
              key={inq.id}
              className="rounded-xl border border-slate-200 bg-white p-5 shadow-xs hover:border-slate-300 transition-all flex flex-col md:flex-row md:items-start justify-between gap-4 group"
            >
              <div className="space-y-3 min-w-0 flex-1">
                {/* Header Row */}
                <div className="flex flex-wrap items-center gap-2.5">
                  <span className="text-base font-bold text-slate-900">
                    {inq.name}
                  </span>

                  {/* Type Badge */}
                  <span
                    className={`inline-flex items-center gap-1 text-[11px] font-semibold px-2.5 py-0.5 rounded-full border ${
                      parsed.isVolunteer
                        ? "bg-emerald-50 text-emerald-800 border-emerald-200"
                        : "bg-blue-50 text-blue-800 border-blue-200"
                    }`}
                  >
                    {parsed.isVolunteer ? (
                      <HeartHandshake className="w-3 h-3 text-emerald-600" />
                    ) : (
                      <Mail className="w-3 h-3 text-blue-600" />
                    )}
                    {parsed.displayType}
                  </span>

                  {/* Inline Status Dropdown */}
                  <div className="relative inline-flex items-center">
                    <select
                      value={inq.status}
                      onChange={(e) => updateInquiryStatus(inq.id, e.target.value as Inquiry["status"])}
                      className={`text-[11px] font-semibold pl-2 pr-6 py-0.5 rounded-full border appearance-none cursor-pointer transition-colors focus:outline-none focus:ring-1 focus:ring-slate-400 ${
                        inq.status === "new"
                          ? "bg-amber-50 text-amber-800 border-amber-300 hover:bg-amber-100"
                          : inq.status === "in_progress"
                          ? "bg-sky-50 text-sky-800 border-sky-300 hover:bg-sky-100"
                          : "bg-emerald-50 text-emerald-800 border-emerald-300 hover:bg-emerald-100"
                      }`}
                    >
                      <option value="new">🟡 New</option>
                      <option value="in_progress">🔵 In Progress</option>
                      <option value="resolved">🟢 Resolved</option>
                    </select>
                    <ChevronDown className="w-3 h-3 text-slate-500 absolute right-1.5 pointer-events-none" />
                  </div>

                  {/* Timestamp */}
                  <span className="text-xs text-slate-400 flex items-center gap-1 ml-auto md:ml-1">
                    <Clock className="w-3 h-3 text-slate-400" />
                    {new Date(inq.createdAt).toLocaleDateString(undefined, {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </span>
                </div>

                {/* Contact Row */}
                <div className="flex flex-wrap items-center gap-4 text-xs text-slate-600">
                  {inq.email && (
                    <a
                      href={`mailto:${inq.email}?subject=${encodeURIComponent(
                        parsed.isVolunteer ? "SUHRID Volunteer Application" : "Regarding your inquiry with SUHRID"
                      )}`}
                      className="flex items-center gap-1.5 text-slate-600 hover:text-emerald-700 font-medium transition-colors"
                    >
                      <Mail className="w-3.5 h-3.5 text-slate-400" />
                      <span>{inq.email}</span>
                    </a>
                  )}
                  {inq.phone && (
                    <a
                      href={`tel:${inq.phone}`}
                      className="flex items-center gap-1.5 text-slate-600 hover:text-emerald-700 font-medium transition-colors"
                    >
                      <Phone className="w-3.5 h-3.5 text-slate-400" />
                      <span>{inq.phone}</span>
                    </a>
                  )}
                </div>

                {/* Structured Highlights */}
                {parsed.isVolunteer ? (
                  <div className="flex flex-wrap items-center gap-2 pt-1">
                    {parsed.city && (
                      <span className="inline-flex items-center gap-1 text-xs bg-slate-100 text-slate-700 px-2.5 py-1 rounded-md font-medium">
                        <MapPin className="w-3 h-3 text-slate-500" />
                        <span>{parsed.city}</span>
                      </span>
                    )}
                    {parsed.roleLabel && (
                      <span className="inline-flex items-center gap-1 text-xs bg-emerald-50 text-emerald-800 px-2.5 py-1 rounded-md font-medium border border-emerald-100">
                        <GraduationCap className="w-3 h-3 text-emerald-600" />
                        <span>{parsed.roleLabel}</span>
                      </span>
                    )}
                    {parsed.availabilityLabel && (
                      <span className="inline-flex items-center gap-1 text-xs bg-slate-100 text-slate-700 px-2.5 py-1 rounded-md font-medium">
                        <Clock className="w-3 h-3 text-slate-500" />
                        <span>{parsed.availabilityLabel}</span>
                      </span>
                    )}
                  </div>
                ) : (
                  parsed.subject && (
                    <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-700">
                      <MessageSquare className="w-3.5 h-3.5 text-blue-500" />
                      <span>Subject: {parsed.subject}</span>
                    </div>
                  )
                )}

                {/* Message / Personal Note */}
                {parsed.cleanMessage && (
                  <p className="text-xs text-slate-600 bg-slate-50/80 p-3 rounded-lg border border-slate-100 leading-relaxed italic">
                    "{parsed.cleanMessage}"
                  </p>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 shrink-0 self-end md:self-center pt-2 md:pt-0">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleOpenDetail(inq)}
                  className="h-8.5 px-3 rounded-lg border-slate-200 hover:bg-slate-100 text-xs font-semibold text-slate-700 gap-1.5 shadow-xs"
                >
                  <Eye className="w-3.5 h-3.5" />
                  View & Manage
                </Button>

                <button
                  type="button"
                  onClick={() => handleDelete(inq.id, inq.name)}
                  className="w-8.5 h-8.5 rounded-lg flex items-center justify-center text-slate-400 hover:text-red-600 hover:bg-red-50 border border-transparent hover:border-red-100 transition-colors"
                  title="Delete Submission"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {filteredInquiries.length === 0 && (
        <div className="text-center py-16 border border-dashed border-slate-200 rounded-xl bg-white">
          <Inbox className="w-10 h-10 text-slate-300 mx-auto mb-2" />
          <p className="text-sm font-semibold text-slate-700">No submissions found</p>
          <p className="text-xs text-slate-500 mt-1">
            {searchQuery
              ? "Try clearing your search query or adjusting your filters."
              : "Incoming contact messages and volunteer applications will be displayed here."}
          </p>
        </div>
      )}

      {/* Detail & Management Dialog */}
      <Dialog open={!!activeInquiry} onOpenChange={(open) => !open && setActiveInquiry(null)}>
        <DialogContent className="max-w-2xl bg-white border border-slate-200 text-slate-900 rounded-2xl shadow-2xl p-0 overflow-hidden">
          {activeInquiry && parsedActive && (
            <div>
              {/* Modal Top Banner */}
              <div className="p-6 bg-slate-50/80 border-b border-slate-200">
                <div className="flex flex-wrap items-center justify-between gap-3 mb-2">
                  <div className="flex items-center gap-2">
                    <span
                      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${
                        parsedActive.isVolunteer
                          ? "bg-emerald-100/70 text-emerald-800 border-emerald-300"
                          : "bg-blue-100/70 text-blue-800 border-blue-300"
                      }`}
                    >
                      {parsedActive.isVolunteer ? (
                        <HeartHandshake className="w-3.5 h-3.5 text-emerald-700" />
                      ) : (
                        <Mail className="w-3.5 h-3.5 text-blue-700" />
                      )}
                      {parsedActive.displayType}
                    </span>

                    <span className="text-xs text-slate-400 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      Received on {new Date(activeInquiry.createdAt).toLocaleString(undefined, {
                        dateStyle: "medium",
                        timeStyle: "short",
                      })}
                    </span>
                  </div>

                  {/* Status Dropdown */}
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-medium text-slate-500">Status:</span>
                    <select
                      value={activeInquiry.status}
                      onChange={(e) => {
                        const newStatus = e.target.value as Inquiry["status"];
                        updateInquiryStatus(activeInquiry.id, newStatus);
                        setActiveInquiry({ ...activeInquiry, status: newStatus });
                      }}
                      className={`text-xs font-semibold px-3 py-1.5 rounded-lg border cursor-pointer focus:outline-none transition-colors ${
                        activeInquiry.status === "new"
                          ? "bg-amber-50 text-amber-900 border-amber-300"
                          : activeInquiry.status === "in_progress"
                          ? "bg-sky-50 text-sky-900 border-sky-300"
                          : "bg-emerald-50 text-emerald-900 border-emerald-300"
                      }`}
                    >
                      <option value="new">🟡 New</option>
                      <option value="in_progress">🔵 In Progress</option>
                      <option value="resolved">🟢 Resolved</option>
                    </select>
                  </div>
                </div>

                <div className="flex items-center justify-between gap-4 mt-2">
                  <DialogTitle className="text-2xl font-black tracking-tight text-slate-900">
                    {activeInquiry.name}
                  </DialogTitle>

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setIsEditing(!isEditing)}
                    className="h-8 px-3 rounded-lg border-slate-200 text-xs font-semibold gap-1.5 hover:bg-white"
                  >
                    <Edit3 className="w-3.5 h-3.5 text-slate-600" />
                    {isEditing ? "Cancel Edit" : "Edit Details"}
                  </Button>
                </div>
              </div>

              {/* Modal Body */}
              <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto">
                {isEditing ? (
                  /* ============= EDIT MODE ============= */
                  <div className="space-y-4">
                    <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-800 flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
                      <span>You can correct applicant details, city, role interest, notes, or status below.</span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <Label className="text-xs font-bold text-slate-700">Full Name</Label>
                        <Input
                          value={editFormData.name}
                          onChange={(e) => setEditFormData({ ...editFormData, name: e.target.value })}
                          className="h-9 text-xs"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <Label className="text-xs font-bold text-slate-700">Email Address</Label>
                        <Input
                          type="email"
                          value={editFormData.email}
                          onChange={(e) => setEditFormData({ ...editFormData, email: e.target.value })}
                          className="h-9 text-xs"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <Label className="text-xs font-bold text-slate-700">Phone Number</Label>
                        <Input
                          value={editFormData.phone}
                          onChange={(e) => setEditFormData({ ...editFormData, phone: e.target.value })}
                          className="h-9 text-xs"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <Label className="text-xs font-bold text-slate-700">Current City / Location</Label>
                        <Input
                          value={editFormData.city}
                          onChange={(e) => setEditFormData({ ...editFormData, city: e.target.value })}
                          placeholder="e.g. Kolkata, Midnapore"
                          className="h-9 text-xs"
                        />
                      </div>

                      {parsedActive.isVolunteer && (
                        <>
                          <div className="space-y-1.5">
                            <Label className="text-xs font-bold text-slate-700">Role Interest</Label>
                            <select
                              value={editFormData.interest}
                              onChange={(e) => setEditFormData({ ...editFormData, interest: e.target.value })}
                              className="w-full h-9 rounded-md border border-input bg-background px-3 py-1 text-xs shadow-xs"
                            >
                              <option value="education">Education Support</option>
                              <option value="health">Health Camps</option>
                              <option value="livelihood">Livelihood Support</option>
                              <option value="events">Events & Outreach</option>
                            </select>
                          </div>

                          <div className="space-y-1.5">
                            <Label className="text-xs font-bold text-slate-700">Time Commitment</Label>
                            <select
                              value={editFormData.availability}
                              onChange={(e) => setEditFormData({ ...editFormData, availability: e.target.value })}
                              className="w-full h-9 rounded-md border border-input bg-background px-3 py-1 text-xs shadow-xs"
                            >
                              <option value="weekends">Weekends only</option>
                              <option value="flexible">Flexible hours</option>
                              <option value="occasional">Occasional Events</option>
                            </select>
                          </div>
                        </>
                      )}

                      {parsedActive.isContact && (
                        <div className="space-y-1.5 md:col-span-2">
                          <Label className="text-xs font-bold text-slate-700">Subject</Label>
                          <Input
                            value={editFormData.subject}
                            onChange={(e) => setEditFormData({ ...editFormData, subject: e.target.value })}
                            className="h-9 text-xs"
                          />
                        </div>
                      )}

                      <div className="space-y-1.5 md:col-span-2">
                        <Label className="text-xs font-bold text-slate-700">
                          {parsedActive.isVolunteer ? "Applicant Note / Statement" : "Message Body"}
                        </Label>
                        <Textarea
                          value={editFormData.note}
                          onChange={(e) => setEditFormData({ ...editFormData, note: e.target.value })}
                          rows={4}
                          className="text-xs"
                        />
                      </div>
                    </div>
                  </div>
                ) : (
                  /* ============= VIEW MODE ============= */
                  <div className="space-y-6">
                    {/* Contact Strip */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-between gap-3">
                        <div className="min-w-0">
                          <span className="text-[11px] font-bold text-slate-400 block uppercase tracking-wider">Email</span>
                          <span className="text-xs font-bold text-slate-900 truncate block">
                            {activeInquiry.email || "Not provided"}
                          </span>
                        </div>
                        {activeInquiry.email && (
                          <a
                            href={`mailto:${activeInquiry.email}?subject=${encodeURIComponent(
                              parsedActive.isVolunteer
                                ? `Regarding your SUHRID Volunteer Application`
                                : `SUHRID - Following up on your inquiry`
                            )}`}
                            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold shrink-0 transition-colors shadow-xs"
                          >
                            <Send className="w-3 h-3" />
                            Email
                          </a>
                        )}
                      </div>

                      <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-between gap-3">
                        <div className="min-w-0">
                          <span className="text-[11px] font-bold text-slate-400 block uppercase tracking-wider">Phone</span>
                          <span className="text-xs font-bold text-slate-900 truncate block">
                            {activeInquiry.phone || "Not provided"}
                          </span>
                        </div>
                        {activeInquiry.phone && (
                          <a
                            href={`tel:${activeInquiry.phone}`}
                            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold shrink-0 transition-colors shadow-xs"
                          >
                            <Phone className="w-3 h-3" />
                            Call
                          </a>
                        )}
                      </div>
                    </div>

                    {/* Volunteer Structured Card */}
                    {parsedActive.isVolunteer && (
                      <div className="space-y-4">
                        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                          Application Specifics
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80">
                            <div className="flex items-center gap-2 text-slate-500 mb-1">
                              <GraduationCap className="w-4 h-4 text-emerald-600" />
                              <span className="text-[11px] font-bold uppercase tracking-wider">Role Interest</span>
                            </div>
                            <div className="text-sm font-bold text-slate-900">
                              {parsedActive.roleLabel}
                            </div>
                          </div>

                          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80">
                            <div className="flex items-center gap-2 text-slate-500 mb-1">
                              <Clock className="w-4 h-4 text-blue-600" />
                              <span className="text-[11px] font-bold uppercase tracking-wider">Commitment</span>
                            </div>
                            <div className="text-sm font-bold text-slate-900">
                              {parsedActive.availabilityLabel}
                            </div>
                          </div>

                          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80">
                            <div className="flex items-center gap-2 text-slate-500 mb-1">
                              <MapPin className="w-4 h-4 text-amber-600" />
                              <span className="text-[11px] font-bold uppercase tracking-wider">City / Location</span>
                            </div>
                            <div className="text-sm font-bold text-slate-900 truncate">
                              {parsedActive.city || "Not specified"}
                            </div>
                          </div>
                        </div>

                        {/* Note */}
                        <div>
                          <Label className="text-xs font-bold text-slate-700 block mb-1.5">
                            Applicant Statement / Note
                          </Label>
                          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 text-xs text-slate-800 leading-relaxed font-medium italic">
                            "{parsedActive.cleanMessage}"
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Contact Message */}
                    {parsedActive.isContact && (
                      <div className="space-y-4">
                        {parsedActive.subject && (
                          <div>
                            <Label className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">
                              Subject
                            </Label>
                            <div className="p-3 rounded-lg bg-blue-50/70 border border-blue-100 text-xs font-bold text-blue-900">
                              {parsedActive.subject}
                            </div>
                          </div>
                        )}

                        <div>
                          <Label className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">
                            Message Content
                          </Label>
                          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 text-xs text-slate-800 leading-relaxed whitespace-pre-wrap">
                            {parsedActive.cleanMessage}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Modal Footer */}
              <DialogFooter className="p-4 bg-slate-50 border-t border-slate-200 flex flex-wrap items-center justify-between gap-2">
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => handleDelete(activeInquiry.id, activeInquiry.name)}
                  className="h-9 px-3 rounded-lg text-xs font-semibold text-red-600 hover:bg-red-50 hover:text-red-700 gap-1.5"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  Delete Submission
                </Button>

                <div className="flex items-center gap-2">
                  {isEditing ? (
                    <>
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setIsEditing(false)}
                        className="h-9 px-4 rounded-lg text-xs font-semibold"
                      >
                        Cancel
                      </Button>
                      <Button
                        type="button"
                        onClick={handleSaveEdit}
                        className="h-9 px-4 rounded-lg text-xs font-semibold bg-emerald-600 hover:bg-emerald-700 text-white gap-1.5 shadow-xs"
                      >
                        <Save className="w-3.5 h-3.5" />
                        Save Changes
                      </Button>
                    </>
                  ) : (
                    <>
                      {activeInquiry.status !== "resolved" ? (
                        <Button
                          type="button"
                          onClick={() => {
                            updateInquiryStatus(activeInquiry.id, "resolved");
                            setActiveInquiry({ ...activeInquiry, status: "resolved" });
                          }}
                          className="h-9 px-4 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold gap-1.5 shadow-xs"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          Mark as Resolved
                        </Button>
                      ) : (
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => {
                            updateInquiryStatus(activeInquiry.id, "new");
                            setActiveInquiry({ ...activeInquiry, status: "new" });
                          }}
                          className="h-9 px-4 rounded-lg border-amber-200 bg-amber-50 text-amber-800 hover:bg-amber-100 text-xs font-semibold gap-1.5"
                        >
                          <RotateCcw className="w-3.5 h-3.5" />
                          Reopen as New
                        </Button>
                      )}

                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setActiveInquiry(null)}
                        className="h-9 px-4 rounded-lg text-xs font-semibold border-slate-200 text-slate-700 hover:bg-slate-100"
                      >
                        Close
                      </Button>
                    </>
                  )}
                </div>
              </DialogFooter>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};
