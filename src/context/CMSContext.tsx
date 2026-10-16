import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";
import { storiesData as initialStories, testimonials as initialTestimonials, Story } from "@/data/stories";
import { galleryImages as initialGallery, GalleryImage } from "@/data/gallery";
import { allPrograms as initialPrograms, Program } from "@/data/programs";
import { impactStatsData as initialImpactStats } from "@/data/impact-stats";
import { indexHeroSlides as initialHeroSlides } from "@/data/hero-slides";
import { centersData as initialCenters, Center } from "@/data/centers";
import { toast } from "sonner";

export interface DynamicImpactStat {
  id: string;
  value: string;
  label: string;
  iconName: string;
}

export interface DynamicHeroSlide {
  id?: string;
  title: string;
  description: string;
  image: string;
  alt?: string;
}

export interface HomepageHero {
  title: string;
  highlightWord: string;
  description: string;
  image: string;
  primaryActionText: string;
  primaryActionHref: string;
  secondaryActionText: string;
  secondaryActionHref: string;
}

export interface DynamicTestimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  category?: string;
}

export interface SiteSettings {
  siteName: string;
  siteLogo: string;
  siteTagline: string;
  siteFavicon: string;
  bankName: string;
  accountName: string;
  accountNumber: string;
  ifscCode: string;
  branch: string;
  upiId: string;
  upiQrImage: string;
  taxExemption: string;
  contactEmail: string;
  contactPhone: string;
  whatsapp: string;
  address: string;
  announcementEnabled: boolean;
  announcementMessage: string;
  announcementLink: string;
}

export interface Inquiry {
  id: string;
  type: "contact" | "volunteer" | "donation_pledge";
  name: string;
  email?: string;
  phone?: string;
  message?: string;
  data?: Record<string, unknown>;
  status: "new" | "in_progress" | "resolved";
  createdAt: string;
}

export interface DynamicTeamMember {
  id: string;
  name: string;
  role: string;
  image: string;
  bio: string;
  category?: string;
}

export interface TransparencyReport {
  id: string;
  title: string;
  year: string;
  category: "Annual Impact" | "Financial Audit" | "Legal & 80G";
  fileUrl: string;
  fileSize?: string;
  description?: string;
}

export interface CommunityEvent {
  id: string;
  title: string;
  category: "Health Camp" | "Education Drive" | "Youth Summit" | "Elderly Care" | "Community Welfare";
  date: string;
  time?: string;
  location: string;
  centerName?: string;
  description: string;
  image?: string;
  status: "upcoming" | "completed" | "active";
  coordinatorName?: string;
  coordinatorContact?: string;
}

interface CMSContextType {
  stories: Story[];
  gallery: GalleryImage[];
  programs: Program[];
  impactStats: DynamicImpactStat[];
  testimonials: DynamicTestimonial[];
  heroSlides: DynamicHeroSlide[];
  homepageHero: HomepageHero;
  siteSettings: SiteSettings;
  inquiries: Inquiry[];
  isCloudConnected: boolean;
  isSyncing: boolean;

  // Grassroots Centers CRUD
  centers: Center[];
  addCenter: (center: Center) => Promise<void>;
  updateCenter: (id: string, updated: Partial<Center>) => Promise<void>;
  deleteCenter: (id: string) => Promise<void>;

  // Leadership & Team CRUD
  teamMembers: DynamicTeamMember[];
  addTeamMember: (member: Omit<DynamicTeamMember, "id"> & { id?: string }) => Promise<void>;
  updateTeamMember: (id: string, updated: Partial<DynamicTeamMember>) => Promise<void>;
  deleteTeamMember: (id: string) => Promise<void>;

  // Transparency Reports CRUD
  reports: TransparencyReport[];
  addReport: (report: Omit<TransparencyReport, "id"> & { id?: string }) => Promise<void>;
  updateReport: (id: string, updated: Partial<TransparencyReport>) => Promise<void>;
  deleteReport: (id: string) => Promise<void>;

  // Community Events CRUD
  events: CommunityEvent[];
  addEvent: (event: Omit<CommunityEvent, "id"> & { id?: string }) => Promise<void>;
  updateEvent: (id: string, updated: Partial<CommunityEvent>) => Promise<void>;
  deleteEvent: (id: string) => Promise<void>;

  // Homepage Hero
  updateHomepageHero: (heroUpdate: Partial<HomepageHero>) => Promise<void>;

  // Story CRUD
  addStory: (story: Omit<Story, "id"> & { id?: string }) => Promise<void>;
  updateStory: (id: string, updated: Partial<Story>) => Promise<void>;
  deleteStory: (id: string) => Promise<void>;

  // Gallery CRUD
  addGalleryImage: (img: GalleryImage) => Promise<void>;
  updateGalleryImage: (index: number, updated: Partial<GalleryImage>) => Promise<void>;
  deleteGalleryImage: (index: number) => Promise<void>;

  // Programs CRUD
  addProgram: (prog: Program) => Promise<void>;
  updateProgram: (id: string, updated: Partial<Program>) => Promise<void>;
  deleteProgram: (id: string) => Promise<void>;

  // Impact Stats & Hero Slides
  updateImpactStat: (id: string, updated: Partial<DynamicImpactStat>) => Promise<void>;
  updateHeroSlide: (index: number, updated: Partial<DynamicHeroSlide>) => Promise<void>;
  addHeroSlide: (slide: DynamicHeroSlide) => Promise<void>;
  deleteHeroSlide: (index: number) => Promise<void>;

  // Testimonials CRUD
  addTestimonial: (t: Omit<DynamicTestimonial, "id">) => Promise<void>;
  updateTestimonial: (id: string, updated: Partial<DynamicTestimonial>) => Promise<void>;
  deleteTestimonial: (id: string) => Promise<void>;

  // Site Settings
  updateSiteSettings: (settings: Partial<SiteSettings>) => Promise<void>;

  // Inquiries
  addInquiry: (inquiry: Omit<Inquiry, "id" | "status" | "createdAt">) => Promise<void>;
  updateInquiry: (id: string, updated: Partial<Inquiry>) => Promise<void>;
  updateInquiryStatus: (id: string, status: Inquiry["status"]) => Promise<void>;
  deleteInquiry: (id: string) => Promise<void>;

