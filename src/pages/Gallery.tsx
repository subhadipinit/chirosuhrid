import { useState } from "react";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { HeroSection } from "@/components/sections/HeroSection";
import { useCMS } from "@/context/CMSContext";
import { GalleryImage } from "@/data/gallery";
import { Badge } from "@/components/ui/badge";
import { Maximize2, X } from "lucide-react";
import impactHero from "@/assets/impact-hero.jpg";

const Gallery = () => {
  const { gallery } = useCMS();
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  // Dynamically derive categories from current gallery data
  const dynamicCategories = ["All", ...Array.from(new Set(gallery.map((g) => g.category).filter(Boolean)))];

  const filteredImages =
    selectedCategory === "All"
      ? gallery
      : gallery.filter((img) => img.category?.toLowerCase() === selectedCategory.toLowerCase());

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Header isLight={true} />

      <main className="flex-1">
        {/* Hero Section */}
        <HeroSection
          title={<>Our <span className="text-primary-dark">Gallery</span></>}
          description="Moments that matter, lives we've touched, and the journey of transformation in our communities."
          image={impactHero}
          alt="Our Gallery"
          className="from-primary/90 via-primary/80 to-primary-light/70"
        />

        {/* Filter Section */}
        <section className="py-12 md:py-20 border-b border-secondary/5 sticky top-20 bg-white/80 backdrop-blur-md z-40">
          <div className="container mx-auto px-6 md:px-10">
            <div className="flex flex-wrap gap-4 justify-center">
              {dynamicCategories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-8 py-3 rounded-full text-[10px] font-black uppercase tracking-[0.2em] transition-all duration-500 border ${
                    selectedCategory === category
                      ? "bg-secondary text-white border-secondary shadow-xl scale-105"
                      : "bg-white text-secondary/40 border-secondary/10 hover:border-secondary/30 hover:text-secondary"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Gallery Masonry-like Grid */}
        <section className="py-20 md:py-32">
          <div className="container mx-auto px-6 md:px-10">
            <div className="columns-1 sm:columns-2 lg:columns-3 gap-8 space-y-8">
              {filteredImages.map((image, index) => (
                <div
                  key={`${image.src}-${index}`}
                  className="break-inside-avoid group relative rounded-huge overflow-hidden bg-secondary/5 cursor-pointer shadow-sm hover:shadow-2xl transition-all duration-700"
                  onClick={() => setSelectedImage(image)}
                >
                  <img
                    src={image.src}
                    alt={image.title}
                    className="w-full h-auto object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-secondary/90 via-secondary/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-8">
                    <Badge className="bg-primary text-white border-none text-[8px] font-black uppercase tracking-widest w-fit mb-3">
                      {image.category}
                    </Badge>
                    <h3 className="text-white text-xl font-black tracking-tightest leading-tight mb-2">
                      {image.title}
                    </h3>
                    <div className="flex items-center gap-2 text-white/60 text-[10px] font-black uppercase tracking-widest">
                      <span>View Full Image</span>
                      <Maximize2 size={12} className="text-primary" />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredImages.length === 0 && (
              <div className="text-center py-24">
                <p className="text-xl font-bold text-secondary/40">No photos found in this category.</p>
              </div>
            )}
          </div>
        </section>

        {/* Lightbox Modal */}
        <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
          <DialogContent className="max-w-5xl bg-secondary/95 border-none p-0 overflow-hidden text-white backdrop-blur-2xl">
            {selectedImage && (
              <div className="relative flex flex-col">
                <div className="relative aspect-[16/10] sm:aspect-video w-full bg-black/40">
                  <img
                    src={selectedImage.src}
                    alt={selectedImage.title}
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="p-8 md:p-10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
                  <div>
                    <Badge className="bg-primary text-white border-none text-[9px] font-black uppercase tracking-widest mb-3">
                      {selectedImage.category}
                    </Badge>
                    <DialogTitle className="text-2xl md:text-3xl font-black tracking-tightest uppercase text-white">
                      {selectedImage.title}
                    </DialogTitle>
                    <DialogDescription className="text-white/60 text-sm mt-1">
                      Chirosuhrid Community Impact Archives
                    </DialogDescription>
                  </div>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </main>

      <Footer />
    </div>
  );
};

export default Gallery;
