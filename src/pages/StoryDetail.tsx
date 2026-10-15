import React from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useCMS } from "@/context/CMSContext";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ArrowLeft, Quote, Calendar, User, Tag, Share2, Heart, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

const StoryDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { stories } = useCMS();
  const navigate = useNavigate();

  const story = stories.find((s) => s.id === id);
  const otherStories = stories.filter((s) => s.id !== id).slice(0, 3);

  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: story?.title || "Chirosuhrid Story",
          text: story?.description,
          url: window.location.href,
        })
        .catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success("Link copied to clipboard!");
    }
  };

  if (!story) {
    return (
      <div className="min-h-screen flex flex-col justify-between bg-white">
        <Header isLight={true} />
        <main className="flex-1 flex flex-col items-center justify-center p-6 text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Story Not Found</h1>
          <p className="text-gray-600 mb-6 max-w-md">
            The story you're looking for may have been moved or updated.
          </p>
          <Button onClick={() => navigate("/stories")} className="bg-primary hover:bg-primary/90 text-white">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to All Stories
          </Button>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col justify-between bg-white text-gray-900">
      <Header isLight={true} />

      <main className="flex-1">
        {/* Hero Banner with Image */}
        <section className="relative bg-slate-900 text-white py-16 lg:py-24 overflow-hidden">
          <div className="absolute inset-0 opacity-20">
            <img src={story.image} alt={story.title} className="w-full h-full object-cover filter blur-sm" />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/90 to-slate-900/60" />

          <div className="container mx-auto px-4 max-w-4xl relative z-10">
            <Link
              to="/stories"
              className="inline-flex items-center gap-2 text-sm text-amber-400 hover:text-amber-300 font-medium mb-6 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to All Impact Stories</span>
            </Link>

            <div className="flex items-center gap-2.5 mb-4">
              <Badge className="bg-primary text-white text-xs uppercase px-2.5 py-0.5">
                {story.category}
              </Badge>
              {story.featured && (
                <Badge className="bg-amber-500 text-black font-semibold text-xs px-2.5 py-0.5">
                  Featured Journey
                </Badge>
              )}
            </div>

            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-6 leading-tight">
              {story.title}
            </h1>

            <div className="flex flex-wrap items-center gap-6 text-sm text-slate-300 border-t border-slate-800 pt-6">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4 text-primary" />
                <span className="font-semibold text-white">{story.author}</span>
                <span className="text-slate-400">({story.role})</span>
              </div>
              <button
                onClick={handleShare}
                className="ml-auto inline-flex items-center gap-1.5 text-xs text-slate-300 hover:text-white bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-lg border border-white/10 transition-colors"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>Share Story</span>
              </button>
            </div>
          </div>
        </section>

        {/* Story Body */}
        <section className="py-12 lg:py-16 bg-white">
          <div className="container mx-auto px-4 max-w-4xl">
            {/* Featured Image */}
            <div className="rounded-2xl overflow-hidden shadow-xl mb-10 border border-gray-100 max-h-[500px]">
              <img src={story.image} alt={story.title} className="w-full h-full object-cover" />
            </div>

            {/* Quote block if available */}
            {story.quote && (
              <div className="my-8 p-6 lg:p-8 rounded-2xl bg-amber-50/70 border-l-4 border-primary shadow-sm flex items-start gap-4">
                <Quote className="w-8 h-8 text-primary shrink-0 mt-1" />
                <div>
                  <p className="text-lg lg:text-xl font-medium text-gray-900 italic leading-relaxed">
                    "{story.quote}"
                  </p>
                  <p className="text-sm font-semibold text-primary mt-3">
                    — {story.author}, <span className="text-gray-600 font-normal">{story.role}</span>
                  </p>
                </div>
              </div>
            )}

            {/* Story text */}
            <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed space-y-6 text-base sm:text-lg">
              <p>{story.description}</p>
            </div>

            {/* CTA Box */}
            <div className="mt-14 p-8 rounded-2xl bg-gradient-to-br from-primary/10 via-amber-50 to-primary/5 border border-primary/20 text-center">
              <Heart className="w-10 h-10 text-primary mx-auto mb-3" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Help Us Write More Stories of Transformation
              </h3>
              <p className="text-gray-600 max-w-xl mx-auto text-sm mb-6">
                Your contribution provides scholarships to students like Priya, medical care to remote villages, and livelihoods to local artisans.
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <Button asChild className="bg-primary hover:bg-primary/90 text-white font-semibold">
                  <Link to="/donate">Donate Now</Link>
                </Button>
                <Button asChild variant="outline" className="border-gray-300">
                  <Link to="/volunteer">Become a Volunteer</Link>
                </Button>
              </div>
            </div>

            {/* Related Stories */}
            {otherStories.length > 0 && (
              <div className="mt-16 pt-12 border-t border-gray-100">
                <h3 className="text-xl font-bold text-gray-900 mb-6">More Inspiring Stories</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {otherStories.map((other) => (
                    <Link
                      key={other.id}
                      to={`/stories/${other.id}`}
                      className="group rounded-xl overflow-hidden border border-gray-100 hover:shadow-lg transition-all flex flex-col justify-between bg-white"
                    >
                      <div className="aspect-video w-full overflow-hidden bg-gray-100">
                        <img
                          src={other.image}
                          alt={other.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <div className="p-4 flex-1 flex flex-col justify-between">
                        <div>
                          <Badge variant="secondary" className="text-[10px] uppercase mb-2">
                            {other.category}
                          </Badge>
                          <h4 className="font-bold text-sm text-gray-900 group-hover:text-primary transition-colors line-clamp-2">
                            {other.title}
                          </h4>
                        </div>
                        <span className="text-xs text-primary font-semibold flex items-center gap-1 mt-4">
                          Read Story <ArrowRight className="w-3 h-3" />
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default StoryDetail;
