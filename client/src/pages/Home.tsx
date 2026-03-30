/*
 * ACE OF FADES – Home Page
 * Design: Luxury Grooming Editorial
 * Palette: #111111 base | #F5F0E8 text | #C8A951 gold
 * Fonts: Playfair Display (headlines) + Outfit (body)
 * All sections: Hero, Services, Social Proof, Gallery, Location, Booking, About, Footer
 */

import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import {
  Scissors,
  MapPin,
  Phone,
  Clock,
  Instagram,
  Star,
  ChevronDown,
  Sparkles,
  User,
  Calendar,
  CheckCircle2,
  X,
} from "lucide-react";

// ─── Image CDN URLs ────────────────────────────────────────────────────────────
const HERO_IMG =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663494477615/QLAmyzRREmFYuprWd6DCRZ/hero-barber-DcpNrKvHTTXPo9ZsCShw26.webp";
const GALLERY_SKIN_FADE =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663494477615/QLAmyzRREmFYuprWd6DCRZ/gallery-skin-fade-infgHPd2j5sDUKKJVxhz3n.webp";
const GALLERY_TAPER_FADE =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663494477615/QLAmyzRREmFYuprWd6DCRZ/gallery-taper-fade-dCTitzbo3gG2wWtHWWB8Gj.webp";
const GALLERY_BEARD =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663494477615/QLAmyzRREmFYuprWd6DCRZ/gallery-beard-trim-f8SgjojDSPu4crHbyWE4Je.webp";
const GALLERY_INTERIOR =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663494477615/QLAmyzRREmFYuprWd6DCRZ/gallery-shop-interior-BNwqQuw3hsLLwndVC4SrPM.webp";

// ─── Animation Variants ────────────────────────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7 } },
};
const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.8 } },
};
const stagger = {
  visible: { transition: { staggerChildren: 0.12 } },
};

