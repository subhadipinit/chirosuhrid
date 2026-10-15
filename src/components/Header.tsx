import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, X, ArrowRight, Instagram, Twitter, Facebook, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { navigationData, mobileNavigationData } from "@/data/navigation";
import { useCMS } from "@/context/CMSContext";

interface HeaderProps {
  isLight?: boolean;
}

export const Header = ({ isLight = false }: HeaderProps) => {
  const { siteSettings } = useCMS();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isHeaderActive = isScrolled || mobileMenuOpen;
  const textColorClass = isHeaderActive ? "text-secondary" : (isLight ? "text-white" : "text-secondary");

  return (
    <>
      <header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 border-b ${
          isHeaderActive 
            ? "bg-white/80 backdrop-blur-xl border-secondary/5 py-1 md:py-2" 
            : "bg-transparent border-transparent py-2 md:py-4"
        }`}
      >
        <nav className="container mx-auto flex h-14 md:h-16 items-center justify-between px-6 md:px-10">
          <Link to="/" className="flex items-center gap-2.5 group">
            {siteSettings.siteLogo ? (
              <img
                src={siteSettings.siteLogo}
                alt={siteSettings.siteName || "SUHRID"}
                className={`h-8 w-auto max-w-[140px] object-contain transition-all duration-300 ${!isHeaderActive && isLight ? "brightness-0 invert" : ""}`}
              />
            ) : null}
            <span className={`text-xl md:text-2xl font-black tracking-tighter transition-colors ${textColorClass}`}>
              {siteSettings.siteName || "SUHRID"}
            </span>
          </Link>

          {/* Desktop Navigation */}
          <NavigationMenu className="hidden lg:flex" delayDuration={0}>
            <NavigationMenuList className="gap-1">
              {navigationData.map((item, index) => (
                <NavigationMenuItem key={index}>
                  {"items" in item ? (
                    <>
                      <NavigationMenuTrigger className={`h-11 px-6 text-[10px] md:text-[11px] font-bold uppercase tracking-[0.15em] hover:text-primary transition-colors bg-transparent border-none ${textColorClass}`}>
                        {item.title}
                      </NavigationMenuTrigger>
                      <NavigationMenuContent>
                        <div className="flex w-[600px] overflow-hidden">
                          <div className="w-1/3 bg-secondary p-8 text-white flex flex-col justify-between">
                            <div>
                              <span className="text-[9px] font-black uppercase tracking-widest text-primary mb-4 block">Focus Areas</span>
                              <h4 className="text-xl font-black tracking-tightest leading-tight mb-4">Empowering <br />Communities</h4>
                              <p className="text-[11px] font-medium text-white/50 leading-relaxed">
                                Seven core programs focused on sustainable development and compassionate service.
                              </p>
                            </div>
                            <div className="pt-8 border-t border-white/10">
                              <Link to="/programs" className="text-[9px] font-black uppercase tracking-widest text-white hover:text-primary transition-colors flex items-center gap-2">
                                See all initiatives <ArrowRight size={12} />
                              </Link>
                            </div>
                          </div>
                          <ul className="w-2/3 grid gap-2 p-6">
                            {item.items.map((subItem, subIndex) => (
                              <li key={subIndex}>
                                <NavigationMenuLink asChild>
                                  <Link
                                    to={subItem.href}
                                    className="group flex flex-col select-none space-y-1 rounded-2xl p-4 leading-none no-underline outline-none transition-all hover:bg-primary/5 border border-transparent hover:border-primary/10"
                                  >
                                    <div className="text-[13px] font-black tracking-tight text-secondary group-hover:text-primary transition-colors flex items-center gap-2">
                                      {subItem.title}
                                      <div className="h-1 w-1 bg-primary rounded-full scale-0 group-hover:scale-100 transition-transform duration-300" />
                                    </div>
                                    {subItem.description && (
                                      <p className="line-clamp-1 text-[11px] font-medium leading-relaxed text-secondary/40 group-hover:text-secondary/60">
                                        {subItem.description}
                                      </p>
                                    )}
                                  </Link>
                                </NavigationMenuLink>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </NavigationMenuContent>
                    </>
                  ) : (
                    <NavigationMenuLink asChild>
                      <Link
                        to={item.href}
                        className={`group inline-flex h-11 w-max items-center justify-center bg-transparent px-6 py-2 text-[10px] md:text-[11px] font-bold uppercase tracking-[0.15em] hover:text-primary focus:outline-none transition-colors ${textColorClass}`}
                      >
                        {item.title}
                      </Link>
                    </NavigationMenuLink>
                  )}
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>

          <div className="hidden lg:flex items-center gap-6">
            <Button variant="default" size="sm" className="px-8 font-bold bg-primary hover:bg-primary-dark text-white rounded-full transition-all" asChild>
              <Link to="/donate">Donate Now</Link>
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="flex lg:hidden items-center">
            <button
              className={`p-2 rounded-lg hover:bg-secondary/10 transition-colors touch-manipulation ${textColorClass}`}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </nav>
      </header>

      {/* Premium Mobile Navigation Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-[100] lg:hidden bg-white flex flex-col h-screen w-screen animate-in fade-in slide-in-from-top-4 duration-500">
          <div className="relative h-full flex flex-col">
            {/* Header in Overlay */}
            <div className="flex h-14 md:h-20 items-center justify-between px-6 border-b border-secondary/5 shrink-0">
              <Link to="/" className="flex items-center gap-2.5" onClick={() => setMobileMenuOpen(false)}>
                {siteSettings.siteLogo ? (
                  <img
                    src={siteSettings.siteLogo}
                    alt={siteSettings.siteName || "SUHRID"}
                    className="h-8 w-auto max-w-[140px] object-contain"
                  />
                ) : null}
                <span className="text-xl md:text-2xl font-black tracking-tighter text-secondary">
                  {siteSettings.siteName || "SUHRID"}
                </span>
              </Link>
              <button
                className="p-2 rounded-full bg-secondary/10 text-secondary"
                onClick={() => setMobileMenuOpen(false)}
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-12">
              <div className="space-y-10">
                {mobileNavigationData.map((group, index) => (
                  <div key={index} className="space-y-6">
                    <span className="text-[10px] font-black text-primary tracking-[0.4em] uppercase">{group.group}</span>
                    <div className="grid gap-5">
                      {group.items.map((item, itemIndex) => (
                        <Link
                          key={itemIndex}
                          to={item.href}
                          className="group flex items-center justify-between text-4xl md:text-5xl font-black tracking-tightest text-secondary active:text-primary transition-colors"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          <span>{item.title}</span>
                          <ArrowRight size={28} className="text-primary/20" />
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Actions & Socials */}
            <div className="p-8 bg-[#F9FAFB] space-y-8 shrink-0 border-t border-secondary/5">
              <div className="flex gap-4">
                <Button variant="default" size="default" className="flex-1 h-14 bg-primary text-white font-black uppercase tracking-widest text-[11px] rounded-2xl shadow-xl shadow-primary/20" asChild onClick={() => setMobileMenuOpen(false)}>
                  <Link to="/donate">Donate Now</Link>
                </Button>
                <Button variant="default" size="default" className="flex-1 h-14 bg-secondary text-white font-black uppercase tracking-widest text-[11px] rounded-2xl shadow-xl transition-all" asChild onClick={() => setMobileMenuOpen(false)}>
                  <Link to="/volunteer">Volunteer</Link>
                </Button>
              </div>
              
              <div className="flex items-center justify-between pt-4 pb-2">
                <div className="flex gap-8">
                  <Instagram size={22} className="text-secondary/40" />
                  <Twitter size={22} className="text-secondary/40" />
                  <Facebook size={22} className="text-secondary/40" />
                </div>
                <span className="text-[9px] font-black text-secondary/30 uppercase tracking-widest">
                  est. 2016
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
