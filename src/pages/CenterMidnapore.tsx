import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { MapPin, Phone, Mail, Clock, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { HeroSection } from "@/components/sections/HeroSection";
import { StatsSection } from "@/components/sections/StatsSection";
import { GallerySection } from "@/components/sections/GallerySection";
import { centersData } from "@/data/centers";
import { useCMS } from "@/context/CMSContext";

const CenterMidnapore = () => {
  const { centers } = useCMS();
  const center = centers.find(c => c.id === "midnapore") || centersData.find(c => c.id === "midnapore")!;

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Header isLight={true} />
      
      <main className="flex-1">
        {/* Hero Section */}
        <HeroSection 
          title={center.name}
          description="A hub for rural development and heritage preservation in the heart of Paschim Medinipur"
          image={center.image}
          alt={center.name}
          className="from-primary/90 via-primary/80 to-primary-light/70"
        />

        {/* Stats Section */}
        <StatsSection stats={center.stats} />

        {/* About Center */}
        <section className="py-20 md:py-32">
          <div className="container mx-auto px-6 md:px-10">
            <div className="grid lg:grid-cols-12 gap-16 items-start">
              <div className="lg:col-span-5">
                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-primary-dark mb-4 block">
                  REGIONAL FOCUS
                </span>
                <h2 className="text-5xl md:text-7xl font-black tracking-tightest text-secondary uppercase leading-[0.85] mb-8">
                  About <br /> the Center
                </h2>
              </div>
              <div className="lg:col-span-7">
                <div className="space-y-8">
                  {center.longDescription.map((p, idx) => (
                    <p key={idx} className="text-xl text-secondary/60 font-medium leading-relaxed">
                      {p}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Center Programs */}
        <section className="py-20 md:py-32 bg-[#F9FAFB]">
          <div className="container mx-auto px-6 md:px-10">
            <div className="mb-20">
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-primary-dark mb-4 block text-center">
                CENTER INITIATIVES
              </span>
              <h2 className="text-5xl md:text-8xl font-black tracking-tightest text-secondary uppercase leading-[0.85] text-center">
                Our Programs
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
              {center.programs.map((program, idx) => {
                const Icon = program.icon;
                return (
                  <div key={idx} className="bg-white p-10 rounded-huge border border-secondary/5 group hover:shadow-2xl transition-all duration-700">
                    <div className="flex items-start gap-6">
                      <div className="p-4 rounded-2xl bg-primary/5 text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-500">
                        <Icon size={24} />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-2xl font-black tracking-tightest text-secondary mb-4 uppercase">
                          {program.title}
                        </h3>
                        <p className="text-secondary/60 font-medium leading-relaxed mb-8">
                          {program.description}
                        </p>
                        <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-primary">
                          <Clock size={14} />
                          <span>{program.timing}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Gallery Section */}
        <GallerySection 
          title="Regional Impacts" 
          subtitle="Capturing the spirit of change across Midnapore's village communities" 
          images={center.gallery} 
        />

        {/* Visit Us Section */}
        <section className="py-20 md:py-32">
          <div className="container mx-auto px-6 md:px-10">
            <div className="bg-secondary rounded-huge p-12 md:p-24 text-white relative overflow-hidden">
               <div className="absolute top-0 right-0 w-1/2 h-full bg-primary/5 -skew-x-12 translate-x-1/4" />
               
               <div className="relative z-10 grid lg:grid-cols-2 gap-20 items-center">
                 <div>
                    <h2 className="text-4xl md:text-6xl font-black tracking-tightest leading-[0.9] mb-12 uppercase">
                      Visit Our <br /> Hub
                    </h2>
                    
                    <div className="space-y-8">
                       <div className="flex gap-6">
                          <div className="p-3 rounded-xl bg-white/5 h-fit">
                            <MapPin size={20} className="text-primary" />
                          </div>
                          <div>
                            <p className="text-[10px] font-black uppercase tracking-widest text-white/30 mb-1">Address</p>
                            <p className="text-xl font-medium">{center.contact.address}</p>
                          </div>
                       </div>
                       <div className="flex gap-6">
                          <div className="p-3 rounded-xl bg-white/5 h-fit">
                            <Phone size={20} className="text-primary" />
                          </div>
                          <div>
                            <p className="text-[10px] font-black uppercase tracking-widest text-white/30 mb-1">Inquiries</p>
                            <p className="text-xl font-medium">{center.contact.phone}</p>
                          </div>
                       </div>
                       <div className="flex gap-6">
                          <div className="p-3 rounded-xl bg-white/5 h-fit">
                            <Mail size={20} className="text-primary" />
                          </div>
                          <div>
                            <p className="text-[10px] font-black uppercase tracking-widest text-white/30 mb-1">Support Email</p>
                            <p className="text-xl font-medium">{center.contact.email}</p>
                          </div>
                       </div>
                    </div>
                 </div>

                 <div className="bg-white/5 backdrop-blur-md p-10 rounded-huge border border-white/10">
                    <h3 className="text-2xl font-black tracking-tightest uppercase mb-8 flex items-center gap-3">
                      <Clock size={20} className="text-primary" /> Center Hours
                    </h3>
                    <div className="space-y-6">
                       {center.contact.hours.map((h, i) => (
                         <div key={i} className="flex justify-between items-center border-b border-white/5 pb-4">
                            <span className="text-white/40 font-black uppercase tracking-widest text-[10px]">{h.days}</span>
                            <span className="font-medium">{h.time}</span>
                         </div>
                       ))}
                    </div>
                    <div className="mt-12 space-y-4">
                       <Link to="/volunteer" className="block">
                         <Button className="w-full bg-primary hover:bg-primary-dark text-white font-black uppercase tracking-widest text-[11px] py-6 h-auto rounded-full shadow-xl transition-all gap-3">
                           Join This Center <ArrowRight size={16} />
                         </Button>
                       </Link>
                       <Link to="/contact" className="block">
                         <Button variant="outline" className="w-full border-white/10 hover:bg-white/5 text-white font-black uppercase tracking-widest text-[11px] py-6 h-auto rounded-full transition-all">
                           Partner with us
                         </Button>
                       </Link>
                    </div>
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

export default CenterMidnapore;