  // Backups & Maintenance
  exportDataJSON: () => string;
  importDataJSON: (jsonString: string) => boolean;
  resetToDefaults: () => void;
  syncWithCloud: () => Promise<void>;
}

const STORAGE_KEY = "suhrid_dynamic_cms_v2";

export const defaultHomepageHero: HomepageHero = {
  title: "Living.",
  highlightWord: "Intentional",
  description: "A group of young people who believe in being happy by sharing happiness with others. Serving others as worship.",
  image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=2070&auto=format&fit=crop",
  primaryActionText: "Join the Movement",
  primaryActionHref: "/volunteer",
  secondaryActionText: "Learn Our Story",
  secondaryActionHref: "/about",
};

const defaultSettings: SiteSettings = {
  siteName: "SUHRID",
  siteLogo: "",
  siteTagline: "Sharing happiness to create an empowered, self-reliant rural world.",
  siteFavicon: "/favicon.ico",
  bankName: "State Bank of India",
  accountName: "CHIROSUHRID FOUNDATION",
  accountNumber: "42109876543",
  ifscCode: "SBIN0001234",
  branch: "Kolkata Main Branch",
  upiId: "suhrid@sbi",
  upiQrImage: "https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=upi://pay?pa=suhrid@sbi&pn=CHIROSUHRID%20FOUNDATION&cu=INR",
  taxExemption: "80G Certified — 50% Tax Relief on all donations (Reg: AAATC0000PF20231)",
  contactEmail: "contact@suhrid.org",
  contactPhone: "+91 98765 43210",
  whatsapp: "+91 98765 43210",
  address: "Kolkata, West Bengal, India",
  announcementEnabled: false,
  announcementMessage: "Welcome to Chirosuhrid! Join our community mission to bring education and health to all.",
  announcementLink: "/impact",
};

const defaultDynamicStats: DynamicImpactStat[] = [
  { id: "stat-1", value: "2,000+", label: "Lives Touched", iconName: "TrendingUp" },
  { id: "stat-2", value: "12", label: "Active Partners", iconName: "Heart" },
  { id: "stat-3", value: "100+", label: "Children Enrolled", iconName: "Users" },
  { id: "stat-4", value: "50+", label: "Elderly Supported", iconName: "Briefcase" },
];

const defaultDynamicTestimonials: DynamicTestimonial[] = initialTestimonials.map((t, idx) => ({
  id: `testim-${idx + 1}`,
  ...t,
}));

const defaultDynamicHeroSlides: DynamicHeroSlide[] = [
  {
    id: "slide-1",
    title: "Intentional Living.",
    description: "A group of young people who believe in being happy by sharing happiness with others. Serving others as worship.",
    image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=2070&auto=format&fit=crop",
    alt: "Chirosuhrid community child",
  },
  ...initialHeroSlides.slice(1).map((s, idx) => ({
    id: `slide-${idx + 2}`,
    ...s,
  })),
];

const defaultTeamMembers: DynamicTeamMember[] = [
  {
    id: "team-1",
    name: "Our Team.",
    role: "Core Collective",
    image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=1932&auto=format&fit=crop",
    bio: "A collective of dedicated young minds working toward transformative impact across rural Bengal.",
    category: "Leadership",
  },
  {
    id: "team-2",
    name: "Balaram Das Adhikary",
    role: "Director",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1064&auto=format&fit=crop",
    bio: "Driving strategic initiatives, student mentorship, and community engagement.",
    category: "Director",
  },
  {
    id: "team-3",
    name: "Arun Tarai",
    role: "Director",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=987&auto=format&fit=crop",
    bio: "Managing grassroots operations, artisan marketplace, and rural growth programs.",
    category: "Director",
  },
];

const defaultReports: TransparencyReport[] = [
  {
    id: "rep-1",
    title: "Annual Impact & Transparency Report 2023-2024",
    year: "2023-2024",
    category: "Annual Impact",
    fileUrl: "/suhrid-impact-report.xlsx",
    fileSize: "1.2 MB",
    description: "Detailed analytics on SUGYAN scholarships, elderly medical care, and village education centers.",
  },
  {
    id: "rep-2",
    title: "Statutory Audited Financial Statements",
    year: "2022-2023",
    category: "Financial Audit",
    fileUrl: "/suhrid-impact-report.xlsx",
    fileSize: "850 KB",
    description: "Auditor balance sheet, income & expenditure account, and receipt-payment schedules.",
  },
  {
    id: "rep-3",
    title: "Section 80G & 12A Tax Exemption Approval",
    year: "Perpetual",
    category: "Legal & 80G",
    fileUrl: "#",
    fileSize: "420 KB",
    description: "Income Tax Department recognition certifying 50% tax deduction for Indian donors.",
  },
];

const defaultEvents: CommunityEvent[] = [
  {
    id: "evt-1",
    title: "Comprehensive Eye Clinic & Health Camp",
    category: "Health Camp",
    date: "Upcoming Sunday, 9:00 AM",
    time: "09:00 AM - 04:00 PM",
    location: "Midnapore Center, Paschim Medinipur",
    centerName: "Midnapore Center",
    description: "Free vision screening, cataract detection, doctor consultations, and essential medicine distribution for rural families.",
    image: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?q=80&w=2070&auto=format&fit=crop",
    status: "upcoming",
    coordinatorName: "Arun Tarai",
    coordinatorContact: "+91 97327 34055",
  },
  {
    id: "evt-2",
    title: "Yuva Sammelan 2024 - Youth Leadership Summit",
    category: "Youth Summit",
    date: "November 24, 2024",
    time: "10:00 AM - 05:00 PM",
    location: "Nasra Center, Nadia",
    centerName: "Nasra Center",
    description: "Annual gathering of student scholars and mentors exploring character building, competitive exam prep, and community service.",
    image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=1170&auto=format&fit=crop",
    status: "upcoming",
    coordinatorName: "Balaram Das Adhikary",
    coordinatorContact: "+91 97327 34055",
  },
  {
    id: "evt-3",
    title: "SRICHARANESHU - Winter Warmth & Ration Drive",
    category: "Elderly Care",
    date: "December 15, 2024",
    time: "11:00 AM - 03:00 PM",
    location: "Gama Center, Purba Medinipur",
    centerName: "Gama Center",
    description: "Distributing warm blankets, winter garments, and monthly nutritious rations to elderly village residents.",
    image: "https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?q=80&w=2070&auto=format&fit=crop",
    status: "upcoming",
    coordinatorName: "Subhendu Maity",
    coordinatorContact: "+91 97327 34055",
  },
];

