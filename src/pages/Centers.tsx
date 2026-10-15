import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { MapPin, Users, ArrowRight, Heart } from "lucide-react";
import { Link } from "react-router-dom";
import { HeroSection } from "@/components/sections/HeroSection";
import { centersData as fallbackCenters } from "@/data/centers";
import { useCMS } from "@/context/CMSContext";

const Centers = () => {
  const { centers: dynamicCenters } = useCMS();
  const centers = dynamicCenters && dynamicCenters.length > 0 ? dynamicCenters : fallbackCenters;

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Header isLight={true} />

      <main className="flex-1">
        {/* Hero Section */}
        <HeroSection
          title={<>Our <span className="text-primary-dark">Centers</span></>}
          description="Community hubs where we deliver impactful programs and services to empower lives across West Bengal"
          image="https://images.unsplash.com/flagged/photo-1574098335395-18cf525e45d6?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Our Centers"
          className="from-primary/90 via-primary/80 to-primary-light/70"
        />

        {/* Introduction Section */}
        <section className="py-20 md:py-32">
          <div className="container mx-auto px-6 md:px-10">
            <div className="grid lg:grid-cols-2 gap-20 items-center">
              <div>
                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-primary-dark mb-4 block">
                  NETWORK OF HOPE
                </span>
                <h2 className="text-5xl md:text-7xl font-black tracking-tightest text-secondary uppercase leading-[0.85] mb-8">
                  Community <br /> Hubs
                </h2>
                <p className="text-xl text-secondary/60 font-medium leading-relaxed max-w-xl">
                  Our centers are more than just buildings; they are safe havens where children learn, women gain independence, and communities find the support they need to thrive.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-primary/5 p-8 rounded-huge">
                  <div className="text-4xl font-black text-primary-dark mb-2">0{centers.length}</div>
                  <div className="text-[10px] font-black uppercase tracking-widest text-secondary/40">Active Centers</div>
                </div>
                <div className="bg-secondary/5 p-8 rounded-huge translate-y-8">
                  <div className="text-4xl font-black text-secondary mb-2">1k+</div>
                  <div className="text-[10px] font-black uppercase tracking-widest text-secondary/40">Direct Impact</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Centers Grid */}
        <section className="py-20 md:py-32 bg-[#F9FAFB]">
          <div className="container mx-auto px-6 md:px-10">
            <div className="space-y-32">
              {centers.map((center, index) => (
                <div
                  key={center.id}
                  className={`flex flex-col lg:flex-row items-center gap-12 lg:gap-24 ${index % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}
                >
                  <div className="w-full lg:w-1/2 relative group">
                    <div className="relative overflow-hidden rounded-huge aspect-[4/3]">
                      <img
                        src={center.image}
                        alt={center.name}
                        className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-primary-dark/10 group-hover:bg-transparent transition-colors duration-700" />
                    </div>
                    {/* Floating Info Box */}
                    <div className="absolute -bottom-6 -right-6 md:right-10 bg-white p-6 md:p-8 rounded-huge shadow-2xl border border-secondary/5 hidden md:block">
                      <div className="flex items-center gap-4 text-primary">
                        <Users size={24} />
                        <div>
                          <p className="text-2xl font-black text-secondary leading-none">{center.beneficiaries}</p>
                          <p className="text-[9px] font-black uppercase tracking-widest text-secondary/40">Beneficiaries</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="w-full lg:w-1/2">
                    <div className="flex items-center gap-2 text-primary mb-6">
                      <MapPin size={16} />
                      <span className="text-[10px] font-black uppercase tracking-widest leading-none">
                        {center.location}
                      </span>
                    </div>
                    <h3 className="text-4xl md:text-6xl font-black tracking-tightest text-secondary uppercase leading-[0.9] mb-8">
                      {center.name}
                    </h3>
                    <p className="text-lg text-secondary/60 font-medium mb-10 leading-relaxed">
                      {center.description}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-12">
                      {center.programs.slice(0, 3).map((program, idx) => (
                        <span
                          key={idx}
                          className="px-4 py-2 bg-white border border-secondary/5 text-secondary/60 text-[10px] font-black uppercase tracking-widest rounded-full"
                        >
                          {program.title}
                        </span>
                      ))}
                    </div>

                    <Button variant="link" className="p-0 h-auto text-[11px] font-black uppercase tracking-[0.2em] gap-3 text-primary hover:text-primary-dark transition-all group" asChild>
                      <Link to={center.route}>
                        Explore Center <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform" />
                      </Link>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-20 md:py-40 bg-white">
          <div className="container mx-auto px-6 md:px-10 text-center">
            <div className="max-w-4xl mx-auto">
              <Heart className="mx-auto mb-10 text-primary animate-pulse" size={48} />
              <h2 className="text-5xl md:text-8xl font-black tracking-tightest text-secondary uppercase leading-[0.8] mb-12">
                Be Part of <br /> the Community
              </h2>
              <p className="text-xl text-secondary/50 font-medium mb-16 leading-relaxed max-w-2xl mx-auto">
                Whether as a volunteer, donor, or visitor, our centers are always open for those who want to contribute to our mission.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <Button size="huge" className="bg-secondary text-white font-black uppercase tracking-widest text-[11px] px-12 py-6 h-auto rounded-full shadow-2xl hover:bg-secondary/90 transition-all" asChild>
                  <Link to="/contact">
                    Schedule a Visit
                  </Link>
                </Button>
                <Button size="huge" variant="outline" className="border-secondary/10 text-secondary font-black uppercase tracking-widest text-[11px] px-12 py-6 h-auto rounded-full hover:bg-secondary/5 transition-all" asChild>
                  <Link to="/volunteer">
                    Join as Volunteer
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Centers;
