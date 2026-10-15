import React, { useState, useMemo } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { useCMS, CommunityEvent } from "@/context/CMSContext";
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  Phone,
  HeartHandshake,
  Search,
  Filter,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  X,
  Send,
  MessageCircle,
} from "lucide-react";
import { toast } from "sonner";
import { Link } from "react-router-dom";

const categories = [
  "All",
  "Health Camp",
  "Education Drive",
  "Youth Summit",
  "Elderly Care",
  "Community Welfare",
] as const;

export const Events: React.FC = () => {
  const { events, addInquiry } = useCMS();
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [statusFilter, setStatusFilter] = useState<"all" | "upcoming" | "active" | "completed">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedEventForRsvp, setSelectedEventForRsvp] = useState<CommunityEvent | null>(null);

  // RSVP / Volunteer modal form state
  const [rsvpName, setRsvpName] = useState("");
  const [rsvpPhone, setRsvpPhone] = useState("");
  const [rsvpEmail, setRsvpEmail] = useState("");
  const [rsvpNotes, setRsvpNotes] = useState("");
  const [isSubmittingRsvp, setIsSubmittingRsvp] = useState(false);

  // Filtered Events
  const filteredEvents = useMemo(() => {
    return (events || []).filter((evt) => {
      const matchesCategory = selectedCategory === "All" || evt.category === selectedCategory;
      const matchesStatus = statusFilter === "all" || evt.status === statusFilter;
      const matchesSearch =
        evt.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        evt.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        evt.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (evt.centerName && evt.centerName.toLowerCase().includes(searchQuery.toLowerCase()));

      return matchesCategory && matchesStatus && matchesSearch;
    });
  }, [events, selectedCategory, statusFilter, searchQuery]);

  // Featured Event (first upcoming or active event)
  const featuredEvent = useMemo(() => {
    return (events || []).find((e) => e.status === "active" || e.status === "upcoming") || events?.[0];
  }, [events]);

  const handleRsvpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!rsvpName.trim() || !rsvpPhone.trim()) {
      toast.error("Please provide your name and phone number");
      return;
    }

    setIsSubmittingRsvp(true);
    try {
      await addInquiry({
        type: "volunteer",
        name: rsvpName,
        phone: rsvpPhone,
        email: rsvpEmail,
        message: `RSVP / Volunteer registration for event: "${selectedEventForRsvp?.title}". Notes: ${rsvpNotes}`,
        data: {
          eventId: selectedEventForRsvp?.id,
          eventTitle: selectedEventForRsvp?.title,
          eventDate: selectedEventForRsvp?.date,
          eventLocation: selectedEventForRsvp?.location,
        },
      });

      toast.success("Thank you! Your registration has been received. Our coordinator will contact you.");
      setSelectedEventForRsvp(null);
      setRsvpName("");
      setRsvpPhone("");
      setRsvpEmail("");
      setRsvpNotes("");
    } catch {
      toast.error("Failed to submit registration. Please try again.");
    } finally {
      setIsSubmittingRsvp(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Header />

      <main className="flex-1 overflow-x-hidden">
        {/* Hero Section */}
        <section className="pt-32 pb-20 md:pt-48 md:pb-28 bg-[#FAFAF9] border-b border-secondary/5">
          <div className="container mx-auto px-6 md:px-10">
            <div className="max-w-4xl">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary-dark font-black text-xs uppercase tracking-widest mb-6">
                <Sparkles className="w-3.5 h-3.5" />
                Community Mobilization & Outreach
              </div>

              <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tightest leading-[0.95] text-secondary mb-8">
                Grassroots Gatherings <br />
                <span className="text-primary-dark">& Health Camps.</span>
              </h1>

              <p className="text-lg md:text-2xl text-secondary/70 font-medium leading-relaxed max-w-2xl mb-10">
                Direct on-ground interventions bringing specialist doctors, eye checkups, student workshops, and elderly care directly to rural communities across Bengal.
              </p>

              <div className="flex flex-wrap items-center gap-4">
                <a
                  href="#events-list"
                  className="px-8 py-4 rounded-full bg-secondary text-white font-black text-xs uppercase tracking-widest hover:bg-black transition-all shadow-lg flex items-center gap-2"
                >
                  Explore Schedule
                  <ArrowRight className="w-4 h-4" />
                </a>
                <Link
                  to="/contact"
                  className="px-8 py-4 rounded-full bg-white text-secondary font-black text-xs uppercase tracking-widest hover:bg-stone-100 transition-all border border-secondary/10 shadow-sm"
                >
                  Request a Camp in your Village
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Spotlight Event */}
        {featuredEvent && (
          <section className="py-12 bg-white">
            <div className="container mx-auto px-6 md:px-10">
              <div className="bg-gradient-to-br from-stone-900 to-stone-950 text-white rounded-5xl overflow-hidden shadow-2xl relative">
                <div className="grid lg:grid-cols-12 items-center">
                  <div className="lg:col-span-7 p-8 md:p-14 lg:p-16 z-10">
                    <div className="flex items-center gap-3 mb-6">
                      <span className="px-3.5 py-1 rounded-full bg-primary-dark text-white text-[10px] font-black uppercase tracking-widest">
                        Spotlight Initiative
                      </span>
                      <span
                        className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${
                          featuredEvent.status === "active"
                            ? "bg-emerald-500 text-white animate-pulse"
                            : "bg-white/20 text-white/90"
                        }`}
                      >
                        {featuredEvent.status === "active" ? "Live Today" : "Next Upcoming"}
                      </span>
                    </div>

                    <h2 className="text-3xl md:text-5xl font-black tracking-tightest mb-6 leading-tight">
                      {featuredEvent.title}
                    </h2>

                    <p className="text-white/70 text-base md:text-lg font-medium leading-relaxed mb-8 max-w-xl">
                      {featuredEvent.description}
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-white/80 mb-10 pb-8 border-b border-white/10">
                      <div className="flex items-center gap-3">
                        <Calendar className="w-5 h-5 text-primary shrink-0" />
                        <div>
                          <p className="text-[10px] uppercase font-bold text-white/40">Date & Schedule</p>
                          <p className="font-bold">{featuredEvent.date}</p>
                          {featuredEvent.time && <p className="text-xs text-white/60">{featuredEvent.time}</p>}
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <MapPin className="w-5 h-5 text-primary shrink-0" />
                        <div>
                          <p className="text-[10px] uppercase font-bold text-white/40">Location</p>
                          <p className="font-bold">{featuredEvent.location}</p>
                          {featuredEvent.centerName && (
                            <p className="text-xs text-primary">{featuredEvent.centerName}</p>
                          )}
                        </div>
                      </div>

                      {featuredEvent.coordinatorContact && (
                        <div className="flex items-center gap-3 sm:col-span-2">
                          <Phone className="w-5 h-5 text-primary shrink-0" />
                          <div>
                            <p className="text-[10px] uppercase font-bold text-white/40">Coordinator Contact</p>
                            <p className="font-bold">
                              {featuredEvent.coordinatorName ? `${featuredEvent.coordinatorName} — ` : ""}
                              <a
                                href={`tel:${featuredEvent.coordinatorContact}`}
                                className="text-primary hover:underline"
                              >
                                {featuredEvent.coordinatorContact}
                              </a>
                            </p>
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="flex flex-wrap items-center gap-4">
                      <Button
                        onClick={() => setSelectedEventForRsvp(featuredEvent)}
                        className="rounded-full bg-primary hover:bg-primary-dark text-white font-black text-xs uppercase tracking-widest px-8 py-6 h-auto shadow-lg"
                      >
                        <HeartHandshake className="w-4 h-4 mr-2" />
                        Volunteer / Attend this Camp
                      </Button>

                      {featuredEvent.coordinatorContact && (
                        <a
                          href={`https://wa.me/${featuredEvent.coordinatorContact.replace(/[^0-9]/g, "")}`}
                          target="_blank"
                          rel="noreferrer"
                          className="px-6 py-4 rounded-full bg-emerald-600/30 hover:bg-emerald-600 text-white border border-emerald-500/40 font-bold text-xs uppercase tracking-wider transition-all inline-flex items-center gap-2"
                        >
                          <MessageCircle className="w-4 h-4 text-emerald-400" />
                          WhatsApp Coordinator
                        </a>
                      )}
                    </div>
                  </div>

                  <div className="lg:col-span-5 h-72 lg:h-full min-h-[350px] relative overflow-hidden">
                    <img
                      src={
                        featuredEvent.image ||
                        "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?q=80&w=2070&auto=format&fit=crop"
                      }
                      alt={featuredEvent.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-stone-950 via-stone-950/40 to-transparent" />
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Filter Controls & Search */}
        <section id="events-list" className="py-12 bg-white">
          <div className="container mx-auto px-6 md:px-10">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b border-secondary/10">
              {/* Category Pills */}
              <div className="flex flex-wrap items-center gap-2">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${
                      selectedCategory === cat
                        ? "bg-secondary text-white shadow-md"
                        : "bg-stone-100 text-secondary/60 hover:bg-stone-200"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Status and Search */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                {/* Status Toggle */}
                <div className="inline-flex p-1 bg-stone-100 rounded-full border border-secondary/5 text-xs font-bold">
                  {(["all", "upcoming", "active", "completed"] as const).map((st) => (
                    <button
                      key={st}
                      onClick={() => setStatusFilter(st)}
                      className={`px-3 py-1.5 rounded-full capitalize transition-all ${
                        statusFilter === st ? "bg-white text-secondary shadow-sm" : "text-secondary/50 hover:text-secondary"
                      }`}
                    >
                      {st}
                    </button>
                  ))}
                </div>

                {/* Search */}
                <div className="relative min-w-[220px]">
                  <Search className="w-4 h-4 text-secondary/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search venue or camp..."
                    className="w-full pl-9 pr-4 py-2 rounded-full bg-stone-50 border border-secondary/10 text-xs text-secondary placeholder:text-secondary/40 focus:outline-none focus:ring-2 focus:ring-primary/20"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery("")}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-secondary/40 hover:text-secondary"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Results Counter */}
            <div className="py-6 flex items-center justify-between text-xs text-secondary/50 font-bold uppercase tracking-wider">
              <span>Showing {filteredEvents.length} Gatherings</span>
              {selectedCategory !== "All" && (
                <button
                  onClick={() => setSelectedCategory("All")}
                  className="text-primary hover:underline font-bold"
                >
                  Clear Category Filter
                </button>
              )}
            </div>

            {/* Events Grid */}
            {filteredEvents.length === 0 ? (
              <div className="text-center py-24 bg-stone-50 rounded-5xl border border-dashed border-secondary/10">
                <Filter className="w-10 h-10 text-secondary/30 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-secondary mb-2">No camps found</h3>
                <p className="text-sm text-secondary/60 max-w-md mx-auto mb-6">
                  There are no scheduled events matching your current filters. Try selecting another category or clear search terms.
                </p>
                <Button
                  onClick={() => {
                    setSelectedCategory("All");
                    setStatusFilter("all");
                    setSearchQuery("");
                  }}
                  variant="outline"
                  className="rounded-full"
                >
                  Reset All Filters
                </Button>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredEvents.map((event) => (
                  <div
                    key={event.id}
                    className="bg-white rounded-[2rem] border border-secondary/10 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
                  >
                    <div>
                      {/* Image Thumbnail */}
                      <div className="h-52 w-full relative overflow-hidden bg-stone-100">
                        <img
                          src={
                            event.image ||
                            "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?q=80&w=1200&auto=format&fit=crop"
                          }
                          alt={event.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                        <div className="absolute top-4 left-4">
                          <span className="px-3 py-1 rounded-full bg-white/95 backdrop-blur-md text-secondary font-black text-[10px] uppercase tracking-wider shadow-sm">
                            {event.category}
                          </span>
                        </div>
                        <div className="absolute top-4 right-4">
                          <span
                            className={`px-2.5 py-1 rounded-full text-[9px] font-black uppercase tracking-wider shadow-sm ${
                              event.status === "active"
                                ? "bg-emerald-500 text-white animate-pulse"
                                : event.status === "upcoming"
                                ? "bg-amber-100 text-amber-900 border border-amber-300"
                                : "bg-stone-200 text-stone-600"
                            }`}
                          >
                            {event.status}
                          </span>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-8">
                        <h3 className="text-2xl font-black tracking-tightest text-secondary mb-3 group-hover:text-primary-dark transition-colors">
                          {event.title}
                        </h3>

                        <p className="text-secondary/70 text-sm font-medium leading-relaxed line-clamp-3 mb-6">
                          {event.description}
                        </p>

                        <div className="space-y-3 text-xs text-secondary/80 pt-4 border-t border-secondary/5">
                          <div className="flex items-start gap-2.5">
                            <Calendar className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                            <div>
                              <span className="font-bold text-secondary">{event.date}</span>
                              {event.time && <span className="text-secondary/50 ml-1">({event.time})</span>}
                            </div>
                          </div>

                          <div className="flex items-start gap-2.5">
                            <MapPin className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                            <div>
                              <span className="font-semibold text-secondary">{event.location}</span>
                              {event.centerName && (
                                <p className="text-[11px] text-primary-dark font-bold">{event.centerName}</p>
                              )}
                            </div>
                          </div>

                          {event.coordinatorContact && (
                            <div className="flex items-center gap-2.5">
                              <Phone className="w-4 h-4 text-primary shrink-0" />
                              <span>
                                {event.coordinatorName ? `${event.coordinatorName}: ` : "Helpdesk: "}
                                <a
                                  href={`tel:${event.coordinatorContact}`}
                                  className="font-bold text-secondary hover:text-primary transition-colors"
                                >
                                  {event.coordinatorContact}
                                </a>
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Action Footer */}
                    <div className="p-6 bg-stone-50 border-t border-secondary/5 flex items-center justify-between gap-3">
                      <Button
                        onClick={() => setSelectedEventForRsvp(event)}
                        variant="ghost"
                        className="text-xs font-black uppercase tracking-wider text-secondary hover:text-primary hover:bg-white p-0 h-auto"
                      >
                        Participate / Register &rarr;
                      </Button>

                      {event.coordinatorContact && (
                        <a
                          href={`https://wa.me/${event.coordinatorContact.replace(/[^0-9]/g, "")}`}
                          target="_blank"
                          rel="noreferrer"
                          className="h-9 w-9 rounded-full bg-emerald-100 text-emerald-700 hover:bg-emerald-200 flex items-center justify-center transition-colors"
                          title="Chat with Coordinator on WhatsApp"
                        >
                          <MessageCircle className="w-4 h-4" />
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Camp Request / Host an Event Banner */}
        <section className="py-20 md:py-32 bg-[#FAFAF9] border-t border-secondary/5">
          <div className="container mx-auto px-6 md:px-10">
            <div className="max-w-4xl mx-auto bg-primary text-white rounded-5xl p-10 md:p-16 text-center relative overflow-hidden shadow-2xl">
              <div className="relative z-10">
                <span className="text-[11px] font-black uppercase tracking-[0.3em] text-white/80 block mb-4">
                  BRING AN INITIATIVE TO YOUR LOCAL AREA
                </span>
                <h2 className="text-4xl md:text-6xl font-black tracking-tightest mb-6">
                  Want to Host a Health Camp or Educational Workshop?
                </h2>
                <p className="text-white/80 text-lg md:text-xl font-medium max-w-2xl mx-auto mb-10 leading-relaxed">
                  We collaborate with village panchayats, community schools, and local volunteers to set up free medical camps and eye screening programs.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Button
                    className="bg-secondary text-white hover:bg-black rounded-full px-10 py-7 h-auto font-black uppercase tracking-widest text-xs shadow-xl"
                    asChild
                  >
                    <Link to="/contact">Submit Camp Request</Link>
                  </Button>
                  <Button
                    className="bg-white/20 hover:bg-white/30 text-white rounded-full px-10 py-7 h-auto font-black uppercase tracking-widest text-xs border border-white/30"
                    asChild
                  >
                    <Link to="/volunteer">Join as a Medical Volunteer</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Volunteer / Attend Modal */}
      {selectedEventForRsvp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-5xl max-w-lg w-full p-8 shadow-2xl border border-secondary/10 relative max-h-[90vh] overflow-y-auto animate-in fade-in zoom-in-95 duration-200">
            <button
              onClick={() => setSelectedEventForRsvp(null)}
              className="absolute top-6 right-6 p-2 rounded-full bg-stone-100 hover:bg-stone-200 text-secondary transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="mb-6">
              <span className="px-3 py-1 rounded-full bg-primary/10 text-primary-dark font-black text-[10px] uppercase tracking-wider inline-block mb-3">
                Event Registration
              </span>
              <h3 className="text-2xl font-black tracking-tightest text-secondary">
                {selectedEventForRsvp.title}
              </h3>
              <p className="text-xs text-secondary/60 mt-1">
                {selectedEventForRsvp.date} • {selectedEventForRsvp.location}
              </p>
            </div>

            <form onSubmit={handleRsvpSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-secondary/70 mb-1.5">
                  Your Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={rsvpName}
                  onChange={(e) => setRsvpName(e.target.value)}
                  placeholder="e.g. Subir Karmakar"
                  className="w-full px-4 py-3 rounded-2xl bg-stone-50 border border-secondary/10 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-secondary/70 mb-1.5">
                  Phone / WhatsApp Number *
                </label>
                <input
                  type="tel"
                  required
                  value={rsvpPhone}
                  onChange={(e) => setRsvpPhone(e.target.value)}
                  placeholder="+91 98765 43210"
                  className="w-full px-4 py-3 rounded-2xl bg-stone-50 border border-secondary/10 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-secondary/70 mb-1.5">
                  Email Address (Optional)
                </label>
                <input
                  type="email"
                  value={rsvpEmail}
                  onChange={(e) => setRsvpEmail(e.target.value)}
                  placeholder="yourname@gmail.com"
                  className="w-full px-4 py-3 rounded-2xl bg-stone-50 border border-secondary/10 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-secondary/70 mb-1.5">
                  How would you like to participate?
                </label>
                <textarea
                  rows={3}
                  value={rsvpNotes}
                  onChange={(e) => setRsvpNotes(e.target.value)}
                  placeholder="e.g. Attending for medical checkup, or interested in volunteering as doctor/assistant..."
                  className="w-full px-4 py-3 rounded-2xl bg-stone-50 border border-secondary/10 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none"
                />
              </div>

              <div className="pt-4 flex items-center gap-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setSelectedEventForRsvp(null)}
                  className="flex-1 rounded-full py-6 font-bold"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={isSubmittingRsvp}
                  className="flex-1 rounded-full py-6 bg-primary hover:bg-primary-dark text-white font-black uppercase tracking-wider text-xs shadow-lg"
                >
                  {isSubmittingRsvp ? "Submitting..." : "Confirm Registration"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default Events;
