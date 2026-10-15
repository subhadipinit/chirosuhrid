import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Compass } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Header />

      <main className="flex-1 flex items-center justify-center py-32 md:py-48 bg-[#F9FAFB]">
        <div className="container mx-auto px-6 text-center max-w-2xl">
          <div className="w-20 h-20 rounded-3xl bg-primary/10 text-primary flex items-center justify-center mx-auto mb-8 shadow-sm">
            <Compass size={40} className="animate-spin-slow" />
          </div>
          <span className="text-[10px] font-black uppercase tracking-[0.4em] text-primary mb-4 block">
            PAGE NOT FOUND
          </span>
          <h1 className="text-7xl md:text-9xl font-black tracking-tightest text-secondary leading-none mb-6">
            404
          </h1>
          <p className="text-xl md:text-2xl text-secondary/60 font-medium leading-relaxed mb-10 max-w-md mx-auto">
            The page you are looking for does not exist or has been relocated to another sanctuary.
          </p>
          <div className="flex justify-center">
            <Button size="huge" className="bg-secondary hover:bg-secondary/90 text-white font-black uppercase tracking-widest text-[11px] px-12 py-6 h-auto rounded-full shadow-2xl transition-all" asChild>
              <Link to="/" className="flex items-center gap-3">
                <ArrowLeft size={16} /> Return to Home
              </Link>
            </Button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default NotFound;
