import { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { CounterDisplay } from "@/components/CounterDisplay";
import { 
  Heart, 
  GraduationCap, 
  Stethoscope,
  Users,
  TrendingUp,
  CheckCircle2,
  IndianRupee,
  ArrowRight,
  Shield,
  FileText,
  Award,
  Copy,
  Check,
  QrCode,
  Building2,
  Smartphone,
  ExternalLink,
  ShieldCheck,
  Sparkles
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { HeroSection } from "@/components/sections/HeroSection";
import { useCMS } from "@/context/CMSContext";
import donateImage from "@/assets/donate.jpeg";

const impactAreas = [
  {
    title: "Education",
    description: "Support scholarships, books, and free coaching.",
    icon: GraduationCap,
    examples: ["₹5,000 - Books for a student", "₹15,000 - Year scholarship"],
    color: "from-blue-500/10 to-blue-500/5",
    iconColor: "text-blue-500"
  },
  {
    title: "Healthcare",
    description: "Support health camps and elderly medical supplies.",
    icon: Stethoscope,
    examples: ["₹2,000 - One camp supplies", "₹10,000 - Full health camp"],
    color: "from-rose-500/10 to-rose-500/5",
    iconColor: "text-rose-500"
  },
  {
    title: "Empowerment",
    description: "Empower artisans with resources and training.",
    icon: Users,
    examples: ["₹3,000 - Artisan materials", "₹30,000 - Skill workshop"],
    color: "from-purple-500/10 to-purple-500/5",
    iconColor: "text-purple-500"
  }
];

const donationOptions = [
  {
    amount: "1000",
    title: "Supporter",
    impact: "Support 2 students with books",
    featured: false
  },
  {
    amount: "5000",
    title: "Contributor",
    impact: "Organize health screening for 50 people",
    featured: true
  },
  {
    amount: "15000",
    title: "Champion",
    impact: "Full year education for 1 student",
    featured: false
  }
];

const trustFactors = [
  { icon: Shield, title: "Transparent", desc: "100% visibility into fund usage" },
  { icon: FileText, title: "Tax Benefit", desc: "80G certificate for deductions" },
  { icon: Award, title: "Verified", desc: "Regular impact reports provided" }
];

const quickAmounts = ["500", "1000", "2500", "5000", "15000"];

const Donate = () => {
  const { siteSettings } = useCMS();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAmount, setSelectedAmount] = useState<string>("5000");
  const [customAmount, setCustomAmount] = useState<string>("5000");
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [paymentTab, setPaymentTab] = useState<"upi" | "bank">("upi");

  const handleOpenModal = (amount?: string) => {
    if (amount) {
      setSelectedAmount(amount);
      setCustomAmount(amount);
    }
    setIsModalOpen(true);
  };

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(label);
    toast.success(`${label} copied to clipboard!`);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handleCopyAllBank = () => {
    const fullText = [
      `${siteSettings.accountName} - Bank Contribution Details`,
      `Account Name: ${siteSettings.accountName}`,
      `Account Number: ${siteSettings.accountNumber}`,
      `Bank Name: ${siteSettings.bankName}`,
      `IFSC Code: ${siteSettings.ifscCode}`,
      `Branch: ${siteSettings.branch}`,
      `Account Type: Current Account`,
      `UPI ID: ${siteSettings.upiId}`,
      siteSettings.taxExemption ? `Tax Benefit: ${siteSettings.taxExemption}` : ""
    ].filter(Boolean).join("\n");
    handleCopy(fullText, "All Bank Details");
  };

  const activeAmount = customAmount || selectedAmount || "1000";
  const upiDeepLink = `upi://pay?pa=${encodeURIComponent(siteSettings.upiId)}&pn=${encodeURIComponent(siteSettings.accountName)}&am=${activeAmount}&cu=INR&tn=Donation%20to%20Chirosuhrid%20Foundation`;

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <HeroSection 
          title={<>Fuel the <span className="text-primary-dark">Change</span></>}
          description="Your contribution creates ripples of positive change. Join us in creating a more equitable future through sustained support."
          image={donateImage}
          alt="Donate"
          className="from-primary/90 via-primary/80 to-primary-light/70"
        >
           <div className="mt-12 flex justify-center">
              <Button 
                onClick={() => handleOpenModal("5000")}
                size="huge" 
                className="bg-white text-secondary hover:bg-white/90 font-black uppercase tracking-widest text-[11px] px-16 py-6 h-auto rounded-full shadow-2xl transition-all scale-110"
              >
                Give Now
              </Button>
           </div>
        </HeroSection>

        {/* Quick Numbers */}
        <section className="py-20 md:py-32 border-b border-secondary/5">
          <div className="container mx-auto px-6 md:px-10">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { value: "21", label: "Scholars Support" },
                { value: "50+", label: "Elderly Care" },
                { value: "100+", label: "Children Coached" },
                { value: "7", label: "Active Programs" }
              ].map((stat, i) => (
                <div key={i} className="text-center group">
                   <CounterDisplay value={stat.value} className="text-5xl md:text-7xl font-black tracking-tightest text-secondary group-hover:text-primary transition-colors" />
                   <p className="text-[10px] font-black uppercase tracking-[0.3em] text-secondary/40 mt-4">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Donation Tiers */}
        <section className="py-20 md:py-40 bg-[#F9FAFB]">
          <div className="container mx-auto px-6 md:px-10">
            <div className="text-center mb-24">
               <span className="text-[10px] font-black uppercase tracking-[0.4em] text-primary mb-4 block">
                 SELECT YOUR IMPACT
               </span>
               <h2 className="text-4xl md:text-8xl font-black tracking-tightest leading-[0.85] uppercase text-secondary">
                 Choose your <br /> contribution
               </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto">
              {donationOptions.map((option, idx) => (
                <div 
                  key={idx} 
                  className={`relative p-12 rounded-huge transition-all duration-700 group hover:shadow-2xl overflow-hidden ${
                    option.featured 
                    ? "bg-secondary text-white scale-105 z-10" 
                    : "bg-white text-secondary border border-secondary/5"
                  }`}
                >
                  {option.featured && (
                    <div className="absolute top-0 right-0 p-6">
                       <TrendingUp className="text-primary" size={32} />
                    </div>
                  )}
                  
                  <div className="relative z-10">
                    <div className="flex items-center gap-2 mb-8">
                      <IndianRupee size={24} className="text-primary" />
                      <span className="text-5xl font-black tracking-tightest">{option.amount}</span>
                    </div>
                    
                    <h3 className="text-2xl font-black tracking-tightest uppercase mb-6">{option.title}</h3>
                    <p className={`font-medium mb-12 ${option.featured ? "text-white/60" : "text-secondary/50"}`}>
                      {option.impact}
                    </p>
                    
                    <Button 
                      onClick={() => handleOpenModal(option.amount)}
                      className={`w-full py-6 rounded-full font-black uppercase tracking-widest text-[11px] h-auto transition-all ${
                        option.featured 
                        ? "bg-primary text-white hover:bg-primary-dark shadow-xl" 
                        : "bg-secondary/5 text-secondary hover:bg-secondary hover:text-white"
                      }`}
                    >
                      Donate now
                    </Button>
                  </div>
                  
                  {option.featured && (
                    <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
                  )}
                </div>
              ))}
            </div>

            <div className="mt-20 text-center">
               <button 
                 onClick={() => handleOpenModal("")}
                 className="text-secondary/40 hover:text-secondary font-black uppercase tracking-widest text-[10px] transition-all flex items-center gap-4 mx-auto"
               >
                 Or enter custom amount <ArrowRight size={14} />
               </button>
            </div>
          </div>
        </section>

        {/* Impact Areas */}
        <section className="py-20 md:py-40">
           <div className="container mx-auto px-6 md:px-10">
              <div className="grid lg:grid-cols-2 gap-24 items-center">
                 <div>
                    <span className="text-[10px] font-black uppercase tracking-[0.4em] text-primary mb-4 block">
                      PURPOSEFUL GIVING
                    </span>
                    <h2 className="text-5xl md:text-7xl font-black tracking-tightest text-secondary uppercase leading-[0.85] mb-12">
                      Where your <br /> money goes
                    </h2>
                    <p className="text-xl text-secondary/50 font-medium leading-relaxed mb-12 max-w-xl">
                      We ensure every rupee is deployed with maximum efficiency. You can choose to support the cause that resonates most with you.
                    </p>
                    <div className="grid grid-cols-3 gap-8">
                       {trustFactors.map((f, i) => {
                         const Icon = f.icon;
                         return (
                        <div key={i} className="space-y-4 flex flex-col items-center text-center">
                              <div className="w-12 h-12 rounded-2xl bg-secondary/5 flex items-center justify-center text-primary mx-auto">
                                 <Icon size={20} />
                              </div>
                              <h4 className="font-black text-secondary uppercase tracking-tight text-xs leading-none">{f.title}</h4>
                              <p className="text-[8px] md:text-[10px] text-secondary/40 font-medium">{f.desc}</p>
                           </div>
                         );
                       })}
                    </div>
                 </div>

                 <div className="space-y-8">
                    {impactAreas.map((area, idx) => {
                      const Icon = area.icon;
                      return (
                        <div key={idx} className={`p-10 rounded-huge bg-gradient-to-br ${area.color} border border-secondary/5 group hover:shadow-xl transition-all duration-700`}>
                           <div className="flex gap-8 items-start">
                              <div className={`p-4 rounded-[2rem] bg-white shadow-sm transition-transform group-hover:scale-110 ${area.iconColor}`}>
                                 <Icon size={28} />
                              </div>
                              <div className="flex-1">
                                 <h3 className="text-2xl font-black tracking-tightest text-secondary uppercase mb-3">{area.title}</h3>
                                 <p className="text-sm text-secondary/50 font-medium mb-6">{area.description}</p>
                                 <div className="flex flex-wrap gap-4">
                                    {area.examples.map((ex, i) => (
                                      <div key={i} className="flex items-center gap-2 text-[9px] font-black uppercase tracking-widest text-primary">
                                         <CheckCircle2 size={12} />
                                         {ex}
                                      </div>
                                    ))}
                                 </div>
                              </div>
                           </div>
                        </div>
                      );
                    })}
                 </div>
              </div>
           </div>
        </section>

        {/* Ways to Make an Impact */}
        <section className="py-20 md:py-40 bg-white">
          <div className="container mx-auto px-6 md:px-10">
            <h2 className="text-4xl md:text-5xl font-black tracking-tightest text-secondary uppercase mb-16 px-4">
              Ways to Make an Impact
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
              {/* Corporate Partnerships */}
              <div className="md:col-span-8 group relative bg-white border border-secondary/5 rounded-huge overflow-hidden hover:shadow-2xl transition-all duration-700 flex flex-col md:flex-row">
                <div className="p-10 md:p-16 flex-1 flex flex-col justify-center">
                  <h3 className="text-3xl md:text-4xl font-black tracking-tightest text-secondary uppercase mb-6">
                    Corporate <br /> Partnerships
                  </h3>
                  <p className="text-secondary/50 font-medium leading-relaxed mb-8 max-w-sm">
                    Align your brand with purpose. We create tailored CSR programs that deliver measurable social impact and employee engagement.
                  </p>
                  <button className="flex items-center gap-3 text-primary font-black uppercase tracking-widest text-[11px] group-hover:gap-5 transition-all">
                    Learn about Partnership <ArrowRight size={16} />
                  </button>
                </div>
                <div className="w-full md:w-1/2 h-64 md:h-full relative overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&q=80&w=800" 
                    alt="Corporate Partnership"
                    className="absolute inset-0 w-full h-full object-cover grayscale transition-all duration-1000 group-hover:scale-110 group-hover:grayscale-0"
                  />
                  <div className="absolute inset-0 bg-secondary/10" />
                </div>
              </div>

              {/* Advocacy */}
              <div className="md:col-span-4 bg-primary rounded-huge p-10 md:p-16 text-white flex flex-col justify-between group hover:shadow-2xl transition-all duration-700">
                <div className="space-y-6">
                  <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center">
                    <Heart size={24} fill="currentColor" />
                  </div>
                  <h3 className="text-3xl font-black tracking-tightest uppercase mb-4">Advocacy</h3>
                  <p className="text-white/80 font-medium leading-relaxed">
                    Use your voice to spread awareness on critical social issues.
                  </p>
                </div>
                <button className="w-full py-5 border-t border-white/20 text-[10px] font-black uppercase tracking-widest mt-12 hover:bg-white/10 transition-all text-left">
                  BECOME AN AMBASSADOR
                </button>
              </div>

              {/* Skill-Based Volunteering */}
              <div className="md:col-span-4 bg-secondary/5 p-10 md:p-16 rounded-huge border border-secondary/5 group hover:shadow-2xl transition-all duration-700">
                <h3 className="text-2xl font-black tracking-tightest text-secondary uppercase mb-6">
                  Skill-Based <br /> Volunteering
                </h3>
                <p className="text-secondary/50 font-medium mb-12">
                  Offer your expertise in design, tech, or strategy to help us scale our internal systems.
                </p>
                <div className="flex flex-wrap gap-2">
                  {["Design", "Tech", "Marketing"].map(tag => (
                    <span key={tag} className="px-5 py-2 bg-white rounded-full text-[9px] font-black uppercase tracking-widest text-secondary/40 border border-secondary/5">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Monthly Giving Circle */}
              <div className="md:col-span-8 bg-[#F9FAFB] rounded-huge p-10 md:p-16 border border-secondary/5 flex flex-col md:flex-row group hover:shadow-2xl transition-all duration-700 gap-10">
                <div className="flex-1">
                  <h3 className="text-3xl md:text-4xl font-black tracking-tightest text-secondary uppercase mb-6">
                    Monthly Giving <br /> Circle
                  </h3>
                  <p className="text-secondary/50 font-medium leading-relaxed mb-10 max-w-sm">
                    Sustainable impact requires sustainable funding. Join our circle of monthly donors providing predictable support.
                  </p>
                  <Button 
                    onClick={() => handleOpenModal("1000")}
                    className="bg-primary hover:bg-primary-dark text-white font-black uppercase tracking-widest text-[11px] px-12 py-5 h-auto rounded-full shadow-lg transition-all"
                  >
                    Join the Circle
                  </Button>
                </div>
                
                <div className="grid grid-cols-2 gap-4 md:w-1/3 h-fit mt-auto md:mt-0">
                  <div className="bg-white p-6 rounded-huge shadow-sm border border-secondary/5">
                    <div className="text-2xl font-black text-secondary leading-none">1.2k</div>
                    <div className="text-[8px] font-black uppercase tracking-widest text-secondary/30 mt-2 leading-tight">Active Members</div>
                  </div>
                  <div className="bg-white p-6 rounded-huge shadow-sm border border-secondary/5 translate-y-4">
                    <div className="text-2xl font-black text-secondary leading-none">94%</div>
                    <div className="text-[8px] font-black uppercase tracking-widest text-secondary/30 mt-2 leading-tight">Fund Efficiency</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-20 md:py-40 bg-secondary text-white relative overflow-hidden">
           <div className="absolute top-0 left-0 w-2/3 h-full bg-primary/5 -skew-x-12 -translate-x-1/2" />
           <div className="container mx-auto px-6 md:px-10 relative z-10 text-center">
              <Heart className="mx-auto mb-12 text-primary animate-pulse" size={64} />
              <h2 className="text-5xl md:text-8xl font-black tracking-tightest leading-[0.8] mb-12 uppercase">
                Ready to <br /> make a difference
              </h2>
              <div className="flex flex-col sm:flex-row gap-8 justify-center items-center">
                 <Button 
                   onClick={() => handleOpenModal("1000")}
                   size="huge" 
                   className="bg-primary hover:bg-primary-dark text-white font-black uppercase tracking-widest text-[11px] px-16 py-6 h-auto rounded-full shadow-2xl transition-all"
                 >
                    Start monthly giving
                 </Button>
                 <Button 
                   onClick={() => handleOpenModal("5000")}
                   variant="outline" 
                   className="border-white/10 hover:bg-white/5 text-white font-black uppercase tracking-widest text-[11px] px-16 py-6 h-auto rounded-full transition-all"
                 >
                    One-time donation
                 </Button>
              </div>
           </div>
        </section>

        {/* Mobile-Optimized Donation Modal */}
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogContent className="w-[94vw] max-w-xl md:max-w-2xl max-h-[90vh] overflow-y-auto no-scrollbar p-4 sm:p-6 md:p-8 rounded-2xl md:rounded-3xl border border-secondary/10 bg-white shadow-2xl focus:outline-none">
            <DialogHeader className="mb-4 sm:mb-6 text-left">
              <div className="flex items-center gap-2 mb-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest bg-primary/10 text-primary">
                  <ShieldCheck size={12} />
                  80G Tax Exempt
                </span>
                <span className="text-[10px] font-black uppercase tracking-widest text-secondary/40">
                  Direct Donation
                </span>
              </div>
              <DialogTitle className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tightest uppercase text-secondary">
                Support Chirosuhrid
              </DialogTitle>
              <DialogDescription className="text-xs sm:text-sm text-secondary/70 font-medium">
                100% of your gift directly funds rural students, elder support, and artisan self-reliance.
              </DialogDescription>
            </DialogHeader>

            {/* Quick Amount Selector & Custom Input */}
            <div className="mb-5 p-4 sm:p-5 bg-[#F9FAFB] rounded-2xl border border-secondary/5">
              <label className="text-[10px] font-black uppercase tracking-widest text-secondary/50 block mb-2.5">
                Select or Enter Amount (INR)
              </label>

              {/* Preset Chips */}
              <div className="grid grid-cols-5 gap-1.5 sm:gap-2 mb-3">
                {quickAmounts.map((amt) => {
                  const isSelected = (customAmount || selectedAmount) === amt;
                  return (
                    <button
                      key={amt}
                      type="button"
                      onClick={() => {
                        setSelectedAmount(amt);
                        setCustomAmount(amt);
                      }}
                      className={`py-2 px-1 text-center rounded-xl text-xs sm:text-sm font-black transition-all ${
                        isSelected
                          ? "bg-primary text-white shadow-md shadow-primary/20 scale-[1.02]"
                          : "bg-white text-secondary/70 border border-secondary/10 hover:border-primary/30"
                      }`}
                    >
                      ₹{Number(amt).toLocaleString("en-IN")}
                    </button>
                  );
                })}
              </div>

              {/* Custom Input */}
              <div className="relative flex items-center">
                <span className="absolute left-4 text-xl font-black text-secondary/40 select-none">
                  ₹
                </span>
                <input
                  type="number"
                  value={customAmount}
                  onChange={(e) => {
                    setCustomAmount(e.target.value);
                    setSelectedAmount(e.target.value);
                  }}
                  placeholder="Enter custom amount"
                  className="w-full bg-white pl-9 pr-4 py-3 rounded-xl border border-secondary/15 text-lg sm:text-xl font-bold text-secondary focus:outline-none focus:ring-2 focus:ring-primary/25"
                />
              </div>
            </div>

            {/* Payment Method Switcher Tabs */}
            <div className="grid grid-cols-2 p-1 bg-secondary/5 rounded-xl border border-secondary/10 mb-5">
              <button
                type="button"
                onClick={() => setPaymentTab("upi")}
                className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg text-xs md:text-sm font-black uppercase tracking-wider transition-all ${
                  paymentTab === "upi"
                    ? "bg-primary text-white shadow-md shadow-primary/20"
                    : "text-secondary/60 hover:text-secondary"
                }`}
              >
                <Smartphone size={15} />
                <span>UPI & QR Code</span>
              </button>
              <button
                type="button"
                onClick={() => setPaymentTab("bank")}
                className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg text-xs md:text-sm font-black uppercase tracking-wider transition-all ${
                  paymentTab === "bank"
                    ? "bg-primary text-white shadow-md shadow-primary/20"
                    : "text-secondary/60 hover:text-secondary"
                }`}
              >
                <Building2 size={15} />
                <span>Bank Transfer</span>
              </button>
            </div>

            {/* TAB 1: UPI & QR CODE */}
            {paymentTab === "upi" && (
              <div className="space-y-4 mb-5">
                {/* Mobile Direct Pay CTA */}
                <a
                  href={upiDeepLink}
                  className="w-full flex items-center justify-center gap-2.5 py-3.5 px-4 bg-primary hover:bg-primary-dark text-white rounded-xl font-black text-xs sm:text-sm uppercase tracking-wider shadow-lg shadow-primary/20 transition-all hover:scale-[1.01] active:scale-[0.99]"
                >
                  <Smartphone size={18} />
                  <span>Tap to Pay ₹{Number(activeAmount).toLocaleString("en-IN")} via UPI App</span>
                  <ExternalLink size={14} className="opacity-80" />
                </a>
                <p className="text-[10px] text-center text-secondary/50 font-medium">
                  Opens Google Pay, PhonePe, Paytm, or BHIM directly on mobile
                </p>

                {/* QR Code and Instructions Card */}
                <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-5 p-4 bg-[#F9FAFB] rounded-2xl border border-secondary/5">
                  <div className="relative p-2.5 bg-white rounded-2xl shadow-sm border border-secondary/10 shrink-0">
                    <img
                      src={`https://api.qrserver.com/v1/create-qr-code/?size=160x160&data=${encodeURIComponent(upiDeepLink)}&margin=4`}
                      alt="Scan UPI QR Code to Contribute"
                      className="w-32 h-32 sm:w-36 sm:h-36 object-contain"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 border-2 border-primary/20 rounded-2xl pointer-events-none" />
                  </div>

                  <div className="flex-1 text-center sm:text-left space-y-2">
                    <span className="text-[9px] font-black uppercase tracking-[0.2em] text-primary block">
                      Scan with any UPI App
                    </span>
                    <p className="text-xs text-secondary/70 font-medium leading-relaxed">
                      Scan using Google Pay, PhonePe, Paytm, or BHIM on another device or screenshot to pay from your gallery.
                    </p>
                    <div className="flex flex-wrap items-center justify-center sm:justify-start gap-1.5 pt-1 text-[10px] font-bold text-secondary/60">
                      <span className="px-2 py-0.5 bg-white border border-secondary/10 rounded-md">GPay</span>
                      <span className="px-2 py-0.5 bg-white border border-secondary/10 rounded-md">PhonePe</span>
                      <span className="px-2 py-0.5 bg-white border border-secondary/10 rounded-md">Paytm</span>
                      <span className="px-2 py-0.5 bg-white border border-secondary/10 rounded-md">BHIM</span>
                    </div>
                  </div>
                </div>

                {/* Copy UPI VPA */}
                <div className="p-3 sm:p-3.5 bg-primary/5 rounded-xl border border-primary/15 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="w-8 h-8 rounded-lg bg-primary text-white flex items-center justify-center font-black text-[10px] shrink-0">
                      UPI
                    </div>
                    <div className="min-w-0">
                      <p className="text-[9px] font-black uppercase tracking-widest text-secondary/40 truncate">
                        Direct UPI VPA
                      </p>
                      <p className="font-bold text-xs sm:text-sm text-secondary font-mono truncate">
                        {siteSettings.upiId}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleCopy(siteSettings.upiId, "UPI ID")}
                    className="px-3 py-1.5 bg-white rounded-lg border border-secondary/10 text-xs font-bold text-primary flex items-center gap-1.5 hover:bg-primary hover:text-white transition-all shrink-0 shadow-sm"
                  >
                    {copiedField === "UPI ID" ? <Check size={13} className="text-emerald-600" /> : <Copy size={13} />}
                    <span>{copiedField === "UPI ID" ? "Copied" : "Copy UPI"}</span>
                  </button>
                </div>
              </div>
            )}

            {/* TAB 2: BANK TRANSFER (NEFT / RTGS / IMPS) */}
            {paymentTab === "bank" && (
              <div className="space-y-4 mb-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3 text-sm font-medium">
                  {/* Account Name */}
                  <div className="p-3 sm:p-3.5 bg-[#F9FAFB] rounded-xl border border-secondary/5 flex justify-between items-center">
                    <div className="min-w-0">
                      <p className="text-[9px] font-black uppercase text-secondary/40">Account Name</p>
                      <p className="font-bold text-xs sm:text-sm text-secondary truncate">{siteSettings.accountName}</p>
                    </div>
                    <button
                      onClick={() => handleCopy(siteSettings.accountName, "Account Name")}
                      className="p-1.5 text-primary hover:bg-primary/10 rounded-lg shrink-0"
                      title="Copy Account Name"
                    >
                      {copiedField === "Account Name" ? <Check size={15} /> : <Copy size={15} />}
                    </button>
                  </div>

                  {/* Account Number */}
                  <div className="p-3 sm:p-3.5 bg-[#F9FAFB] rounded-xl border border-secondary/5 flex justify-between items-center">
                    <div className="min-w-0">
                      <p className="text-[9px] font-black uppercase text-secondary/40">Account Number</p>
                      <p className="font-bold text-xs sm:text-sm text-secondary tracking-wider font-mono truncate">
                        {siteSettings.accountNumber}
                      </p>
                    </div>
                    <button
                      onClick={() => handleCopy(siteSettings.accountNumber, "Account Number")}
                      className="p-1.5 text-primary hover:bg-primary/10 rounded-lg shrink-0"
                      title="Copy Account Number"
                    >
                      {copiedField === "Account Number" ? <Check size={15} /> : <Copy size={15} />}
                    </button>
                  </div>

                  {/* Bank Name */}
                  <div className="p-3 sm:p-3.5 bg-[#F9FAFB] rounded-xl border border-secondary/5 flex justify-between items-center">
                    <div className="min-w-0">
                      <p className="text-[9px] font-black uppercase text-secondary/40">Bank Name</p>
                      <p className="font-bold text-xs sm:text-sm text-secondary truncate">{siteSettings.bankName}</p>
                    </div>
                    <button
                      onClick={() => handleCopy(siteSettings.bankName, "Bank Name")}
                      className="p-1.5 text-primary hover:bg-primary/10 rounded-lg shrink-0"
                      title="Copy Bank Name"
                    >
                      {copiedField === "Bank Name" ? <Check size={15} /> : <Copy size={15} />}
                    </button>
                  </div>

                  {/* IFSC Code */}
                  <div className="p-3 sm:p-3.5 bg-[#F9FAFB] rounded-xl border border-secondary/5 flex justify-between items-center">
                    <div className="min-w-0">
                      <p className="text-[9px] font-black uppercase text-secondary/40">IFSC Code</p>
                      <p className="font-bold text-xs sm:text-sm text-secondary tracking-wider font-mono truncate">
                        {siteSettings.ifscCode}
                      </p>
                    </div>
                    <button
                      onClick={() => handleCopy(siteSettings.ifscCode, "IFSC Code")}
                      className="p-1.5 text-primary hover:bg-primary/10 rounded-lg shrink-0"
                      title="Copy IFSC Code"
                    >
                      {copiedField === "IFSC Code" ? <Check size={15} /> : <Copy size={15} />}
                    </button>
                  </div>

                  {/* Branch & Account Type */}
                  <div className="sm:col-span-2 p-3 sm:p-3.5 bg-[#F9FAFB] rounded-xl border border-secondary/5 flex justify-between items-center">
                    <div className="min-w-0">
                      <p className="text-[9px] font-black uppercase text-secondary/40">Branch & Account Type</p>
                      <p className="font-bold text-xs sm:text-sm text-secondary">
                        {siteSettings.branch} • Current Account
                      </p>
                    </div>
                  </div>
                </div>

                {/* Copy All Details Button */}
                <button
                  type="button"
                  onClick={handleCopyAllBank}
                  className="w-full py-2.5 px-4 bg-white hover:bg-secondary/5 border border-secondary/15 rounded-xl text-xs font-bold text-secondary flex items-center justify-center gap-2 transition-all shadow-sm"
                >
                  {copiedField === "All Bank Details" ? (
                    <Check size={14} className="text-emerald-600" />
                  ) : (
                    <Copy size={14} />
                  )}
                  <span>
                    {copiedField === "All Bank Details"
                      ? "All Bank Details Copied!"
                      : "Copy All Bank Details to Clipboard"}
                  </span>
                </button>
              </div>
            )}

            {/* 80G Tax Exemption & Receipt Note */}
            <div className="p-3.5 bg-emerald-50/60 rounded-xl border border-emerald-500/20 text-xs text-secondary/70 flex items-start gap-2.5 mb-5">
              <ShieldCheck size={18} className="text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-emerald-950 text-[11px] uppercase tracking-wide">
                  50% Tax Deduction Eligible (Section 80G)
                </p>
                <p className="text-[11px] leading-relaxed text-emerald-900/80 mt-0.5">
                  For instant 80G receipt, share your transaction confirmation to WhatsApp at{" "}
                  <strong className="text-emerald-950">+91 97327 22238</strong>.
                </p>
              </div>
            </div>

            {/* Modal Bottom Actions */}
            <div className="flex justify-end gap-3 pt-2 border-t border-secondary/5">
              <Button
                onClick={() => setIsModalOpen(false)}
                className="w-full sm:w-auto bg-secondary text-white font-black uppercase tracking-widest text-[11px] px-8 py-3.5 h-auto rounded-full hover:bg-secondary/90 shadow-md transition-all"
              >
                Close Window
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </main>

      <Footer />
    </div>
  );
};

export default Donate;
