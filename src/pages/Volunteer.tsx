import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { 
  Heart, 
  Users, 
  Clock, 
  BookOpen, 
  Stethoscope,
  Briefcase,
  CheckCircle2,
  Mail,
  Phone,
  MapPin,
  ArrowRight,
  Sparkles
} from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";
import teamImage from "@/assets/team.jpeg";
import { HeroSection } from "@/components/sections/HeroSection";
import { useCMS } from "@/context/CMSContext";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const volunteerSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100, "Name must be less than 100 characters"),
  email: z.string().trim().email("Invalid email address").max(255, "Email must be less than 255 characters"),
  phone: z.string().trim().min(10, "Phone number must be at least 10 digits").max(15, "Phone number must be less than 15 digits"),
  location: z.string().trim().min(1, "Location is required").max(200, "Location must be less than 200 characters"),
  interest: z.string().trim().min(1, "Please select an area of interest"),
  availability: z.string().trim().min(1, "Please select your availability"),
  message: z.string().trim().max(1000, "Message must be less than 1000 characters").optional(),
});

const opportunities = [
  {
    title: "Education Support",
    program: "SUGYAN & UNMESH",
    description: "Help teach students in our free coaching centers, assist with homework, or conduct workshops.",
    icon: BookOpen,
    commitment: "4-6 hours/week",
    image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=1270&auto=format&fit=crop"
  },
  {
    title: "Health Camp Assistant",
    program: "SRICHARANESHU",
    description: "Support our health camps by helping with registration, guiding patients, and organizing supplies.",
    icon: Stethoscope,
    commitment: "1-2 days/month",
    image: "https://images.unsplash.com/photo-1584515933487-779824d29309?q=80&w=1170&auto=format&fit=crop"
  },
  {
    title: "Community Outreach",
    program: "YUVA SAMMELAN",
    description: "Visit communities, spread awareness about our programs, and help identify beneficiaries.",
    icon: Users,
    commitment: "Flexible",
    image: "https://images.unsplash.com/photo-1526948128573-703ee1aeb6fa?q=80&w=1170&auto=format&fit=crop"
  },
  {
    title: "Livelihood Support",
    program: "SWANIRBHAR",
    description: "Help artisans with digital marketing, online store management, or skill development.",
    icon: Briefcase,
    commitment: "2-3 hours/week",
    image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=1170&auto=format&fit=crop"
  }
];

const benefits = [
  { title: "Direct Impact", desc: "Make a real difference in communities" },
  { title: "Leadership", desc: "Develop communication and management skills" },
  { title: "Community", desc: "Join a passionate network of changemakers" },
  { title: "Experience", desc: "Gain hands-on experience in social work" },
];

