import { motion, AnimatePresence } from "motion/react";
import { 
  Award, 
  BookOpen, 
  GraduationCap, 
  Headphones, 
  Home as HomeIcon, 
  Mail, 
  MapPin, 
  Phone, 
  UserPlus, 
  ChevronRight,
  Menu,
  X,
  CheckCircle2,
  Users,
  Video,
  Calendar,
  Clock,
  ShieldCheck
} from "lucide-react";
import { useState, type ReactNode, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from "react-router-dom";

// --- Types ---
interface NavLinkProps {
  to: string;
  children: ReactNode;
  onClick?: () => void;
  variant?: "default" | "button";
}

// --- Components ---

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const LogoIcon = ({ className }: { className?: string }) => (
  <div className={`relative flex items-center justify-center ${className}`}>
    <div className="absolute inset-0 border-2 border-brand-gold rounded-full" />
    <div className="absolute inset-1 border border-dashed border-brand-gold/30 rounded-full animate-[spin_20s_linear_infinite]" />
    <span className="font-serif font-bold text-lg text-brand-navy">B.H.G</span>
  </div>
);

const NavLink = ({ to, children, onClick, variant = "default" }: NavLinkProps) => {
  if (variant === "button") {
    return (
      <Link 
        to={to} 
        onClick={onClick}
        className="bg-brand-gold hover:bg-brand-navy text-white px-6 py-2.5 rounded-full font-medium transition-all duration-300 gold-shadow text-sm uppercase tracking-wider flex items-center gap-2 group"
      >
        {children} <UserPlus className="w-4 h-4 transition-transform group-hover:scale-110" />
      </Link>
    );
  }

  return (
    <Link 
      to={to} 
      onClick={onClick}
      className="text-brand-navy/70 hover:text-brand-gold font-medium transition-colors duration-200 text-sm uppercase tracking-widest relative group"
    >
      {children}
      <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-brand-gold transition-all duration-300 group-hover:w-full" />
    </Link>
  );
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? "bg-brand-offwhite/90 backdrop-blur-md py-3 border-b border-brand-gold/20 shadow-sm" : "bg-transparent py-6"
    }`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3">
          <LogoIcon className="w-10 h-10" />
          <div className="flex flex-col">
            <span className="font-serif font-bold text-xl tracking-tight text-brand-navy leading-tight">
              B.H.G Education
            </span>
            <span className="text-[10px] uppercase tracking-[0.3em] text-brand-gold font-bold">Unique Elegance</span>
          </div>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-10">
          <NavLink to="/">Home</NavLink>
          <a href="/#about" className="text-brand-navy/70 hover:text-brand-gold font-medium transition-colors duration-200 text-sm uppercase tracking-widest relative group">About Us</a>
          <div className="relative group">
            <button className="text-brand-navy/70 hover:text-brand-gold font-medium transition-colors duration-200 text-sm uppercase tracking-widest flex items-center gap-1">
              Our Services <ChevronRight className="w-3 h-3 rotate-90" />
            </button>
            <div className="absolute top-full left-0 mt-4 w-64 bg-white border border-brand-gold/20 rounded-2xl shadow-xl opacity-0 translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all p-2">
              <Link to="/service/bece" className="block px-4 py-3 hover:bg-brand-offwhite rounded-xl text-sm font-medium transition-colors">BECE Private Registration</Link>
              <Link to="/service/home-tuition" className="block px-4 py-3 hover:bg-brand-offwhite rounded-xl text-sm font-medium transition-colors">Home Tuition Request</Link>
              <Link to="/service/online-tuition" className="block px-4 py-3 hover:bg-brand-offwhite rounded-xl text-sm font-medium transition-colors">Online Tuition</Link>
            </div>
          </div>
          <a href="/#contact" className="text-brand-navy/70 hover:text-brand-gold font-medium transition-colors duration-200 text-sm uppercase tracking-widest relative group">Contact Us</a>
          <NavLink to="/service/home-tuition" variant="button">Register Now</NavLink>
        </div>

        {/* Mobile Toggle */}
        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-brand-navy p-2 bg-brand-gold/10 rounded-full">
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-brand-offwhite border-b border-brand-gold/20 overflow-hidden"
          >
            <div className="px-6 py-8 flex flex-col gap-6">
              <NavLink to="/" onClick={() => setIsOpen(false)}>Home</NavLink>
              <Link to="/service/bece" onClick={() => setIsOpen(false)} className="text-brand-navy/70 text-sm uppercase tracking-widest font-medium">BECE Registration</Link>
              <Link to="/service/home-tuition" onClick={() => setIsOpen(false)} className="text-brand-navy/70 text-sm uppercase tracking-widest font-medium">Home Tuition</Link>
              <Link to="/service/online-tuition" onClick={() => setIsOpen(false)} className="text-brand-navy/70 text-sm uppercase tracking-widest font-medium">Online Tuition</Link>
              <a href="/#contact" onClick={() => setIsOpen(false)} className="text-brand-navy/70 text-sm uppercase tracking-widest font-medium">Contact Us</a>
              <NavLink to="/service/bece" variant="button" onClick={() => setIsOpen(false)}>Register Now</NavLink>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Footer = () => (
  <footer className="bg-brand-navy pt-20 pb-10 px-6 text-white overflow-hidden">
    <div className="max-w-7xl mx-auto">
      <div className="grid md:grid-cols-4 gap-16 mb-20">
        <div className="col-span-1 md:col-span-2">
          <div className="flex items-center gap-3 mb-8">
            <LogoIcon className="w-12 h-12" />
            <div className="flex flex-col">
              <span className="font-serif font-bold text-3xl tracking-tight text-white leading-tight">
                B.H.G Consult
              </span>
              <span className="text-xs uppercase tracking-[0.4em] text-brand-gold font-bold">Unique Elegance</span>
            </div>
          </div>
          <p className="text-white/60 max-w-sm mb-10 leading-relaxed font-light">
            Ghana's premier educational consultancy focused on academic excellence through structured, personalized, and elegant learning systems.
          </p>
          <div className="flex gap-4">
            {["Facebook", "Instagram", "LinkedIn"].map((social) => (
              <button key={social} className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-brand-gold hover:border-brand-gold transition-all duration-300">
                <span className="sr-only">{social}</span>
                {social[0]}
              </button>
            ))}
          </div>
        </div>

        <div>
          <h4 className="font-bold text-brand-gold mb-8 uppercase tracking-widest text-xs">Our Services</h4>
          <ul className="space-y-4 text-white/60 text-sm font-light">
            <li><Link to="/service/bece" className="hover:text-brand-gold transition-colors">BECE Registration</Link></li>
            <li><Link to="/service/home-tuition" className="hover:text-brand-gold transition-colors">Home Tuition Request</Link></li>
            <li><Link to="/service/online-tuition" className="hover:text-brand-gold transition-colors">Online Virtual Classes</Link></li>
            <li><Link to="/service/bece" className="hover:text-brand-gold transition-colors">Private BECE Prep</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold text-brand-gold mb-8 uppercase tracking-widest text-xs">Reach Out</h4>
          <ul className="space-y-6">
            <li className="flex items-start gap-4">
              <Phone className="w-5 h-5 text-brand-gold shrink-0" />
              <div className="text-sm font-light text-white/60 leading-normal">
                0205103678<br />0555284520
              </div>
            </li>
            <li className="flex items-start gap-4">
              <Mail className="w-5 h-5 text-brand-gold shrink-0" />
              <span className="text-sm font-light text-white/60">info@bhgeducationconsult.com</span>
            </li>
            <li className="flex items-start gap-4">
              <MapPin className="w-5 h-5 text-brand-gold shrink-0" />
              <span className="text-sm font-light text-white/60 text-balance">Greater Accra Region, Ghana</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="pt-10 border-t border-white/10 text-center flex flex-col md:flex-row items-center justify-between gap-6">
        <p className="text-white/30 text-[10px] uppercase tracking-[0.3em]">
          &copy; {new Date().getFullYear()} By His Grace Education Consult
        </p>
        <div className="flex items-center gap-4">
          <div className="h-[1px] w-20 bg-brand-gold/30 hidden md:block" />
          <span className="text-brand-gold font-serif italic text-sm">Unique Elegance</span>
        </div>
      </div>
    </div>
  </footer>
);

const SubmissionSuccess = () => (
  <motion.div 
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    className="text-center py-12 px-6 bg-brand-offwhite rounded-[2.5rem] gold-border border-2"
  >
    <div className="w-20 h-20 bg-brand-gold text-white rounded-full flex items-center justify-center mx-auto mb-8 gold-shadow">
      <CheckCircle2 className="w-10 h-10" />
    </div>
    <h3 className="font-serif text-3xl font-bold text-brand-navy mb-6">Application Under Review</h3>
    <p className="text-brand-navy/70 text-lg leading-relaxed max-w-lg mx-auto font-light">
      Thank you for applying to B.H.G Education Consult. Your application is currently under review by our administration. 
      You will receive a confirmation update once your admission has been officially accepted.
    </p>
    <div className="mt-10">
      <Link to="/" className="inline-block border-2 border-brand-navy text-brand-navy px-8 py-3 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-brand-navy hover:text-white transition-all">
        Back to Home
      </Link>
    </div>
  </motion.div>
);

// --- Pages ---

const HomePage = () => (
  <div className="animate-in fade-in duration-700">
    {/* Hero Section */}
    <section className="pt-40 pb-24 md:pt-56 md:pb-32 px-6 luxury-gradient relative overflow-hidden">
      <div className="max-w-7xl mx-auto text-center relative z-10">
        <motion.div
           initial={{ opacity: 0, scale: 0.9 }}
           animate={{ opacity: 1, scale: 1 }}
           className="mb-10 inline-block p-4 rounded-full gold-border bg-white/40 backdrop-blur-sm"
        >
          <LogoIcon className="w-24 h-24 md:w-32 md:h-32" />
        </motion.div>
        
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-serif text-5xl md:text-8xl font-bold text-brand-navy mb-10 leading-[1.1] tracking-tight"
        >
          Empowering Academic <br />
          <span className="text-brand-gold italic">Success</span> with Unique Elegance
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="max-w-3xl mx-auto text-lg md:text-xl text-brand-navy/60 mb-14 leading-relaxed font-light"
        >
          Expert educational support tailored for the elite student. We provide structured learning 
          environments that prioritize both academic results and refined student development.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-6"
        >
          <Link to="/service/bece" className="w-full sm:w-auto bg-brand-navy text-white px-10 py-5 rounded-full font-bold uppercase tracking-[0.2em] text-xs hover:bg-brand-navy/90 transition-all gold-shadow">
            Start Registration
          </Link>
          <Link to="/service/home-tuition" className="w-full sm:w-auto border-2 border-brand-gold text-brand-gold px-10 py-5 rounded-full font-bold uppercase tracking-[0.2em] text-xs hover:bg-brand-gold hover:text-white transition-all">
            Request a Tutor
          </Link>
        </motion.div>
      </div>

      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[500px] h-[500px] bg-brand-gold/5 rounded-full blur-[120px] -translate-x-1/2 pointer-events-none" />
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[400px] h-[400px] bg-brand-navy/5 rounded-full blur-[100px] translate-x-1/2 pointer-events-none" />
    </section>

    {/* About Section */}
    <section id="about" className="py-24 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <div className="relative group">
            <div className="absolute -inset-4 bg-brand-gold/10 rounded-[2rem] blur-2xl group-hover:bg-brand-gold/20 transition-all duration-700" />
            <div className="relative aspect-[4/5] rounded-[2rem] overflow-hidden gold-border border-4">
              <img 
                src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=2070&auto=format&fit=crop" 
                alt="Elite Student" 
                className="w-full h-full object-cover scale-105 group-hover:scale-110 transition-transform duration-1000"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="absolute bottom-10 -right-10 hidden md:block">
              <div className="bg-brand-navy p-10 rounded-[2rem] text-white gold-shadow gold-border border-2">
                <p className="font-serif text-3xl font-bold mb-2">"Unique Elegance"</p>
                <p className="text-[10px] uppercase tracking-[0.4em] text-brand-gold font-bold">The B.H.G Philosophy</p>
              </div>
            </div>
          </div>

          <div className="space-y-10">
            <div className="inline-flex items-center gap-3">
              <div className="w-10 h-[1px] bg-brand-gold" />
              <span className="text-brand-gold font-bold uppercase tracking-[0.4em] text-xs">Academic Excellence</span>
            </div>
            <h2 className="font-serif text-4xl md:text-6xl font-bold text-brand-navy leading-tight">
              Elite, Structured & <br />
              Refined Education
            </h2>
            <div className="space-y-6 text-brand-navy/70 text-lg font-light leading-relaxed">
              <p>
                By His Grace (B.H.G) Education Consult is more than a tutoring service. We are a sanctuary for academic growth where sophistication meets strategy. 
              </p>
              <p>
                Our mission is to provide Ghana's most structured and personalized educational support system, ensuring that every student experiences a learning journey defined by elegance and exceptional results.
              </p>
            </div>
            
            <div className="grid sm:grid-cols-2 gap-8 pt-6">
              {[
                { icon: Award, label: "Proven Results", text: "Consistently high BECE pass rates." },
                { icon: ShieldCheck, label: "Vetted Tutors", text: "Only the top 5% of educators join us." },
              ].map((item, i) => (
                <div key={i} className="flex gap-5">
                  <div className="w-14 h-14 bg-brand-offwhite rounded-2xl flex items-center justify-center shrink-0 gold-border group cursor-default">
                    <item.icon className="w-6 h-6 text-brand-gold group-hover:scale-110 transition-transform" />
                  </div>
                  <div>
                    <h4 className="font-bold text-brand-navy mb-1 uppercase tracking-widest text-[10px]">{item.label}</h4>
                    <p className="text-sm font-light leading-snug">{item.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* Services Cards */}
    <section id="services" className="py-24 px-6 luxury-gradient">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20 space-y-4">
          <span className="text-brand-gold font-bold uppercase tracking-[0.5em] text-xs">Our Expertise</span>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-brand-navy">Core Service Areas</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-10">
          {[
            { 
              path: "/service/bece", 
              icon: BookOpen, 
              title: "BECE Registration", 
              desc: "Elite preparation and seamless registration for BECE Private and School candidates.",
              accent: "navy"
            },
            { 
              path: "/service/home-tuition", 
              icon: HomeIcon, 
              title: "Home Tuition", 
              desc: "Personalized, one-on-one academic guidance in the sanctuary of your home.",
              accent: "gold"
            },
            { 
              path: "/service/online-tuition", 
              icon: Video, 
              title: "Online Classes", 
              desc: "Modern virtual classrooms with recording capabilities and interactive whiteboards.",
              accent: "navy"
            }
          ].map((service, i) => (
            <Link 
              key={i} 
              to={service.path}
              className="group bg-white rounded-[2rem] p-10 border border-brand-gold/10 hover:border-brand-gold/40 transition-all duration-500 shadow-sm hover:shadow-2xl hover:-translate-y-2 flex flex-col h-full"
            >
              <div className="w-20 h-20 bg-brand-offwhite rounded-3xl flex items-center justify-center mb-10 gold-border border-2 group-hover:bg-brand-navy group-hover:text-white transition-colors">
                <service.icon className="w-10 h-10 text-brand-gold" />
              </div>
              <h3 className="font-serif text-2xl font-bold text-brand-navy mb-4">{service.title}</h3>
              <p className="text-brand-navy/60 font-light leading-relaxed mb-10 flex-grow">{service.desc}</p>
              <div className="flex items-center gap-2 text-brand-gold font-bold uppercase tracking-widest text-[10px] group-hover:gap-4 transition-all">
                Explore Service <ChevronRight className="w-4 h-4" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>

    {/* Contact Section Target */}
    <section id="contact" className="py-24 px-6 bg-brand-offwhite">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 space-y-4">
          <span className="text-brand-gold font-bold uppercase tracking-[0.5em] text-xs">Connect With Us</span>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-brand-navy">Contact Administration</h2>
        </div>
        <div className="grid md:grid-cols-2 gap-12">
          <div className="bg-white p-10 rounded-[3rem] gold-border border flex items-center gap-8 shadow-sm">
            <div className="w-16 h-16 bg-brand-gold/10 rounded-2xl flex items-center justify-center shrink-0">
              <Phone className="w-8 h-8 text-brand-gold" />
            </div>
            <div>
              <h4 className="font-bold text-brand-navy mb-2 tracking-widest text-xs uppercase">Call Our Records</h4>
              <p className="text-xl font-serif font-bold text-brand-navy">0205103678 / 0555284520</p>
            </div>
          </div>
          <div className="bg-white p-10 rounded-[3rem] gold-border border flex items-center gap-8 shadow-sm">
            <div className="w-16 h-16 bg-brand-gold/10 rounded-2xl flex items-center justify-center shrink-0">
              <Mail className="w-8 h-8 text-brand-gold" />
            </div>
            <div>
              <h4 className="font-bold text-brand-navy mb-2 tracking-widest text-xs uppercase">Official Inquiry</h4>
              <p className="text-xl font-serif font-bold text-brand-navy break-all">info@bhgeducationconsult.com</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
);

const BECERegistrationPage = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const subjects = [
    "English Language", "Mathematics", "Integrated Science", "Social Studies",
    "RME (Religious and Moral Education)", "French", "Ga", "Asante Twi",
    "Career Technology", "Creative Arts and Design", "Computing", "Arabic"
  ];

  const handleSubmit = async (e: { preventDefault(): void; currentTarget: HTMLFormElement }) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    const fd = new FormData(e.currentTarget);
    try {
      const res = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          formType: 'bece',
          data: {
            fullName: fd.get('fullName'),
            gender: fd.get('gender'),
            phone: fd.get('phone'),
            email: fd.get('email'),
            previousSchool: fd.get('previousSchool'),
            currentClass: fd.get('currentClass'),
            subjects: fd.getAll('subjects'),
          },
        }),
      });
      if (!res.ok) throw new Error();
      setIsSubmitted(true);
    } catch {
      setError('Something went wrong. Please call us on 0205103678 or try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="pt-40 pb-24 px-6 min-h-screen luxury-gradient">
      <div className="max-w-5xl mx-auto">
        {isSubmitted ? (
          <SubmissionSuccess />
        ) : (
          <div className="grid lg:grid-cols-3 gap-16">
            <div className="lg:col-span-1 space-y-8">
              <Link to="/" className="inline-flex items-center gap-2 text-brand-gold hover:text-brand-navy transition-colors font-bold uppercase tracking-widest text-[10px]">
                <ChevronRight className="w-4 h-4 rotate-180" /> Back to Home
              </Link>
              <h1 className="font-serif text-4xl md:text-5xl font-bold text-brand-navy leading-tight">
                BECE Private <br /> Registration
              </h1>
              <div className="h-[2px] w-20 bg-brand-gold" />

              <div className="bg-brand-navy p-8 rounded-3xl text-white gold-border border-2">
                <h4 className="font-bold text-brand-gold uppercase tracking-widest text-[10px] mb-4">Important Notice</h4>
                <p className="text-white/70 text-sm leading-relaxed font-light italic">
                  Please ensure all personal details and subject selections are 100% accurate before submission.
                  Incorrect data may lead to delays in candidate processing and examination eligibility.
                </p>
              </div>
            </div>

            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white p-8 md:p-14 rounded-[3rem] shadow-2xl border border-brand-gold/20"
              >
                <form onSubmit={handleSubmit} className="space-y-10">
                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-3">
                      <label className="text-[10px] uppercase tracking-widest text-brand-navy font-bold opacity-60">Full Name</label>
                      <input required name="fullName" type="text" className="w-full px-0 py-3 bg-transparent border-b-2 border-brand-gold/20 focus:border-brand-navy outline-none transition-all placeholder:text-brand-navy/20" placeholder="Enter Full Name" />
                    </div>
                    <div className="space-y-3">
                      <label className="text-[10px] uppercase tracking-widest text-brand-navy font-bold opacity-60">Gender</label>
                      <select required name="gender" className="w-full px-0 py-3 bg-transparent border-b-2 border-brand-gold/20 focus:border-brand-navy outline-none transition-all appearance-none cursor-pointer">
                        <option value="">Select Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-3">
                      <label className="text-[10px] uppercase tracking-widest text-brand-navy font-bold opacity-60">Phone Number</label>
                      <input required name="phone" type="tel" className="w-full px-0 py-3 bg-transparent border-b-2 border-brand-gold/20 focus:border-brand-navy outline-none transition-all placeholder:text-brand-navy/20" placeholder="Parent / Guardian Phone" />
                    </div>
                    <div className="space-y-3">
                      <label className="text-[10px] uppercase tracking-widest text-brand-navy font-bold opacity-60">Email Address</label>
                      <input required name="email" type="email" className="w-full px-0 py-3 bg-transparent border-b-2 border-brand-gold/20 focus:border-brand-navy outline-none transition-all placeholder:text-brand-navy/20" placeholder="Parent / Guardian Email" />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-3">
                      <label className="text-[10px] uppercase tracking-widest text-brand-navy font-bold opacity-60">Previous School</label>
                      <input required name="previousSchool" type="text" className="w-full px-0 py-3 bg-transparent border-b-2 border-brand-gold/20 focus:border-brand-navy outline-none transition-all placeholder:text-brand-navy/20" placeholder="School Name" />
                    </div>
                    <div className="space-y-3">
                      <label className="text-[10px] uppercase tracking-widest text-brand-navy font-bold opacity-60">Current Class/Level</label>
                      <select required name="currentClass" className="w-full px-0 py-3 bg-transparent border-b-2 border-brand-gold/20 focus:border-brand-navy outline-none transition-all appearance-none cursor-pointer">
                        <option value="candidate">Candidate / Private</option>
                        <option value="jhs3">JHS 3</option>
                        <option value="jhs2">JHS 2</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <label className="text-[10px] uppercase tracking-widest text-brand-navy font-bold opacity-60">Subject Selection Checklist</label>
                      <span className="text-[10px] text-brand-gold font-bold italic">Select all that apply</span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {subjects.map((sub) => (
                        <label key={sub} className="flex items-center gap-3 p-4 rounded-2xl border border-brand-gold/10 hover:border-brand-navy/20 transition-all cursor-pointer group">
                          <input type="checkbox" name="subjects" value={sub} className="w-5 h-5 rounded accent-brand-gold" />
                          <span className="text-sm font-medium text-brand-navy/80 group-hover:text-brand-navy">{sub}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {error && <p className="text-red-500 text-sm text-center">{error}</p>}

                  <button type="submit" disabled={isLoading} className="w-full bg-brand-gold text-white py-6 rounded-full font-bold uppercase tracking-[0.3em] text-xs hover:bg-brand-navy transition-all gold-shadow disabled:opacity-60 disabled:cursor-not-allowed">
                    {isLoading ? 'Submitting...' : 'Submit Application'}
                  </button>
                </form>
              </motion.div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const HomeTuitionPage = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: { preventDefault(): void; currentTarget: HTMLFormElement }) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    const fd = new FormData(e.currentTarget);
    try {
      const res = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          formType: 'home-tuition',
          data: {
            studentName: fd.get('studentName'),
            studentGender: fd.get('studentGender'),
            phone: fd.get('phone'),
            email: fd.get('email'),
            teacherGender: fd.get('teacherGender'),
            location: fd.get('location'),
            numSubjects: fd.get('numSubjects'),
            notes: fd.get('notes'),
          },
        }),
      });
      if (!res.ok) throw new Error();
      setIsSubmitted(true);
    } catch {
      setError('Something went wrong. Please call us on 0205103678 or try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="pt-40 pb-24 px-6 min-h-screen luxury-gradient">
      <div className="max-w-5xl mx-auto">
        {isSubmitted ? (
          <SubmissionSuccess />
        ) : (
          <div className="grid lg:grid-cols-3 gap-16">
            <div className="lg:col-span-1 space-y-8">
              <Link to="/" className="inline-flex items-center gap-2 text-brand-gold hover:text-brand-navy transition-colors font-bold uppercase tracking-widest text-[10px]">
                <ChevronRight className="w-4 h-4 rotate-180" /> Back to Home
              </Link>
              <h1 className="font-serif text-4xl md:text-5xl font-bold text-brand-navy leading-tight">
                Personalized <br /> Home Tuition
              </h1>
              <div className="h-[2px] w-20 bg-brand-gold" />

              <div className="space-y-8">
                {[
                  { icon: ShieldCheck, title: "Rigorous Vetting", desc: "Every tutor undergoes background checks and quality audits." },
                  { icon: Award, title: "Personalized Match", desc: "We match tutors based on chemistry and academic needs." },
                  { icon: GraduationCap, title: "Elite Standard", desc: "Excellence brought directly to your home." }
                ].map((item, i) => (
                  <div key={i} className="flex gap-4">
                    <item.icon className="w-5 h-5 text-brand-gold shrink-0" />
                    <div>
                      <h4 className="font-bold text-brand-navy text-[10px] uppercase tracking-widest mb-1">{item.title}</h4>
                      <p className="text-sm font-light text-brand-navy/60 leading-snug">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white p-8 md:p-14 rounded-[3rem] shadow-2xl border border-brand-gold/20"
              >
                <form onSubmit={handleSubmit} className="space-y-10">
                  <div className="space-y-3">
                    <label className="text-[10px] uppercase tracking-widest text-brand-navy font-bold opacity-60">Student's Full Name</label>
                    <input required name="studentName" type="text" className="w-full px-0 py-3 bg-transparent border-b-2 border-brand-gold/20 focus:border-brand-navy outline-none transition-all placeholder:text-brand-navy/20" placeholder="Child's Full Name" />
                  </div>

                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-3">
                      <label className="text-[10px] uppercase tracking-widest text-brand-navy font-bold opacity-60">Student's Gender</label>
                      <div className="flex gap-6 py-2">
                        <label className="flex items-center gap-2 cursor-pointer group">
                          <input required type="radio" name="studentGender" value="male" className="w-4 h-4 accent-brand-gold" />
                          <span className="text-sm font-medium">Male</span>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer group">
                          <input required type="radio" name="studentGender" value="female" className="w-4 h-4 accent-brand-gold" />
                          <span className="text-sm font-medium">Female</span>
                        </label>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <label className="text-[10px] uppercase tracking-widest text-brand-navy font-bold opacity-60">Teacher's Gender Preference</label>
                      <select required name="teacherGender" className="w-full px-0 py-3 bg-transparent border-b-2 border-brand-gold/20 focus:border-brand-navy outline-none transition-all appearance-none cursor-pointer">
                        <option value="none">No Preference</option>
                        <option value="male">Male Teacher</option>
                        <option value="female">Female Teacher</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-3">
                      <label className="text-[10px] uppercase tracking-widest text-brand-navy font-bold opacity-60">Phone Number</label>
                      <input required name="phone" type="tel" className="w-full px-0 py-3 bg-transparent border-b-2 border-brand-gold/20 focus:border-brand-navy outline-none transition-all placeholder:text-brand-navy/20" placeholder="Parent / Guardian Phone" />
                    </div>
                    <div className="space-y-3">
                      <label className="text-[10px] uppercase tracking-widest text-brand-navy font-bold opacity-60">Email Address</label>
                      <input required name="email" type="email" className="w-full px-0 py-3 bg-transparent border-b-2 border-brand-gold/20 focus:border-brand-navy outline-none transition-all placeholder:text-brand-navy/20" placeholder="Parent / Guardian Email" />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-3">
                      <label className="text-[10px] uppercase tracking-widest text-brand-navy font-bold opacity-60">Current Location (Accra)</label>
                      <input required name="location" type="text" className="w-full px-0 py-3 bg-transparent border-b-2 border-brand-gold/20 focus:border-brand-navy outline-none transition-all placeholder:text-brand-navy/20" placeholder="e.g. East Legon, Cantonments" />
                    </div>
                    <div className="space-y-3">
                      <label className="text-[10px] uppercase tracking-widest text-brand-navy font-bold opacity-60">Number of Subjects</label>
                      <input required name="numSubjects" type="number" min="1" max="10" className="w-full px-0 py-3 bg-transparent border-b-2 border-brand-gold/20 focus:border-brand-navy outline-none transition-all" defaultValue="1" />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <label className="text-[10px] uppercase tracking-widest text-brand-navy font-bold opacity-60">Additional Requirements / Notes</label>
                    <textarea name="notes" rows={3} className="w-full px-0 py-3 bg-transparent border-b-2 border-brand-gold/20 focus:border-brand-navy outline-none transition-all resize-none placeholder:text-brand-navy/20" placeholder="Any specific learning challenges or goals?"></textarea>
                  </div>

                  {error && <p className="text-red-500 text-sm text-center">{error}</p>}

                  <button type="submit" disabled={isLoading} className="w-full bg-brand-gold text-white py-6 rounded-full font-bold uppercase tracking-[0.3em] text-xs hover:bg-brand-navy transition-all gold-shadow disabled:opacity-60 disabled:cursor-not-allowed">
                    {isLoading ? 'Submitting...' : 'Submit Tuition Request'}
                  </button>
                </form>
              </motion.div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const OnlineTuitionPage = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: { preventDefault(): void; currentTarget: HTMLFormElement }) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    const fd = new FormData(e.currentTarget);
    try {
      const res = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          formType: 'online-tuition',
          data: {
            fullName: fd.get('fullName'),
            age: fd.get('age'),
            gender: fd.get('gender'),
            currentClass: fd.get('currentClass'),
            school: fd.get('school'),
            phone: fd.get('phone'),
            email: fd.get('email'),
          },
        }),
      });
      if (!res.ok) throw new Error();
      setIsSubmitted(true);
    } catch {
      setError('Something went wrong. Please call us on 0205103678 or try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="pt-40 pb-24 px-6 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20 space-y-4">
          <Link to="/" className="inline-flex items-center gap-2 text-brand-gold hover:text-brand-navy transition-colors font-bold uppercase tracking-widest text-[10px] mb-6">
            <ChevronRight className="w-4 h-4 rotate-180" /> Back to Home
          </Link>
          <h1 className="font-serif text-5xl md:text-7xl font-bold text-brand-navy">Virtual Classroom</h1>
          <div className="flex items-center justify-center gap-4">
            <div className="h-[1px] w-12 bg-brand-gold" />
            <span className="text-brand-navy italic font-serif text-xl">The Future of Education</span>
            <div className="h-[1px] w-12 bg-brand-gold" />
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-24">
          {[
            {
              icon: Video,
              title: "Interactive Classrooms",
              desc: "Modern real-time whiteboard tools for dynamic remote learning."
            },
            {
              icon: GraduationCap,
              title: "All Subjects Covered",
              desc: "Comprehensive Primary, JHS, and SHS level curriculum coverage."
            },
            {
              icon: Clock,
              title: "Flexible Scheduling",
              desc: "Personalized learning fits into your child's unique daily routine."
            },
            {
              icon: CheckCircle2,
              title: "Recorded Sessions",
              desc: "Rewatch any class at any time for easy revision and review."
            }
          ].map((feature, i) => (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              key={i}
              className="p-10 bg-brand-offwhite rounded-[2.5rem] border border-brand-gold/20 gold-shadow text-center"
            >
              <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-8 gold-border border-2">
                <feature.icon className="w-8 h-8 text-brand-gold" />
              </div>
              <h4 className="font-serif font-bold text-xl text-brand-navy mb-4">{feature.title}</h4>
              <p className="text-brand-navy/60 text-sm font-light leading-relaxed">{feature.desc}</p>
            </motion.div>
          ))}
        </div>

        <div className="max-w-4xl mx-auto">
          {isSubmitted ? (
            <SubmissionSuccess />
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white p-8 md:p-14 rounded-[3rem] shadow-2xl border border-brand-gold/20"
            >
              <div className="text-center mb-12">
                <h3 className="font-serif text-3xl font-bold text-brand-navy mb-4">Online Tuition Admission</h3>
                <p className="text-brand-navy/60 font-light">Join the B.H.G Virtual Excellence platform today.</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest text-brand-navy font-bold opacity-60">Full Name</label>
                    <input required name="fullName" type="text" className="w-full px-0 py-3 bg-transparent border-b-2 border-brand-gold/20 focus:border-brand-navy outline-none transition-all placeholder:text-brand-navy/20" placeholder="Student's Name" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest text-brand-navy font-bold opacity-60">Age</label>
                    <input required name="age" type="number" min="5" max="25" className="w-full px-0 py-3 bg-transparent border-b-2 border-brand-gold/20 focus:border-brand-navy outline-none transition-all" placeholder="Years" />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest text-brand-navy font-bold opacity-60">Gender</label>
                    <select required name="gender" className="w-full px-0 py-3 bg-transparent border-b-2 border-brand-gold/20 focus:border-brand-navy outline-none transition-all appearance-none cursor-pointer">
                      <option value="">Select Gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest text-brand-navy font-bold opacity-60">Current Class / Grade Level</label>
                    <input required name="currentClass" type="text" className="w-full px-0 py-3 bg-transparent border-b-2 border-brand-gold/20 focus:border-brand-navy outline-none transition-all placeholder:text-brand-navy/20" placeholder="e.g. JHS 1, Grade 9" />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest text-brand-navy font-bold opacity-60">Current School</label>
                    <input required name="school" type="text" className="w-full px-0 py-3 bg-transparent border-b-2 border-brand-gold/20 focus:border-brand-navy outline-none transition-all placeholder:text-brand-navy/20" placeholder="School Name" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest text-brand-navy font-bold opacity-60">Phone / WhatsApp Number</label>
                    <div className="relative">
                      <input required name="phone" type="tel" className="w-full pl-8 pr-0 py-3 bg-transparent border-b-2 border-brand-gold/20 focus:border-brand-navy outline-none transition-all placeholder:text-brand-navy/20" placeholder="Contact number" />
                      <Phone className="absolute left-0 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-gold/40" />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest text-brand-navy font-bold opacity-60">Email Address</label>
                  <input required name="email" type="email" className="w-full px-0 py-3 bg-transparent border-b-2 border-brand-gold/20 focus:border-brand-navy outline-none transition-all placeholder:text-brand-navy/20" placeholder="Student / Parent Email" />
                </div>

                {error && <p className="text-red-500 text-sm text-center">{error}</p>}

                <button type="submit" disabled={isLoading} className="w-full bg-brand-gold text-white py-6 rounded-full font-bold uppercase tracking-[0.3em] text-xs hover:bg-brand-navy transition-all gold-shadow disabled:opacity-60 disabled:cursor-not-allowed">
                  {isLoading ? 'Submitting...' : 'Submit Online Admission Application'}
                </button>
              </form>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};


export default function App() {
  return (
    <Router>
      <div className="min-h-screen selection:bg-brand-gold selection:text-white bg-brand-offwhite flex flex-col">
        <ScrollToTop />
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/service/bece" element={<BECERegistrationPage />} />
            <Route path="/service/home-tuition" element={<HomeTuitionPage />} />
            <Route path="/service/online-tuition" element={<OnlineTuitionPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}
