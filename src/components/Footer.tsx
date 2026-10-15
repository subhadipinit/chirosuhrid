import React from "react";
import { Link } from "react-router-dom";
import { Facebook, Instagram, Linkedin, Twitter, ShieldCheck } from "lucide-react";
import { useCMS } from "@/context/CMSContext";

export const Footer: React.FC = () => {
  const { siteSettings } = useCMS();

  return (
    <footer className="bg-secondary text-white border-t border-white/5">
      <div className="container mx-auto px-6 md:px-10 py-20 md:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Brand Column */}
          <div className="lg:col-span-5 space-y-6">
            <Link to="/" className="inline-block group">
              {siteSettings.siteLogo ? (
                <img
                  src={siteSettings.siteLogo}
                  alt={siteSettings.siteName || "SUHRID"}
                  className="h-10 w-auto max-w-[160px] object-contain mb-3 brightness-0 invert"
                />
              ) : null}
              <span className="text-4xl md:text-5xl font-black tracking-tightest text-white leading-none group-hover:text-primary transition-colors block">
                {siteSettings.siteName || "SUHRID"}
              </span>
              <div className="h-1 w-12 bg-primary mt-3 group-hover:w-20 transition-all duration-500" />
            </Link>

            <p className="text-xl md:text-2xl font-medium tracking-tight text-white/80 max-w-sm leading-snug">
              {siteSettings.siteTagline || "Sharing happiness to create an empowered, self-reliant rural world."}
            </p>

            <p className="text-xs text-white/40 font-medium uppercase tracking-widest">
              Chirosuhrid Social Welfare Society • Regd. NGO
            </p>

            <div className="flex items-center gap-3 pt-2">
              {[
                { Icon: Facebook, label: "Facebook", href: "https://facebook.com" },
                { Icon: Instagram, label: "Instagram", href: "https://instagram.com" },
                { Icon: Linkedin, label: "LinkedIn", href: "https://linkedin.com" },
                { Icon: Twitter, label: "Twitter", href: "https://twitter.com" },
              ].map(({ Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="h-10 w-10 rounded-full border border-white/10 flex items-center justify-center text-white/50 hover:text-white hover:border-primary hover:bg-primary/10 transition-all"
                  aria-label={label}
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation Columns */}
          <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-10">
            {/* Column 1: Organisation */}
            <div className="space-y-5">
              <span className="text-[11px] font-black uppercase tracking-[0.35em] text-primary block">
                Organisation
              </span>
              <ul className="space-y-3.5 text-sm text-white/50 font-medium">
                <li>
                  <Link to="/about" className="hover:text-white transition-colors">
                    Our Story
                  </Link>
                </li>
                <li>
                  <Link to="/about/manifesto" className="hover:text-white transition-colors">
                    Manifesto
                  </Link>
                </li>
                <li>
                  <Link to="/impact" className="hover:text-white transition-colors">
                    Verified Impact
                  </Link>
                </li>
                <li>
                  <Link to="/centers" className="hover:text-white transition-colors">
                    Learning Centers
                  </Link>
                </li>
                <li>
                  <Link to="/stories" className="hover:text-white transition-colors">
                    Stories of Hope
                  </Link>
                </li>
                <li>
                  <Link to="/events" className="hover:text-white transition-colors">
                    Events & Camps
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 2: Programs */}
            <div className="space-y-5">
              <span className="text-[11px] font-black uppercase tracking-[0.35em] text-primary block">
                Programs
              </span>
              <ul className="space-y-3.5 text-sm text-white/50 font-medium">
                <li>
                  <Link to="/programs" className="hover:text-white transition-colors">
                    SUGYAN (Education)
                  </Link>
                </li>
                <li>
                  <Link to="/programs" className="hover:text-white transition-colors">
                    SRICHARANESHU (Health)
                  </Link>
                </li>
                <li>
                  <Link to="/programs" className="hover:text-white transition-colors">
                    UNMESH (Youth)
                  </Link>
                </li>
                <li>
                  <Link to="/programs" className="hover:text-white transition-colors">
                    SUHRID SWANIRBHAR
                  </Link>
                </li>
                <li>
                  <Link to="/gallery" className="hover:text-white transition-colors">
                    Photo Gallery
                  </Link>
                </li>
                <li>
                  <Link to="/donate" className="text-primary hover:text-primary-light font-bold transition-colors">
                    Support Our Mission &rarr;
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 3: Contact */}
            <div className="space-y-5 col-span-2 sm:col-span-1">
              <span className="text-[11px] font-black uppercase tracking-[0.35em] text-primary block">
                Contact
              </span>
              <div className="space-y-3.5 text-sm">
                <p className="text-white/50 font-medium leading-relaxed">
                  {siteSettings.address || "Midnapore & Kolkata, West Bengal, India"}
                </p>

                <a
                  href={`mailto:${siteSettings.contactEmail || "contact@suhrid.org"}`}
                  className="block font-semibold text-white/90 hover:text-primary transition-colors truncate"
                >
                  {siteSettings.contactEmail || "contact@suhrid.org"}
                </a>

                <p className="text-white/50 font-medium">
                  {siteSettings.contactPhone || "+91 97327 34055"}
                </p>

                {siteSettings.whatsapp && (
                  <a
                    href={`https://wa.me/${siteSettings.whatsapp.replace(/[^0-9]/g, "")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs text-primary hover:underline font-semibold pt-1"
                  >
                    WhatsApp Helpline &rarr;
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-20 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-xs">
          <div className="flex flex-wrap items-center gap-4 text-center md:text-left">
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-white/30">
              &copy; {new Date().getFullYear()} {siteSettings.siteName || "SUHRID"}. All rights reserved.
            </p>
            <span className="hidden md:inline text-white/10">•</span>
            <span className="text-[10px] text-white/20 uppercase tracking-wider">
              80G Certified Non-Profit
            </span>
          </div>

          <div className="flex items-center gap-4">
            <Link
              to="/admin"
              className="text-[10px] font-black uppercase tracking-[0.2em] text-white/30 hover:text-primary transition-colors flex items-center gap-1.5 border border-white/10 hover:border-primary/30 px-2.5 py-1 rounded-full transition-all"
            >
              <ShieldCheck size={12} className="text-primary" />
              <span>Admin</span>
            </Link>

            <div className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-[0.3em] text-white/30">
              <span>Crafted with</span>
              <span className="text-primary">❤️</span>
              <span>by</span>
              <a
                href="https://www.instagram.com/aslisubha/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-primary transition-colors hover:scale-105 transition-transform"
              >
                eZ!o
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
