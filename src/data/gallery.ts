import educationProgram from "@/assets/education-program.jpg";
import healthProgram from "@/assets/health-program.jpg";
import foodProgram from "@/assets/food-program.jpg";
import livelihoodsProgram from "@/assets/livelihoods-program.jpg";
import scholarshipProgram from "@/assets/scholarship-program.jpg";
import counsellingProgram from "@/assets/counselling-program.jpg";
import marketplaceProgram from "@/assets/marketplace-program.jpg";
import heroEducation from "@/assets/hero-education.jpg";
import heroHealth from "@/assets/hero-health.jpg";
import heroLivelihood from "@/assets/hero-livelihood.jpg";
import impactHero from "@/assets/impact-hero.jpg";

export interface GalleryImage {
  src: string;
  title: string;
  category: string;
  size?: "small" | "medium" | "large";
}

export const galleryImages: GalleryImage[] = [
  { src: educationProgram, title: "UNMESH - Child Development", category: "UNMESH", size: "large" },
  { src: healthProgram, title: "SRICHARANESHU - Elderly Support", category: "SRICHARANESHU", size: "medium" },
  { src: foodProgram, title: "SRICHARANESHU - Food Distribution", category: "SRICHARANESHU", size: "medium" },
  { src: livelihoodsProgram, title: "SUHRID SWANIRBHAR - Skills Training", category: "SUHRID SWANIRBHAR", size: "large" },
  { src: scholarshipProgram, title: "SUGYAN - Scholarship Program", category: "SUGYAN", size: "medium" },
  { src: counsellingProgram, title: "UNMESH - Holistic Development", category: "UNMESH", size: "medium" },
  { src: marketplaceProgram, title: "SUHRID SWANIRBHAR - Entrepreneurship", category: "SUHRID SWANIRBHAR", size: "large" },
  { src: heroEducation, title: "SUGYAN - Empowering Students", category: "SUGYAN", size: "medium" },
  { src: heroHealth, title: "SRICHARANESHU - Care & Support", category: "SRICHARANESHU", size: "medium" },
  { src: heroLivelihood, title: "SUHRID SWANIRBHAR - Self-Reliance", category: "SUHRID SWANIRBHAR", size: "large" },
  { src: impactHero, title: "Creating Lasting Impact", category: "SUGYAN", size: "large" },
];

export const galleryCategories = ["All", "SUGYAN", "SRICHARANESHU", "UNMESH", "SUHRID SWANIRBHAR"];
