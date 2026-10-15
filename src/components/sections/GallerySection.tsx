interface GalleryImage {
  src: string;
  caption: string;
}

interface GallerySectionProps {
  title?: string;
  subtitle?: string;
  images: GalleryImage[];
  className?: string;
}

export const GallerySection = ({ 
  title, 
  subtitle, 
  images, 
  className = "" 
}: GallerySectionProps) => {
  return (
    <section className={`py-20 md:py-32 lg:py-48 ${className}`}>
      <div className="container mx-auto px-6">
        {(title || subtitle) && (
          <div className="text-center mb-16 md:mb-24 max-w-3xl mx-auto">
            {title && (
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900 mb-6 lg:text-7xl">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="text-lg md:text-xl text-slate-500 font-medium leading-relaxed">
                {subtitle}
              </p>
            )}
          </div>
        )}

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8 max-w-7xl mx-auto">
          {images.map((image, idx) => (
            <div 
              key={idx} 
              className="group relative aspect-[4/5] overflow-hidden rounded-[2.5rem] bg-slate-50 cursor-pointer transition-all duration-500 hover:shadow-2xl hover:-translate-y-2"
            >
              <img 
                src={image.src}
                alt={image.caption}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                <div className="p-8">
                  <p className="text-white text-lg font-bold tracking-tight translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    {image.caption}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
