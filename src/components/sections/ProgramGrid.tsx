import { Card, CardContent } from "@/components/ui/card";
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
import { Program } from "@/data/programs";

interface ProgramGridProps {
  eyebrow?: string;
  title?: React.ReactNode;
  subtitle?: string;
  programs: Program[];
  asCarousel?: boolean;
  className?: string;
}

export const ProgramGrid = ({ 
  eyebrow,
  title, 
  subtitle, 
  programs, 
  asCarousel = false, 
  className = "" 
}: ProgramGridProps) => {
  const renderItem = (program: Program, index: number) => (
    <div className="group h-full flex flex-col bg-white rounded-5xl overflow-hidden transition-all duration-700 hover:shadow-huge hover:-translate-y-4">
      <div className="relative aspect-[4/3] overflow-hidden grayscale-[0.3] group-hover:grayscale-0 transition-all duration-700">
        <img
          src={program.image}
          alt={program.title}
          className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
      </div>
      <div className="p-12 flex-grow flex flex-col">
        <h3 className="mb-6 text-3xl font-black tracking-tightest text-secondary transition-colors group-hover:text-primary">
          {program.title}
        </h3>
        <p className="mb-10 text-base text-secondary/60 font-medium leading-relaxed flex-grow">
          {program.description}
        </p>
        <div className="flex items-center gap-3">
          <div className="h-[1px] w-8 bg-primary transition-all duration-500 group-hover:w-12" />
          <Button variant="link" className="p-0 text-[11px] font-black uppercase tracking-[0.2em] text-secondary group-hover:text-primary transition-all" asChild>
            <Link to={program.href || "#"}>
              Explore Program
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );

  return (
    <section className={`pt-16 md:pt-24 lg:pt-28 pb-0 ${className}`}>
      <div className="container mx-auto px-6 md:px-10">
        {(eyebrow || title || subtitle) && (
          <div className="mb-20 md:mb-32 text-center max-w-4xl mx-auto">
            {eyebrow && (
              <span className="text-[10px] md:text-[11px] font-black uppercase tracking-[0.35em] text-primary-dark mb-4 block">
                {eyebrow}
              </span>
            )}
            {title && (
              <h2 className="mb-10 text-6xl md:text-8xl lg:text-9xl font-black tracking-tightest text-secondary uppercase leading-[0.9]">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="text-xl md:text-2xl text-secondary/60 font-medium leading-relaxed max-w-3xl mx-auto">
                {subtitle}
              </p>
            )}
          </div>
        )}

        {asCarousel ? (
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            plugins={[
              Autoplay({
                delay: 4000,
              }),
            ]}
            className="w-full"
          >
            <CarouselContent className="-ml-2 md:-ml-4">
              {programs.map((program, index) => (
                <CarouselItem 
                  key={index} 
                  className="pl-2 md:pl-4 basis-[85%] sm:basis-1/2 lg:basis-1/3"
                >
                  {renderItem(program, index)}
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden md:flex left-0 -translate-x-1/2" />
            <CarouselNext className="hidden md:flex right-0 translate-x-1/2" />
          </Carousel>
        ) : (
          <div className="grid gap-12 lg:grid-cols-3">
            {programs.map((program, index) => (
              <div key={index} className={index % 2 !== 0 ? 'lg:translate-y-24' : ''}>
                {renderItem(program, index)}
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