// ─── Reusable Animated Section ─────────────────────────────────────────────────
function AnimSection({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={{ ...fadeUp, visible: { opacity: 1, y: 0, transition: { duration: 0.7, delay } } }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ─── Section Label ─────────────────────────────────────────────────────────────
function SectionLabel({ text }: { text: string }) {
  return <p className="section-label mb-4">{text}</p>;
}

// ─── Gold CTA Button ───────────────────────────────────────────────────────────
function GoldCTA({
  text = "Book Your Fresh Fade",
  size = "default",
  onClick,
}: {
  text?: string;
  size?: "default" | "large";
  onClick?: () => void;
}) {
  const handleClick = () => {
    if (onClick) {
      onClick();
    } else {
      document.getElementById("booking")?.scrollIntoView({ behavior: "smooth" });
    }
  };
  return (
    <button
      className={`btn-gold ${size === "large" ? "text-base px-10 py-5" : ""}`}
      onClick={handleClick}
    >
      <Scissors size={size === "large" ? 18 : 15} />
      {text}
    </button>
  );
}

// ─── Navbar ────────────────────────────────────────────────────────────────────
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinks = [
    { label: "Services", href: "#services" },
    { label: "Gallery", href: "#gallery" },
    { label: "About", href: "#about" },
    { label: "Location", href: "#location" },
  ];

  const scrollTo = (href: string) => {
    setMenuOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "bg-[#0d0d0d]/95 backdrop-blur-md border-b border-white/5" : "bg-transparent"
      }`}
    >
      <div className="container flex items-center justify-between h-16 md:h-20">
        {/* Logo */}
        <a
          href="#"
          className="flex items-center gap-2.5 group"
          onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}
        >
          <div className="w-8 h-8 border border-[#C8A951] flex items-center justify-center">
            <Scissors size={14} className="text-[#C8A951] rotate-45" />
          </div>
          <span
            style={{ fontFamily: "'Playfair Display', serif" }}
            className="text-[#F5F0E8] font-bold text-lg tracking-wide"
          >
            Ace of Fades
          </span>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((l) => (
            <button
              key={l.label}
              onClick={() => scrollTo(l.href)}
              className="text-[#F5F0E8]/70 hover:text-[#C8A951] text-sm font-medium tracking-wide transition-colors duration-200"
            >
              {l.label}
            </button>
          ))}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden md:block">
          <GoldCTA />
        </div>

        {/* Mobile menu toggle */}
        <button
          className="md:hidden text-[#F5F0E8] p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={22} /> : (
            <div className="flex flex-col gap-1.5">
              <span className="block w-5 h-0.5 bg-[#F5F0E8]" />
              <span className="block w-5 h-0.5 bg-[#F5F0E8]" />
              <span className="block w-3.5 h-0.5 bg-[#C8A951]" />
            </div>
          )}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[#0d0d0d] border-t border-white/5"
          >
            <div className="container py-6 flex flex-col gap-4">
              {navLinks.map((l) => (
                <button
                  key={l.label}
                  onClick={() => scrollTo(l.href)}
                  className="text-[#F5F0E8]/80 hover:text-[#C8A951] text-base font-medium text-left transition-colors"
                >
                  {l.label}
                </button>
              ))}
              <div className="pt-2">
                <GoldCTA />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

// ─── Hero Section ──────────────────────────────────────────────────────────────
function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-end overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src={HERO_IMG}
          alt="Barber giving a precision fade"
          className="w-full h-full object-cover object-center"
        />
        {/* Layered overlays for depth */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a]/95 via-[#0a0a0a]/70 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/80 via-transparent to-[#0a0a0a]/30" />
      </div>

      {/* Content */}
      <div className="relative z-10 container pb-20 md:pb-28 pt-32">
        <div className="max-w-2xl">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <SectionLabel text="East London's Premier Barber" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.4 }}
            style={{ fontFamily: "'Playfair Display', serif" }}
            className="text-5xl md:text-7xl font-black text-[#F5F0E8] leading-[1.05] mt-2 mb-6"
          >
            The Cleanest
            <br />
            <span className="text-[#C8A951]">Fades</span> in
            <br />
            East London.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.7 }}
            className="text-[#F5F0E8]/75 text-lg md:text-xl font-light leading-relaxed mb-10 max-w-lg"
          >
            Walk in or book online and leave with a sharp cut that turns heads.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
            className="flex flex-col sm:flex-row gap-4 items-start"
          >
            <GoldCTA size="large" />
            <a
              href="https://www.google.co.uk/maps/place/Ace+of+fades/@51.5479782,0.0214767"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gold-outline flex items-center gap-2 text-sm px-8 py-5"
            >
              <MapPin size={15} />
              Find Us on Google Maps
            </a>
          </motion.div>

          {/* Trust badges */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.2 }}
            className="mt-12 flex items-center gap-6 flex-wrap"
          >
            {[
              { icon: <Star size={14} className="fill-[#C8A951] text-[#C8A951]" />, text: "4.6 Google Rating" },
              { icon: <CheckCircle2 size={14} className="text-[#C8A951]" />, text: "Walk-ins Welcome" },
              { icon: <Clock size={14} className="text-[#C8A951]" />, text: "Quick Appointments" },
            ].map((b) => (
              <div key={b.text} className="flex items-center gap-2 text-[#F5F0E8]/60 text-sm">
                {b.icon}
                <span>{b.text}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 right-8 hidden md:flex flex-col items-center gap-2 text-[#F5F0E8]/40"
      >
        <span className="text-xs tracking-widest uppercase rotate-90 mb-2">Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          <ChevronDown size={16} />
        </motion.div>
      </motion.div>
    </section>
  );
}

// ─── Services Section ──────────────────────────────────────────────────────────
const SERVICES = [
  {
    icon: "✂",
    title: "Haircut",
    desc: "Classic clean trim for everyday style.",
  },
  {
    icon: "⚡",
    title: "Skin Fade",
    desc: "Sharp modern fades done with precision.",
  },
  {
    icon: "🪒",
    title: "Beard Trim",
    desc: "Perfect shaping and grooming.",
  },
  {
    icon: "👦",
    title: "Kids Haircut",
    desc: "Stylish cuts for younger clients.",
  },
  {
    icon: "💈",
    title: "Traditional Shave",
    desc: "Classic razor shave for a smooth finish.",
  },
];

function ServicesSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="services" className="py-24 md:py-32 bg-[#111111] relative overflow-hidden">
      {/* Decorative background number */}
      <div
        className="absolute right-0 top-0 text-[20rem] font-black leading-none text-white/[0.015] select-none pointer-events-none"
        style={{ fontFamily: "'Playfair Display', serif" }}
        aria-hidden
      >
        02
      </div>

      <div className="container" ref={ref}>
        <AnimSection>
          <SectionLabel text="What We Offer" />
          <h2
            style={{ fontFamily: "'Playfair Display', serif" }}
            className="text-4xl md:text-5xl font-black text-[#F5F0E8] mb-4"
          >
            Premium Grooming
            <br />
            <span className="text-[#C8A951]">Services</span>
          </h2>
          <p className="text-[#F5F0E8]/55 text-base max-w-md mb-16 leading-relaxed">
            Services include haircuts, beard trims and traditional wet shaves performed by experienced barbers.
          </p>
        </AnimSection>

        <motion.div
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={stagger}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-white/5"
        >
          {SERVICES.map((s, i) => (
            <motion.div
              key={s.title}
              variants={fadeUp}
              className="bg-[#111111] p-8 group hover:bg-[#161616] transition-colors duration-300 relative overflow-hidden"
            >
              {/* Gold left border on hover */}
              <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-[#C8A951] scale-y-0 group-hover:scale-y-100 transition-transform duration-300 origin-bottom" />

              <div className="text-3xl mb-5">{s.icon}</div>
              <h3
                style={{ fontFamily: "'Playfair Display', serif" }}
                className="text-[#F5F0E8] text-xl font-bold mb-2 group-hover:text-[#C8A951] transition-colors duration-300"
              >
                {s.title}
              </h3>
              <p className="text-[#F5F0E8]/50 text-sm leading-relaxed">{s.desc}</p>

              {/* Index number */}
              <span className="absolute bottom-6 right-6 text-4xl font-black text-white/[0.04] select-none"
                style={{ fontFamily: "'Playfair Display', serif" }}>
                {String(i + 1).padStart(2, "0")}
              </span>
            </motion.div>
          ))}

          {/* CTA card */}
          <motion.div
            variants={fadeUp}
            className="bg-[#C8A951] p-8 flex flex-col justify-between"
          >
            <div>
              <Sparkles size={28} className="text-[#0a0a0a] mb-4" />
              <h3
                style={{ fontFamily: "'Playfair Display', serif" }}
                className="text-[#0a0a0a] text-xl font-bold mb-2"
              >
                Ready to Look Sharp?
              </h3>
              <p className="text-[#0a0a0a]/70 text-sm leading-relaxed">
                Book your appointment online in seconds.
              </p>
            </div>
            <button
              className="mt-8 bg-[#0a0a0a] text-[#C8A951] font-bold text-sm tracking-widest uppercase px-6 py-3 hover:bg-[#1a1a1a] transition-colors duration-200 flex items-center gap-2"
              onClick={() => document.getElementById("booking")?.scrollIntoView({ behavior: "smooth" })}
            >
              <Scissors size={14} />
              Book Now
            </button>
          </motion.div>
        </motion.div>

        <AnimSection className="mt-12 flex justify-start" delay={0.2}>
          <GoldCTA />
        </AnimSection>
      </div>
    </section>
  );
}

// ─── Testimonials Section ──────────────────────────────────────────────────────
const TESTIMONIALS = [
  {
    quote: "Always reliable with appointment times and the quality of haircuts is top-notch.",
    author: "James R.",
    stars: 5,
  },
  {
    quote: "Very friendly atmosphere and skilled barbers — best barber in the area.",
    author: "Marcus T.",
    stars: 5,
  },
  {
    quote: "Super professional and my son loved the haircut.",
    author: "David K.",
    stars: 5,
  },
];

function TestimonialsSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="py-24 md:py-32 bg-[#0d0d0d] relative overflow-hidden">
      {/* Gold accent line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#C8A951]/40 to-transparent" />

      <div className="container" ref={ref}>
        <AnimSection>
          <SectionLabel text="Social Proof" />
          <h2
            style={{ fontFamily: "'Playfair Display', serif" }}
            className="text-4xl md:text-5xl font-black text-[#F5F0E8] mb-16"
          >
            Why Customers Keep
            <br />
            <span className="text-[#C8A951]">Coming Back</span>
          </h2>
        </AnimSection>

        <motion.div
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={stagger}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {TESTIMONIALS.map((t, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              className="bg-[#141414] p-8 border-l-2 border-[#C8A951] relative group hover:bg-[#181818] transition-colors duration-300"
            >
              {/* Stars */}
              <div className="flex gap-1 mb-6">
                {Array.from({ length: t.stars }).map((_, j) => (
                  <Star key={j} size={14} className="fill-[#C8A951] text-[#C8A951]" />
                ))}
              </div>

              <blockquote
                style={{ fontFamily: "'Playfair Display', serif" }}
                className="text-[#F5F0E8] text-lg font-medium italic leading-relaxed mb-6"
              >
                "{t.quote}"
              </blockquote>

              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-[#C8A951]/20 flex items-center justify-center">
                  <User size={14} className="text-[#C8A951]" />
                </div>
                <span className="text-[#F5F0E8]/60 text-sm font-medium">{t.author}</span>
              </div>

              {/* Large quote mark */}
              <div
                className="absolute top-4 right-6 text-7xl text-[#C8A951]/10 select-none pointer-events-none leading-none"
                style={{ fontFamily: "'Playfair Display', serif" }}
                aria-hidden
              >
                "
              </div>
            </motion.div>
          ))}
        </motion.div>

        <AnimSection className="mt-8 text-[#F5F0E8]/45 text-sm leading-relaxed max-w-lg" delay={0.3}>
          <p>
            Customer reviews frequently highlight friendly staff, professional service and consistently
            high-quality haircuts.
          </p>
        </AnimSection>

        <AnimSection className="mt-8" delay={0.4}>
          <GoldCTA />
        </AnimSection>
      </div>
    </section>
  );
}

// ─── Gallery Section ───────────────────────────────────────────────────────────
const GALLERY_ITEMS = [
  { src: GALLERY_SKIN_FADE, label: "Skin Fade", span: "row-span-2" },
  { src: GALLERY_TAPER_FADE, label: "Taper Fade", span: "" },
  { src: GALLERY_BEARD, label: "Beard Trim", span: "" },
  { src: GALLERY_INTERIOR, label: "The Shop", span: "col-span-2" },
];

function GallerySection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="gallery" className="py-24 md:py-32 bg-[#111111]">
      <div className="container" ref={ref}>
        <AnimSection>
          <SectionLabel text="Our Work" />
          <h2
            style={{ fontFamily: "'Playfair Display', serif" }}
            className="text-4xl md:text-5xl font-black text-[#F5F0E8] mb-16"
          >
            Recent <span className="text-[#C8A951]">Cuts</span>
          </h2>
        </AnimSection>

        <motion.div
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={stagger}
          className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-3"
        >
          {/* Skin Fade — tall left column */}
          <motion.div
            variants={fadeIn}
            className="relative overflow-hidden group row-span-2"
          >
            <img
              src={GALLERY_SKIN_FADE}
              alt="Skin Fade"
              className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
              style={{ minHeight: "320px" }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <span className="text-[#F5F0E8] text-sm font-semibold tracking-wider uppercase">Skin Fade</span>
            </div>
          </motion.div>

          {/* Taper Fade */}
          <motion.div variants={fadeIn} className="relative overflow-hidden group">
            <img
              src={GALLERY_TAPER_FADE}
              alt="Taper Fade"
              className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
              style={{ minHeight: "200px" }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <span className="text-[#F5F0E8] text-sm font-semibold tracking-wider uppercase">Taper Fade</span>
            </div>
          </motion.div>

          {/* Beard Trim */}
          <motion.div variants={fadeIn} className="relative overflow-hidden group">
            <img
              src={GALLERY_BEARD}
              alt="Beard Trim"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              style={{ minHeight: "200px" }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <span className="text-[#F5F0E8] text-sm font-semibold tracking-wider uppercase">Beard Trim</span>
            </div>
          </motion.div>

          {/* Shop Interior — wide bottom */}
          <motion.div variants={fadeIn} className="relative overflow-hidden group col-span-2">
            <img
              src={GALLERY_INTERIOR}
              alt="Barbershop Interior"
              className="w-full object-cover transition-transform duration-700 group-hover:scale-105"
              style={{ height: "280px" }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <span className="text-[#F5F0E8] text-sm font-semibold tracking-wider uppercase">The Shop</span>
            </div>
          </motion.div>
        </motion.div>

        <AnimSection className="mt-12" delay={0.2}>
          <GoldCTA />
        </AnimSection>
      </div>
    </section>
  );
}

// ─── Location Section ──────────────────────────────────────────────────────────
function LocationSection() {
  return (
    <section id="location" className="py-24 md:py-32 bg-[#0d0d0d]">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#C8A951]/30 to-transparent" />
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* Text side */}
          <AnimSection>
            <SectionLabel text="Find Us" />
            <h2
              style={{ fontFamily: "'Playfair Display', serif" }}
              className="text-4xl md:text-5xl font-black text-[#F5F0E8] mb-6"
            >
              Visit Our
              <br />
              <span className="text-[#C8A951]">Barbershop</span>
            </h2>

            {/* Business card */}
            <div className="bg-[#141414] border border-white/5 p-6 mb-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-[#C8A951] flex items-center justify-center flex-shrink-0">
                  <Scissors size={16} className="text-[#0a0a0a]" />
                </div>
                <div>
                  <p className="text-[#F5F0E8] font-bold text-base">Ace of Fades</p>
                  <div className="flex items-center gap-2 mt-0.5">
                    <div className="flex gap-0.5">
                      {[1,2,3,4].map(i => <Star key={i} size={10} className="fill-[#C8A951] text-[#C8A951]" />)}
                      <Star size={10} className="fill-[#C8A951]/40 text-[#C8A951]/40" />
                    </div>
                    <span className="text-[#F5F0E8]/50 text-xs">4.6 · Barber shop · Open</span>
                  </div>
                </div>
              </div>

              <div className="space-y-3 text-sm">
                <div className="flex items-start gap-3">
                  <MapPin size={14} className="text-[#C8A951] mt-0.5 flex-shrink-0" />
                  <span className="text-[#F5F0E8]/70">East London</span>
                </div>
                <div className="flex items-start gap-3">
                  <Phone size={14} className="text-[#C8A951] mt-0.5 flex-shrink-0" />
                  <span className="text-[#F5F0E8]/70">Call to book</span>
                </div>
                <div className="flex items-start gap-3">
                  <Clock size={14} className="text-[#C8A951] mt-0.5 flex-shrink-0" />
                  <div className="text-[#F5F0E8]/70 space-y-0.5">
                    <p>Mon – Sat: 9:00 AM – 7:00 PM</p>
                    <p>Sunday: 10:00 AM – 5:00 PM</p>
                  </div>
                </div>
              </div>
            </div>

            <p className="text-[#F5F0E8]/55 text-sm leading-relaxed mb-8">
              Conveniently located in East London. Drop by for a walk-in or book your appointment online.
            </p>

            <GoldCTA />
          </AnimSection>

          {/* Map side */}
          <AnimSection delay={0.2}>
            <div className="relative w-full overflow-hidden border border-white/5" style={{ height: "420px" }}>
              <iframe
                title="Ace of Fades Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2480.5!2d0.0214767!3d51.5479782!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47d8a7e9e9e9e9e9%3A0x0!2sAce+of+fades!5e0!3m2!1sen!2suk!4v1"
                width="100%"
                height="100%"
                style={{ border: 0, filter: "invert(90%) hue-rotate(180deg) saturate(0.8)" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
              {/* Gold corner accents */}
              <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-[#C8A951] pointer-events-none" />
              <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-[#C8A951] pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-[#C8A951] pointer-events-none" />
              <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-[#C8A951] pointer-events-none" />
            </div>
            <a
              href="https://www.google.co.uk/maps/place/Ace+of+fades/@51.5479782,0.0214767"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 flex items-center gap-2 text-[#C8A951] text-sm hover:text-[#D4B96A] transition-colors"
            >
              <MapPin size={13} />
              Open in Google Maps
            </a>
          </AnimSection>
        </div>
      </div>
    </section>
  );
}

// ─── Booking Form Section ──────────────────────────────────────────────────────
const SERVICE_OPTIONS = [
  "Haircut",
  "Skin Fade",
  "Beard Trim",
  "Kids Haircut",
  "Traditional Shave",
  "Haircut + Beard Trim",
];

function BookingSection() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    date: "",
    service: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1200);
  };

  return (
    <section id="booking" className="py-24 md:py-32 bg-[#111111] relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#C8A951]/30 to-transparent" />
        <div
          className="absolute -right-20 top-20 text-[20rem] font-black leading-none text-white/[0.015] select-none"
          style={{ fontFamily: "'Playfair Display', serif" }}
          aria-hidden
        >
          ✂
        </div>
      </div>

      <div className="container relative z-10">
        <div className="max-w-2xl mx-auto">
          <AnimSection>
            <SectionLabel text="Reserve Your Spot" />
            <h2
              style={{ fontFamily: "'Playfair Display', serif" }}
              className="text-4xl md:text-5xl font-black text-[#F5F0E8] mb-3"
            >
              Book Your
              <br />
              <span className="text-[#C8A951]">Appointment</span>
            </h2>
            <p className="text-[#F5F0E8]/50 text-sm mb-12 leading-relaxed">
              Fill in your details below and one of our barbers will confirm your slot shortly.
            </p>
          </AnimSection>

          <AnimSection delay={0.15}>
            {!submitted ? (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-[#F5F0E8]/60 text-xs tracking-widest uppercase mb-2">
                      First Name
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      required
                      value={form.firstName}
                      onChange={handleChange}
                      placeholder="John"
                      className="w-full bg-[#181818] border border-white/10 text-[#F5F0E8] placeholder-[#F5F0E8]/25 px-4 py-3.5 text-sm focus:outline-none focus:border-[#C8A951] transition-colors duration-200"
                    />
                  </div>
                  <div>
                    <label className="block text-[#F5F0E8]/60 text-xs tracking-widest uppercase mb-2">
                      Last Name
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      required
                      value={form.lastName}
                      onChange={handleChange}
                      placeholder="Smith"
                      className="w-full bg-[#181818] border border-white/10 text-[#F5F0E8] placeholder-[#F5F0E8]/25 px-4 py-3.5 text-sm focus:outline-none focus:border-[#C8A951] transition-colors duration-200"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-[#F5F0E8]/60 text-xs tracking-widest uppercase mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="+44 7700 000000"
                      className="w-full bg-[#181818] border border-white/10 text-[#F5F0E8] placeholder-[#F5F0E8]/25 px-4 py-3.5 text-sm focus:outline-none focus:border-[#C8A951] transition-colors duration-200"
                    />
                  </div>
                  <div>
                    <label className="block text-[#F5F0E8]/60 text-xs tracking-widest uppercase mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={form.email}
                      onChange={handleChange}
                      placeholder="john@email.com"
                      className="w-full bg-[#181818] border border-white/10 text-[#F5F0E8] placeholder-[#F5F0E8]/25 px-4 py-3.5 text-sm focus:outline-none focus:border-[#C8A951] transition-colors duration-200"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-[#F5F0E8]/60 text-xs tracking-widest uppercase mb-2">
                      Preferred Date
                    </label>
                    <input
                      type="date"
                      name="date"
                      required
                      value={form.date}
                      onChange={handleChange}
                      className="w-full bg-[#181818] border border-white/10 text-[#F5F0E8] px-4 py-3.5 text-sm focus:outline-none focus:border-[#C8A951] transition-colors duration-200 [color-scheme:dark]"
                    />
                  </div>
                  <div>
                    <label className="block text-[#F5F0E8]/60 text-xs tracking-widest uppercase mb-2">
                      Service Type
                    </label>
                    <select
                      name="service"
                      required
                      value={form.service}
                      onChange={handleChange}
                      className="w-full bg-[#181818] border border-white/10 text-[#F5F0E8] px-4 py-3.5 text-sm focus:outline-none focus:border-[#C8A951] transition-colors duration-200 appearance-none"
                    >
                      <option value="" disabled>Select a service</option>
                      {SERVICE_OPTIONS.map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="btn-gold w-full py-4 text-base mt-2 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                      Booking...
                    </span>
                  ) : (
                    <>
                      <Scissors size={16} />
                      Book Your Fresh Fade
                    </>
                  )}
                </button>
              </form>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-[#141414] border border-[#C8A951]/30 p-10 text-center"
              >
                <div className="w-16 h-16 bg-[#C8A951]/10 border border-[#C8A951]/30 flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 size={28} className="text-[#C8A951]" />
                </div>
                <h3
                  style={{ fontFamily: "'Playfair Display', serif" }}
                  className="text-[#F5F0E8] text-2xl font-bold mb-3"
                >
                  You're All Set!
                </h3>
                <p className="text-[#F5F0E8]/60 text-sm leading-relaxed">
                  Thanks! One of our barbers will confirm your appointment shortly.
                </p>
              </motion.div>
            )}
          </AnimSection>
        </div>
      </div>
    </section>
  );
}

// ─── About Section ─────────────────────────────────────────────────────────────
function AboutSection() {
  return (
    <section id="about" className="py-24 md:py-32 bg-[#0d0d0d] relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#C8A951]/30 to-transparent" />

      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image side */}
          <AnimSection>
            <div className="relative">
              <img
                src={HERO_IMG}
                alt="Barber at work"
                className="w-full object-cover"
                style={{ height: "480px" }}
              />
              {/* Gold frame accent */}
              <div className="absolute -bottom-4 -right-4 w-full h-full border-2 border-[#C8A951]/20 pointer-events-none" />
              {/* Stats overlay */}
              <div className="absolute bottom-6 left-6 bg-[#0a0a0a]/90 backdrop-blur-sm p-5 border-l-2 border-[#C8A951]">
                <p className="text-[#C8A951] text-3xl font-black" style={{ fontFamily: "'Playfair Display', serif" }}>
                  4.6★
                </p>
                <p className="text-[#F5F0E8]/60 text-xs mt-1 tracking-wide uppercase">Google Rating</p>
              </div>
            </div>
          </AnimSection>

          {/* Text side */}
          <AnimSection delay={0.2}>
            <SectionLabel text="Our Story" />
            <h2
              style={{ fontFamily: "'Playfair Display', serif" }}
              className="text-4xl md:text-5xl font-black text-[#F5F0E8] mb-8"
            >
              About
              <br />
              <span className="text-[#C8A951]">Ace of Fades</span>
            </h2>

            <div className="space-y-5 text-[#F5F0E8]/65 text-base leading-relaxed mb-10">
              <p>
                Ace of Fades is a modern barber shop offering professional men's grooming services.
                With skilled barbers and a welcoming environment, every haircut is tailored to the
                customer's style and preferences.
              </p>
              <p>
                The shop combines traditional barbering techniques with modern styling to ensure
                every client leaves feeling confident.
              </p>
            </div>

            {/* Key values */}
            <div className="grid grid-cols-2 gap-4 mb-10">
              {[
                { label: "Expert Barbers", desc: "Years of experience" },
                { label: "Clean Fades", desc: "Modern styles" },
                { label: "Friendly Atmosphere", desc: "Welcoming environment" },
                { label: "Affordable Pricing", desc: "Great value" },
              ].map((v) => (
                <div key={v.label} className="border-l border-[#C8A951]/30 pl-4">
                  <p className="text-[#F5F0E8] text-sm font-semibold">{v.label}</p>
                  <p className="text-[#F5F0E8]/45 text-xs mt-0.5">{v.desc}</p>
                </div>
              ))}
            </div>

            <GoldCTA />
          </AnimSection>
        </div>
      </div>
    </section>
  );
}

// ─── Final CTA Banner ──────────────────────────────────────────────────────────
function CTABanner() {
  return (
    <section className="py-20 md:py-28 bg-[#C8A951] relative overflow-hidden">
      {/* Pattern */}
      <div className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `repeating-linear-gradient(45deg, #000 0, #000 1px, transparent 0, transparent 50%)`,
          backgroundSize: "20px 20px",
        }}
      />
      <div className="container relative z-10 text-center">
        <AnimSection>
          <p className="text-[#0a0a0a]/60 text-xs tracking-widest uppercase mb-4 font-semibold">
            Don't Wait
          </p>
          <h2
            style={{ fontFamily: "'Playfair Display', serif" }}
            className="text-4xl md:text-6xl font-black text-[#0a0a0a] mb-6"
          >
            Ready for a Fresh Cut?
          </h2>
          <p className="text-[#0a0a0a]/65 text-lg mb-10 max-w-md mx-auto">
            Book your appointment today and walk out looking sharp.
          </p>
          <button
            className="bg-[#0a0a0a] text-[#C8A951] font-bold text-sm tracking-widest uppercase px-10 py-5 hover:bg-[#1a1a1a] transition-colors duration-200 flex items-center gap-2 mx-auto"
            onClick={() => document.getElementById("booking")?.scrollIntoView({ behavior: "smooth" })}
          >
            <Scissors size={16} />
            Book Your Fresh Fade
          </button>
        </AnimSection>
      </div>
    </section>
  );
}

