import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { aboutData } from "@/data/about";
import { useCMS } from "@/context/CMSContext";

const About = () => {
  const { teamMembers } = useCMS();
  const members = teamMembers && teamMembers.length >= 3 ? teamMembers : aboutData.team.members;
  return (
    <div className="flex min-h-screen flex-col bg-[#F9FAFB]">
      <Header />

      <main className="pt-24 md:pt-32">
        {/* Editorial Hero */}
        <section className="py-20 md:py-32 lg:py-40">
          <div className="container mx-auto px-6 md:px-10">
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-12">
              <div className="max-w-4xl">
                <span className="text-[11px] font-black uppercase tracking-[0.3em] text-primary-dark mb-8 block">
                  {aboutData.hero.subtitle}
                </span>
                <h1 className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tightest leading-[0.9] text-secondary">
                  Founded on <span className="text-primary-dark tracking-tightest">Intentionality.</span>
                </h1>
              </div>
              <p className="text-xl md:text-2xl text-secondary/60 font-medium max-w-sm lg:mb-4">
                {aboutData.hero.description}
              </p>
            </div>
          </div>
        </section>

        {/* The Genesis Section */}
        <section className="py-20 md:py-32 lg:py-40 bg-white">
          <div className="container mx-auto px-6 md:px-10">
            <div className="grid lg:grid-cols-2 gap-20 lg:gap-32 items-center">
              <div className="relative group">
                <div className="absolute -inset-4 bg-primary/5 rounded-huge -rotate-2 scale-105 transition-transform group-hover:rotate-0 duration-700" />
                <div className="relative aspect-[4/5] overflow-hidden rounded-huge shadow-2xl">
                  <img
                    src={aboutData.genesis.image}
                    alt="Founder"
                    className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000"
                  />
                  {/* Floating Date Card */}
                  <div className="absolute bottom-10 -right-6 md:-right-12 bg-white p-8 md:p-10 rounded-2xl shadow-huge max-w-[240px] animate-in slide-in-from-right-12 duration-1000 delay-500">
                    <div className="text-4xl font-black tracking-tightest text-primary-dark mb-2">
                      {aboutData.genesis.year}
                    </div>
                    <div className="text-[10px] font-black uppercase tracking-[0.2em] text-secondary/40 leading-tight">
                      {aboutData.genesis.label}
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-5xl md:text-7xl font-black tracking-tightest text-secondary mb-12">
                  {aboutData.genesis.title}
                </h2>
                <p className="text-xl md:text-2xl text-secondary/80 font-medium leading-relaxed mb-10">
                  {aboutData.genesis.story}
                </p>
                <Button variant="ghost" size="huge" className="text-secondary hover:text-primary transition-colors pr-0 font-black uppercase tracking-widest text-[11px]" asChild>
                  <Link to="/about/manifesto" className="flex items-center gap-4">
                    Read the full Founding Manifesto <ArrowRight size={16} />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Our Journey Section */}
        <section className="py-20 md:py-32 lg:py-40 bg-white relative overflow-hidden">
          <div className="container mx-auto px-6 md:px-10">
            <div className="mb-24">
              <span className="text-[11px] font-black uppercase tracking-[0.3em] text-primary-dark mb-6 block">
                {aboutData.journey.subtitle}
              </span>
              <h2 className="text-5xl md:text-7xl font-black tracking-tightest text-secondary">
                {aboutData.journey.title}
              </h2>
            </div>

            <div className="grid gap-12 md:gap-24">
              {aboutData.journey.milestones.map((milestone, idx) => (
                <div
                  key={idx}
                  className={`flex flex-col md:flex-row gap-8 md:gap-20 items-start ${idx % 2 === 1 ? 'md:flex-row-reverse' : ''
                    }`}
                >
                  {/* Year Marker */}
                  <div className="flex-1 w-full">
                    <div className="relative group">
                      <span className="text-7xl md:text-[10rem] font-black text-secondary/5 tracking-tightest select-none block leading-none group-hover:text-primary/10 transition-colors duration-700">
                        {milestone.year}
                      </span>
                      <div className="md:absolute top-1/2 left-0 md:-translate-y-1/2 w-full">
                        <span className="text-[10px] font-black uppercase tracking-[0.4em] text-primary-dark block mb-4">
                          {milestone.label}
                        </span>
                        <h3 className="text-3xl md:text-4xl font-black tracking-tightest text-secondary">
                          {milestone.title}
                        </h3>
                      </div>
                    </div>
                  </div>

                  {/* Description Box */}
                  <div className="flex-1 w-full pt-4 md:pt-16">
                    <div className="max-w-md">
                      <p className="text-lg md:text-xl text-secondary/60 font-medium leading-relaxed">
                        {milestone.description}
                      </p>
                      <div className="h-px w-20 bg-primary/20 mt-10" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* The Young Leaders - Modern Team Grid */}
        <section className="py-20 md:py-32 lg:py-40 bg-[#F9FAFB] relative overflow-hidden">
          <div className="container mx-auto px-6 md:px-10">
            <div className="mb-24 text-center">
              <span className="text-[11px] font-black uppercase tracking-[0.3em] text-primary-dark mb-6 block">
                {aboutData.team.subtitle}
              </span>
              <h2 className="text-5xl md:text-7xl font-black tracking-tightest text-secondary">
                {aboutData.team.title}
              </h2>
            </div>

            <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {/* Row 1: Large Card + Character Card */}
              <div className="md:col-span-2 lg:col-span-2 relative aspect-[16/10] group overflow-hidden rounded-huge shadow-2xl">
                <img
                  src={members[0]?.image || aboutData.team.members[0].image}
                  alt={members[0]?.name || aboutData.team.members[0].name}
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-10 left-10 text-white">
                  <h3 className="text-3xl font-black tracking-tightest mb-1">{members[0]?.name || aboutData.team.members[0].name}</h3>
                  {members[0]?.role && (
                    <p className="text-sm font-bold uppercase tracking-widest text-primary-light opacity-80">{members[0].role}</p>
                  )}
                </div>
              </div>

              {/* Smaller Card (White) with Bengali Phrase */}
              <div className="lg:col-span-1 p-10 bg-white rounded-huge shadow-huge flex flex-col items-center justify-center text-center group hover:shadow-xl transition-all duration-500 min-h-[300px]">
                <div className="h-16 w-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary-dark mb-10 group-hover:bg-primary group-hover:text-white transition-all duration-500">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                  </svg>
                </div>
                <h3 className="text-4xl md:text-5xl font-black tracking-tightest text-secondary leading-tight">
                  জীব সেবাই শিব সেবা
                </h3>
                <p className="mt-8 text-[10px] font-black uppercase tracking-[0.3em] text-secondary/30 group-hover:text-primary-dark transition-colors">
                  Our Core Philosophy
                </p>
              </div>

              {/* Row 2: 3 Squares (Director | Stat Card in Center | Director) */}
              <div className="col-span-full grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {/* Director 1 */}
                <div className="relative aspect-square group overflow-hidden rounded-huge shadow-2xl">
                  <img
                    src={members[1]?.image || aboutData.team.members[1].image}
                    alt={members[1]?.name || aboutData.team.members[1].name}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-8 left-8 text-white">
                    <h3 className="text-xl font-black tracking-tightest">{members[1]?.name || aboutData.team.members[1].name}</h3>
                    <p className="text-[10px] font-black uppercase tracking-widest opacity-60">{members[1]?.role || aboutData.team.members[1].role}</p>
                  </div>
                </div>

                {/* Center Tile: Square Emerald Stat Card */}
                <div className="aspect-square bg-primary-dark rounded-huge p-10 text-white flex flex-col items-center justify-center text-center group hover:scale-[1.02] transition-transform duration-500">
                  <div className="text-6xl lg:text-7xl font-black tracking-tightest mb-4">
                    40+
                  </div>
                  <div className="text-[10px] font-black uppercase tracking-[0.2em] opacity-60">
                    Young Mentors Engaged
                  </div>
                </div>

                {/* Director 2 */}
                <div className="relative aspect-square group overflow-hidden rounded-huge shadow-2xl">
                  <img
                    src={members[2]?.image || aboutData.team.members[2].image}
                    alt={members[2]?.name || aboutData.team.members[2].name}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-8 left-8 text-white">
                    <h3 className="text-xl font-black tracking-tightest">{members[2]?.name || aboutData.team.members[2].name}</h3>
                    <p className="text-[10px] font-black uppercase tracking-widest opacity-60">{members[2]?.role || aboutData.team.members[2].role}</p>
                  </div>
                </div>

                {/* Additional Team Members */}
                {members.slice(3).map((member) => (
                  <div key={member.id || member.name} className="relative aspect-square group overflow-hidden rounded-huge shadow-2xl">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-8 left-8 text-white">
                      <h3 className="text-xl font-black tracking-tightest">{member.name}</h3>
                      <p className="text-[10px] font-black uppercase tracking-widest opacity-60">{member.role}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-20 md:py-32 lg:py-40 bg-white border-t border-secondary/5">
          <div className="container mx-auto px-6 md:px-10">
            <div className="grid lg:grid-cols-3 gap-12 lg:gap-24">
              {aboutData.values.map((value, idx) => (
                <div key={idx} className="pt-12 border-t-4 border-primary-dark">
                  <h3 className="text-2xl font-black tracking-tightest text-secondary mb-8">
                    {value.title}
                  </h3>
                  <p className="text-base text-secondary/60 font-medium leading-relaxed">
                    {value.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default About;
