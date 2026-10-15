import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  BookOpen,
  Heart,
  Sparkles,
  Briefcase,
  Download,
  ArrowRight
} from "lucide-react";
import impactHero from "@/assets/impact-hero.jpg";
import { HeroSection } from "@/components/sections/HeroSection";
import { StatsSection } from "@/components/sections/StatsSection";
import { Link } from "react-router-dom";
import { impactStatsData } from "@/data/impact-stats";
import { programsData } from "@/data/programs";
import { useCMS } from "@/context/CMSContext";

const programImpacts = [
  {
    title: "Education & Scholarship",
    program: "SUGYAN & UNMESH",
    icon: BookOpen,
    image: programsData.featured[0].image,
    stats: [
      { label: "Scholarship Students", value: "21", description: "Full financial support" },
      { label: "Books Distributed", value: "6", description: "Additional students aided" },
      { label: "Free Coaching Centers", value: "3+", description: "Across West Bengal" },
    ]
  },
  {
    title: "Elderly Care",
    program: "SRICHARANESHU",
    icon: Heart,
    image: programsData.featured[1].image,
    stats: [
      { label: "Elderly Supported", value: "50+", description: "Regular rations & clothes" },
      { label: "House Renovations", value: "2", description: "Safe living spaces" },
      { label: "Medical Support", value: "Ongoing", description: "Healthcare assistance" },
    ]
  },
  {
    title: "Youth Empowerment",
    program: "YUVA SAMMELAN & More",
    icon: Sparkles,
    image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=1170&auto=format&fit=crop",
    stats: [
      { label: "Youth Gatherings", value: "2/year", description: "Motivation & guidance" },
      { label: "Study Circles", value: "Active", description: "Character building" },
      { label: "Cultural Events", value: "Regular", description: "Celebrating heritage" },
    ]
  },
  {
    title: "Livelihood Support",
    program: "SUHRID SWANIRBHAR",
    icon: Briefcase,
    image: programsData.featured[3].image,
    stats: [
      { label: "Artisans Supported", value: "Multiple", description: "Market access provided" },
      { label: "Online Platforms", value: "3+", description: "Amazon, Flipkart, Social" },
      { label: "Financial Aid", value: "Available", description: "For raw materials" },
    ]
  }
];

const Impact = () => {
  const { reports } = useCMS();
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Header isLight={true} />

      <main className="flex-1">
        {/* Hero Section */}
        <HeroSection 
          title={<>Creating Lasting <span className="text-primary-dark">Impact</span></>}
          description="Seven programs, countless lives transformed across West Bengal"
          image={impactHero}
          alt="Impact assessment"
          className="from-primary/85 via-primary/75 to-primary-light/70"
        />

        {/* Key Metrics */}
        <StatsSection 
          title="Impact at a Glance"
          stats={impactStatsData}
        />

        {/* Program-wise Impact */}
        <section className="py-20 md:py-32 bg-[#F9FAFB]">
          <div className="container mx-auto px-6 md:px-10">
            <div className="mb-20">
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-primary-dark mb-4 block">
                MEASURABLE PROGRESS
              </span>
              <h2 className="text-4xl md:text-6xl font-black tracking-tightest text-secondary uppercase leading-[0.9]">
                Program <br /> Breakdown
              </h2>
            </div>

            <div className="grid gap-12 lg:grid-cols-2">
              {programImpacts.map((program, index) => {
                const Icon = program.icon;
                return (
                  <div
                    key={index}
                    className="flex flex-col md:flex-row bg-white rounded-huge shadow-sm border border-secondary/5 overflow-hidden group hover:shadow-2xl transition-all duration-700"
                  >
                    <div className="md:w-1/2 relative overflow-hidden h-64 md:h-auto">
                      <img 
                        src={program.image} 
                        alt={program.title}
                        className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-primary-dark/10 group-hover:bg-transparent transition-colors duration-700" />
                    </div>
                    <div className="md:w-1/2 p-8 md:p-10 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center gap-3 mb-6">
                          <div className="p-2 rounded-lg bg-primary/5 text-primary">
                            <Icon size={20} />
                          </div>
                          <span className="text-[10px] font-black uppercase tracking-widest text-secondary/40">
                            {program.program}
                          </span>
                        </div>
                        <h3 className="text-2xl md:text-3xl font-black tracking-tightest text-secondary mb-8">
                          {program.title}
                        </h3>
                        
                        <div className="space-y-6">
                          {program.stats.map((stat, idx) => (
                            <div key={idx} className="flex justify-between items-end border-b border-secondary/5 pb-2">
                              <div>
                                <span className="block text-[9px] font-black uppercase tracking-widest text-secondary/30 mb-1">
                                  {stat.label}
                                </span>
                                <p className="text-[11px] font-medium text-secondary/60 line-clamp-1">
                                  {stat.description}
                                </p>
                              </div>
                              <span className="text-xl font-black text-primary-dark">
                                {stat.value}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <Button variant="link" className="mt-10 p-0 h-auto self-start text-[10px] font-black uppercase tracking-widest gap-2 group-hover:gap-4 transition-all" asChild>
                        <Link to="/programs">Deep Dive <ArrowRight size={14} /></Link>
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Annual Reports & Transparency Vault */}
        <section className="bg-white py-20 md:py-32">
          <div className="container mx-auto px-6 md:px-10">
            <div className="bg-secondary rounded-huge p-8 md:p-16 lg:p-20 text-white relative overflow-hidden">
               <div className="absolute top-0 right-0 w-1/2 h-full bg-primary/5 -skew-x-12 translate-x-1/4" />
               <div className="relative z-10 max-w-3xl mb-12">
                  <span className="text-[10px] font-black uppercase tracking-[0.4em] text-primary-light mb-4 block">
                    PUBLIC DISCLOSURES & COMPLIANCE
                  </span>
                  <h2 className="text-4xl md:text-6xl font-black tracking-tightest leading-[0.9] mb-6 uppercase">
                    Transparency & <br /> Accountability.
                  </h2>
                  <p className="text-base md:text-xl text-white/60 font-medium leading-relaxed">
                    Access our audited annual disclosures, financial reports, and Section 80G tax recognition certificates.
                  </p>
               </div>

               {/* Downloadable Reports Grid */}
               <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-6">
                 {reports.map((report) => (
                   <div
                     key={report.id}
                     className="bg-white/5 border border-white/10 rounded-4xl p-6 flex flex-col justify-between hover:bg-white/10 transition-all group"
                   >
                     <div>
                       <div className="flex items-center justify-between text-[10px] font-mono text-primary-light uppercase tracking-widest mb-3">
                         <span>{report.category}</span>
                         <span>{report.year}</span>
                       </div>
                       <h3 className="text-lg font-black uppercase tracking-tight text-white mb-2 leading-snug">
                         {report.title}
                       </h3>
                       {report.description && (
                         <p className="text-xs text-white/60 font-medium line-clamp-2 leading-relaxed mb-4">
                           {report.description}
                         </p>
                       )}
                     </div>

                     <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                       <span className="text-[10px] font-mono text-white/40">{report.fileSize || "PDF"}</span>
                       <Button
                         size="sm"
                         className="bg-primary hover:bg-primary-dark text-white rounded-full px-5 py-2 h-auto font-black uppercase tracking-widest text-[9px] gap-1.5 transition-all"
                         asChild
                       >
                         <a href={report.fileUrl} download target="_blank" rel="noopener noreferrer">
                           <Download size={13} />
                           Download
                         </a>
                       </Button>
                     </div>
                   </div>
                 ))}
               </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Impact;