// ─── Footer ────────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer className="bg-[#0a0a0a] border-t border-white/5 pt-16 pb-8">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2.5 mb-5">
              <div className="w-8 h-8 border border-[#C8A951] flex items-center justify-center">
                <Scissors size={14} className="text-[#C8A951] rotate-45" />
              </div>
              <span
                style={{ fontFamily: "'Playfair Display', serif" }}
                className="text-[#F5F0E8] font-bold text-lg"
              >
                Ace of Fades
              </span>
            </div>
            <p className="text-[#F5F0E8]/45 text-sm leading-relaxed max-w-xs">
              East London's premier barbershop. Professional grooming, clean fades, and a welcoming atmosphere.
            </p>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex items-center gap-2 text-[#F5F0E8]/40 hover:text-[#C8A951] transition-colors text-sm"
            >
              <Instagram size={16} />
              Follow on Instagram
            </a>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-[#F5F0E8] font-semibold text-sm tracking-widest uppercase mb-5">
              Contact
            </h4>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <MapPin size={14} className="text-[#C8A951] mt-0.5 flex-shrink-0" />
                <span className="text-[#F5F0E8]/50 text-sm">East London</span>
              </div>
              <div className="flex items-start gap-3">
                <Phone size={14} className="text-[#C8A951] mt-0.5 flex-shrink-0" />
                <span className="text-[#F5F0E8]/50 text-sm">Call to book</span>
              </div>
              <a
                href="https://www.google.co.uk/maps/place/Ace+of+fades/@51.5479782,0.0214767"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-3 text-[#C8A951] hover:text-[#D4B96A] transition-colors text-sm"
              >
                <MapPin size={14} className="mt-0.5 flex-shrink-0" />
                View on Google Maps
              </a>
            </div>
          </div>

          {/* Hours */}
          <div>
            <h4 className="text-[#F5F0E8] font-semibold text-sm tracking-widest uppercase mb-5">
              Opening Hours
            </h4>
            <div className="space-y-2 text-sm">
              {[
                { day: "Monday – Friday", hours: "9:00 AM – 7:00 PM" },
                { day: "Saturday", hours: "9:00 AM – 7:00 PM" },
                { day: "Sunday", hours: "10:00 AM – 5:00 PM" },
              ].map((h) => (
                <div key={h.day} className="flex justify-between gap-4">
                  <span className="text-[#F5F0E8]/50">{h.day}</span>
                  <span className="text-[#F5F0E8]/70">{h.hours}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/5 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-[#F5F0E8]/30 text-xs">
            © {new Date().getFullYear()} Ace of Fades. All rights reserved.
          </p>
          <p className="text-[#F5F0E8]/20 text-xs">East London's Premier Barbershop</p>
        </div>
      </div>
    </footer>
  );
}

// ─── Sticky CTA ────────────────────────────────────────────────────────────────
function StickyCTA() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-[#0d0d0d]/95 backdrop-blur-md border-t border-white/10 p-4"
        >
          <button
            className="btn-gold w-full py-4 text-base"
            onClick={() => document.getElementById("booking")?.scrollIntoView({ behavior: "smooth" })}
          >
            <Scissors size={16} />
            Book Your Fresh Fade
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ─── Main Page ─────────────────────────────────────────────────────────────────
export default function Home() {
  return (
    <div className="min-h-screen bg-[#111111]">
      <Navbar />
      <HeroSection />
      <ServicesSection />
      <TestimonialsSection />
      <GallerySection />
      <LocationSection />
      <BookingSection />
      <AboutSection />
      <CTABanner />
      <Footer />
      <StickyCTA />
    </div>
  );
}
