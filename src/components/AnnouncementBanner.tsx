import React from "react";
import { Link } from "react-router-dom";
import { useCMS } from "@/context/CMSContext";
import { Megaphone, ArrowRight } from "lucide-react";

export const AnnouncementBanner: React.FC = () => {
  const { siteSettings } = useCMS();

  if (!siteSettings.announcementEnabled || !siteSettings.announcementMessage) {
    return null;
  }

  return (
    <aside aria-label="Announcement" className="bg-gradient-to-r from-primary via-amber-600 to-primary text-white py-2 px-4 text-xs font-medium text-center relative z-40 shadow-sm transition-all duration-300">
      <div className="max-w-7xl mx-auto flex items-center justify-center gap-2 flex-wrap">
        <Megaphone className="w-3.5 h-3.5 shrink-0" />
        <span>{siteSettings.announcementMessage}</span>
        {siteSettings.announcementLink && (
          <Link
            to={siteSettings.announcementLink}
            className="underline underline-offset-2 hover:opacity-80 transition-opacity font-semibold inline-flex items-center gap-0.5 ml-1"
          >
            Learn more
            <ArrowRight className="w-3 h-3" />
          </Link>
        )}
      </div>
    </aside>
  );
};
