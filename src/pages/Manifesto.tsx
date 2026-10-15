import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Link } from "react-router-dom";
import { HeroSection } from "@/components/sections/HeroSection";
import teamImage from "@/assets/team.jpeg";

const Manifesto = () => {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Header isLight={true} />

      <main className="flex-1">
        <HeroSection 
          title={<>The Founding <span className="text-primary-dark">Manifesto</span></>}
          description="A declaration of our core values, our purpose, and the intentional path we choose to walk together."
          image={teamImage}
          alt="Founding Manifesto"
          className="from-secondary/90 via-secondary/80 to-secondary/70"
        />

        <section className="py-20 md:py-40">
          <div className="container mx-auto px-6 md:px-10">
            <div className="max-w-4xl mx-auto">
              <div className="mb-20">
                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-primary-dark mb-6 block">
                  ORIGIN STORY
                </span>
                <h2 className="text-5xl md:text-8xl font-black tracking-tightest text-secondary uppercase leading-[1.1] mb-12">
                  জীব সেবাই <br /><span className="text-primary-dark">শিব সেবা</span>
                </h2>
                <div className="h-px w-20 bg-primary-dark mb-12" />
              </div>

              <div className="prose prose-xl prose-slate max-w-none">
                <p className="text-2xl md:text-3xl font-medium text-secondary leading-relaxed mb-12 italic border-l-4 border-primary-dark pl-8 py-2">
                  "Happiness is not something ready-made. It comes from sharing joy with those who have been forgotten by the stride of progress."
                </p>

                <div className="space-y-16 text-lg md:text-xl text-secondary/70 leading-relaxed font-medium">
                  <div className="space-y-6">
                    <h3 className="text-3xl font-black text-secondary tracking-tightest uppercase italic">I. The Intentional Spark</h3>
                    <p>
                      SUHRID didn't start in a boardroom; it started in the hearts of a few young individuals who looked at the world and saw a gap between potential and opportunity. We realized that while many want to help, few choose to do so with "intentionality"—a conscious, consistent effort to be present in the lives of others.
                    </p>
                    <p>
                      Our foundational belief is simple: **Service is Worship.** Not just in words, but through the active participation in the lives of the economically challenged, the elderly, and the aspiring youth of rural West Bengal.
                    </p>
                  </div>

                  <div className="space-y-6 text-secondary/80">
                    <h3 className="text-3xl font-black text-secondary tracking-tightest uppercase italic">II. The Seven Pillars</h3>
                    <p>
                      We committed ourselves to seven core domains. Not because they are easy, but because they are the structural supports of a resilient community:
                    </p>
                    <ul className="list-disc pl-6 space-y-4 marker:text-primary-dark">
                      <li><strong>Education:</strong> Bridging the gap through Sugyan and Unmesh.</li>
                      <li><strong>Elderly Care:</strong> Restoring dignity with Sricharaneshu.</li>
                      <li><strong>Livelihood:</strong> Empowering self-reliance via Swanirbhar.</li>
                      <li><strong>Guidance:</strong> Nurturing future leaders through Smaran Manan and Pathachakra.</li>
                      <li><strong>Youth Motivation:</strong> Igniting passion in Yuva Sammelan.</li>
                      <li><strong>Health & Hygiene:</strong> Ensuring the fundamental right to well-being.</li>
                      <li><strong>Market Access:</strong> Connecting rural excellence to global consumers.</li>
                    </ul>
                  </div>

                  <div className="space-y-6">
                    <h3 className="text-3xl font-black text-secondary tracking-tightest uppercase italic">III. The Path Forward</h3>
                    <p>
                      We invite you not to "donate" in the traditional, detached sense, but to "invest" your empathy and commitment. SUHRID is a movement of young people, for people. We believe that by collective action, we can transform regional struggles into success stories of human resilience.
                    </p>
                    <p>
                      Our manifesto is written in the smiles of the students we coach, the relief of the elderly we support, and the independence of the artisans we help. It is an ongoing story, and the most important chapter is the one we write together.
                    </p>
                  </div>
                </div>

                <div className="mt-32 p-12 bg-[#F9FAFB] rounded-huge border border-secondary/5 text-center">
                  <h4 className="text-2xl font-black tracking-tightest text-secondary mb-4 uppercase">Let's walk this path together</h4>
                  <p className="text-secondary/50 font-medium mb-10">Whether through volunteering or support, your intentionality matters.</p>
                  <div className="flex flex-col sm:flex-row gap-6 justify-center">
                    <Link to="/volunteer" className="px-10 py-5 bg-secondary text-white rounded-full font-black uppercase tracking-widest text-[11px] hover:bg-primary-dark transition-all shadow-xl">
                      Become a Volunteer
                    </Link>
                    <Link to="/donate" className="px-10 py-5 border-2 border-secondary/10 text-secondary rounded-full font-black uppercase tracking-widest text-[11px] hover:bg-secondary/5 transition-all">
                      Support Our Programs
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

export default Manifesto;
