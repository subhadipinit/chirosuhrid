import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

export interface HeroSlide {
  title: string;
  description: string;
  image: string;
  alt: string;
}

interface HeroSectionProps {
  slides?: HeroSlide[];
  title?: React.ReactNode;
  description?: string;
  image?: string;
  alt?: string;
  showOverlay?: boolean;
  className?: string;
  layout?: "split" | "centered" | "integrated";
  primaryActionText?: string;
  primaryActionHref?: string;
  secondaryActionText?: string;
  secondaryActionHref?: string;
  children?: React.ReactNode;
}

export const HeroSection = ({
  slides,
  title,
  description,
  image,
  alt,
  showOverlay = true,
  className = "",
  layout,
  primaryActionText,
  primaryActionHref,
  secondaryActionText,
  secondaryActionHref,
  children
}: HeroSectionProps) => {
  const [showControls, setShowControls] = useState(false);
  const hideTimeoutRef = useRef<NodeJS.Timeout>();

  const handleCarouselInteraction = () => {
    setShowControls(true);
    if (hideTimeoutRef.current) clearTimeout(hideTimeoutRef.current);
    hideTimeoutRef.current = setTimeout(() => setShowControls(false), 3000);
  };

  useEffect(() => {
    return () => {
      if (hideTimeoutRef.current) clearTimeout(hideTimeoutRef.current);
    };
  }, []);

  const renderHeroContent = (
    itemTitle: React.ReactNode, 
    itemDescription: string, 
    isLight: boolean = false,
    primaryText?: string,
    primaryHref?: string,
    secondaryText?: string,
    secondaryHref?: string
  ) => (
    <div className={`relative z-10 max-w-3xl ${isLight ? 'text-secondary' : 'text-white'}`}>
      <h1 className="mb-6 text-4xl md:text-6xl lg:text-8xl xl:text-9xl font-black leading-[0.95] tracking-tightest animate-in fade-in slide-in-from-bottom-12 duration-1000">
        {itemTitle}
      </h1>
      <p className={`mb-10 text-base md:text-xl font-medium leading-relaxed max-w-xl animate-in fade-in slide-in-from-bottom-8 delay-300 duration-1000 ${isLight ? 'text-secondary/70' : 'text-white/80'}`}>
        {itemDescription}
      </p>

      {(primaryText || secondaryText) && (
        <div className="flex flex-col sm:flex-row gap-4 animate-in fade-in slide-in-from-bottom-6 delay-500 duration-1000">
          {primaryText && (
            <Button size="huge" className="px-10 h-16 rounded-full font-black uppercase tracking-widest text-[11px] bg-primary hover:bg-primary-dark text-white shadow-xl shadow-primary/20" asChild={!!primaryHref}>
              {primaryHref ? (
                <Link to={primaryHref}>{primaryText}</Link>
              ) : (
                primaryText
              )}
            </Button>
          )}
          {secondaryText && (
            <Button variant="outline" size="huge" className={`px-10 h-16 rounded-full font-black uppercase tracking-widest text-[11px] border-2 ${isLight ? 'border-secondary/10 text-secondary hover:bg-secondary/5' : 'border-white/10 text-white hover:bg-white/5'}`} asChild={!!secondaryHref}>
              {secondaryHref ? (
                <Link to={secondaryHref}>{secondaryText}</Link>
              ) : (
                secondaryText
              )}
            </Button>
          )}
        </div>
      )}
      {children}
    </div>
  );
  
  // Also need to update the calls to renderHeroContent

  if (slides && slides.length > 0) {
    return (
      <section className={`relative overflow-hidden ${className}`}>
        <Carousel
          opts={{ align: "start", loop: true }}
          plugins={[Autoplay({ delay: 5000 })]}
          className="w-full"
          onMouseEnter={handleCarouselInteraction}
          onTouchStart={handleCarouselInteraction}
        >
          <CarouselContent>
            {slides.map((slide, index) => (
              <CarouselItem key={index}>
                <div className="relative h-[500px] md:h-[600px] lg:h-[700px] w-full">
                  <img
                    src={slide.image}
                    alt={slide.alt}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  {showOverlay && (
                    <div className="absolute inset-0 bg-gradient-to-tr from-emerald-950/80 via-black/20 to-transparent"></div>
                  )}
                  {renderHeroContent(slide.title, slide.description, false, primaryActionText, primaryActionHref, secondaryActionText, secondaryActionHref)}
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious
            className={`left-6 bg-white/10 border-white/20 text-white hover:bg-white hover:text-primary backdrop-blur-md transition-all duration-300 ${showControls ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}
          />
          <CarouselNext
            className={`right-6 bg-white/10 border-white/20 text-white hover:bg-white hover:text-primary backdrop-blur-md transition-all duration-300 ${showControls ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}
          />
        </Carousel>
      </section>
    );
  }

  if (layout === "split") {
    return (
      <section className={`relative min-h-[60vh] md:min-h-[80vh] flex items-center bg-white py-12 md:py-20 lg:py-24 ${className}`}>
        <div className="container mx-auto px-6 md:px-10 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-center">
          <div className="order-last lg:order-first">
            {renderHeroContent(title || "", description || "", true, primaryActionText, primaryActionHref, secondaryActionText, secondaryActionHref)}
          </div>
          <div className="relative aspect-[4/5] lg:aspect-square group lg:order-last">
            <div className="absolute -inset-2 md:-inset-4 bg-primary/5 rounded-3xl md:rounded-huge -rotate-1 md:-rotate-2 scale-105 transition-transform group-hover:rotate-0 duration-700" />
            <img
              src={image}
              alt={alt || ""}
              className="relative w-full h-full object-cover rounded-3xl md:rounded-huge shadow-huge grayscale-[0.2] hover:grayscale-0 transition-all duration-700"
            />
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className={`relative h-[60vh] md:h-[80vh] min-h-[500px] md:min-h-[700px] w-full overflow-hidden ${className}`}>
      {image && (
        <img
          src={image}
          alt={alt || ""}
          className="absolute inset-0 w-full h-full object-cover"
        />
      )}
      {showOverlay && (
        <div className="absolute inset-0 bg-secondary/40 backdrop-blur-[2px]" />
      )}
      <div className="relative container mx-auto px-6 md:px-10 h-full flex items-center">
        {renderHeroContent(title || "", description || "", false, primaryActionText, primaryActionHref, secondaryActionText, secondaryActionHref)}
      </div>
    </section>
  );
};