const CMSContext = createContext<CMSContextType | undefined>(undefined);

export const CMSProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const isCloudConnected = isSupabaseConfigured();
  const [isSyncing, setIsSyncing] = useState<boolean>(false);

  // Core State
  const [stories, setStories] = useState<Story[]>(initialStories);
  const [gallery, setGallery] = useState<GalleryImage[]>(initialGallery);
  const [programs, setPrograms] = useState<Program[]>(initialPrograms);
  const [impactStats, setImpactStats] = useState<DynamicImpactStat[]>(defaultDynamicStats);
  const [testimonials, setTestimonials] = useState<DynamicTestimonial[]>(defaultDynamicTestimonials);
  const [heroSlides, setHeroSlides] = useState<DynamicHeroSlide[]>(defaultDynamicHeroSlides);
  const [homepageHero, setHomepageHero] = useState<HomepageHero>(defaultHomepageHero);
  const [siteSettings, setSiteSettings] = useState<SiteSettings>(defaultSettings);
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);

  // New Domain State
  const [centers, setCenters] = useState<Center[]>(initialCenters);
  const [teamMembers, setTeamMembers] = useState<DynamicTeamMember[]>(defaultTeamMembers);
  const [reports, setReports] = useState<TransparencyReport[]>(defaultReports);
  const [events, setEvents] = useState<CommunityEvent[]>(defaultEvents);

  // 1. Initial Load from LocalStorage or Seed Defaults
  useEffect(() => {
    try {
      // Check v2 key first, then fall back to v1
      const savedData = localStorage.getItem(STORAGE_KEY) || localStorage.getItem("suhrid_dynamic_cms_v1");
      if (savedData) {
        const parsed = JSON.parse(savedData);
        if (parsed.stories?.length) setStories(parsed.stories);
        if (parsed.gallery?.length) setGallery(parsed.gallery);
        if (parsed.programs?.length) setPrograms(parsed.programs);
        if (parsed.impactStats?.length) setImpactStats(parsed.impactStats);
        if (parsed.testimonials?.length) setTestimonials(parsed.testimonials);
        if (parsed.heroSlides?.length) setHeroSlides(parsed.heroSlides);
        if (parsed.siteSettings) setSiteSettings({ ...defaultSettings, ...parsed.siteSettings });
        if (parsed.inquiries?.length) setInquiries(parsed.inquiries);

        if (parsed.centers?.length) setCenters(parsed.centers);
        if (parsed.teamMembers?.length) setTeamMembers(parsed.teamMembers);
        if (parsed.reports?.length) setReports(parsed.reports);
        if (parsed.events?.length) setEvents(parsed.events);

        if (parsed.homepageHero && parsed.homepageHero.image) {
          setHomepageHero(parsed.homepageHero);
        } else if (parsed.heroSlides?.length && parsed.heroSlides[0]?.image) {
          const s0 = parsed.heroSlides[0];
          setHomepageHero((prev) => ({
            ...prev,
            title: s0.title ? s0.title.replace(/^Intentional\s*/i, "") : prev.title,
            highlightWord: s0.title?.toLowerCase().includes("intentional") ? "Intentional" : prev.highlightWord,
            description: s0.description || prev.description,
            image: s0.image || prev.image,
          }));
        }
      }
    } catch (e) {
      console.error("Failed to load local CMS cache:", e);
    }
  }, []);

  // 2. Persist to LocalStorage helper
  const saveToLocalCache = useCallback(
    (overrides?: Partial<{
      stories: Story[];
      gallery: GalleryImage[];
      programs: Program[];
      impactStats: DynamicImpactStat[];
      testimonials: DynamicTestimonial[];
      heroSlides: DynamicHeroSlide[];
      homepageHero: HomepageHero;
      siteSettings: SiteSettings;
      inquiries: Inquiry[];
      centers: Center[];
      teamMembers: DynamicTeamMember[];
      reports: TransparencyReport[];
      events: CommunityEvent[];
    }>) => {
      const dataToSave = {
        stories: overrides?.stories ?? stories,
        gallery: overrides?.gallery ?? gallery,
        programs: overrides?.programs ?? programs,
        impactStats: overrides?.impactStats ?? impactStats,
        testimonials: overrides?.testimonials ?? testimonials,
        heroSlides: overrides?.heroSlides ?? heroSlides,
        homepageHero: overrides?.homepageHero ?? homepageHero,
        siteSettings: overrides?.siteSettings ?? siteSettings,
        inquiries: overrides?.inquiries ?? inquiries,
        centers: overrides?.centers ?? centers,
        teamMembers: overrides?.teamMembers ?? teamMembers,
        reports: overrides?.reports ?? reports,
        events: overrides?.events ?? events,
        savedAt: new Date().toISOString(),
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(dataToSave));
    },
    [stories, gallery, programs, impactStats, testimonials, heroSlides, homepageHero, siteSettings, inquiries, centers, teamMembers, reports, events]
  );

  // 3. Supabase Cloud Sync
  const syncWithCloud = useCallback(async () => {
    if (!isCloudConnected || !supabase) return;
    setIsSyncing(true);
    try {
      // Fetch Stories
      const { data: dbStories } = await supabase.from("stories").select("*").order("created_at", { ascending: false });
      if (dbStories && dbStories.length > 0) {
        setStories(dbStories);
      }

      // Fetch Gallery
      const { data: dbGallery } = await supabase.from("gallery").select("*").order("created_at", { ascending: false });
      if (dbGallery && dbGallery.length > 0) {
        setGallery(dbGallery);
      }

      // Fetch Programs
      const { data: dbPrograms } = await supabase.from("programs").select("*");
      if (dbPrograms && dbPrograms.length > 0) {
        setPrograms(dbPrograms);
      }

      // Fetch Impact Stats
      const { data: dbStats } = await supabase.from("impact_stats").select("*").order("order_index", { ascending: true });
      if (dbStats && dbStats.length > 0) {
        setImpactStats(dbStats);
      }

      // Fetch Testimonials
      const { data: dbTestimonials } = await supabase.from("testimonials").select("*");
      if (dbTestimonials && dbTestimonials.length > 0) {
        setTestimonials(dbTestimonials);
      }

      // Fetch Hero Slides
      const { data: dbSlides } = await supabase.from("hero_slides").select("*").order("order_index", { ascending: true });
      if (dbSlides && dbSlides.length > 0) {
        setHeroSlides(dbSlides);
      }

      // Fetch Site Settings & Homepage Hero
      const { data: dbSettings } = await supabase.from("site_settings").select("*");
      if (dbSettings && dbSettings.length > 0) {
        const mergedSettings = { ...defaultSettings };
        dbSettings.forEach((item) => {
          if (item.key === "branding_info" && item.value) {
            if (item.value.siteName !== undefined) mergedSettings.siteName = item.value.siteName;
            if (item.value.siteLogo !== undefined) mergedSettings.siteLogo = item.value.siteLogo;
            if (item.value.siteTagline !== undefined) mergedSettings.siteTagline = item.value.siteTagline;
            if (item.value.siteFavicon !== undefined) mergedSettings.siteFavicon = item.value.siteFavicon;
          } else if (item.key === "donation_info" && item.value) {
            Object.assign(mergedSettings, item.value);
          } else if (item.key === "contact_info" && item.value) {
            if (item.value.email) mergedSettings.contactEmail = item.value.email;
            if (item.value.phone) mergedSettings.contactPhone = item.value.phone;
            if (item.value.whatsapp) mergedSettings.whatsapp = item.value.whatsapp;
            if (item.value.address) mergedSettings.address = item.value.address;
          } else if (item.key === "announcement" && item.value) {
            mergedSettings.announcementEnabled = !!item.value.enabled;
            mergedSettings.announcementMessage = item.value.message || "";
            mergedSettings.announcementLink = item.value.link || "";
          } else if (item.key === "homepage_hero" && item.value) {
            setHomepageHero(item.value);
          } else if (item.key === "cms_centers" && Array.isArray(item.value)) {
            setCenters(item.value);
          } else if (item.key === "cms_team" && Array.isArray(item.value)) {
            setTeamMembers(item.value);
          } else if (item.key === "cms_reports" && Array.isArray(item.value)) {
            setReports(item.value);
          } else if (item.key === "cms_events" && Array.isArray(item.value)) {
            setEvents(item.value);
          }
        });
        setSiteSettings(mergedSettings);
      }

      // Fetch Inquiries
      const { data: dbInquiries } = await supabase.from("inquiries").select("*").order("created_at", { ascending: false });
      if (dbInquiries) {
        setInquiries(
          dbInquiries.map((inq) => ({
            id: inq.id,
            type: inq.type,
            name: inq.name,
            email: inq.email,
            phone: inq.phone,
            message: inq.message,
            data: inq.data,
            status: inq.status,
            createdAt: inq.created_at,
          }))
        );
      }

      // Fetch Centers from table if present
      try {
        const { data: dbCenters } = await supabase.from("centers").select("*");
        if (dbCenters && dbCenters.length > 0) {
          setCenters(dbCenters);
        }
      } catch {
        // Fallback silently
      }

      // Fetch Team from table if present
      try {
        const { data: dbTeam } = await supabase.from("team_members").select("*");
        if (dbTeam && dbTeam.length > 0) {
          setTeamMembers(dbTeam);
        }
      } catch {
        // Fallback silently
      }

      // Fetch Reports from table if present
      try {
        const { data: dbReports } = await supabase.from("reports").select("*");
        if (dbReports && dbReports.length > 0) {
          setReports(
            dbReports.map((r: Record<string, unknown>) => ({
              id: String(r.id),
              title: String(r.title),
              year: String(r.year),
              category: r.category as TransparencyReport["category"],
              fileUrl: String(r.file_url || r.fileUrl),
              fileSize: r.file_size ? String(r.file_size) : (r.fileSize ? String(r.fileSize) : undefined),
              description: r.description ? String(r.description) : undefined,
            }))
          );
        }
      } catch {
        // Fallback silently
      }

      // Fetch Events from table if present
      try {
        const { data: dbEvents } = await supabase.from("events").select("*");
        if (dbEvents && dbEvents.length > 0) {
          setEvents(
            dbEvents.map((evt: Record<string, unknown>) => ({
              id: String(evt.id),
              title: String(evt.title),
              category: evt.category as CommunityEvent["category"],
              date: String(evt.date),
              time: evt.time ? String(evt.time) : undefined,
              location: String(evt.location),
              centerName: evt.center_name ? String(evt.center_name) : (evt.centerName ? String(evt.centerName) : undefined),
              description: String(evt.description),
              image: evt.image ? String(evt.image) : undefined,
              status: (evt.status as CommunityEvent["status"]) || "upcoming",
              coordinatorName: evt.coordinator_name ? String(evt.coordinator_name) : (evt.coordinatorName ? String(evt.coordinatorName) : undefined),
              coordinatorContact: evt.coordinator_contact ? String(evt.coordinator_contact) : (evt.coordinatorContact ? String(evt.coordinatorContact) : undefined),
            }))
          );
        }
      } catch {
        // Fallback silently
      }
    } catch (err) {
      console.warn("Could not sync from Supabase cloud (running with local cache):", err);
    } finally {
      setIsSyncing(false);
    }
  }, [isCloudConnected]);

  useEffect(() => {
    if (isCloudConnected) {
      syncWithCloud();
    }
  }, [isCloudConnected, syncWithCloud]);

  // Dynamically synchronize Favicon and Document Title
  useEffect(() => {
    if (siteSettings.siteFavicon) {
      let link: HTMLLinkElement | null = document.querySelector("link[rel*='icon']");
      if (!link) {
        link = document.createElement("link");
        link.rel = "icon";
        document.head.appendChild(link);
      }
      link.href = siteSettings.siteFavicon;
    }
    if (siteSettings.siteName) {
      document.title = siteSettings.siteTagline
        ? `${siteSettings.siteName} — ${siteSettings.siteTagline}`
        : siteSettings.siteName;
    }
  }, [siteSettings.siteFavicon, siteSettings.siteName, siteSettings.siteTagline]);

  // ================= HOMEPAGE HERO UPDATE =================
  const updateHomepageHero = async (heroUpdate: Partial<HomepageHero>) => {
    const updated: HomepageHero = { ...homepageHero, ...heroUpdate };
    setHomepageHero(updated);

    // Keep heroSlides[0] synchronized for backwards compatibility
    const updatedSlides = [...heroSlides];
    if (updatedSlides.length > 0) {
      updatedSlides[0] = {
        ...updatedSlides[0],
        title: `${updated.highlightWord ? updated.highlightWord + " " : ""}${updated.title}`,
        description: updated.description,
        image: updated.image,
      };
      setHeroSlides(updatedSlides);
    }

    saveToLocalCache({ homepageHero: updated, heroSlides: updatedSlides });

    if (isCloudConnected && supabase) {
      try {
        await supabase.from("site_settings").upsert([
          {
            key: "homepage_hero",
            value: updated,
          },
        ]);
      } catch (err) {
        console.warn("Could not save homepage_hero to Supabase (using local cache):", err);
      }
    }
    toast.success("Homepage photo & text updated successfully!");
  };

  // ================= STORIES CRUD =================
  const addStory = async (newStoryData: Omit<Story, "id"> & { id?: string }) => {
    const slug = newStoryData.id || newStoryData.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "") + `-${Date.now().toString().slice(-4)}`;
    const fullStory: Story = {
      ...newStoryData,
      id: slug,
    };
    const updatedList = [fullStory, ...stories];
    setStories(updatedList);
    saveToLocalCache({ stories: updatedList });

    if (isCloudConnected && supabase) {
      const { error } = await supabase.from("stories").insert([fullStory]);
      if (error) console.error("Supabase insert story error:", error);
    }
    toast.success("Story added successfully!");
  };

  const updateStory = async (id: string, updatedFields: Partial<Story>) => {
    const updatedList = stories.map((s) => (s.id === id ? { ...s, ...updatedFields } : s));
    setStories(updatedList);
    saveToLocalCache({ stories: updatedList });

    if (isCloudConnected && supabase) {
      const { error } = await supabase.from("stories").update(updatedFields).eq("id", id);
      if (error) console.error("Supabase update story error:", error);
    }
    toast.success("Story updated successfully!");
  };

  const deleteStory = async (id: string) => {
    const updatedList = stories.filter((s) => s.id !== id);
    setStories(updatedList);
    saveToLocalCache({ stories: updatedList });

    if (isCloudConnected && supabase) {
      const { error } = await supabase.from("stories").delete().eq("id", id);
      if (error) console.error("Supabase delete story error:", error);
    }
    toast.success("Story deleted");
  };

  // ================= GALLERY CRUD =================
  const addGalleryImage = async (newImg: GalleryImage) => {
    const updatedList = [newImg, ...gallery];
    setGallery(updatedList);
    saveToLocalCache({ gallery: updatedList });

    if (isCloudConnected && supabase) {
      const { error } = await supabase.from("gallery").insert([newImg]);
      if (error) console.error("Supabase insert gallery error:", error);
    }
    toast.success("Image added to gallery!");
  };

  const updateGalleryImage = async (index: number, updatedFields: Partial<GalleryImage>) => {
    const updatedList = gallery.map((item, i) => (i === index ? { ...item, ...updatedFields } : item));
    setGallery(updatedList);
    saveToLocalCache({ gallery: updatedList });

    if (isCloudConnected && supabase && gallery[index]?.src) {
      await supabase.from("gallery").update(updatedFields).eq("src", gallery[index].src);
    }
    toast.success("Gallery item updated!");
  };

  const deleteGalleryImage = async (index: number) => {
    const target = gallery[index];
    const updatedList = gallery.filter((_, i) => i !== index);
    setGallery(updatedList);
    saveToLocalCache({ gallery: updatedList });

    if (isCloudConnected && supabase && target?.src) {
      await supabase.from("gallery").delete().eq("src", target.src);
    }
    toast.success("Image removed from gallery");
  };

  // ================= PROGRAMS CRUD =================
  const addProgram = async (prog: Program) => {
    const id = prog.id || prog.title.toLowerCase().replace(/[^a-z0-9]+/g, "-");
    const newProg = { ...prog, id };
    const updatedList = [...programs, newProg];
    setPrograms(updatedList);
    saveToLocalCache({ programs: updatedList });

    if (isCloudConnected && supabase) {
      await supabase.from("programs").insert([newProg]);
    }
    toast.success("Program added successfully!");
  };

  const updateProgram = async (id: string, updatedFields: Partial<Program>) => {
    const updatedList = programs.map((p) => (p.id === id ? { ...p, ...updatedFields } : p));
    setPrograms(updatedList);
    saveToLocalCache({ programs: updatedList });

    if (isCloudConnected && supabase) {
      await supabase.from("programs").update(updatedFields).eq("id", id);
    }
    toast.success("Program updated!");
  };

  const deleteProgram = async (id: string) => {
    const updatedList = programs.filter((p) => p.id !== id);
    setPrograms(updatedList);
    saveToLocalCache({ programs: updatedList });

    if (isCloudConnected && supabase) {
      await supabase.from("programs").delete().eq("id", id);
    }
    toast.success("Program deleted");
  };

  // ================= IMPACT STATS & HERO SLIDES =================
  const updateImpactStat = async (id: string, updatedFields: Partial<DynamicImpactStat>) => {
    const updatedList = impactStats.map((stat) => (stat.id === id ? { ...stat, ...updatedFields } : stat));
    setImpactStats(updatedList);
    saveToLocalCache({ impactStats: updatedList });

    if (isCloudConnected && supabase) {
      await supabase.from("impact_stats").update(updatedFields).eq("id", id);
    }
    toast.success("Impact stat updated!");
  };

  const updateHeroSlide = async (index: number, updatedFields: Partial<DynamicHeroSlide>) => {
    const updatedList = heroSlides.map((slide, i) => (i === index ? { ...slide, ...updatedFields } : slide));
    setHeroSlides(updatedList);

    // If updating index 0, also mirror to homepageHero
    if (index === 0) {
      const s0 = updatedList[0];
      setHomepageHero((prev) => ({
        ...prev,
        title: s0.title ? s0.title.replace(/^Intentional\s*/i, "") : prev.title,
        description: s0.description || prev.description,
        image: s0.image || prev.image,
      }));
    }

    saveToLocalCache({ heroSlides: updatedList });

    if (isCloudConnected && supabase && heroSlides[index]?.id) {
      await supabase.from("hero_slides").update(updatedFields).eq("id", heroSlides[index].id);
    }
    toast.success("Hero slide updated!");
  };

  const addHeroSlide = async (slide: DynamicHeroSlide) => {
    const newSlide = {
      ...slide,
      id: `slide-${Date.now()}`,
    };
    const updatedList = [...heroSlides, newSlide];
    setHeroSlides(updatedList);
    saveToLocalCache({ heroSlides: updatedList });

    if (isCloudConnected && supabase) {
      await supabase.from("hero_slides").insert([newSlide]);
    }
    toast.success("New hero slide added!");
  };

  const deleteHeroSlide = async (index: number) => {
    const target = heroSlides[index];
    const updatedList = heroSlides.filter((_, i) => i !== index);
    setHeroSlides(updatedList);
    saveToLocalCache({ heroSlides: updatedList });

    if (isCloudConnected && supabase && target?.id) {
      await supabase.from("hero_slides").delete().eq("id", target.id);
    }
    toast.success("Hero slide removed");
  };

  // ================= TESTIMONIALS CRUD =================
  const addTestimonial = async (t: Omit<DynamicTestimonial, "id">) => {
    const newTestimonial: DynamicTestimonial = {
      ...t,
      id: `testim-${Date.now()}`,
    };
    const updatedList = [newTestimonial, ...testimonials];
    setTestimonials(updatedList);
    saveToLocalCache({ testimonials: updatedList });

    if (isCloudConnected && supabase) {
      await supabase.from("testimonials").insert([newTestimonial]);
    }
    toast.success("Testimonial added!");
  };

  const updateTestimonial = async (id: string, updatedFields: Partial<DynamicTestimonial>) => {
    const updatedList = testimonials.map((t) => (t.id === id ? { ...t, ...updatedFields } : t));
    setTestimonials(updatedList);
    saveToLocalCache({ testimonials: updatedList });

    if (isCloudConnected && supabase) {
      await supabase.from("testimonials").update(updatedFields).eq("id", id);
    }
    toast.success("Testimonial updated!");
  };

  const deleteTestimonial = async (id: string) => {
    const updatedList = testimonials.filter((t) => t.id !== id);
    setTestimonials(updatedList);
    saveToLocalCache({ testimonials: updatedList });

    if (isCloudConnected && supabase) {
      await supabase.from("testimonials").delete().eq("id", id);
    }
    toast.success("Testimonial deleted");
  };

  // ================= SITE SETTINGS =================
  const updateSiteSettings = async (settingsUpdate: Partial<SiteSettings>) => {
    const updated = { ...siteSettings, ...settingsUpdate };
    setSiteSettings(updated);
    saveToLocalCache({ siteSettings: updated });

    if (isCloudConnected && supabase) {
      try {
        await supabase.from("site_settings").upsert([
          {
            key: "branding_info",
            value: {
              siteName: updated.siteName,
              siteLogo: updated.siteLogo,
              siteTagline: updated.siteTagline,
              siteFavicon: updated.siteFavicon,
            },
          },
          {
            key: "donation_info",
            value: {
              bankName: updated.bankName,
              accountName: updated.accountName,
              accountNumber: updated.accountNumber,
              ifscCode: updated.ifscCode,
              branch: updated.branch,
              upiId: updated.upiId,
              upiQrImage: updated.upiQrImage,
              taxExemption: updated.taxExemption,
            },
          },
          {
            key: "contact_info",
            value: {
              email: updated.contactEmail,
              phone: updated.contactPhone,
              whatsapp: updated.whatsapp,
              address: updated.address,
            },
          },
          {
            key: "announcement",
            value: {
              enabled: updated.announcementEnabled,
              message: updated.announcementMessage,
              link: updated.announcementLink,
            },
          },
        ]);
      } catch (err) {
        console.warn("Could not save site_settings to Supabase (using local cache):", err);
      }
    }
    toast.success("Site settings updated!");
  };

  // ================= INQUIRIES & SUBMISSIONS =================
  const addInquiry = async (inquiryData: Omit<Inquiry, "id" | "status" | "createdAt">) => {
    const newInquiry: Inquiry = {
      ...inquiryData,
      id: `inq-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      status: "new",
      createdAt: new Date().toISOString(),
    };
    const updatedList = [newInquiry, ...inquiries];
    setInquiries(updatedList);
    saveToLocalCache({ inquiries: updatedList });

    if (isCloudConnected && supabase) {
      try {
        await supabase.from("inquiries").insert([
          {
            type: newInquiry.type,
            name: newInquiry.name,
            email: newInquiry.email,
            phone: newInquiry.phone,
            message: newInquiry.message,
            data: newInquiry.data,
            status: newInquiry.status,
          },
        ]);
      } catch (err) {
        console.warn("Could not save inquiry to Supabase:", err);
      }
    }
  };

  const updateInquiry = async (id: string, updated: Partial<Inquiry>) => {
    const updatedList = inquiries.map((i) => (i.id === id ? { ...i, ...updated } : i));
    setInquiries(updatedList);
    saveToLocalCache({ inquiries: updatedList });

    if (isCloudConnected && supabase) {
      try {
        const payload: Record<string, unknown> = {};
        if (updated.type !== undefined) payload.type = updated.type;
        if (updated.name !== undefined) payload.name = updated.name;
        if (updated.email !== undefined) payload.email = updated.email;
        if (updated.phone !== undefined) payload.phone = updated.phone;
        if (updated.message !== undefined) payload.message = updated.message;
        if (updated.data !== undefined) payload.data = updated.data;
        if (updated.status !== undefined) payload.status = updated.status;

        await supabase.from("inquiries").update(payload).eq("id", id);
      } catch (err) {
        console.warn("Could not update inquiry in Supabase:", err);
      }
    }
    toast.success("Inquiry updated successfully");
  };

  const updateInquiryStatus = async (id: string, status: Inquiry["status"]) => {
    const updatedList = inquiries.map((i) => (i.id === id ? { ...i, status } : i));
    setInquiries(updatedList);
    saveToLocalCache({ inquiries: updatedList });

    if (isCloudConnected && supabase) {
      try {
        await supabase.from("inquiries").update({ status }).eq("id", id);
      } catch (err) {
        console.warn("Could not update inquiry in Supabase:", err);
      }
    }
    toast.success(`Inquiry marked as ${status}`);
  };

  const deleteInquiry = async (id: string) => {
    const updatedList = inquiries.filter((i) => i.id !== id);
    setInquiries(updatedList);
    saveToLocalCache({ inquiries: updatedList });

    if (isCloudConnected && supabase) {
      try {
        await supabase.from("inquiries").delete().eq("id", id);
      } catch (err) {
        console.warn("Could not delete inquiry in Supabase:", err);
      }
    }
    toast.success("Inquiry removed");
  };

  // ================= CENTERS CRUD =================
  const addCenter = async (newCenter: Center) => {
    const updated = [...centers, newCenter];
    setCenters(updated);
    saveToLocalCache({ centers: updated });

    if (isCloudConnected && supabase) {
      try {
        await supabase.from("site_settings").upsert([{ key: "cms_centers", value: updated }]);
        await supabase.from("centers").insert([newCenter]);
      } catch (err) {
        console.warn("Supabase centers sync notice:", err);
      }
    }
    toast.success("Learning center created successfully!");
  };

  const updateCenter = async (id: string, updatedFields: Partial<Center>) => {
    const updated = centers.map((c) => (c.id === id ? { ...c, ...updatedFields } : c));
    setCenters(updated);
    saveToLocalCache({ centers: updated });

    if (isCloudConnected && supabase) {
      try {
        await supabase.from("site_settings").upsert([{ key: "cms_centers", value: updated }]);
        await supabase.from("centers").update(updatedFields).eq("id", id);
      } catch (err) {
        console.warn("Supabase centers sync notice:", err);
      }
    }
    toast.success("Center details updated!");
  };

  const deleteCenter = async (id: string) => {
    const updated = centers.filter((c) => c.id !== id);
    setCenters(updated);
    saveToLocalCache({ centers: updated });

    if (isCloudConnected && supabase) {
      try {
        await supabase.from("site_settings").upsert([{ key: "cms_centers", value: updated }]);
        await supabase.from("centers").delete().eq("id", id);
      } catch (err) {
        console.warn("Supabase centers sync notice:", err);
      }
    }
    toast.success("Center deleted");
  };

  // ================= TEAM MEMBERS CRUD =================
  const addTeamMember = async (member: Omit<DynamicTeamMember, "id"> & { id?: string }) => {
    const newMember: DynamicTeamMember = {
      ...member,
      id: member.id || `team-${Date.now()}`,
    };
    const updated = [...teamMembers, newMember];
    setTeamMembers(updated);
    saveToLocalCache({ teamMembers: updated });

    if (isCloudConnected && supabase) {
      try {
        await supabase.from("site_settings").upsert([{ key: "cms_team", value: updated }]);
        await supabase.from("team_members").insert([newMember]);
      } catch (err) {
        console.warn("Supabase team sync notice:", err);
      }
    }
    toast.success("Team member added!");
  };

  const updateTeamMember = async (id: string, updatedFields: Partial<DynamicTeamMember>) => {
    const updated = teamMembers.map((m) => (m.id === id ? { ...m, ...updatedFields } : m));
    setTeamMembers(updated);
    saveToLocalCache({ teamMembers: updated });

    if (isCloudConnected && supabase) {
      try {
        await supabase.from("site_settings").upsert([{ key: "cms_team", value: updated }]);
        await supabase.from("team_members").update(updatedFields).eq("id", id);
      } catch (err) {
        console.warn("Supabase team sync notice:", err);
      }
    }
    toast.success("Team member updated!");
  };

  const deleteTeamMember = async (id: string) => {
    const updated = teamMembers.filter((m) => m.id !== id);
    setTeamMembers(updated);
    saveToLocalCache({ teamMembers: updated });

    if (isCloudConnected && supabase) {
      try {
        await supabase.from("site_settings").upsert([{ key: "cms_team", value: updated }]);
        await supabase.from("team_members").delete().eq("id", id);
      } catch (err) {
        console.warn("Supabase team sync notice:", err);
      }
    }
    toast.success("Team member removed");
  };

  // ================= TRANSPARENCY REPORTS CRUD =================
  const addReport = async (report: Omit<TransparencyReport, "id"> & { id?: string }) => {
    const newReport: TransparencyReport = {
      ...report,
      id: report.id || `rep-${Date.now()}`,
    };
    const updated = [...reports, newReport];
    setReports(updated);
    saveToLocalCache({ reports: updated });

    if (isCloudConnected && supabase) {
      try {
        await supabase.from("site_settings").upsert([{ key: "cms_reports", value: updated }]);
        await supabase.from("reports").insert([{
          id: newReport.id,
          title: newReport.title,
          year: newReport.year,
          category: newReport.category,
          file_url: newReport.fileUrl,
          file_size: newReport.fileSize,
          description: newReport.description,
        }]);
      } catch (err) {
        console.warn("Supabase reports sync notice:", err);
      }
    }
    toast.success("Report published to transparency disclosures!");
  };

  const updateReport = async (id: string, updatedFields: Partial<TransparencyReport>) => {
    const updated = reports.map((r) => (r.id === id ? { ...r, ...updatedFields } : r));
    setReports(updated);
    saveToLocalCache({ reports: updated });

    if (isCloudConnected && supabase) {
      try {
        await supabase.from("site_settings").upsert([{ key: "cms_reports", value: updated }]);
        const dbFields: Record<string, unknown> = { ...updatedFields };
        if (updatedFields.fileUrl !== undefined) dbFields.file_url = updatedFields.fileUrl;
        if (updatedFields.fileSize !== undefined) dbFields.file_size = updatedFields.fileSize;
        delete dbFields.fileUrl;
        delete dbFields.fileSize;
        await supabase.from("reports").update(dbFields).eq("id", id);
      } catch (err) {
        console.warn("Supabase reports sync notice:", err);
      }
    }
    toast.success("Report details updated!");
  };

  const deleteReport = async (id: string) => {
    const updated = reports.filter((r) => r.id !== id);
    setReports(updated);
    saveToLocalCache({ reports: updated });

    if (isCloudConnected && supabase) {
      try {
        await supabase.from("site_settings").upsert([{ key: "cms_reports", value: updated }]);
        await supabase.from("reports").delete().eq("id", id);
      } catch (err) {
        console.warn("Supabase reports sync notice:", err);
      }
    }
    toast.success("Report deleted");
  };

  // ================= COMMUNITY EVENTS CRUD =================
  const addEvent = async (event: Omit<CommunityEvent, "id"> & { id?: string }) => {
    const newEvent: CommunityEvent = {
      ...event,
      id: event.id || `evt-${Date.now()}`,
    };
    const updated = [...events, newEvent];
    setEvents(updated);
    saveToLocalCache({ events: updated });

    if (isCloudConnected && supabase) {
      try {
        await supabase.from("site_settings").upsert([{ key: "cms_events", value: updated }]);
        await supabase.from("events").insert([{
          id: newEvent.id,
          title: newEvent.title,
          category: newEvent.category,
          date: newEvent.date,
          time: newEvent.time,
          location: newEvent.location,
          center_name: newEvent.centerName,
          description: newEvent.description,
          image: newEvent.image,
          status: newEvent.status,
          coordinator_name: newEvent.coordinatorName,
          coordinator_contact: newEvent.coordinatorContact,
        }]);
      } catch (err) {
        console.warn("Supabase events sync notice:", err);
      }
    }
    toast.success("Community camp/event announced!");
  };

  const updateEvent = async (id: string, updatedFields: Partial<CommunityEvent>) => {
    const updated = events.map((e) => (e.id === id ? { ...e, ...updatedFields } : e));
    setEvents(updated);
    saveToLocalCache({ events: updated });

    if (isCloudConnected && supabase) {
      try {
        await supabase.from("site_settings").upsert([{ key: "cms_events", value: updated }]);
        const dbFields: Record<string, unknown> = { ...updatedFields };
        if (updatedFields.centerName !== undefined) dbFields.center_name = updatedFields.centerName;
        if (updatedFields.coordinatorName !== undefined) dbFields.coordinator_name = updatedFields.coordinatorName;
        if (updatedFields.coordinatorContact !== undefined) dbFields.coordinator_contact = updatedFields.coordinatorContact;
        delete dbFields.centerName;
        delete dbFields.coordinatorName;
        delete dbFields.coordinatorContact;
        await supabase.from("events").update(dbFields).eq("id", id);
      } catch (err) {
        console.warn("Supabase events sync notice:", err);
      }
    }
    toast.success("Event details updated!");
  };

  const deleteEvent = async (id: string) => {
    const updated = events.filter((e) => e.id !== id);
    setEvents(updated);
    saveToLocalCache({ events: updated });

    if (isCloudConnected && supabase) {
      try {
        await supabase.from("site_settings").upsert([{ key: "cms_events", value: updated }]);
        await supabase.from("events").delete().eq("id", id);
      } catch (err) {
        console.warn("Supabase events sync notice:", err);
      }
    }
    toast.success("Event deleted");
  };

  // ================= BACKUPS & UTILS =================
  const exportDataJSON = () => {
    const dump = {
      stories,
      gallery,
      programs,
      impactStats,
      testimonials,
      heroSlides,
      homepageHero,
      siteSettings,
      inquiries,
      centers,
      teamMembers,
      reports,
      events,
      exportedAt: new Date().toISOString(),
    };
    return JSON.stringify(dump, null, 2);
  };

  const importDataJSON = (jsonString: string): boolean => {
    try {
      const data = JSON.parse(jsonString);
      if (data.stories) setStories(data.stories);
      if (data.gallery) setGallery(data.gallery);
      if (data.programs) setPrograms(data.programs);
      if (data.impactStats) setImpactStats(data.impactStats);
      if (data.testimonials) setTestimonials(data.testimonials);
      if (data.heroSlides) setHeroSlides(data.heroSlides);
      if (data.homepageHero) setHomepageHero(data.homepageHero);
      if (data.siteSettings) setSiteSettings(data.siteSettings);
      if (data.inquiries) setInquiries(data.inquiries);
      if (data.centers) setCenters(data.centers);
      if (data.teamMembers) setTeamMembers(data.teamMembers);
      if (data.reports) setReports(data.reports);
      if (data.events) setEvents(data.events);

      saveToLocalCache(data);
      toast.success("CMS data imported successfully!");
      return true;
    } catch (err) {
      console.error("Failed to import JSON:", err);
      toast.error("Invalid JSON format");
      return false;
    }
  };

  const resetToDefaults = () => {
    setStories(initialStories);
    setGallery(initialGallery);
    setPrograms(initialPrograms);
    setImpactStats(defaultDynamicStats);
    setTestimonials(defaultDynamicTestimonials);
    setHeroSlides(defaultDynamicHeroSlides);
    setHomepageHero(defaultHomepageHero);
    setSiteSettings(defaultSettings);
    setInquiries([]);
    setCenters(initialCenters);
    setTeamMembers(defaultTeamMembers);
    setReports(defaultReports);
    setEvents(defaultEvents);
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem("suhrid_dynamic_cms_v1");
    toast.info("Content reset to initial site defaults");
  };

  return (
    <CMSContext.Provider
      value={{
        stories,
        gallery,
        programs,
        impactStats,
        testimonials,
        heroSlides,
        homepageHero,
        siteSettings,
        inquiries,
        centers,
        teamMembers,
        reports,
        events,
        isCloudConnected,
        isSyncing,
        addCenter,
        updateCenter,
        deleteCenter,
        addTeamMember,
        updateTeamMember,
        deleteTeamMember,
        addReport,
        updateReport,
        deleteReport,
        addEvent,
        updateEvent,
        deleteEvent,
        updateHomepageHero,
        addStory,
        updateStory,
        deleteStory,
        addGalleryImage,
        updateGalleryImage,
        deleteGalleryImage,
        addProgram,
        updateProgram,
        deleteProgram,
        updateImpactStat,
        updateHeroSlide,
        addHeroSlide,
        deleteHeroSlide,
        addTestimonial,
        updateTestimonial,
        deleteTestimonial,
        updateSiteSettings,
        addInquiry,
        updateInquiry,
        updateInquiryStatus,
        deleteInquiry,
        exportDataJSON,
        importDataJSON,
        resetToDefaults,
        syncWithCloud,
      }}
    >
      {children}
    </CMSContext.Provider>
  );
};

export const useCMS = () => {
  const context = useContext(CMSContext);
  if (!context) {
    throw new Error("useCMS must be used within a CMSProvider");
  }
  return context;
};