const Volunteer = () => {
  const { toast } = useToast();
  const { addInquiry } = useCMS();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
    interest: "",
    availability: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      volunteerSchema.parse(formData);
      
      const cleanNote = formData.message?.trim() || "";
      const roleMap: Record<string, string> = {
        education: "Education Support",
        health: "Health Camps",
        livelihood: "Livelihood Support",
        events: "Events & Outreach",
      };
      const roleTitle = roleMap[formData.interest] || formData.interest || "Community Service";

      await addInquiry({
        type: "volunteer",
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        message: cleanNote ? cleanNote : `Volunteer application for ${roleTitle}`,
        data: {
          city: formData.location.trim(),
          location: formData.location.trim(),
          interest: formData.interest,
          interestTitle: roleTitle,
          availability: formData.availability,
          note: cleanNote,
          appliedAt: new Date().toISOString(),
        },
      });
      
      toast({
        title: "Application Received",
        description: "Thank you for joining the movement. We'll be in touch soon.",
      });

      setFormData({
        name: "", email: "", phone: "", location: "", interest: "", availability: "", message: ""
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        toast({ title: "Check required fields", description: error.errors[0].message, variant: "destructive" });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Header isLight={true} />

      <main className="flex-1">
        {/* Hero Section */}
        <HeroSection 
          title={<>Join the <span className="text-primary-dark">Movement</span></>}
          description="Service is the highest form of worship. Join our team of young changemakers dedicated to uplifting communities."
          image={teamImage}
          alt="Our Team"
          className="from-secondary/90 via-secondary/80 to-secondary/70"
        />

        {/* Introduction Section */}
        <section className="py-20 md:py-32">
          <div className="container mx-auto px-6 md:px-10">
            <div className="grid lg:grid-cols-2 gap-20 items-center">
              <div>
                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-primary-dark mb-4 block">
                  CULTURE OF SERVICE
                </span>
                <h2 className="text-5xl md:text-7xl font-black tracking-tightest text-secondary uppercase leading-[0.85] mb-8">
                  Be Happy by <br /> Sharing <span className="text-primary-dark">Joy</span>
                </h2>
                <p className="text-xl text-secondary/60 font-medium leading-relaxed max-w-xl">
                  We are a group of young people who believe in intentional living. We serve the economically challenged, supporting their journey towards dignity and self-reliance.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {benefits.map((benefit, idx) => (
                  <div key={idx} className={`${idx % 2 === 1 ? 'translate-y-8' : ''} bg-[#F9FAFB] p-8 rounded-huge border border-secondary/5 hover:border-primary/20 transition-all group`}>
                    <Sparkles className="text-primary mb-6 group-hover:scale-110 transition-transform" size={24} />
                    <h3 className="text-xl font-black text-secondary tracking-tightest mb-2">{benefit.title}</h3>
                    <p className="text-[11px] font-medium text-secondary/40 leading-relaxed">{benefit.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Opportunities Asymmetric Grid */}
        <section className="py-20 md:py-32 bg-[#F9FAFB]">
          <div className="container mx-auto px-6 md:px-10">
            <div className="mb-20">
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-primary-dark mb-4 block text-center">
                CHOOSE YOUR PATH
              </span>
              <h2 className="text-5xl md:text-8xl font-black tracking-tightest text-secondary uppercase leading-[0.85] text-center">
                Ways to <span className="text-primary-dark">Help</span>
              </h2>
            </div>

            <div className="grid gap-8 lg:grid-cols-2">
              {opportunities.map((opportunity, index) => (
                <div
                  key={index}
                  className="flex flex-col md:flex-row bg-white rounded-huge shadow-sm border border-secondary/5 overflow-hidden group hover:shadow-2xl transition-all duration-700"
                >
                  <div className="md:w-1/3 relative overflow-hidden h-64 md:h-auto">
                    <img 
                      src={opportunity.image} 
                      alt={opportunity.title}
                      className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-secondary/10 group-hover:bg-transparent transition-colors duration-700" />
                  </div>
                  <div className="md:w-2/3 p-8 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-3 mb-6">
                        <div className="p-2 rounded-lg bg-primary/5 text-primary">
                          <opportunity.icon size={20} />
                        </div>
                        <span className="text-[9px] font-black uppercase tracking-widest text-secondary/40">
                          {opportunity.program}
                        </span>
                      </div>
                      <h3 className="text-2xl font-black tracking-tightest text-secondary mb-4">
                        {opportunity.title}
                      </h3>
                      <p className="text-sm font-medium text-secondary/60 leading-relaxed mb-6">
                        {opportunity.description}
                      </p>
                    </div>
                    <div className="flex items-center gap-3 pt-6 border-t border-secondary/5">
                      <Clock size={14} className="text-primary" />
                      <span className="text-[10px] font-black uppercase tracking-[0.2em] text-secondary/40">
                        {opportunity.commitment}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Application Form */}
        <section id="apply" className="py-20 md:py-40 bg-white">
          <div className="container mx-auto px-6 md:px-10">
            <div className="max-w-5xl mx-auto">
              <div className="grid lg:grid-cols-5 gap-20">
                <div className="lg:col-span-2">
                  <h2 className="text-5xl md:text-7xl font-black tracking-tightest text-secondary uppercase leading-[0.85] mb-8">
                    Become <br />a <span className="text-primary-dark">Suhrid</span>
                  </h2>
                  <p className="text-xl text-secondary/50 font-medium leading-relaxed mb-12">
                    Let's discuss how your unique skills can support our mission. Fill out the application and our team will get in touch.
                  </p>
                  
                  <div className="space-y-8">
                    <div className="flex items-center gap-4">
                      <div className="h-10 w-10 rounded-full bg-secondary text-white flex items-center justify-center font-black italic">!</div>
                      <p className="text-[10px] font-black uppercase tracking-[0.2em] text-secondary/40">No experienced needed for general roles</p>
                    </div>
                    <div className="flex items-center gap-4 text-secondary/60 hover:text-primary transition-colors cursor-pointer">
                      <Mail size={18} />
                      <span className="text-sm font-bold tracking-tight">volunteer@chirosuhrid.org</span>
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-3">
                  <form onSubmit={handleSubmit} className="space-y-10 group">
                    <div className="grid gap-8 md:grid-cols-2">
                      <div className="space-y-2 group/input">
                        <Label htmlFor="name" className="text-[10px] font-black uppercase tracking-widest text-secondary/40 group-focus-within/input:text-primary transition-colors">Full Name</Label>
                        <Input
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="Your Name"
                          className="border-0 border-b-2 border-secondary/10 rounded-none px-0 py-4 focus-visible:ring-0 focus-visible:border-primary transition-all text-lg font-medium placeholder:text-secondary/20"
                        />
                      </div>
                      <div className="space-y-2 group/input">
                        <Label htmlFor="email" className="text-[10px] font-black uppercase tracking-widest text-secondary/40 group-focus-within/input:text-primary transition-colors">Email Address</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="you@example.com"
                          className="border-0 border-b-2 border-secondary/10 rounded-none px-0 py-4 focus-visible:ring-0 focus-visible:border-primary transition-all text-lg font-medium placeholder:text-secondary/20"
                        />
                      </div>
                    </div>

                    <div className="grid gap-8 md:grid-cols-2">
                      <div className="space-y-2 group/input">
                        <Label htmlFor="phone" className="text-[10px] font-black uppercase tracking-widest text-secondary/40 group-focus-within/input:text-primary transition-colors">Phone Number</Label>
                        <Input
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="+91"
                          className="border-0 border-b-2 border-secondary/10 rounded-none px-0 py-4 focus-visible:ring-0 focus-visible:border-primary transition-all text-lg font-medium placeholder:text-secondary/20"
                        />
                      </div>
                      <div className="space-y-2 group/input">
                        <Label htmlFor="city" className="text-[10px] font-black uppercase tracking-widest text-secondary/40 group-focus-within/input:text-primary transition-colors">Current City / Location</Label>
                        <Input
                          id="city"
                          name="location"
                          autoComplete="address-level2"
                          value={formData.location}
                          onChange={handleChange}
                          placeholder="Kolkata, Medinipur..."
                          className="border-0 border-b-2 border-secondary/10 rounded-none px-0 py-4 focus-visible:ring-0 focus-visible:border-primary transition-all text-lg font-medium placeholder:text-secondary/20"
                        />
                      </div>
                    </div>

                    <div className="grid gap-8 md:grid-cols-2">
                      <div className="space-y-2 group/input">
                        <Label htmlFor="interest" className="text-[10px] font-black uppercase tracking-widest text-secondary/40 group-focus-within/input:text-primary transition-colors">Primary Interest</Label>
                        <Select 
                          onValueChange={(v) => handleSelectChange("interest", v)}
                          value={formData.interest}
                        >
                          <SelectTrigger className="w-full bg-transparent border-0 border-b-2 border-secondary/10 rounded-none px-0 py-4 focus:ring-0 focus:border-primary transition-all text-lg font-medium outline-none shadow-none h-auto">
                            <SelectValue placeholder="Select Path" />
                          </SelectTrigger>
                          <SelectContent className="rounded-2xl border-secondary/5 shadow-huge">
                            <SelectItem value="education">Education Support</SelectItem>
                            <SelectItem value="health">Health Camps</SelectItem>
                            <SelectItem value="livelihood">Livelihood Support</SelectItem>
                            <SelectItem value="events">Events & Outreach</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2 group/input">
                        <Label htmlFor="availability" className="text-[10px] font-black uppercase tracking-widest text-secondary/40 group-focus-within/input:text-primary transition-colors">Time Commitment</Label>
                        <Select 
                          onValueChange={(v) => handleSelectChange("availability", v)}
                          value={formData.availability}
                        >
                          <SelectTrigger className="w-full bg-transparent border-0 border-b-2 border-secondary/10 rounded-none px-0 py-4 focus:ring-0 focus:border-primary transition-all text-lg font-medium outline-none shadow-none h-auto">
                            <SelectValue placeholder="Availability" />
                          </SelectTrigger>
                          <SelectContent className="rounded-2xl border-secondary/5 shadow-huge">
                            <SelectItem value="weekends">Weekends only</SelectItem>
                            <SelectItem value="flexible">Flexible hours</SelectItem>
                            <SelectItem value="occasional">Occasional Events</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-2 group/input">
                      <Label htmlFor="message" className="text-[10px] font-black uppercase tracking-widest text-secondary/40 group-focus-within/input:text-primary transition-colors">A bit about you</Label>
                      <Textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Tell us what drives you..."
                        className="min-h-[120px] bg-[#F9FAFB] border-secondary/5 rounded-2xl p-6 focus-visible:ring-primary/20 focus-visible:border-primary transition-all text-lg font-medium placeholder:text-secondary/20"
                      />
                    </div>

                    <Button
                      type="submit"
                      size="huge"
                      className="w-full bg-secondary hover:bg-primary-dark transition-all duration-700 text-white rounded-full font-black uppercase tracking-widest text-xs h-20 shadow-2xl overflow-hidden"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Processing Application..." : "Submit Application"}
                    </Button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Volunteer;
