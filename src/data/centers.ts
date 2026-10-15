import { MapPin, Users, BookOpen, Heart, Stethoscope, Brain, Clock, GraduationCap, Utensils, Briefcase, Target, Laptop, TrendingUp, Activity, LucideIcon } from "lucide-react";
import narsaImage from "@/assets/nasra.jpeg";
import gamaImage from "@/assets/gama.jpeg";
import midnaporeImage from "@/assets/team.jpeg";

export interface Center {
  id: string;
  name: string;
  location: string;
  description: string;
  longDescription: string[];
  beneficiaries: string;
  programs: {
    title: string;
    description: string;
    icon: LucideIcon;
    timing: string;
  }[];
  stats: {
    label: string;
    value: string;
    icon: LucideIcon;
  }[];
  gallery: {
    src: string;
    caption: string;
  }[];
  contact: {
    address: string;
    phone: string;
    email: string;
    hours: {
      days: string;
      time: string;
    }[];
    mapUrl?: string;
  };
  image: string;
  route: string;
  successStory?: {
    quote: string;
    author: string;
    role: string;
  };
}

export const centersData: Center[] = [
  {
    id: "midnapore",
    name: "Midnapore Center",
    location: "Midnapore, Paschim Medinipur",
    description: "A hub for rural development, supporting local artisans and providing educational resources to remote village communities.",
    longDescription: [
      "Our Midnapore Center is dedicated to the empowerment of rural communities in West Bengal. By focusing on sustainable livelihoods and accessible education, we aim to bridge the urban-rural divide and preserve local heritage.",
      "The center serves as a primary collection and training point for local artisans under the SUHRID SWANIRBHAR initiative, ensuring they have the tools and market access needed to thrive. Additionally, we provide comprehensive educational support to children from surrounding villages through our SUGYAN and UNMESH programs.",
      "Through collaborative community efforts, this center has become a catalyst for cultural preservation and economic resilience, reaching over 400 beneficiaries across the region."
    ],
    beneficiaries: "400+",
    stats: [
      { label: "Artisans Supported", value: "120+", icon: Briefcase },
      { label: "Village Outreach", value: "15+", icon: Target },
      { label: "Digital Literacy", value: "200+", icon: Laptop },
      { label: "Community Hubs", value: "3", icon: MapPin },
    ],
    programs: [
      {
        title: "Artisan Training",
        description: "Workshops for local artisans to refine their craft and learn digital marketing for their products.",
        icon: Briefcase,
        timing: "Mon-Fri, 11:00 AM - 4:00 PM"
      },
      {
        title: "Rural Education",
        description: "Mobile tutoring units and center-based classes for children in remote areas.",
        icon: BookOpen,
        timing: "Mon-Sat, 3:00 PM - 6:00 PM"
      },
      {
        title: "Digital Hub",
        description: "Access to computer labs and internet resources for students and job seekers.",
        icon: Laptop,
        timing: "Daily, 10:00 AM - 8:00 PM"
      },
      {
        title: "Impact Sessions",
        description: "Community orientation sessions on emotional resilience and collective action.",
        icon: TrendingUp,
        timing: "Sundays, 11:00 AM"
      },
    ],
    gallery: [
      { src: "https://images.unsplash.com/photo-1544650030-3c97974c7da2?auto=format&fit=crop&q=80&w=800", caption: "Artisan workshop" },
      { src: "https://images.unsplash.com/photo-1542810634-71277d95dcbb?auto=format&fit=crop&q=80&w=800", caption: "Rural education session" },
      { src: "https://images.unsplash.com/photo-1493225255756-d9584f8606e9?auto=format&fit=crop&q=80&w=800", caption: "Cultural preservation" },
      { src: "https://images.unsplash.com/photo-1531206715517-5c0ba140b2b8?auto=format&fit=crop&q=80&w=800", caption: "Community gathering" },
    ],
    contact: {
      address: "Midnapore Town, Paschim Medinipur, West Bengal",
      phone: "+91 98765 43212",
      email: "midnapore@chirosuhrid.org",
      hours: [
        { days: "Monday - Saturday", time: "10:00 AM - 7:00 PM" },
        { days: "Sunday", time: "10:00 AM - 2:00 PM" }
      ]
    },
    image: midnaporeImage,
    route: "/centers/midnapore"
  },
  {
    id: "narsa",
    name: "Narsa Center",
    location: "Sabang, Paschim Medinipur",
    description: "Our flagship center providing free education, health checkups, and counseling services to underprivileged children and families.",
    longDescription: [
      "Established in 2019, the Narsa Center is our primary operational hub, serving as a beacon of hope for hundreds of families in the community. Located in the heart of Sabang, this center has grown from a small tuition initiative to a comprehensive community development center.",
      "Our center operates six days a week, providing a safe and nurturing environment where children can learn, grow, and thrive. With spacious classrooms, a small library, and a health checkup facility, we ensure that the basic needs of education and healthcare are met for every child who walks through our doors.",
      "Beyond academics, we focus on holistic development through various programs including sports activities, cultural events, and personality development workshops. Our dedicated team of volunteers and staff work tirelessly to create opportunities that can transform lives and break the cycle of poverty."
    ],
    beneficiaries: "500+",
    stats: [
      { label: "Children Enrolled", value: "200+", icon: Users },
      { label: "Weekly Classes", value: "30+", icon: Clock },
      { label: "Volunteers", value: "25+", icon: Heart },
      { label: "Years Active", value: "5+", icon: BookOpen },
    ],
    programs: [
      {
        title: "Free Tuitions",
        description: "Quality education for children from underprivileged backgrounds. We cover subjects from primary to secondary level with dedicated teachers.",
        icon: BookOpen,
        timing: "Mon-Sat, 4:00 PM - 7:00 PM"
      },
      {
        title: "Health Camps",
        description: "Regular health checkups, vaccination drives, and awareness programs conducted by qualified medical professionals.",
        icon: Stethoscope,
        timing: "Last Sunday of every month"
      },
      {
        title: "Counseling Services",
        description: "Psychological support and career guidance for students and their families, helping them navigate challenges and plan their future.",
        icon: Brain,
        timing: "By appointment, Mon-Fri"
      },
      {
        title: "Skill Training",
        description: "Vocational training programs for youth including computer basics, tailoring, and handicrafts to improve employability.",
        icon: Users,
        timing: "Tue-Thu, 2:00 PM - 4:00 PM"
      },
    ],
    gallery: [
      { src: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&q=80&w=800", caption: "Free tuition classes" },
      { src: "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?auto=format&fit=crop&q=80&w=800", caption: "Students learning together" },
      { src: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&q=80&w=800", caption: "Health checkup camp" },
      { src: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&q=80&w=800", caption: "Counseling session" },
      { src: "https://images.unsplash.com/photo-1588072432836-e10032774350?auto=format&fit=crop&q=80&w=800", caption: "Computer training" },
      { src: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80&w=800", caption: "Cultural activities" },
      { src: "https://images.unsplash.com/photo-1529390079861-591de354faf5?auto=format&fit=crop&q=80&w=800", caption: "Library time" },
      { src: "https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&q=80&w=800", caption: "Sports day event" },
    ],
    contact: {
      address: "Narsa, Sabang, Paschim Medinipur, West Bengal",
      phone: "+91 98765 43210",
      email: "narsa@chirosuhrid.org",
      hours: [
        { days: "Monday - Saturday", time: "2:00 PM - 7:00 PM" },
        { days: "Sunday", time: "Closed (except events)" }
      ]
    },
    image: narsaImage,
    route: "/centers/narsa"
  },
  {
    id: "gama",
    name: "Gama Center",
    location: "Narayangarh, Paschim Medinipur",
    description: "A community hub offering educational support, women empowerment programs, and healthcare services for the local community.",
    longDescription: [
      "Launched in 2021, the Gama Center was born from a vision to create a safe space for women and children in the community. This center has quickly become a cornerstone of support for families facing economic hardships and social challenges.",
      "What makes Gama Center unique is its focus on women empowerment and family welfare. We believe that when women are empowered with skills and opportunities, entire families and communities benefit. Our programs are designed to provide both immediate relief and long-term sustainable solutions.",
      "The center features a training hall for workshops, a children's learning area, a community kitchen, and a consultation room for healthcare services. With the support of dedicated volunteers and community members, we serve over 350 beneficiaries monthly, making a tangible difference in their lives."
    ],
    beneficiaries: "350+",
    stats: [
      { label: "Families Served", value: "150+", icon: Users },
      { label: "Women Empowered", value: "80+", icon: Heart },
      { label: "Daily Meals", value: "100+", icon: Utensils },
      { label: "Years Active", value: "3+", icon: GraduationCap },
    ],
    programs: [
      {
        title: "Women Empowerment",
        description: "Skill development workshops, self-help group formation, and entrepreneurship training to help women become financially independent.",
        icon: Heart,
        timing: "Mon, Wed, Fri - 10:00 AM - 2:00 PM"
      },
      {
        title: "Child Education",
        description: "After-school tutoring and mentorship programs focused on improving academic performance and building confidence.",
        icon: GraduationCap,
        timing: "Tue-Sat, 4:00 PM - 6:30 PM"
      },
      {
        title: "Healthcare Services",
        description: "Monthly health camps, nutrition awareness programs, and first aid training for families in the community.",
        icon: Activity,
        timing: "First Saturday of every month"
      },
      {
        title: "Community Kitchen",
        description: "Nutritious meals provided to children and elderly members from economically disadvantaged families.",
        icon: Utensils,
        timing: "Daily, 12:00 PM - 2:00 PM"
      },
    ],
    gallery: [
      { src: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=800", caption: "Women's skill workshop" },
      { src: "https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&q=80&w=800", caption: "Entrepreneurship training" },
      { src: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&q=80&w=800", caption: "Children's education" },
      { src: "https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&q=80&w=800", caption: "Community kitchen meals" },
      { src: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?auto=format&fit=crop&q=80&w=800", caption: "Health awareness camp" },
      { src: "https://images.unsplash.com/photo-1531545514256-b1400bc00f31?auto=format&fit=crop&q=80&w=800", caption: "Tailoring class" },
      { src: "https://images.unsplash.com/photo-1517164850305-99a3e65bb47e?auto=format&fit=crop&q=80&w=800", caption: "Self-help group meeting" },
      { src: "https://images.unsplash.com/photo-1491438590914-bc09fcaaf77a?auto=format&fit=crop&q=80&w=800", caption: "Community celebration" },
    ],
    contact: {
      address: "Gama, Narayangarh, Paschim Medinipur, West Bengal",
      phone: "+91 98765 43211",
      email: "gama@chirosuhrid.org",
      hours: [
        { days: "Monday - Saturday", time: "10:00 AM - 6:00 PM" },
        { days: "Sunday", time: "Closed (except events)" }
      ]
    },
    image: gamaImage,
    route: "/centers/gama",
    successStory: {
      quote: "Joining the women empowerment program at Gama Center changed my life. I learned tailoring and now run my own small business from home.",
      author: "Anjali Das",
      role: "Women Empowerment Participant"
    }
  }
];
