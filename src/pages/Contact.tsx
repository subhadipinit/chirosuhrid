import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin, Clock, Send, Globe, MessageSquare } from "lucide-react";
import { HeroSection } from "@/components/sections/HeroSection";
import gamaImage from "@/assets/gama.jpeg";

import { useState } from "react";
import { toast } from "sonner";
import { useCMS } from "@/context/CMSContext";

const Contact = () => {
  const { addInquiry, siteSettings } = useCMS();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      toast.error("Please fill in your name, email, and message.");
      return;
    }

    setIsSubmitting(true);
    try {
      await addInquiry({
        type: "contact",
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        message: `[Subject: ${formData.subject.trim() || "General Inquiry"}] ${formData.message.trim()}`,
        data: {
          subject: formData.subject.trim(),
          submittedAt: new Date().toISOString(),
        },
      });
      toast.success("Message sent successfully! Our team will get back to you soon.");
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: ""
      });
    } catch {
      toast.error("Failed to send message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: "Main Office",
      lines: [siteSettings.address || "Kolkata, West Bengal, India"],
      color: "bg-primary/5 text-primary"
    },
    {
      icon: Phone,
      title: "Connect",
      lines: [siteSettings.contactPhone || "+91 98765 43210"],
      color: "bg-secondary/5 text-secondary"
    },
    {
      icon: Mail,
      title: "Write to us",
      lines: [siteSettings.contactEmail || "contact@suhrid.org"],
      color: "bg-primary/5 text-primary"
    },
    {
      icon: Clock,
      title: "Hours",
      lines: ["Mon - Fri: 9:00 AM - 6:00 PM", "Sat: 9:00 AM - 1:00 PM"],
      color: "bg-secondary/5 text-secondary"
    }
  ];

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Header isLight={true} />

      <main className="flex-1">
        {/* Hero Section */}
        <HeroSection
          title={<>Stay <span className="text-primary-dark">Connected</span></>}
          description="Have questions or want to get involved? Reach out to our team and let's start a conversation about change."
          image={gamaImage}
          alt="Contact Us"
          className="from-primary/90 via-primary/80 to-primary-light/70"
        />

        {/* Contact Content */}
        <section className="py-20 md:py-40">
          <div className="container mx-auto px-6 md:px-10">
            <div className="grid lg:grid-cols-12 gap-20">
              {/* Form Side */}
              <div className="lg:col-span-7">
                <div className="mb-12 md:mb-16">
                  <span className="text-[10px] font-black uppercase tracking-[0.4em] text-primary mb-4 block">
                    DIRECT INQUIRY
                  </span>
                  <h2 className="text-4xl md:text-5xl lg:text-7xl font-black tracking-tightest text-secondary uppercase leading-[0.85]">
                    Drop us <br className="hidden sm:block" /> a line
                  </h2>
                </div>

                <form onSubmit={handleSubmit} className="space-y-8 md:space-y-10">
                  <div className="grid md:grid-cols-2 gap-8 md:gap-10">
                    <div className="space-y-3 md:space-y-4">
                      <label className="text-[10px] font-black uppercase tracking-widest text-secondary/40 ml-4">Full Name</label>
                      <Input 
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        placeholder="Your good name" 
                        className="h-14 md:h-16 px-6 md:px-8 rounded-full border-secondary/5 bg-[#F9FAFB] focus:bg-white focus:ring-primary/20 transition-all text-base md:text-lg font-medium" 
                      />
                    </div>
                    <div className="space-y-3 md:space-y-4">
                      <label className="text-[10px] font-black uppercase tracking-widest text-secondary/40 ml-4">Email Address</label>
                      <Input 
                        type="email" 
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder="hello@example.com" 
                        className="h-14 md:h-16 px-6 md:px-8 rounded-full border-secondary/5 bg-[#F9FAFB] focus:bg-white focus:ring-primary/20 transition-all text-base md:text-lg font-medium" 
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-8 md:gap-10">
                    <div className="space-y-3 md:space-y-4">
                      <label className="text-[10px] font-black uppercase tracking-widest text-secondary/40 ml-4">Phone Number</label>
                      <Input 
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+91 00000 00000" 
                        className="h-14 md:h-16 px-6 md:px-8 rounded-full border-secondary/5 bg-[#F9FAFB] focus:bg-white focus:ring-primary/20 transition-all text-base md:text-lg font-medium" 
                      />
                    </div>
                    <div className="space-y-3 md:space-y-4">
                      <label className="text-[10px] font-black uppercase tracking-widest text-secondary/40 ml-4">Subject</label>
                      <Input 
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        placeholder="General Inquiry" 
                        className="h-14 md:h-16 px-6 md:px-8 rounded-full border-secondary/5 bg-[#F9FAFB] focus:bg-white focus:ring-primary/20 transition-all text-base md:text-lg font-medium" 
                      />
                    </div>
                  </div>

                  <div className="space-y-3 md:space-y-4">
                    <label className="text-[10px] font-black uppercase tracking-widest text-secondary/40 ml-4">Message</label>
                    <Textarea 
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      placeholder="Share your thoughts with us..." 
                      className="min-h-[160px] md:min-h-[200px] px-6 md:px-8 py-5 md:py-6 rounded-[2rem] md:rounded-[2.5rem] border-secondary/5 bg-[#F9FAFB] focus:bg-white focus:ring-primary/20 transition-all text-base md:text-lg font-medium" 
                    />
                  </div>

                  <Button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full sm:w-auto bg-secondary text-white font-black uppercase tracking-widest text-[11px] px-12 md:px-16 py-5 md:py-6 h-auto rounded-full shadow-2xl hover:bg-secondary/90 transition-all gap-4"
                  >
                    {isSubmitting ? "Sending..." : "Send Message"} <Send size={16} />
                  </Button>
                </form>
              </div>

              {/* Info Side */}
              <div className="lg:col-span-5">
                <div className="bg-secondary rounded-[2.5rem] md:rounded-huge p-8 md:p-16 text-white relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-2/3 h-full bg-primary/5 -skew-x-12 translate-x-1/2 group-hover:translate-x-1/3 transition-transform duration-1000" />

                  <div className="relative z-10 space-y-16">
                    {contactInfo.map((info, idx) => {
                      const Icon = info.icon;
                      return (
                        <div key={idx} className="flex flex-col sm:flex-row gap-6 sm:gap-8">
                          <div className="p-4 rounded-2xl bg-white/5 w-fit h-fit ring-1 ring-white/10 group-hover:bg-primary transition-colors duration-500">
                            <Icon size={24} className="text-primary group-hover:text-white" />
                          </div>
                          <div>
                            <p className="text-[10px] font-black uppercase tracking-widest text-white/30 mb-2 sm:mb-3">{info.title}</p>
                            {info.lines.map((line, i) => (
                              <p key={i} className="text-lg sm:text-xl font-medium leading-relaxed">{line}</p>
                            ))}
                          </div>
                        </div>
                      );
                    })}

                    <div className="pt-10 border-t border-white/5">
                      <div className="flex gap-4">
                        <button className="p-4 rounded-full bg-white/5 hover:bg-primary transition-all text-white/40 hover:text-white">
                          <Globe size={20} />
                        </button>
                        <button className="p-4 rounded-full bg-white/5 hover:bg-primary transition-all text-white/40 hover:text-white">
                          <MessageSquare size={20} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Global Presence */}
        <section className="py-20 md:py-40 bg-[#F9FAFB]">
          <div className="container mx-auto px-6 md:px-10 text-center">
            <div className="mb-24">
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-primary mb-4 block">
                LOCAL IMPACT
              </span>
              <h2 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tightest leading-[0.9] uppercase text-secondary">
                Regional <br className="hidden sm:block" /> Presence
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-6 md:gap-8">
              {[
                { city: "Narsa", address: "Sabang, Paschim Medinipur", phone: "+91 1356897896" },
                { city: "Gama", address: "Narayangarh, Paschim Medinipur", phone: "+91 1356897896" },
                { city: "Midnapore", address: "Paschim Medinipur", phone: "+91 1356897896" }
              ].map((office, idx) => (
                <div key={idx} className="bg-white p-8 md:p-12 rounded-[2rem] md:rounded-huge border border-secondary/5 hover:shadow-2xl transition-all duration-700 text-left">
                  <h3 className="text-xl md:text-2xl font-black tracking-tightest text-secondary uppercase mb-4 md:mb-6">{office.city} Office</h3>
                  <p className="text-secondary/50 text-sm md:text-base font-medium mb-4 md:mb-6 leading-relaxed">
                    {office.address}
                  </p>
                  <p className="text-primary font-black uppercase tracking-widest text-[10px]">
                    {office.phone}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Map Placeholder */}
        <section className="py-20 md:py-40">
          <div className="container mx-auto px-6 md:px-10">
            <div className="relative aspect-square md:aspect-[21/9] rounded-[2.5rem] md:rounded-[4rem] overflow-hidden group shadow-2xl ring-1 ring-secondary/5">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3682.0790883797845!2d88.43123057407121!3d22.650839679436096!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f89e523adb66f1%3A0x9ab71a877ebcfa2e!2sPulin%20Ave%2C%20Manikpur%2C%20Rajbari%2C%20Dum%20Dum%2C%20West%20Bengal%20700081!5e0!3m2!1sen!2sin!4v1776758702056!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="SUHRID Main Office Location"
                className="block grayscaleContrast hover:grayscale-0 transition-all duration-1000 grayscale-[0.5]"
              />
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Contact;
