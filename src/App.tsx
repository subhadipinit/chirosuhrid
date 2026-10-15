import { lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ScrollToTop } from "@/components/ScrollToTop";
import { AuthProvider } from "@/context/AuthContext";
import { CMSProvider } from "@/context/CMSContext";
import { AdminRoute } from "@/components/admin/AdminRoute";
import { AnnouncementBanner } from "@/components/AnnouncementBanner";

const Index = lazy(() => import("./pages/Index"));
const About = lazy(() => import("./pages/About"));
const Programs = lazy(() => import("./pages/Programs"));
const Impact = lazy(() => import("./pages/Impact"));
const Stories = lazy(() => import("./pages/Stories"));
const StoryDetail = lazy(() => import("./pages/StoryDetail"));
const Contact = lazy(() => import("./pages/Contact"));
const Volunteer = lazy(() => import("./pages/Volunteer"));
const Donate = lazy(() => import("./pages/Donate"));
const Gallery = lazy(() => import("./pages/Gallery"));
const Centers = lazy(() => import("./pages/Centers"));
const Events = lazy(() => import("./pages/Events"));
const Manifesto = lazy(() => import("./pages/Manifesto"));
const CenterNarsa = lazy(() => import("./pages/CenterNarsa"));
const CenterGama = lazy(() => import("./pages/CenterGama"));
const CenterMidnapore = lazy(() => import("./pages/CenterMidnapore"));
const NotFound = lazy(() => import("./pages/NotFound"));

// Admin Routes
const AdminLogin = lazy(() => import("./pages/admin/AdminLogin"));
const AdminDashboard = lazy(() => import("./pages/admin/AdminDashboard"));

const queryClient = new QueryClient();

const PageLoader = () => (
  <div className="min-h-[60vh] flex items-center justify-center bg-white">
    <div className="w-12 h-12 rounded-full border-4 border-primary/20 border-t-primary animate-spin" />
  </div>
);

const rawBase = import.meta.env.BASE_URL;
const appBasename = rawBase && rawBase !== "/" && rawBase !== "./" ? rawBase : undefined;

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <CMSProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter basename={appBasename}>
            <AnnouncementBanner />
            <ScrollToTop />
            <Suspense fallback={<PageLoader />}>
              <Routes>
                {/* Public Website Routes */}
                <Route path="/" element={<Index />} />
                <Route path="/about" element={<About />} />
                <Route path="/about/manifesto" element={<Manifesto />} />
                <Route path="/programs" element={<Programs />} />
                <Route path="/impact" element={<Impact />} />
                <Route path="/stories" element={<Stories />} />
                <Route path="/stories/:id" element={<StoryDetail />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/volunteer" element={<Volunteer />} />
                <Route path="/donate" element={<Donate />} />
                <Route path="/gallery" element={<Gallery />} />
                <Route path="/centers" element={<Centers />} />
                <Route path="/events" element={<Events />} />
                <Route path="/centers/narsa" element={<CenterNarsa />} />
                <Route path="/centers/gama" element={<CenterGama />} />
                <Route path="/centers/midnapore" element={<CenterMidnapore />} />

                {/* Admin Management Routes */}
                <Route path="/admin/login" element={<AdminLogin />} />
                <Route
                  path="/admin"
                  element={
                    <AdminRoute>
                      <AdminDashboard />
                    </AdminRoute>
                  }
                />

                {/* Catch-all 404 Route */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </BrowserRouter>
        </CMSProvider>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
