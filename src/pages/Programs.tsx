import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowRight, TrendingUp, Calendar, MapPin, Users, HeartHandshake, Phone, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import { programsData } from "@/data/programs";
import { useCMS } from "@/context/CMSContext";

const Programs = () => {
  const { events } = useCMS();
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Header />

      <main className="flex-1 overflow-x-hidden">
        {/* Hero Section */}
        <section className="pt-32 pb-20 md:pt-48 md:pb-32 bg-white">
          <div className="container mx-auto px-6 md:px-10">
            <div className="max-w-4xl">
              <span className="text-[11px] font-black uppercase tracking-[0.3em] text-primary-dark mb-6 block">
                INITIATIVES & ACTION
              </span>
              <h1 className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tightest leading-[0.9] text-secondary mb-10">
                Crafting Sustainable <br className="hidden md:block" />
                <span className="text-primary-dark">Change Together.</span>
              </h1>
              <div className="flex flex-col md:flex-row items-start md:items-center gap-8 md:gap-16">
                <p className="text-xl md:text-2xl text-secondary/60 font-medium leading-relaxed max-w-xl">
                  We don't believe in temporary fixes. Our projects are designed as self-sustaining ecosystems that empower rural communities.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Asymmetric Initiative Grid */}
        <section className="py-20 md:py-32 bg-[#F9FAFB]">
          <div className="container mx-auto px-6 md:px-10">
            <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 auto-rows-auto">

              {/* Card 1: Large Wide (SUGYAN) */}
              <div id="sugyan" className="md:col-span-2 lg:col-span-2 relative aspect-[16/10] md:aspect-auto md:h-[600px] group overflow-hidden rounded-huge shadow-2xl scroll-mt-28">
                <img
                  src={programsData.featured[0].image}
                  alt={programsData.featured[0].title}
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute top-10 left-10">
                  <span className="px-4 py-1.5 bg-primary-dark/80 backdrop-blur-md rounded-full text-[10px] font-black uppercase tracking-widest text-white">
                    {programsData.featured[0].label} • {programsData.featured[0].metric}
                  </span>
                </div>
                <div className="absolute bottom-10 left-10 right-10">
                  <h3 className="text-4xl md:text-5xl font-black tracking-tightest text-white mb-6">
                    {programsData.featured[0].title}
                  </h3>
                  <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6">
                    <p className="text-white/60 text-lg font-medium max-w-md">
                      {programsData.featured[0].description}
                    </p>

                  </div>
                </div>
              </div>

              {/* Card 2: Vertical Small (SRICHARANESHU) */}
              <div id="Sricharaneshu" className="lg:col-span-1 bg-white rounded-huge shadow-sm p-10 flex flex-col justify-between group hover:shadow-xl transition-all duration-500 overflow-hidden relative scroll-mt-28">
                <div>
                  <h3 className="text-3xl font-black tracking-tightest text-secondary mb-4">
                    {programsData.featured[1].title}
                  </h3>
                  <p className="text-secondary/60 font-medium leading-relaxed mb-6">
                    {programsData.featured[1].description}
                  </p>
                </div>
                <div>
                  <img
                    src={programsData.featured[1].image}
                    alt="Clinic"
                    className="w-full h-48 object-cover rounded-3xl grayscale group-hover:grayscale-0 transition-all duration-700"
                  />
                  <p className="mt-6 text-[10px] font-black uppercase tracking-widest text-primary-dark">
                    {programsData.featured[1].metric}
                  </p>
                </div>
              </div>

              {/* Card 3: Horizontal Medium (UNMESH) */}
              <div id="UNMESH" className="md:col-span-2 lg:col-span-2 bg-white rounded-huge shadow-sm flex flex-col md:flex-row group hover:shadow-xl transition-all duration-500 overflow-hidden scroll-mt-28">
                <div className="flex-1 p-12 flex flex-col justify-center">
                  <h3 className="text-4xl font-black tracking-tightest text-secondary mb-6">
                    {programsData.featured[2].title}
                  </h3>
                  <p className="text-secondary/60 text-lg font-medium leading-relaxed mb-10">
                    {programsData.featured[2].description}
                  </p>
                  <div className="flex items-center gap-12">
                    <div>
                      <span className="block text-2xl font-black text-primary-dark">{programsData.featured[2].metric.split(' ')[0]} Child </span>
                      <span className="text-[10px] font-black uppercase tracking-widest text-secondary/30">Development</span>
                    </div>
                    <div>
                      <span className="block text-2xl font-black text-primary-dark">100+ Children</span>
                      <span className="text-[10px] font-black uppercase tracking-widest text-secondary/30">Enrolled</span>
                    </div>
                  </div>
                </div>
                <div className="flex-1 relative overflow-hidden min-h-[300px]">
                  <img
                    src={programsData.featured[2].image}
                    alt="Water"
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                  />
                </div>
              </div>

              {/* Card 4: Vertical Emerald (SWANIRBHAR) */}
              <div id="SWANIRBHAR" className="lg:col-span-1 bg-primary-dark rounded-huge p-12 text-white flex flex-col justify-between group hover:scale-[1.02] transition-all duration-500 relative overflow-hidden shadow-2xl shadow-primary-dark/20 scroll-mt-28">
                <div className="absolute -top-20 -right-20 h-64 w-64 bg-white/10 rounded-full blur-3xl group-hover:bg-white/20 transition-all duration-700" />

                <div>
                  <div className="h-16 w-16 rounded-2xl bg-white/10 flex items-center justify-center text-white mb-10">
                    <TrendingUp className="h-8 w-8" />
                  </div>
                  <h3 className="text-3xl font-black tracking-tightest text-white mb-6">
                    {programsData.featured[3].title}
                  </h3>
                  <p className="text-white/60 font-medium leading-relaxed mb-12">
                    {programsData.featured[3].description}
                  </p>
                </div>

                <div>
                  <div className="text-5xl font-black tracking-tightest mb-2">
                    {programsData.featured[3].metric.split(' ')[0]}
                  </div>
                  <div className="text-[10px] font-black uppercase tracking-widest opacity-60">
                    {programsData.featured[3].metric.split(' ').slice(1).join(' ')}
                  </div>
                  <div className="mt-8 flex items-end gap-1 h-12">
                    {[40, 70, 45, 90, 65, 80, 100].map((h, i) => (
                      <div
                        key={i}
                        className="flex-1 bg-white/20 rounded-t-sm group-hover:bg-white/40 transition-all duration-500"
                        style={{ height: `${h}%` }}
                      ></div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Foundation Programs (Secondary) */}
        <section className="py-20 md:py-32 bg-white">
          <div className="container mx-auto px-6 md:px-10">
            <div className="mb-20 text-center">
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-primary-dark mb-4 block">
                CORE FRAMEWORK
              </span>
              <h2 className="text-4xl md:text-5xl font-black tracking-tightest text-secondary">
                Foundation Programs
              </h2>
            </div>
            <div className="grid md:grid-cols-3 gap-12">
              {programsData.secondary.map((prog, idx) => (
                <div key={idx} className="p-10 rounded-huge border border-secondary/5 hover:border-primary/20 transition-all group">
                  <span className="text-[10px] font-black uppercase tracking-widest text-primary-dark px-3 py-1 bg-primary/5 rounded-full mb-6 inline-block">
                    {prog.tag}
                  </span>
                  <h3 className="text-2xl font-black tracking-tightest text-secondary mb-4 group-hover:text-primary-dark transition-colors">
                    {prog.title}
                  </h3>
                  <p className="text-secondary/60 font-medium leading-relaxed">
                    {prog.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Dynamic Community Events & Health Camps Section */}
        {events && events.length > 0 && (
          <section className="py-20 md:py-32 bg-[#FBFBF9] border-t border-secondary/5">
            <div className="container mx-auto px-6 md:px-10">
              <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
                <div>
                  <span className="text-[10px] font-black uppercase tracking-[0.4em] text-primary-dark mb-4 block">
                    ON-GROUND MOBILIZATION
                  </span>
                  <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tightest text-secondary">
                    Community Camps & Gatherings
                  </h2>
                </div>
                <p className="text-secondary/60 font-medium max-w-md text-sm md:text-base">
                  Upcoming healthcare checkups, diagnostic screenings, and grassroots outreach events open to all village members.
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {events.map((evt) => (
                  <div
                    key={evt.id}
                    className="bg-white rounded-[2rem] p-8 border border-secondary/5 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-3 mb-5">
                        <span className="text-[10px] font-black uppercase tracking-widest text-primary-dark px-3 py-1 bg-primary/10 rounded-full">
                          {evt.category}
                        </span>
                        <span
                          className={`text-[9px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full ${
                            evt.status === "active"
                              ? "bg-emerald-500 text-white animate-pulse"
                              : evt.status === "upcoming"
                              ? "bg-amber-100 text-amber-800"
                              : "bg-stone-100 text-stone-500"
                          }`}
                        >
                          {evt.status}
                        </span>
                      </div>

                      <h3 className="text-2xl font-black tracking-tightest text-secondary mb-3 group-hover:text-primary-dark transition-colors">
                        {evt.title}
                      </h3>

                      <p className="text-secondary/70 text-sm font-medium leading-relaxed mb-6">
                        {evt.description}
                      </p>
                    </div>

                    <div className="pt-6 border-t border-secondary/5 space-y-2.5 text-xs text-secondary/70">
                      <div className="flex items-center gap-2.5">
                        <Calendar className="w-4 h-4 text-primary-dark shrink-0" />
                        <span className="font-semibold text-secondary">{evt.date}</span>
                        {evt.time && <span className="text-secondary/40">({evt.time})</span>}
                      </div>

                      <div className="flex items-center gap-2.5">
                        <MapPin className="w-4 h-4 text-primary-dark shrink-0" />
                        <span className="truncate">{evt.venue}</span>
                      </div>

                      {evt.expectedBeneficiaries && (
                        <div className="flex items-center gap-2.5">
                          <Users className="w-4 h-4 text-primary-dark shrink-0" />
                          <span>Target: <strong className="text-secondary font-bold">{evt.expectedBeneficiaries}</strong></span>
                        </div>
                      )}

                      {evt.coordinatorContact && (
                        <div className="flex items-center gap-2.5">
                          <Phone className="w-4 h-4 text-primary-dark shrink-0" />
                          <span>Helpdesk: <strong className="text-secondary font-bold">{evt.coordinatorContact}</strong></span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Scale of Intentionality Section */}
        <section className="py-20 md:py-32 bg-[#F9FAFB] border-y border-secondary/5">
          <div className="container mx-auto px-6 md:px-10">
            <div className="text-center mb-24">
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-secondary/30 mb-4 block">
                THE SCALE OF INTENTIONALITY
              </span>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-16">
              {programsData.stats.map((stat, idx) => (
                <div key={idx} className="flex flex-col items-center group">
                  <div className="w-32 h-32 md:w-48 md:h-48 rounded-full border border-secondary/10 flex items-center justify-center relative mb-8 group-hover:border-primary-dark/40 transition-all duration-700">
                    <div className="text-4xl md:text-6xl font-black tracking-tightest text-secondary group-hover:scale-110 transition-transform duration-700">
                      {stat.value}
                    </div>
                    {idx === 0 && (
                      <div className="absolute top-4 right-4 w-6 h-6 rounded-full bg-primary-dark flex items-center justify-center text-white text-xs font-black shadow-lg">
                        +
                      </div>
                    )}
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-[0.3em] text-secondary/40 text-center">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 md:py-40 bg-white">
          <div className="container mx-auto px-6 md:px-10">
            <div className="bg-primary rounded-huge p-12 md:p-32 text-center text-white relative overflow-hidden shadow-2xl shadow-primary/20">
              <div className="absolute top-0 right-0 h-full w-1/3 bg-white/5 skew-x-[-20deg] translate-x-1/2" />
              <div className="relative z-10">
                <h2 className="text-5xl md:text-8xl font-black tracking-tightest mb-8">
                  Ready to make <br /> an impact?
                </h2>
                <p className="text-xl md:text-2xl text-white/80 font-medium mb-16 max-w-2xl mx-auto leading-relaxed">
                  Your support fuels these initiatives. Join us in building a future where every village is a sanctuary of progress.
                </p>
                <div className="flex flex-col md:flex-row items-center justify-center gap-6">
                  <Button className="bg-secondary text-white hover:bg-black rounded-full px-12 py-8 h-auto font-black uppercase tracking-widest text-[12px] shadow-xl" asChild>
                    <Link to="/donate">Sponsor a Project</Link>
                  </Button>
                  <Button className="bg-white/20 backdrop-blur-md text-white hover:bg-white/30 border border-white/30 rounded-full px-12 py-8 h-auto font-black uppercase tracking-widest text-[12px]" asChild>
                    <Link to="/volunteer">Volunteer with us</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Programs;
