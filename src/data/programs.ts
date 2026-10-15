import { Users, GraduationCap, Heart, Utensils, MessageCircle, ShoppingBag, Briefcase } from "lucide-react";
import educationImage from "@/assets/education-program.jpg";
import healthImage from "@/assets/health-program.jpg";
import livelihoodsImage from "@/assets/livelihoods-program.jpg";
import foodImage from "@/assets/food-program.jpg";
import counsellingImage from "@/assets/counselling-program.jpg";
import scholarshipImage from "@/assets/scholarship-program.jpg";
import marketplaceImage from "@/assets/marketplace-program.jpg";
import sugyanHero from "@/assets/sugyan-hero.png";
import yuvasammelanImage from "@/assets/yuvasammelan.jpeg";
import pathachakraImage from "@/assets/PATHACHAKRA.jpeg";
import smaranMananImage from "@/assets/SMARAN MANAN.jpeg";


export interface Program {
  id?: string;
  title: string;
  description: string;
  label?: string;
  metric?: string;
  image?: string;
  href?: string;
  tag?: string;
}

export const allPrograms: Program[] = [
  {
    id: "sugyan",
    title: "SUGYAN",
    label: "EDUCATION",
    metric: "21 Students Supported",
    description: "Empowering Students Through Education. Supporting economically challenged students with scholarships and resources.",
    image: sugyanHero,
    href: "/programs#sugyan"
  },
  {
    id: "Sricharaneshu",
    title: "Sricharaneshu",
    label: "CARE",
    metric: "50+ Elderly Supported",
    description: "Building a Sanctuary of Care. Providing monthly sustenance, medical intervention, and warm clothing to the elderly.",
    image: "https://images.unsplash.com/photo-1773234005378-ceebf3c877b9?q=80&w=1152&auto=format&fit=crop",
    href: "/programs#Sricharaneshu"
  },
  {
    id: "UNMESH",
    title: "UNMESH",
    label: "Education",
    metric: "Holistic Child Development",
    description: "Free coaching from pre-school to secondary level, including arts, meditation, and character building.",
    image: "https://images.unsplash.com/photo-1542810634-71277d95dcbb?q=80&w=1170&auto=format&fit=crop",
    href: "/programs#UNMESH"
  },
  {
    id: "SWANIRBHAR",
    title: "SUHRID SWANIRBHAR",
    label: "SKILLS",
    metric: "Multiple Artisans",
    description: "Helping artisans and youth become self-reliant through e-commerce platforms and marketing support.",
    image: "https://images.unsplash.com/photo-1640292343595-889db1c8262e?q=80&w=1192&auto=format&fit=crop",
    href: "/programs#SWANIRBHAR"
  },
  {
    title: "YUVA SAMMELAN",
    description: "Youth orientation sessions aimed at developing emotional resilience and collective action.",
    tag: "Youth",
    image: yuvasammelanImage,
    href: "/volunteer"
  },
  {
    title: "PATHACHAKRA",
    description: "Study circles fostering intellectual growth and social awareness among students.",
    tag: "Intellectual",
    image: pathachakraImage,
    href: "/volunteer"
  },
  {
    title: "SMARAN MANAN",
    description: "Cultural preservation initiatives focusing on local traditions and heritage.",
    tag: "Culture",
    image: smaranMananImage,
    href: "/volunteer"
  }
];

export const programsData = {
  featured: [
    {
      id: "sugyan",
      title: "SUGYAN",
      label: "EDUCATION",
      metric: "21 Students Supported",
      description: "Empowering Students Through Education. Supporting economically challenged students with scholarships and resources. Since 2016, we've provided free coaching, books, and scholarships to help meritorious students continue their education.",
      image: sugyanHero,
      linkText: "Explore Impact"
    },
    {
      id: "Sricharaneshu",
      title: "Sricharaneshu",
      label: "CARE",
      metric: "50+ Elderly Supported",
      description: "Building a Sanctuary of Care. No one should grow old in the shadows of neglect. We dedicate our resources to providing monthly sustenance, medical intervention, and warm clothing to the elderly and vulnerable who lack a traditional support network. Through our work, we strive to be the hands that hold theirs, ensuring they live their later years with the health, comfort, and respect they deserve.",
      image: "https://images.unsplash.com/photo-1773234005378-ceebf3c877b9?q=80&w=1152&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
      id: "UNMESH",
      title: "UNMESH",
      label: "Education",
      metric: "Holistic Child Development",
      description: "Free coaching from pre-school to secondary level, including arts, meditation, and character building. Bringing out the best in children through comprehensive education.",
      image: "https://images.unsplash.com/photo-1542810634-71277d95dcbb?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
      id: "SUHRID SWANIRBHAR",
      title: "SUHRID SWANIRBHAR",
      label: "SKILLS",
      metric: "Multiple Artisans",
      description: "Helping artisans and youth become self-reliant through e-commerce platforms, marketing support, and initial financial assistance.",
      image: "https://images.unsplash.com/photo-1640292343595-889db1c8262e?q=80&w=1192&auto=format&fit=crop"
    }
  ],
  secondary: [
    {
      title: "YUVA SAMMELAN",
      description: "Youth orientation sessions aimed at developing emotional resilience and collective action.",
      tag: "Youth"
    },
    {
      title: "PATHACHAKRA",
      description: "Study circles fostering intellectual growth and social awareness among students.",
      tag: "Intellectual"
    },
    {
      title: "SMARAN MANAN",
      description: "Cultural preservation initiatives focusing on local traditions and heritage.",
      tag: "Culture"
    }
  ],
  stats: [
    { value: "2k", label: "LIVES TOUCHED" },
    { value: "24/7", label: "CARE AVAILABILITY" },
    { value: "12", label: "ACTIVE PARTNERS" },
    { value: "94%", label: "EFFICIENCY RATE" }
  ]
};
