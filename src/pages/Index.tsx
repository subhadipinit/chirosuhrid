import React from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  TrendingUp,
  Heart,
  Users,
  Briefcase,
  Calendar,
  MapPin,
  Sparkles,
  Building2,
  Phone,
  Clock,
  Quote,
  GraduationCap,
  ShieldCheck,
} from "lucide-react";
import { HeroSection } from "@/components/sections/HeroSection";
import { StatsSection } from "@/components/sections/StatsSection";
import { ProgramGrid } from "@/components/sections/ProgramGrid";
import { useCMS } from "@/context/CMSContext";

const iconMap: Record<string, typeof TrendingUp> = {
  TrendingUp,
  Heart,
  Users,
  Briefcase,
};

const Index: React.FC = () => {
  const { programs, impactStats, stories, homepageHero, events, centers } = useCMS();

  // Convert dynamic impact stats to format expected by StatsSection
  const formattedStats = impactStats.map((st) => ({
    icon: iconMap[st.iconName] || TrendingUp,
    value: st.value,
    label: st.label,
  }));

  const featuredStories = stories.filter((s) => s.featured);
  const displayStories = featuredStories.length > 0 ? featuredStories.slice(0, 3) : stories.slice(0, 3);
  const upcomingEvents = (events || []).filter((e) => e.status === "active" || e.status === "upcoming").slice(0, 3);
  const displayCenters = (centers || []).slice(0, 3);

  // Dynamic Headline with Emerald Highlighted Word
  const heroTitle = (
    <span>
      {homepageHero.highlightWord && (
        <span className="text-primary-dark">{homepageHero.highlightWord} </span>
      )}
      {homepageHero.title}
    </span>
  );

  return (
    <div className="flex min-h-screen flex-col bg-white text-secondary font-sans antialiased selection:bg-primary/20 selection:text-primary-dark">
      <Header />

      <main>
        {/* 1. Dynamic Hero Section */}
        <HeroSection
          title={heroTitle}
          description={homepageHero.description}
          image={homepageHero.image}
          layout="split"
          primaryActionText={homepageHero.primaryActionText || "Join the Movement"}
          primaryActionHref={homepageHero.primaryActionHref || "/volunteer"}
          secondaryActionText={homepageHero.secondaryActionText || "Learn Our Story"}
          secondaryActionHref={homepageHero.secondaryActionHref || "/about"}
        />

        {/* 2. Who We Are (Mission & Ethos) */}
        <section id="about" className="py-20 md:py-32 bg-white">
          <div className="container mx-auto px-6 md:px-10">
            <div className="max-w-4xl mx-auto text-center">
              <span className="text-[10px] md:text-[11px] font-black uppercase tracking-[0.35em] text-primary-dark mb-4 block">
                OUR ETHOS & PURPOSE
              </span>
              <h2 className="mb-8 text-5xl md:text-7xl lg:text-8xl font-black tracking-tightest text-secondary uppercase leading-[0.9]">
                Who We <span className="text-primary-dark">Are.</span>
              </h2>

              <p className="text-xl md:text-2xl text-secondary font-medium leading-relaxed max-w-3xl mx-auto mb-6">
                SUHRID is a grassroots collective of youth and mentors who believe in finding happiness by sharing happiness and empowering rural potential.
              </p>

              <p className="text-base md:text-lg text-secondary/60 leading-relaxed max-w-2xl mx-auto mb-12">
                We provide free academic coaching, merit-based scholarships, elder nutrition rations, youth mental wellness mentorship, and sustainable market access for Bengal's rural artisans.
              </p>

              <div className="flex flex-wrap items-center justify-center gap-3">
                <span className="px-5 py-2.5 rounded-full bg-secondary/5 text-secondary text-xs font-bold uppercase tracking-wider border border-secondary/5">
                  100% Volunteer Driven
                </span>
                <span className="px-5 py-2.5 rounded-full bg-primary/10 text-primary-dark text-xs font-bold uppercase tracking-wider border border-primary/20">
                  80G Tax Exempt
                </span>
                <span className="px-5 py-2.5 rounded-full bg-secondary/5 text-secondary text-xs font-bold uppercase tracking-wider border border-secondary/5">
                  Audited Transparency
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* 3. Core Programs Grid / Carousel */}
        <ProgramGrid
          eyebrow="CORE SUSTAINABLE ECOSYSTEMS"
          title={<>Our Flagship <span className="text-primary-dark">Programs.</span></>}
          subtitle="Focused interventions creating generational self-reliance across education, health, and livelihoods."
          programs={programs}
          asCarousel={true}
          className="bg-[#F9FAFB] border-y border-secondary/5 pb-24 md:pb-36"
        />

        {/* 4. Verified Impact Metrics */}
        <StatsSection
          eyebrow="MEASURABLE TRANSFORMATION"
          title={<>Our Verified <span className="text-primary-dark">Impact.</span></>}
          subtitle="Transparent, verified metric counts from our classrooms, mobile health camps, and artisan clusters."
          stats={formattedStats}
          className="pb-16 md:pb-24 lg:pb-32"
        />

        {/* 5. Grassroots Learning Centers */}
        {displayCenters && displayCenters.length > 0 && (
          <section className="py-20 md:py-32 bg-[#F9FAFB] border-y border-secondary/5">
            <div className="container mx-auto px-6 md:px-10">
              <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
                <div>
                  <span className="text-[10px] md:text-[11px] font-black uppercase tracking-[0.35em] text-primary-dark mb-4 block">
                    GRASSROOTS SANCTUARIES
                  </span>
                  <h2 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tightest text-secondary uppercase leading-[0.9]">
                    Learning <span className="text-primary-dark">Centers.</span>
                  </h2>
                  <p className="text-sm md:text-base text-secondary/60 font-medium mt-3 max-w-xl">
                    Dedicated community spaces providing free daily tutoring, library access, and youth counseling.
                  </p>
                </div>
                <Button
                  variant="outline"
                  className="rounded-full px-8 py-6 text-xs uppercase tracking-widest font-black border-2 border-secondary/20 hover:bg-secondary hover:text-white transition-all self-start md:self-auto shrink-0"
                  asChild
                >
                  <Link to="/centers">Explore All Centers &rarr;</Link>
                </Button>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {displayCenters.map((center) => (
                  <div
                    key={center.id}
                    className="group bg-white rounded-5xl overflow-hidden border border-secondary/10 shadow-sm hover:shadow-2xl transition-all duration-700 flex flex-col justify-between"
                  >
                    <div>
                      <div className="h-64 relative overflow-hidden bg-stone-100">
                        <img
                          src={center.image}
                          alt={center.name}
                          className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />

                        <div className="absolute top-4 left-4">
                          <span className="px-3.5 py-1 rounded-full bg-white/95 backdrop-blur-md text-[10px] font-black uppercase tracking-wider text-secondary shadow-sm">
                            {center.location.split(",")[0] || center.location}
                          </span>
                        </div>
                        {center.beneficiaries && (
                          <div className="absolute bottom-4 left-4">
                            <span className="px-3.5 py-1 rounded-full bg-primary text-[10px] font-black uppercase tracking-wider text-white shadow-sm">
                              {center.beneficiaries} Beneficiaries
                            </span>
                          </div>
                        )}
                      </div>

                      <div className="p-8">
                        <h3 className="text-2xl font-black tracking-tightest text-secondary mb-3 group-hover:text-primary transition-colors">
                          {center.name}
                        </h3>
                        <p className="text-sm font-medium text-secondary/60 leading-relaxed mb-6 line-clamp-3">
                          {center.description}
                        </p>
                        <div className="flex items-center gap-2 text-xs font-semibold text-secondary/60">
                          <MapPin className="w-4 h-4 text-primary shrink-0" />
                          <span className="truncate">{center.contact?.address || center.location}</span>
                        </div>
                      </div>
                    </div>

                    <div className="p-6 px-8 bg-[#F9FAFB] border-t border-secondary/5 flex items-center justify-between">
                      <Link
                        to={`/centers#${center.id}`}
                        className="text-xs font-black uppercase tracking-widest text-secondary hover:text-primary transition-colors flex items-center gap-1.5"
                      >
                        Visit Center Details
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                      {center.contact?.phone && (
                        <a
                          href={`tel:${center.contact.phone}`}
                          className="text-xs font-bold text-secondary/60 hover:text-primary transition-colors flex items-center gap-1"
                        >
                          <Phone className="w-3.5 h-3.5 text-primary" />
                          Call
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* 6. Beneficiary Stories Section */}
        <section id="stories" className="bg-white py-20 md:py-32">
          <div className="container mx-auto px-6 md:px-10">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
              <div>
                <span className="text-[10px] md:text-[11px] font-black uppercase tracking-[0.35em] text-primary-dark mb-4 block">
                  LIVED EXPERIENCES
                </span>
                <h2 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tightest text-secondary uppercase leading-[0.9]">
                  Stories of <span className="text-primary-dark">Hope.</span>
                </h2>
                <p className="text-sm md:text-base text-secondary/60 font-medium mt-3 max-w-xl">
                  Authentic beneficiary journeys of students breaking cycles and rural families finding dignified livelihoods.
                </p>
              </div>

              <Button
                variant="outline"
                className="rounded-full px-8 py-6 text-xs uppercase tracking-widest font-black border-2 border-secondary/20 hover:bg-secondary hover:text-white transition-all self-start md:self-auto shrink-0"
                asChild
              >
                <Link to="/stories">View All Stories &rarr;</Link>
              </Button>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {displayStories.map((story) => (
                <div
                  key={story.id}
                  className="group bg-white rounded-5xl overflow-hidden border border-secondary/10 shadow-sm hover:shadow-2xl transition-all duration-700 flex flex-col justify-between"
                >
                  <div>
                    {/* Story Cover Image */}
                    <div className="h-56 relative overflow-hidden bg-stone-100">
                      <img
                        src={story.image}
                        alt={story.title}
                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />

                      <div className="absolute top-4 left-4">
                        <span className="px-3.5 py-1 rounded-full bg-white/95 backdrop-blur-md text-[10px] font-black uppercase tracking-wider text-secondary shadow-sm">
                          {story.category}
                        </span>
                      </div>
                    </div>

                    {/* Story Content */}
                    <div className="p-8">
                      <div className="mb-4 h-1 w-10 rounded-full bg-primary group-hover:w-16 transition-all duration-500" />
                      <h3 className="mb-3 text-2xl font-black tracking-tightest text-secondary leading-snug group-hover:text-primary transition-colors">
                        {story.title}
                      </h3>
                      <p className="text-sm font-medium text-secondary/60 leading-relaxed mb-6 line-clamp-3">
                        {story.description}
                      </p>

                      {story.quote && (
                        <div className="p-4 rounded-3xl bg-[#F9FAFB] border border-secondary/5 flex items-start gap-2.5 mb-4">
                          <Quote className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
                          <p className="text-xs text-secondary/70 italic line-clamp-2">"{story.quote}"</p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Story Footer */}
                  <div className="p-6 px-8 bg-[#F9FAFB] border-t border-secondary/5 flex items-center justify-between">
                    <div>
                      <span className="text-xs font-black text-secondary block">{story.author}</span>
                      <span className="text-[10px] uppercase font-bold tracking-wider text-secondary/40">
                        {story.role}
                      </span>
                    </div>

                    <Button
                      variant="link"
                      className="p-0 text-[11px] font-black uppercase tracking-[0.2em] text-secondary group-hover:text-primary transition-all"
                      asChild
                    >
                      <Link to={`/stories/${story.id}`}>
                        Read &rarr;
                      </Link>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 7. Upcoming Community Events & Medical Camps */}
        {upcomingEvents && upcomingEvents.length > 0 && (
          <section className="py-20 md:py-32 bg-[#F9FAFB] border-t border-secondary/5">
            <div className="container mx-auto px-6 md:px-10">
              <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
                <div>
                  <span className="text-[10px] md:text-[11px] font-black uppercase tracking-[0.35em] text-primary-dark mb-4 block">
                    ON-GROUND MOBILIZATION
                  </span>
                  <h2 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tightest text-secondary uppercase leading-[0.9]">
                    Camps & <span className="text-primary-dark">Events.</span>
                  </h2>
                  <p className="text-sm md:text-base text-secondary/60 font-medium mt-3 max-w-xl">
                    Free general health clinics, eye exams, winter relief distribution, and youth leadership drives.
                  </p>
                </div>
                <Button
                  variant="outline"
                  className="rounded-full px-8 py-6 text-xs uppercase tracking-widest font-black border-2 border-secondary/20 hover:bg-secondary hover:text-white transition-all self-start md:self-auto shrink-0"
                  asChild
                >
                  <Link to="/events">View All Events & Camps &rarr;</Link>
                </Button>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {upcomingEvents.map((evt) => (
                  <div
                    key={evt.id}
                    className="group bg-white rounded-5xl overflow-hidden border border-secondary/10 shadow-sm hover:shadow-2xl transition-all duration-700 flex flex-col justify-between"
                  >
                    <div>
                      {/* Event Banner */}
                      <div className="h-56 relative overflow-hidden bg-stone-100">
                        {evt.image ? (
                          <img
                            src={evt.image}
                            alt={evt.title}
                            className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-secondary/5 text-primary">
                            <Calendar className="w-12 h-12" />
                          </div>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />

                        <div className="absolute top-4 left-4 flex items-center gap-2">
                          <span className="px-3 py-1 rounded-full bg-white/95 backdrop-blur-md text-secondary font-black text-[10px] uppercase tracking-wider shadow-sm">
                            {evt.category}
                          </span>
                          <span
                            className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-wider ${
                              evt.status === "active" || evt.status === "upcoming"
                                ? "bg-primary text-white shadow-sm"
                                : "bg-secondary text-white"
                            }`}
                          >
                            {evt.status}
                          </span>
                        </div>
                      </div>

                      {/* Event Details */}
                      <div className="p-8">
                        <div className="flex items-center gap-2 text-xs font-bold text-primary mb-2">
                          <Calendar className="w-4 h-4" />
                          <span>{evt.date}</span>
                          {evt.time && <span className="text-secondary/40 font-normal">({evt.time})</span>}
                        </div>

                        <h3 className="text-2xl font-black tracking-tightest text-secondary mb-3 group-hover:text-primary transition-colors">
                          {evt.title}
                        </h3>

                        <p className="text-sm font-medium text-secondary/60 leading-relaxed mb-6 line-clamp-3">
                          {evt.description}
                        </p>

                        <div className="flex items-center gap-2 text-xs font-semibold text-secondary/60">
                          <MapPin className="w-4 h-4 text-primary shrink-0" />
                          <span className="truncate">{evt.location}</span>
                        </div>
                      </div>
                    </div>

                    <div className="p-6 px-8 bg-[#F9FAFB] border-t border-secondary/5 flex items-center justify-between">
                      <span className="text-[11px] font-bold text-secondary/50">
                        {evt.centerName || "Midnapore Center"}
                      </span>

                      <Link
                        to="/events"
                        className="text-xs font-black uppercase tracking-wider text-secondary hover:text-primary transition-colors flex items-center gap-1"
                      >
                        Details &rarr;
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* 8. Call to Action (Work With Us) */}
        <section id="contact" className="bg-secondary py-24 md:py-36 relative overflow-hidden text-white">
          {/* Subtle Ambient Radial Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />

          <div className="container mx-auto px-6 md:px-10 text-center relative z-10">
            <span className="text-[10px] md:text-[11px] font-black uppercase tracking-[0.35em] text-primary-light mb-4 block">
              PARTNER WITH US
            </span>
            <h2 className="mb-6 text-5xl md:text-7xl lg:text-8xl font-black text-white uppercase tracking-tightest leading-[0.9]">
              Empower a <span className="text-primary-light">Life Today.</span>
            </h2>
            <p className="mb-12 text-lg md:text-xl text-white/70 max-w-2xl mx-auto leading-relaxed font-medium">
              Every contribution directly fuels daily student coaching, essential medical clinics, and self-reliant livelihood training for rural Bengal families.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Button
                size="huge"
                className="px-10 py-7 bg-primary hover:bg-primary-dark text-white rounded-full font-black uppercase tracking-widest text-[12px] shadow-xl shadow-primary/20 transition-all hover:scale-105"
                asChild
              >
                <Link to="/donate">Donate Directly &rarr;</Link>
              </Button>
              <Button
                variant="outline"
                size="huge"
                className="px-10 py-7 border-2 border-white/20 text-white hover:bg-white/10 rounded-full font-black uppercase tracking-widest text-[12px] transition-all"
                asChild
              >
                <Link to="/volunteer">Become a Volunteer</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
