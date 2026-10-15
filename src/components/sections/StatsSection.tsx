import { ImpactStat } from "@/data/impact-stats";
import { CounterDisplay } from "@/components/CounterDisplay";

interface StatsSectionProps {
  eyebrow?: string;
  title?: React.ReactNode;
  subtitle?: string;
  stats: ImpactStat[];
  className?: string;
}

export const StatsSection = ({ 
  eyebrow,
  title, 
  subtitle, 
  stats, 
  className = "" 
}: StatsSectionProps) => {
  return (
    <section className={`py-20 md:py-32 bg-white ${className}`}>
      <div className="container mx-auto px-6 md:px-10">
        {(eyebrow || title || subtitle) && (
          <div className="mb-20 md:mb-32 text-center max-w-5xl mx-auto">
            {eyebrow && (
              <span className="text-[10px] md:text-[11px] font-black uppercase tracking-[0.35em] text-primary-dark mb-4 block">
                {eyebrow}
              </span>
            )}
            {title && (
              <h2 className="mb-8 text-5xl md:text-8xl lg:text-9xl font-black tracking-tightest text-secondary leading-[0.85] uppercase">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="text-lg md:text-2xl text-secondary/40 font-medium leading-relaxed max-w-2xl mx-auto tracking-tight">
                {subtitle}
              </p>
            )}
          </div>
        )}

        <div className="grid gap-16 md:gap-24 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="flex flex-col items-center text-center group">
                <div className="relative mb-10 flex h-48 w-48 items-center justify-center">
                  {/* Decorative Rings */}
                  <div className="absolute inset-0 rounded-full border border-secondary/5 transition-all duration-700 group-hover:scale-110 group-hover:border-primary/20" />
                  <div className="absolute inset-4 rounded-full border border-secondary/10 transition-all duration-1000 group-hover:rotate-90 group-hover:border-primary/40" />
                  
                  {/* Icon floating background */}
                  {Icon && (
                    <div className="absolute -top-2 -right-2 h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary transition-all duration-500 group-hover:scale-110 group-hover:rotate-12 group-hover:bg-primary group-hover:text-white">
                      <Icon size={20} strokeWidth={2.5} />
                    </div>
                  )}

                  <CounterDisplay 
                    value={stat.value} 
                    className="relative text-5xl md:text-6xl font-black tracking-tighter text-secondary group-hover:text-primary transition-colors duration-500" 
                  />
                </div>
                <div className="text-[11px] font-black uppercase tracking-[0.4em] text-secondary/30 transition-all duration-500 group-hover:text-secondary group-hover:tracking-[0.5em]">
                  {stat.label}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
