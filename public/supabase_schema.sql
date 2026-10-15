/* ==============================================================================
   CHIROSUHRID (SUHRID) NGO — Supabase Database Schema & Seed Script
   ==============================================================================
   Execute this script in: Supabase Dashboard -> SQL Editor -> New Query -> Run
   ============================================================================== */

-- 1. Enable UUID Extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

/* ==============================================================================
   2. CREATE TABLES
   ============================================================================== */

-- 2.1 Stories Table
CREATE TABLE IF NOT EXISTS public.stories (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    category TEXT NOT NULL DEFAULT 'General',
    image TEXT NOT NULL,
    quote TEXT,
    author TEXT NOT NULL,
    role TEXT NOT NULL,
    featured BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2.2 Gallery Table
CREATE TABLE IF NOT EXISTS public.gallery (
    id TEXT PRIMARY KEY DEFAULT uuid_generate_v4()::text,
    src TEXT NOT NULL,
    title TEXT NOT NULL,
    category TEXT NOT NULL DEFAULT 'All',
    size TEXT DEFAULT 'medium',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2.3 Programs Table
CREATE TABLE IF NOT EXISTS public.programs (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    label TEXT,
    metric TEXT,
    description TEXT NOT NULL,
    image TEXT NOT NULL,
    href TEXT,
    tag TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2.4 Impact Stats Table
CREATE TABLE IF NOT EXISTS public.impact_stats (
    id TEXT PRIMARY KEY,
    label TEXT NOT NULL,
    value TEXT NOT NULL,
    icon_name TEXT DEFAULT 'TrendingUp',
    order_index INT DEFAULT 0
);

-- 2.5 Testimonials Table
CREATE TABLE IF NOT EXISTS public.testimonials (
    id TEXT PRIMARY KEY DEFAULT uuid_generate_v4()::text,
    quote TEXT NOT NULL,
    author TEXT NOT NULL,
    role TEXT NOT NULL,
    category TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2.6 Hero Slides Table
CREATE TABLE IF NOT EXISTS public.hero_slides (
    id TEXT PRIMARY KEY DEFAULT uuid_generate_v4()::text,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    image TEXT NOT NULL,
    alt TEXT,
    order_index INT DEFAULT 0
);

-- 2.7 Site Settings Table (Branding, Bank details, UPI ID, Phone, Email, Announcements)
CREATE TABLE IF NOT EXISTS public.site_settings (
    key TEXT PRIMARY KEY,
    value JSONB NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2.8 Inquiries & Submissions Table (Contact messages & Volunteer applications)
CREATE TABLE IF NOT EXISTS public.inquiries (
    id TEXT PRIMARY KEY DEFAULT uuid_generate_v4()::text,
    type TEXT NOT NULL DEFAULT 'contact',
    name TEXT NOT NULL,
    email TEXT,
    phone TEXT,
    message TEXT,
    data JSONB DEFAULT '{}'::jsonb,
    status TEXT DEFAULT 'new',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2.9 Grassroots Centers Table
CREATE TABLE IF NOT EXISTS public.centers (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    district TEXT NOT NULL,
    address TEXT NOT NULL,
    contact_number TEXT,
    description TEXT,
    image TEXT,
    beneficiaries TEXT,
    established TEXT,
    features JSONB DEFAULT '[]'::jsonb,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2.10 Leadership & Team Table
CREATE TABLE IF NOT EXISTS public.team_members (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    role TEXT NOT NULL,
    image TEXT NOT NULL,
    bio TEXT,
    category TEXT DEFAULT 'Leadership',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2.11 Transparency Reports Table
CREATE TABLE IF NOT EXISTS public.reports (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    year TEXT NOT NULL,
    category TEXT NOT NULL DEFAULT 'Annual Impact',
    file_url TEXT NOT NULL,
    file_size TEXT,
    description TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2.12 Community Events & Health Camps Table
CREATE TABLE IF NOT EXISTS public.events (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    category TEXT NOT NULL DEFAULT 'Health Camp',
    date TEXT NOT NULL,
    time TEXT,
    location TEXT NOT NULL,
    center_name TEXT,
    description TEXT,
    image TEXT,
    status TEXT NOT NULL DEFAULT 'upcoming',
    coordinator_name TEXT,
    coordinator_contact TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

/* ==============================================================================
   3. ROW-LEVEL SECURITY (RLS) POLICIES
   ============================================================================== */

ALTER TABLE public.stories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gallery ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.programs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.impact_stats ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.hero_slides ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.centers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.team_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;

-- 3.1 Public Read Access
DROP POLICY IF EXISTS "Allow public read on stories" ON public.stories;
CREATE POLICY "Allow public read on stories" ON public.stories FOR SELECT USING (true);

DROP POLICY IF EXISTS "Allow public read on gallery" ON public.gallery;
CREATE POLICY "Allow public read on gallery" ON public.gallery FOR SELECT USING (true);

DROP POLICY IF EXISTS "Allow public read on programs" ON public.programs;
CREATE POLICY "Allow public read on programs" ON public.programs FOR SELECT USING (true);

DROP POLICY IF EXISTS "Allow public read on impact_stats" ON public.impact_stats;
CREATE POLICY "Allow public read on impact_stats" ON public.impact_stats FOR SELECT USING (true);

DROP POLICY IF EXISTS "Allow public read on testimonials" ON public.testimonials;
CREATE POLICY "Allow public read on testimonials" ON public.testimonials FOR SELECT USING (true);

DROP POLICY IF EXISTS "Allow public read on hero_slides" ON public.hero_slides;
CREATE POLICY "Allow public read on hero_slides" ON public.hero_slides FOR SELECT USING (true);

DROP POLICY IF EXISTS "Allow public read on site_settings" ON public.site_settings;
CREATE POLICY "Allow public read on site_settings" ON public.site_settings FOR SELECT USING (true);

DROP POLICY IF EXISTS "Allow public read on centers" ON public.centers;
CREATE POLICY "Allow public read on centers" ON public.centers FOR SELECT USING (true);

DROP POLICY IF EXISTS "Allow public read on team_members" ON public.team_members;
CREATE POLICY "Allow public read on team_members" ON public.team_members FOR SELECT USING (true);

DROP POLICY IF EXISTS "Allow public read on reports" ON public.reports;
CREATE POLICY "Allow public read on reports" ON public.reports FOR SELECT USING (true);

DROP POLICY IF EXISTS "Allow public read on events" ON public.events;
CREATE POLICY "Allow public read on events" ON public.events FOR SELECT USING (true);

-- 3.2 Public Insert for Inquiries (Contact messages & Volunteer applications)
DROP POLICY IF EXISTS "Allow public insert on inquiries" ON public.inquiries;
CREATE POLICY "Allow public insert on inquiries" ON public.inquiries FOR INSERT WITH CHECK (true);

-- 3.3 Authenticated Admin Full CRUD Access
DROP POLICY IF EXISTS "Allow admin all on stories" ON public.stories;
CREATE POLICY "Allow admin all on stories" ON public.stories FOR ALL TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Allow admin all on gallery" ON public.gallery;
CREATE POLICY "Allow admin all on gallery" ON public.gallery FOR ALL TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Allow admin all on programs" ON public.programs;
CREATE POLICY "Allow admin all on programs" ON public.programs FOR ALL TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Allow admin all on impact_stats" ON public.impact_stats;
CREATE POLICY "Allow admin all on impact_stats" ON public.impact_stats FOR ALL TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Allow admin all on testimonials" ON public.testimonials;
CREATE POLICY "Allow admin all on testimonials" ON public.testimonials FOR ALL TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Allow admin all on hero_slides" ON public.hero_slides;
CREATE POLICY "Allow admin all on hero_slides" ON public.hero_slides FOR ALL TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Allow admin all on site_settings" ON public.site_settings;
CREATE POLICY "Allow admin all on site_settings" ON public.site_settings FOR ALL TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Allow admin all on inquiries" ON public.inquiries;
CREATE POLICY "Allow admin all on inquiries" ON public.inquiries FOR ALL TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Allow admin all on centers" ON public.centers;
CREATE POLICY "Allow admin all on centers" ON public.centers FOR ALL TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Allow admin all on team_members" ON public.team_members;
CREATE POLICY "Allow admin all on team_members" ON public.team_members FOR ALL TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Allow admin all on reports" ON public.reports;
CREATE POLICY "Allow admin all on reports" ON public.reports FOR ALL TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Allow admin all on events" ON public.events;
CREATE POLICY "Allow admin all on events" ON public.events FOR ALL TO authenticated USING (true) WITH CHECK (true);

/* ==============================================================================
   4. STORAGE BUCKET CONFIGURATION (For Uploading Images)
   ============================================================================== */

INSERT INTO storage.buckets (id, name, public) 
VALUES ('suhrid-media', 'suhrid-media', true)
ON CONFLICT (id) DO NOTHING;

DROP POLICY IF EXISTS "Public media access" ON storage.objects;
CREATE POLICY "Public media access" ON storage.objects
FOR SELECT USING (bucket_id = 'suhrid-media');

DROP POLICY IF EXISTS "Admin upload media" ON storage.objects;
CREATE POLICY "Admin upload media" ON storage.objects
FOR INSERT TO authenticated WITH CHECK (bucket_id = 'suhrid-media');

DROP POLICY IF EXISTS "Admin update media" ON storage.objects;
CREATE POLICY "Admin update media" ON storage.objects
FOR UPDATE TO authenticated USING (bucket_id = 'suhrid-media');

DROP POLICY IF EXISTS "Admin delete media" ON storage.objects;
CREATE POLICY "Admin delete media" ON storage.objects
FOR DELETE TO authenticated USING (bucket_id = 'suhrid-media');

/* ==============================================================================
   5. INITIAL SEED DATA
   ============================================================================== */

-- 5.1 Stories Seed Data
INSERT INTO public.stories (id, title, description, category, image, quote, author, role, featured)
VALUES
('priya-journey', 'Breaking the Cycle: Priya''s Journey from Student to Teacher', 'Priya grew up in a remote village where accessing quality education seemed impossible. Through our scholarship program, she not only completed her education but is now a certified teacher inspiring children in her own community.', 'Education', 'https://images.unsplash.com/photo-1542810634-71277d95dcbb?q=80&w=1170&auto=format&fit=crop', 'Education gave me wings. Now I want to help other children in my village fly too. The foundation didn''t just give me books and fees – they gave me hope and a future.', 'Priya Sharma', 'Primary School Teacher, Rajasthan', true),
('lakshmi-relief', 'A Mother''s Relief: Access to Healthcare', 'Lakshmi''s newborn was saved by our mobile health clinic. Today, her daughter is a healthy 3-year-old, and Lakshmi is a health volunteer in her village.', 'Health', 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?q=80&w=1170&auto=format&fit=crop', NULL, 'Lakshmi Devi', 'Community Health Volunteer', false),
('ramesh-entrepreneur', 'From Farm Worker to Entrepreneur', 'Ramesh learned organic farming techniques through our program. He now runs a successful organic vegetable cooperative employing 20 farmers.', 'Livelihoods', 'https://images.unsplash.com/photo-1595974482597-4b8da8879bc5?q=80&w=1170&auto=format&fit=crop', NULL, 'Ramesh Kumar', 'Organic Cooperative Lead', false),
('digital-literacy', 'Digital Literacy Changes a School', 'A rural school transformed after receiving computer training. Students now compete in state-level digital competitions and explore global knowledge.', 'Education', 'https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=1170&auto=format&fit=crop', NULL, 'Anoop Singh', 'School Principal', false)
ON CONFLICT (id) DO NOTHING;

-- 5.2 Testimonials Seed Data
INSERT INTO public.testimonials (id, quote, author, role, category)
VALUES
('t1', 'The teacher training program transformed how I teach. My students are more engaged, and their test scores have improved significantly.', 'Anjali Verma', 'Primary School Teacher', 'Education'),
('t2', 'Free health check-ups and medicines have been a blessing for our village. We no longer have to travel 50km to see a doctor.', 'Ravi Kumar', 'Village Sarpanch', 'Health'),
('t3', 'Learning tailoring changed my life. I now earn enough to support my family and send my daughters to school.', 'Sunita Devi', 'Tailoring Entrepreneur', 'Livelihoods')
ON CONFLICT (id) DO NOTHING;

-- 5.3 Impact Stats Seed Data
INSERT INTO public.impact_stats (id, label, value, icon_name, order_index)
VALUES
('stat-1', 'Lives Touched', '2,000+', 'TrendingUp', 1),
('stat-2', 'Active Partners', '12', 'Heart', 2),
('stat-3', 'Children Enrolled', '100+', 'Users', 3),
('stat-4', 'Elderly Supported', '50+', 'Briefcase', 4)
ON CONFLICT (id) DO NOTHING;

-- 5.4 Programs Seed Data
INSERT INTO public.programs (id, title, label, metric, description, image, href)
VALUES
('sugyan', 'SUGYAN', 'EDUCATION', '21 Students Supported', 'Empowering Students Through Education. Supporting economically challenged students with scholarships and resources.', 'https://images.unsplash.com/photo-1542810634-71277d95dcbb?q=80&w=1170&auto=format&fit=crop', '/programs#sugyan'),
('Sricharaneshu', 'Sricharaneshu', 'CARE', '50+ Elderly Supported', 'Building a Sanctuary of Care. Providing monthly sustenance, medical intervention, and warm clothing to the elderly.', 'https://images.unsplash.com/photo-1773234005378-ceebf3c877b9?q=80&w=1152&auto=format&fit=crop', '/programs#Sricharaneshu'),
('UNMESH', 'UNMESH', 'EDUCATION', 'Holistic Child Development', 'Free coaching from pre-school to secondary level, including arts, meditation, and character building.', 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?q=80&w=1173&auto=format&fit=crop', '/programs#UNMESH'),
('SWANIRBHAR', 'SUHRID SWANIRBHAR', 'SKILLS', 'Multiple Artisans', 'Helping artisans and youth become self-reliant through e-commerce platforms and marketing support.', 'https://images.unsplash.com/photo-1640292343595-889db1c8262e?q=80&w=1192&auto=format&fit=crop', '/programs#SWANIRBHAR')
ON CONFLICT (id) DO NOTHING;

-- 5.5 Hero Slides Seed Data
INSERT INTO public.hero_slides (id, title, description, image, alt, order_index)
VALUES
('slide-1', 'Be Happy by Making Others Happy', 'SUHRID is a non-profit organization of young people dedicated to education, health, and empowerment - serving communities with the belief that serving others is worship.', 'https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?q=80&w=1200&auto=format&fit=crop', 'Community coming together', 1),
('slide-2', 'Empowering Through Education', 'Providing free coaching and scholarships to economically challenged students, building a foundation for a brighter future through quality education and mentorship.', 'https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=1200&auto=format&fit=crop', 'Young volunteers teaching children in classroom', 2),
('slide-3', 'Healthcare for All', 'Delivering accessible healthcare services and organizing health camps in rural communities, ensuring wellness and medical support for those who need it most.', 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?q=80&w=1200&auto=format&fit=crop', 'Healthcare workers providing medical care in village', 3),
('slide-4', 'Creating Sustainable Livelihoods', 'Supporting rural artisans and creating economic opportunities through skill development, online marketplace access, and youth counselling programs.', 'https://images.unsplash.com/photo-1595974482597-4b8da8879bc5?q=80&w=1200&auto=format&fit=crop', 'Women artisans working on traditional crafts', 4)
ON CONFLICT (id) DO NOTHING;

-- 5.6 Site Settings Seed Data
INSERT INTO public.site_settings (key, value)
VALUES
('branding_info', '{
  "siteName": "SUHRID",
  "siteLogo": "",
  "siteTagline": "Sharing happiness to create an empowered, self-reliant rural world.",
  "siteFavicon": "/favicon.ico"
}'::jsonb),
('donation_info', '{
  "bankName": "State Bank of India",
  "accountName": "CHIROSUHRID FOUNDATION",
  "accountNumber": "42109876543",
  "ifscCode": "SBIN0001234",
  "branch": "Kolkata Main Branch",
  "upiId": "suhrid@sbi",
  "upiQrImage": "https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=upi://pay?pa=suhrid@sbi&pn=CHIROSUHRID%20FOUNDATION&cu=INR",
  "taxExemption": "80G Certified — 50% Tax Relief on all donations (Reg: AAATC0000PF20231)"
}'::jsonb),
('contact_info', '{
  "email": "contact@suhrid.org",
  "phone": "+91 98765 43210",
  "whatsapp": "+91 98765 43210",
  "address": "Kolkata, West Bengal, India",
  "workingHours": "Mon - Sat: 9:00 AM - 6:00 PM"
}'::jsonb),
('announcement', '{
  "enabled": false,
  "message": "Welcome to Chirosuhrid! Join our community mission to bring education and health to all.",
  "link": "/impact"
}'::jsonb)
ON CONFLICT (key) DO NOTHING;

-- 5.7 Community Events Seed Data
INSERT INTO public.events (id, title, category, date, time, location, center_name, description, image, status, coordinator_name, coordinator_contact)
VALUES
('evt-1', 'Comprehensive Eye Clinic & Health Camp', 'Health Camp', 'Upcoming Sunday, 9:00 AM', '09:00 AM - 04:00 PM', 'Midnapore Center, Paschim Medinipur', 'Midnapore Center', 'Free vision screening, cataract detection, doctor consultations, and essential medicine distribution for rural families.', 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?q=80&w=2070&auto=format&fit=crop', 'upcoming', 'Arun Tarai', '+91 97327 34055'),
('evt-2', 'Yuva Sammelan 2024 - Youth Leadership Summit', 'Youth Summit', 'November 24, 2024', '10:00 AM - 05:00 PM', 'Nasra Center, Nadia', 'Nasra Center', 'Annual gathering of student scholars and mentors exploring character building, competitive exam prep, and community service.', 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=1170&auto=format&fit=crop', 'upcoming', 'Balaram Das Adhikary', '+91 97327 34055'),
('evt-3', 'SRICHARANESHU - Winter Warmth & Ration Drive', 'Elderly Care', 'December 15, 2024', '11:00 AM - 03:00 PM', 'Gama Center, Purba Medinipur', 'Gama Center', 'Distributing warm blankets, winter garments, and monthly nutritious rations to elderly village residents.', 'https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?q=80&w=2070&auto=format&fit=crop', 'upcoming', 'Subhendu Maity', '+91 97327 34055')
ON CONFLICT (id) DO NOTHING;
