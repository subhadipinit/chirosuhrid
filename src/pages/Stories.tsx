import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowRight, Quote, Heart } from "lucide-react";
import { HeroSection } from "@/components/sections/HeroSection";
import { useCMS } from "@/context/CMSContext";
import { Link } from "react-router-dom";
import heroIllustration from "@/assets/hero-illustration.jpg";

const Stories = () => {
  const { stories, testimonials } = useCMS();

  const featuredStory = stories.find((s) => s.featured) || stories[0];
  const otherStories = stories.filter((s) => s.id !== featuredStory?.id);

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <HeroSection
          title={<>Stories of <span className="text-primary-dark">Change</span></>}
          description="Real stories from the communities we serve, showcasing transformation, resilience, and hope"
          image={heroIllustration}
          alt="Stories of Change"
          className="from-primary/95 via-primary/85 to-primary-light/70"
        />

        {/* Featured Story */}
        {featuredStory && (
          <section id={featuredStory.id} className="py-20 md:py-40 scroll-mt-24">
            <div className="container mx-auto px-6 md:px-10">
              <div className="grid lg:grid-cols-12 gap-16 items-center">
                <div className="lg:col-span-6 relative group">
                  <div className="relative overflow-hidden rounded-huge aspect-[4/5] lg:aspect-square">
                    <img
                      src={featuredStory.image}
                      alt={featuredStory.title}
                      className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-primary-dark/10 group-hover:bg-transparent transition-colors duration-700" />
                  </div>
                  {featuredStory.quote && (
                    <div className="absolute -bottom-10 -right-10 hidden lg:block">
                      <div className="bg-secondary p-12 rounded-huge text-white shadow-2xl max-w-xs ring-1 ring-white/10">
                        <Quote className="text-primary mb-6" size={40} />
                        <p className="text-lg font-medium italic leading-relaxed mb-6">
                          "{featuredStory.quote.substring(0, 90)}..."
                        </p>
                        <div className="text-[10px] font-black uppercase tracking-widest text-white/40">
                          {featuredStory.author}
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <div className="lg:col-span-6 lg:pl-10">
                  <span className="text-[10px] font-black uppercase tracking-[0.4em] text-primary mb-4 block">
                    FEATURED NARRATIVE
                  </span>
                  <h2 className="text-4xl md:text-6xl font-black tracking-tightest text-secondary uppercase leading-[0.9] mb-8">
                    {featuredStory.title}
                  </h2>
                  <p className="text-xl text-secondary/60 font-medium leading-relaxed mb-12">
                    {featuredStory.description}
                  </p>

                  {featuredStory.quote && (
                    <div className="space-y-8 mb-12">
                      <div className="flex gap-6 items-start">
                        <div className="p-3 rounded-2xl bg-primary/5 text-primary">
                          <Quote size={24} />
                        </div>
                        <div>
                          <p className="text-lg font-medium italic text-secondary/70 leading-relaxed">
                            "{featuredStory.quote}"
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="flex items-center gap-6 mb-12">
                    <div className="h-px flex-1 bg-secondary/10" />
                    <div className="text-left">
                      <p className="text-lg font-black text-secondary leading-none mb-1">
                        {featuredStory.author}
                      </p>
                      <p className="text-[10px] font-black uppercase tracking-widest text-secondary/40">
                        {featuredStory.role}
                      </p>
                    </div>
                  </div>

                  <Button
                    asChild
                    className="bg-secondary text-white font-black uppercase tracking-widest text-[11px] px-12 py-6 h-auto rounded-full shadow-2xl hover:bg-secondary/90 transition-all gap-4"
                  >
                    <Link to={`/stories/${featuredStory.id}`}>
                      Read Full Story <ArrowRight size={16} />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Stories Grid */}
        <section className="py-20 md:py-32 bg-[#F9FAFB]">
          <div className="container mx-auto px-6 md:px-10">
            <div className="mb-20">
              <h2 className="text-5xl md:text-8xl font-black tracking-tightest text-secondary uppercase leading-[0.85] text-center">
                More <br /> Transformations
              </h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {otherStories.map((story) => (
                <div
                  key={story.id}
                  id={story.id}
                  className="group bg-white rounded-huge overflow-hidden border border-secondary/5 hover:shadow-2xl transition-all duration-700 scroll-mt-24 flex flex-col justify-between"
                >
                  <div>
                    <div className="relative aspect-[16/10] overflow-hidden">
                      <img
                        src={story.image}
                        alt={story.title}
                        className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-105"
                      />
                      <div className="absolute top-6 left-6">
                        <span className="px-4 py-2 bg-white/90 backdrop-blur-sm text-[9px] font-black uppercase tracking-widest text-secondary rounded-full">
                          {story.category}
                        </span>
                      </div>
                    </div>
                    <div className="p-10">
                      <h3 className="text-2xl font-black tracking-tightest text-secondary uppercase leading-tight mb-6 group-hover:text-primary transition-colors">
                        {story.title}
                      </h3>
                      <p className="text-secondary/50 font-medium leading-relaxed mb-6 line-clamp-3">
                        {story.description}
                      </p>
                    </div>
                  </div>
                  <div className="px-10 pb-10">
                    <Button
                      variant="link"
                      className="p-0 h-auto text-[10px] font-black uppercase tracking-[0.2em] gap-3 text-secondary group-hover:text-primary transition-all"
                      asChild
                    >
                      <Link to={`/stories/${story.id}`}>
                        Read Story{" "}
                        <ArrowRight size={14} className="group-hover:translate-x-2 transition-transform" />
                      </Link>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Voice of Community */}
        {testimonials.length > 0 && (
          <section className="py-20 md:py-40">
            <div className="container mx-auto px-6 md:px-10">
              <div className="text-center mb-24">
                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-primary mb-4 block">
                  COMMUNITY VOICES
                </span>
                <h2 className="text-4xl md:text-6xl font-black tracking-tightest leading-[0.9] uppercase text-secondary">
                  Echoes of <br /> Impact
                </h2>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                {testimonials.map((t, i) => (
                  <div key={t.id || i} className="p-12 bg-white rounded-huge border border-secondary/5 relative group hover:border-primary/20 transition-all duration-500">
                    <Quote className="text-primary/20 mb-8 group-hover:text-primary transition-colors" size={32} />
                    <p className="text-lg text-secondary/70 font-medium leading-relaxed mb-10 italic">
                      "{t.quote}"
                    </p>
                    <div>
                      <p className="text-base font-black text-secondary uppercase tracking-tight">{t.author}</p>
                      <p className="text-[10px] font-black uppercase tracking-widest text-secondary/40">{t.role}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Stories;
