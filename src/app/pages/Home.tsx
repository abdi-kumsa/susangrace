import { useEffect, useRef, useState } from "react";
import { ArrowRight, ChevronDown, Instagram, Youtube, Linkedin, Mail } from "lucide-react";
import { motion, useScroll, useTransform, AnimatePresence } from "motion/react";
import { useForm, ValidationError } from '@formspree/react';
import { MagneticButton } from "../components/MagneticButton";
import { RevealText } from "../components/RevealText";

function TikTokIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.79 1.53V6.78a4.85 4.85 0 0 1-1.02-.09z" />
    </svg>
  );
}

// ─── Utility: useInView ───────────────────────────────────────────────────────
function useInView(threshold = 0.2) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

// ─── Count-Up hook ────────────────────────────────────────────────────────────
function useCountUp(target: number, active: boolean, duration = 2000) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!active) return;
    const start = Date.now();
    const tick = () => {
      const elapsed = Date.now() - start;
      const progress = Math.min(elapsed / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(ease * target));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [active, target, duration]);
  return count;
}

// ─── StatCard ─────────────────────────────────────────────────────────────────
function StatCard({ value, label, active }: { value: number; label: string; active: boolean }) {
  const count = useCountUp(value, active);
  const formatted = count >= 1000 ? count.toLocaleString() : count.toString();
  return (
    <div className="text-center px-6 py-8">
      <div
        className="text-[#C51C48] mb-2"
        style={{
          fontFamily: "'Inter', sans-serif",
          fontWeight: 800,
          fontSize: "clamp(1.5rem, 5vw, 3rem)",
          lineHeight: 1,
        }}
      >
        {formatted}{value > 1000 ? "+" : value === 5 ? "%" : ""}
      </div>
      <div
        className="text-#15171B/70"
        style={{
          fontFamily: "'Inter', sans-serif",
          fontWeight: 600,
          fontSize: "0.8rem",
          letterSpacing: "0.05em",
          textTransform: "uppercase",
        }}
      >
        {label}
      </div>
    </div>
  );
}

// ─── Transformation Row ────────────────────────────────────────────────────────
function TransformationRow({ from, to, active, index }: { from: string; to: string; active: boolean; index: number }) {
  return (
    <div
      className={`flex items-center gap-4 md:gap-6 py-4 md:py-5 border-b border-#15171B/5 last:border-0 transition-all duration-1000 ease-out ${active ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"}`}
      style={{ transitionDelay: `${index * 150}ms` }}
    >
      <div className="flex-1 text-right">
        <span
          style={{
            fontFamily: "'Inter', sans-serif",
            fontWeight: 800,
            fontSize: "clamp(1rem, 4vw, 1.75rem)",
            color: "rgba(21,23,27,0.3)",
          }}
        >
          {from}
        </span>
      </div>

      <div className="flex-none flex items-center justify-center w-12 h-12 rounded-full bg-[#F3E8E3] border border-#15171B/10 shadow-[0_0_15px_rgba(197,28,72,0.15)] relative">
        <div className={`absolute inset-0 rounded-full bg-[#C51C48]/20 transition-all duration-1000 ${active ? "animate-pulse opacity-100" : "opacity-0"}`} style={{ transitionDelay: `${300 + index * 100}ms` }} />
        <ArrowRight size={20} className="text-[#C51C48] relative z-10" />
      </div>

      <div className="flex-1 text-left">
        <span
          style={{
            fontFamily: "'Inter', sans-serif",
            fontWeight: 800,
            fontSize: "clamp(1rem, 4vw, 1.75rem)",
            color: "#15171B",
          }}
        >
          {to}
        </span>
      </div>
    </div>
  );
}

// ─── Community Voice Card ─────────────────────────────────────────────────────
const voices = Array.from({ length: 28 }, (_, i) => ({
  img: `/comments/${i + 1}.png`,
  rotation: (Math.random() - 0.5) * 6,
}));

function FloatingVoiceWall() {
  const [visible, setVisible] = useState<number[]>([0, 1, 3, 4, 6, 7, 8, 9, 10, 11]);
  useEffect(() => {
    const interval = setInterval(() => {
      setVisible((prev) => {
        const next = [...prev];
        const toRemove = Math.floor(Math.random() * next.length);
        let newIdx;
        do { newIdx = Math.floor(Math.random() * voices.length); }
        while (next.includes(newIdx));
        next[toRemove] = newIdx;
        return next;
      });
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative min-h-[600px] overflow-hidden flex flex-col items-center justify-center py-8" style={{ background: "#FAF9F6" }}>
      {/* Glow pulse */}
      <div
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          background: "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(192,44,107,0.15) 0%, transparent 70%)",
          animation: "glowPulse 4s ease-in-out infinite",
        }}
      />

      {/* The Text Below the Image (Faded/Blurred Background style) */}
      <div className="absolute inset-0 flex items-end pb-8 justify-center z-0 pointer-events-none">
        <h2
          className="text-center px-4"
          style={{
            fontFamily: "'Inter', sans-serif",
            fontWeight: 800,
            fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
            color: "rgba(21,23,27,0.06)",
            letterSpacing: "-0.02em",
            lineHeight: 1,
            userSelect: "none",
            filter: "blur(1px)",
          }}
        >
          THE WOMEN
        </h2>
      </div>

      {/* Center Image */}
      <div className="relative z-20 flex flex-col items-center justify-center mb-24 md:mb-32">
        <img
          src="/2-removebg.png"
          alt="Susan Grace smiling"
          className="w-full max-w-[360px] md:max-w-[550px] lg:max-w-[600px] h-auto object-contain drop-shadow-2xl relative z-10"
        />
      </div>

      {/* Floating cards */}
      <div className="absolute inset-0 z-10 pointer-events-none p-4 md:p-8">
        {voices.map((v, i) => {
          const positions = [
            { top: "8%", left: "15%" },
            { top: "10%", left: "60%" },
            { top: "35%", left: "10%" },
            { top: "40%", left: "65%" },
            { top: "65%", left: "12%" },
            { top: "60%", left: "62%" },
            { top: "15%", left: "28%" },
            { top: "20%", left: "68%" },
            { top: "75%", left: "18%" },
            { top: "78%", left: "58%" },
            { top: "50%", left: "18%" },
            { top: "45%", left: "66%" },
          ];
          const pos = positions[i % positions.length];
          const isVisible = visible.includes(i);
          return (
            <motion.div
              key={i}
              className="absolute max-w-[180px] md:max-w-[280px] transition-all duration-1000 overflow-hidden"
              style={{
                top: pos.top,
                left: pos.left,
                transform: `rotate(${v.rotation}deg)`,
                opacity: isVisible ? 1 : 0,
                boxShadow: "0 12px 40px rgba(0,0,0,0.12)",
                borderRadius: "12px",
              }}
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 4 + i % 3, repeat: Infinity, ease: "easeInOut" }}
            >
              <img src={v.img} alt="Audience comment" className="w-full h-auto object-cover" />
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

const backgroundVideos = [1, 3, 4, 5, 6, 7, 8, 9, 10, 11];

function VideoCoverflowCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % backgroundVideos.length);
    }, 3000); // Change video every 3 seconds
    return () => clearInterval(interval);
  }, []);

  const getPosition = (index: number) => {
    const total = backgroundVideos.length;
    let diff = index - activeIndex;
    if (diff > Math.floor(total / 2)) diff -= total;
    if (diff < -Math.floor(total / 2)) diff += total;
    return diff;
  };

  return (
    <div className="relative w-full max-w-[1000px] mx-auto h-[320px] sm:h-[400px] md:h-[500px] flex items-center justify-center overflow-visible mb-12">
      {backgroundVideos.map((vid, i) => {
        const diff = getPosition(i);
        const absDiff = Math.abs(diff);

        if (absDiff > 2) return null;

        const isCenter = diff === 0;
        const scale = isCenter ? 1 : absDiff === 1 ? 0.85 : 0.7;
        const zIndex = 10 - absDiff;
        const opacity = isCenter ? 1 : absDiff === 1 ? 0.6 : 0.3;

        return (
          <motion.div
            key={vid}
            className="absolute w-[160px] sm:w-[200px] md:w-[260px] aspect-[9/16] rounded-[20px] md:rounded-[32px] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.15)] bg-black"
            animate={{ x: `${diff * 80}%`, scale, zIndex, opacity }}
            transition={{ duration: 0.8, ease: [0.32, 0.72, 0, 1] }}
            style={{ zIndex }}
          >
            {/* Dark overlay for side videos */}
            {!isCenter && <div className="absolute inset-0 bg-black/20 z-10 pointer-events-none" />}
            <video
              src={`/videos/${vid}.mp4`}
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover"
            />
          </motion.div>
        );
      })}
    </div>
  );
}

// ─── Magic Image Swap Component ───────────────────────────────────────────────
function MagicImage({ images, alt, className, style, whileHover, transition }: any) {
  const ref = useRef<HTMLImageElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          setCurrentIndex((prev) => (prev + 1) % images.length);
        }
      },
      { threshold: 0 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [images.length]);

  return (
    <>
      <div className="hidden">
        {images.map((src: string) => (
          <link rel="preload" as="image" href={src} key={src} />
        ))}
      </div>
      <motion.img
        ref={ref}
        src={images[currentIndex]}
        alt={alt}
        className={className}
        style={style}
        whileHover={whileHover}
        transition={transition}
      />
    </>
  );
}

// ─── Home Page ────────────────────────────────────────────────────────────────
export function Home() {
  const { scrollYProgress } = useScroll();
  const heroImageY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const storiesImageY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  // Line-Build Reveal for hero headline
  const [heroLines, setHeroLines] = useState([false, false, false]);
  useEffect(() => {
    const timers = [
      setTimeout(() => setHeroLines([true, false, false]), 300),
      setTimeout(() => setHeroLines([true, true, false]), 700),
      setTimeout(() => setHeroLines([true, true, true]), 1100),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  // Section refs
  const statsSection = useInView(0.3);
  const movementSection = useInView(0.3);
  const beliefsSection = useInView(0.2);
  const storiesTeaser = useInView(0.2);
  const aboutTeaser = useInView(0.2);
  const workSection = useInView(0.2);
  const finalSection = useInView(0.2);
  const rippleEffectSection = useInView(0.2);

  const [state, handleSubmit] = useForm("xpqgaobq");
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    if (state.succeeded) {
      setShowSuccess(true);
      const timer = setTimeout(() => {
        window.location.reload();
      }, 8000);
      return () => clearTimeout(timer);
    }
  }, [state.succeeded]);
  const [subjectOpen, setSubjectOpen] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState("");
  const subjectOptions = [
    "Booking & Speaking",
    "Brand Partnership",
    "Media Inquiry",
    "General Message"
  ];

  const transformPairs = [
    { from: "Dreaming", to: "Doing" },
    { from: "Fear", to: "Faith" },
    { from: "Comparison", to: "Purpose" },
    { from: "Self-doubt", to: "Self-worth" },
    { from: "Waiting", to: "Action" },
  ];

  return (
    <div className="overflow-x-hidden" style={{ background: "#FAF9F6" }}>
      <style>{`
        @keyframes glowPulse {
          0%, 100% { opacity: 0.6; }
          50% { opacity: 1; }
        }
        @keyframes glowBtn {
          0%, 100% { box-shadow: 0 0 12px rgba(192,44,107,0.3); }
          50% { box-shadow: 0 0 28px rgba(192,44,107,0.7); }
        }
      `}</style>

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section
        id="hero"
        className="relative flex flex-col justify-center overflow-hidden pt-28 lg:pt-36 pb-16"
      >
        <div className="relative z-10 max-w-[1200px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Text column */}
          <div>
            {/* Eyebrow */}
            <p
              className="text-[#C51C48] mb-6"
              style={{
                fontFamily: "'Inter', sans-serif",
                fontWeight: 600,
                fontSize: "0.8rem",
                letterSpacing: "0.05em",
                textTransform: "uppercase",
              }}
            >
              Creator · Storyteller · Media Personality
            </p>

            {/* Headline — Line Build Reveal */}
            <h1
              className="text-[#15171B] mb-8 text-[clamp(2rem,5vw,4rem)] leading-[1.15] md:leading-[1.1]"
              style={{
                fontFamily: "'Inter', sans-serif",
                fontWeight: 800,
                letterSpacing: "-0.02em",
              }}
            >
              {[
                { text: "Women of Purpose.", italic: false },
                { text: "Bold Faith.", italic: true, color: "#C51C48" },
                { text: "Unapologetic Self-Worth.", italic: false }
              ].map((line, i) => (
                <span
                  key={i}
                  className="block transition-all duration-700 md:whitespace-nowrap"
                  style={{
                    opacity: heroLines[i] ? 1 : 0,
                    transform: heroLines[i] ? "translateY(0)" : "translateY(20px)",
                    transitionDelay: `${i * 50}ms`,
                    fontStyle: line.italic ? "italic" : "normal",
                    fontWeight: line.italic ? 700 : 900,
                    color: line.color || "inherit"
                  }}
                >
                  {line.text}
                </span>
              ))}
            </h1>

            <p
              className="text-[#15171B]/70 mb-10 max-w-[520px]"
              style={{ fontFamily: "'Inter', sans-serif", fontSize: "1.125rem", lineHeight: 1.6, fontWeight: 500 }}
            >
              Move beyond fear, comparison, and waiting. It's time to build the life you were created for through faith in action.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row flex-wrap gap-4 mb-10 items-start">
              <MagneticButton
                href="#ripple-effect"
                className="w-full sm:w-auto flex justify-center px-6 py-3.5 md:px-7 md:py-3.5 rounded-full bg-[#C51C48] text-white hover:shadow-[0_0_24px_rgba(192,44,107,0.5)] transition-all duration-300"
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 600,
                  fontSize: "0.875rem",
                  letterSpacing: "0.05em",
                  textTransform: "uppercase",
                }}
              >
                Meet The Women
              </MagneticButton>
              <MagneticButton
                href="#contact"
                className="w-full sm:w-auto flex justify-center px-6 py-3.5 md:px-7 md:py-3.5 rounded-full border border-#15171B/30 text-#15171B hover:border-[#C51C48] hover:text-[#C51C48] transition-all duration-300"
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 600,
                  fontSize: "0.875rem",
                  letterSpacing: "0.05em",
                  textTransform: "uppercase",
                }}
              >
                Partner With Susan
              </MagneticButton>
            </div>


          </div>

          {/* Hero Image */}
          <div className="relative flex justify-center lg:justify-end items-end w-full h-full min-h-[400px]">
            {/* Glow behind the image */}
            <div
              className="absolute w-[120%] h-[120%] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-0"
              style={{
                background: "radial-gradient(circle at 50% 50%, rgba(192,44,107,0.15) 0%, transparent 60%)",
              }}
            />
            <MagicImage
              style={{ y: heroImageY }}
              images={["/6-removebg.png", "/10-removebg.png"]}
              alt="Susan Grace"
              className="relative z-10 w-full h-auto max-w-[400px] lg:max-w-[500px] object-contain drop-shadow-2xl lg:translate-x-12"
            />
          </div>
        </div>

        {/* Hero supporting statement */}
        <div className="relative z-10 max-w-[1200px] mx-auto px-6 pb-16">
          <div className="border-t border-#15171B/10 pt-10 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 text-#15171B/70 text-sm" style={{ fontFamily: "'Inter', sans-serif" }}>
            {["Women are starting businesses.", "Applying for opportunities.", "Activating forgotten dreams.", "Rebuilding confidence.", "Trusting God again.", "And most importantly, taking the first step."].map((item) => (
              <div key={item} className="flex items-start gap-2">
                <span className="text-[#C51C48] mt-0.5">—</span>
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-#15171B/40 animate-bounce">
          <ChevronDown size={24} />
        </div>
      </section>

      {/* ── WHAT SUSAN BELIEVES ──────────────────────────────────────────── */}
      <section id="beliefs" ref={beliefsSection.ref} style={{ background: "#FAF9F6" }} className="py-20 md:py-32 px-6">
        <div className={`max-w-[1200px] mx-auto transition-all duration-[1200ms] ease-out ${beliefsSection.inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-16"}`}>
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-20 mt-8">
            {/* Left: The declarative statements */}
            <div className="lg:w-6/12">
              <p
                className="text-[#C51C48] mb-6"
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 600,
                  fontSize: "0.75rem",
                  letterSpacing: "0.05em",
                  textTransform: "uppercase",
                }}
              >
                What Susan Believes
              </p>
              <RevealText
                text="Faith builds. Faith creates. Faith leads."
                className="text-[#15171B] mb-8 md:mb-10 max-w-[700px] text-[clamp(2rem,5vw,3.5rem)] leading-[1.1]"
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 800,
                  lineHeight: 1,
                  letterSpacing: "-0.02em",
                }}
              />
              
              <div className="space-y-8">
                <div className="w-12 h-px bg-[#15171B]/10"></div>
                <div>
                  <p
                    className="text-[#15171B]/70 text-[clamp(1.125rem,1.5vw,1.25rem)] leading-relaxed"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    For years, women have been told to lower their expectations, stay realistic, and remain comfortable. Susan offers a different invitation: <strong className="text-[#C51C48]">to dream, imagine, ask boldly, build courageously, and become the woman they were created to be.</strong>
                  </p>
                </div>
              </div>
            </div>

            {/* Right: The big quote card */}
            <div className="lg:w-5/12 w-full relative p-8 md:p-12 rounded-[2rem] shadow-[0_20px_60px_rgba(0,0,0,0.03)] border border-white/60 bg-gradient-to-br from-white/90 to-[#F3E8E3]/60 backdrop-blur-md">
              <div className="text-[#C51C48]/20 mb-8">
                <svg width="64" height="64" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
              </div>
              <blockquote
                className="text-[clamp(1.5rem,3.5vw,2.5rem)] text-[#15171B] mb-10"
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 800,
                  lineHeight: 1.2,
                  letterSpacing: "-0.02em",
                }}
              >
                "What happened to your imagination?"
              </blockquote>
              <div className="flex items-center gap-5">
                <div className="w-14 h-14 rounded-full overflow-hidden border border-[#15171B]/10">
                  <img src="/9-removebg-preview.png" alt="Susan Grace" className="w-full h-full object-cover bg-[#F3E8E3]" />
                </div>
                <div>
                  <p
                    className="text-[#15171B]"
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontWeight: 800,
                      fontSize: "0.875rem",
                      letterSpacing: "0.05em",
                      textTransform: "uppercase",
                    }}
                  >
                    Susan Grace
                  </p>
                  <p
                    className="text-[#15171B]/40 mt-1"
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontWeight: 600,
                      fontSize: "0.65rem",
                      letterSpacing: "0.05em",
                      textTransform: "uppercase",
                    }}
                  >
                    Creator & Speaker
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── THE MOVEMENT ─────────────────────────────────────────────────── */}
      <section id="movement" ref={movementSection.ref} style={{ background: "#FAF9F6" }} className="py-20 md:py-32 px-6">
        <div className="max-w-[1200px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center mb-16 md:mb-24">
            <div className="order-2 lg:order-2">
              <p
                className="text-[#C51C48] mb-6"
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 600,
                  fontSize: "0.75rem",
                  letterSpacing: "0.05em",
                  textTransform: "uppercase",
                }}
              >
                The Movement
              </p>
              <RevealText
                text="More Than Content. A Movement Of Women Choosing To Rise."
                className="text-#15171B mb-6 md:mb-8 max-w-[700px] text-[clamp(2rem,6vw,3.5rem)] leading-[1.1]"
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 800,
                  lineHeight: 1,
                  letterSpacing: "-0.02em",
                }}
              />
              <p className="text-#15171B/70 mb-6 max-w-[640px]" style={{ fontFamily: "'Inter', sans-serif", fontSize: "1.0625rem", lineHeight: 1.7 }}>
                What began as short-form videos through powerful storytelling, biblical principles, provocative questions, and honest conversations, has built a trusted platform where women are encouraged not only to believe think differently, believe differently but to act differently.
              </p>
              <p className="text-#15171B/70 mb-16 max-w-[640px]" style={{ fontFamily: "'Inter', sans-serif", fontSize: "1.0625rem", lineHeight: 1.7 }}>
                Every day women engage with Susan's content not simply because it inspires them, but because it challenges them.
              </p>

              {/* Word Morph pairs */}
              <div className="max-w-[640px]">
                <p
                  className="text-#15171B/40 mb-6"
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontWeight: 600,
                    fontSize: "0.75rem",
                    letterSpacing: "0.05em",
                    textTransform: "uppercase",
                  }}
                >
                  Her works centers on helping women move from:
                </p>
                <div className="relative overflow-hidden" style={{ minHeight: "40px" }}>
                  {transformPairs.map((pair, i) => (
                    <TransformationRow
                      key={i}
                      index={i}
                      from={pair.from}
                      to={pair.to}
                      active={movementSection.inView}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Left Column: Image */}
            <div className={`relative transition-all duration-[1200ms] delay-300 ease-out flex justify-center lg:justify-start order-1 lg:order-1 ${movementSection.inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-16"}`}>
              <MagicImage
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.8 }}
                images={["/7-removebg.png", "/5-removebg.png"]}
                alt="Susan Grace Movement"
                className="w-full h-auto object-contain max-h-[800px] drop-shadow-2xl scale-110 lg:scale-[1.35] lg:-ml-16 origin-bottom lg:origin-bottom-left relative z-10"
              />
            </div>
          </div>

          {/* Stats */}
          <div ref={statsSection.ref} className="grid grid-cols-2 lg:grid-cols-4 border border-#15171B/10">
            <StatCard value={170394} label="Community Members" active={statsSection.inView} />
            <StatCard value={5} label="Engagement Rate %" active={statsSection.inView} />
            <StatCard value={1000} label="Monthly Conversations" active={statsSection.inView} />
            <div className="text-center px-6 py-8">
              <div
                className="text-[#C51C48] mb-2"
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 800,
                  fontSize: "clamp(1.5rem, 3vw, 2.5rem)",
                  lineHeight: 1,
                }}
              >
                Across Africa
              </div>
              <div
                className="text-#15171B/70"
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 600,
                  fontSize: "0.8rem",
                  letterSpacing: "0.05em",
                  textTransform: "uppercase",
                }}
              >
                And Beyond
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── THE RIPPLE EFFECT — Community Voices ─────────────────────────── */}
      <section id="ripple-effect" ref={rippleEffectSection.ref} style={{ background: "#FAF9F6" }}>
        <div className={`max-w-[1400px] mx-auto px-6 pt-8 pb-16 transition-all duration-[1200ms] ease-out ${rippleEffectSection.inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-16"}`}>
          <p
            className="text-[#C51C48] mb-4"
            style={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: 600,
              fontSize: "0.75rem",
              letterSpacing: "0.05em",
              textTransform: "uppercase",
            }}
          >
            The Ripple Effect
          </p>
          <p className="text-#15171B/50 max-w-[560px] mb-2" style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.9375rem", lineHeight: 1.65 }}>
            These are not testimonials. They are moments. Promises. Declarations. The beginning of someone's next chapter.
          </p>
        </div>
        <FloatingVoiceWall />
        <div className="max-w-[1400px] mx-auto px-6 pt-10 pb-16 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <p className="text-#15171B/60 max-w-[500px]" style={{ fontFamily: "'Inter', sans-serif", fontSize: "1rem", lineHeight: 1.65 }}>
            Every message represents a woman choosing to believe again. And then choosing to act.
          </p>
        </div>
      </section>

      {/* ── THE STORIES teaser ───────────────────────────────────────────── */}
      <section id="stories" ref={storiesTeaser.ref} style={{ background: "#F3E8E3" }} className="py-20 md:py-32 px-6">
        <div className={`max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center transition-all duration-[1200ms] ease-out ${storiesTeaser.inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-16"}`}>
          <div>
            <p
              className="text-[#C51C48] mb-6"
              style={{
                fontFamily: "'Inter', sans-serif",
                fontWeight: 600,
                fontSize: "0.75rem",
                letterSpacing: "0.05em",
                textTransform: "uppercase",
              }}
            >
              The Stories
            </p>
            <h2
              className="text-[#15171B] mb-6 md:mb-8 text-[clamp(2rem,6vw,4rem)] leading-[1.1]"
              style={{
                fontFamily: "'Inter', sans-serif",
                fontWeight: 800,
                lineHeight: 1,
                letterSpacing: "-0.02em",
              }}
            >
              Women Building The Future
            </h2>
            <p className="text-[#15171B]/70 max-w-[640px] mb-6" style={{ fontFamily: "'Inter', sans-serif", fontSize: "1.0625rem", lineHeight: 1.7 }}>
              Susan is now expanding her work beyond personal content and into long-form storytelling. Through interviews, documentaries, conversations, and original media projects, she is documenting women who are building extraordinary lives and creating meaningful impact.
            </p>
            <div className="flex flex-wrap gap-3 mb-10">
              {["Founders.", "CEOs.", "Creators.", "Community builders.", "Educators.", "Innovators.", "Billionaires.", "Multi-millionaires."].map((t) => (
                <span
                  key={t}
                  className="px-3 py-1 border border-[#C51C48]/30 text-[#C51C48]"
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontWeight: 600,
                    fontSize: "0.75rem",
                    letterSpacing: "0.05em",
                    textTransform: "uppercase",
                  }}
                >
                  {t.replace(".", "")}
                </span>
              ))}
            </div>
            <p className="text-[#15171B]/70 max-w-[640px] mb-8" style={{ fontFamily: "'Inter', sans-serif", fontSize: "1.0625rem", lineHeight: 1.7 }}>
              These women did not inherit permission. They created it. They built industries. Created jobs. Transformed industries. Generated wealth. And redefined what is possible for the next generation of women.
            </p>
            <div className="flex flex-wrap gap-4">
              <MagneticButton
                href="#contact"
                className="px-6 py-3 rounded-full bg-[#C51C48] text-white hover:shadow-[0_0_20px_rgba(192,44,107,0.4)] transition-all duration-300"
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 600,
                  fontSize: "0.875rem",
                  letterSpacing: "0.05em",
                  textTransform: "uppercase",
                }}
              >
                Nominate A Woman
              </MagneticButton>
              <MagneticButton
                href="#contact"
                className="px-6 py-3 rounded-full border border-[#15171B]/30 text-[#15171B] hover:border-[#C51C48] hover:text-[#C51C48] transition-all duration-300"
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 600,
                  fontSize: "0.875rem",
                  letterSpacing: "0.05em",
                  textTransform: "uppercase",
                }}
              >
                Become A Guest
              </MagneticButton>
            </div>
          </div>
          <div className="relative w-full aspect-[4/5] md:aspect-square lg:aspect-[4/5] overflow-hidden rounded-2xl shadow-2xl">
            <motion.img
              style={{ y: storiesImageY }}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.8 }}
              src="/3.jfif"
              alt="The Stories"
              className="w-full h-[120%] -top-[10%] relative object-cover"
            />
          </div>
        </div>
      </section>

      {/* ── WORK WITH SUSAN teaser ───────────────────────────────────────── */}
      <section id="work" ref={workSection.ref} style={{ background: "#FAF9F6" }} className="py-20 md:py-32 px-6">
        <div className={`max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center transition-all duration-[1200ms] ease-out ${workSection.inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-16"}`}>
          <div>
            <p
              className="text-[#C51C48] mb-6"
              style={{
                fontFamily: "'Inter', sans-serif",
                fontWeight: 600,
                fontSize: "0.75rem",
                letterSpacing: "0.05em",
                textTransform: "uppercase",
              }}
            >
              Work With Susan
            </p>
            <h2
              className="text-[#15171B] mb-6 md:mb-8 text-[clamp(2rem,6vw,3.5rem)] leading-[1.1]"
              style={{
                fontFamily: "'Inter', sans-serif",
                fontWeight: 800,
                lineHeight: 1,
                letterSpacing: "-0.02em",
              }}
            >
              Bring Susan Into The Conversation
            </h2>
            <p className="text-[#15171B]/70 mb-10" style={{ fontFamily: "'Inter', sans-serif", fontSize: "1rem", lineHeight: 1.7 }}>
              Susan collaborates with organizations, brands, conferences, institutions, communities, and media platforms committed to advancing women, leadership, entrepreneurship, faith, education, and social impact.
            </p>
            <MagneticButton
              href="#contact"
              className="inline-flex items-center gap-3 px-7 py-3.5 rounded-full bg-[#C51C48] text-white hover:shadow-[0_0_24px_rgba(192,44,107,0.4)] transition-all duration-300"
              style={{
                fontFamily: "'Inter', sans-serif",
                fontWeight: 600,
                fontSize: "0.875rem",
                letterSpacing: "0.05em",
                textTransform: "uppercase",
              }}
            >
              Partner With Susan <ArrowRight size={16} />
            </MagneticButton>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {[
              "Keynote Speaking",
              "Moderating & Hosting",
              "Interviews & Storytelling",
              "Brand Partnerships",
              "Women's Leadership Events",
              "Documentary & Media",
              "Corporate Conversations",
              "Community Engagement",
            ].map((item, i) => (
              <div
                key={i}
                className="p-4 border border-[#15171B]/10 bg-white transition-all duration-300 hover:border-[#C51C48]/30 hover:bg-[#F3E8E3]"
                style={{
                  opacity: workSection.inView ? 1 : 0,
                  transform: workSection.inView ? "translateY(0)" : "translateY(16px)",
                  transitionDelay: `${i * 60}ms`,
                }}
              >
                <p
                  className="text-[#15171B]"
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "0.875rem",
                    fontWeight: 500,
                    lineHeight: 1.4,
                  }}
                >
                  {item}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ABOUT SUSAN teaser ───────────────────────────────────────────── */}
      <section id="about" ref={aboutTeaser.ref} style={{ background: "#FAF9F6" }} className="py-20 md:py-32 px-6">
        <div className={`max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center transition-all duration-[1200ms] ease-out ${aboutTeaser.inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-16"}`}>
          {/* About Image */}
          <div className="relative flex justify-center w-full max-w-[500px] h-[500px] items-end mx-auto lg:mx-0">
            {/* Glow behind the image */}
            <div
              className="absolute w-[120%] h-[120%] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-0"
              style={{
                background: "radial-gradient(circle at 50% 50%, rgba(192,44,107,0.12) 0%, transparent 60%)",
              }}
            />
            <MagicImage
              images={["/4-removebg.png", "/1-removebg.png"]}
              alt="Susan Grace"
              className="relative z-10 w-full h-full object-contain drop-shadow-2xl lg:scale-110 origin-bottom"
            />
          </div>

          <div>
            <p
              className="text-[#C51C48] mb-6"
              style={{
                fontFamily: "'Inter', sans-serif",
                fontWeight: 600,
                fontSize: "0.75rem",
                letterSpacing: "0.05em",
                textTransform: "uppercase",
              }}
            >
              About Susan
            </p>
            <h2
              className="text-#15171B mb-6 md:mb-8 text-[clamp(2rem,6vw,3.5rem)] leading-[1.1]"
              style={{
                fontFamily: "'Inter', sans-serif",
                fontWeight: 800,
                lineHeight: 1,
                letterSpacing: "-0.02em",
              }}
            >
              Meet Susan Grace
            </h2>
            <p className="text-#15171B/70 mb-6" style={{ fontFamily: "'Inter', sans-serif", fontSize: "1.0625rem", lineHeight: 1.7 }}>
              Susan Grace is a creator, storyteller, speaker, and media personality leading one of the most compelling conversations around purpose, bold faith, and unapologetic self-worth for women in Africa.
            </p>
            <p className="text-#15171B/70 mb-6" style={{ fontFamily: "'Inter', sans-serif", fontSize: "1.0625rem", lineHeight: 1.7 }}>
              Known for her thought-provoking insights and ability to challenge limiting beliefs, Susan has built a deeply engaged community of women who trust her voice because she speaks to both their aspirations and their reality.
            </p>
            <p className="text-#15171B/60 mb-10" style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.9375rem", lineHeight: 1.7 }}>
              Her work sits at the intersection of faith, purpose, identity, leadership, and action. She believes that dreaming is powerful — but faith becomes transformational when it moves from belief into action.
            </p>

          </div>
        </div>
      </section>

      {/* ── FINAL — Join Community ─────────────────────────────────────────── */}
      <section id="join" ref={finalSection.ref} style={{ background: "#FAF9F6" }} className="relative py-20 md:py-32 px-6 border-t border-#15171B/10 overflow-hidden flex flex-col items-center justify-center">
        
        <VideoCoverflowCarousel />

        <div className={`relative z-10 max-w-[700px] mx-auto text-center mt-12 transition-all duration-[1200ms] ease-out ${finalSection.inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-16"}`}>
          <h2
            className="text-#15171B mb-10 text-[clamp(2.5rem,6vw,4rem)] leading-[1.1]"
            style={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: 800,
              lineHeight: 1,
              letterSpacing: "-0.02em",
            }}
          >
            Join the community.
          </h2>

          <div className="flex justify-center items-center gap-8 py-6">
            {[
              { icon: <Instagram size={36} strokeWidth={2} />, label: "Instagram", href: "https://www.instagram.com/susangrace_ke/" },
              { icon: <TikTokIcon size={36} />, label: "TikTok", href: "https://www.tiktok.com/@susangrace_ke" },
              { icon: <Youtube size={36} strokeWidth={2} />, label: "YouTube", href: "https://www.youtube.com/@susangrace_ke" },
              { icon: <Linkedin size={36} strokeWidth={2} />, label: "LinkedIn", href: "https://www.linkedin.com/in/susangrace-ke" },
              { icon: <Mail size={36} strokeWidth={2} />, label: "Email", href: "https://mail.google.com/mail/?view=cm&fs=1&to=meetsusangrace@gmail.com" },
            ].map((s) => (
              <a
                key={s.label}
                href={s.href}
                target={s.href.startsWith("mailto:") ? "_self" : "_blank"}
                rel="noopener noreferrer"
                aria-label={s.label}
                className="text-#15171B hover:text-[#C51C48] transition-all duration-300 hover:scale-110"
              >
                {s.icon}
              </a>
            ))}
          </div>

          <p
            className="mt-12 text-#15171B/40"
            style={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: 700,
              fontSize: "0.75rem",
              letterSpacing: "0.05em",
              textTransform: "uppercase",
            }}
          >
            Women of Purpose. Bold Faith. Unapologetic Self-Worth.
          </p>
        </div>
      </section>

      {/* ── CONTACT FORM ─────────────────────────────────────────────────── */}
      <section id="contact" className="py-16 md:py-20 px-6" style={{ background: "#F3E8E3" }}>
        <div className="max-w-[800px] mx-auto">
          <div className="text-center mb-12">
            <p
              className="text-[#C51C48] mb-4"
              style={{
                fontFamily: "'Inter', sans-serif",
                fontWeight: 600,
                fontSize: "0.75rem",
                letterSpacing: "0.05em",
                textTransform: "uppercase",
              }}
            >
              Get In Touch
            </p>
            <h2
              className="text-[#15171B] mb-6"
              style={{
                fontFamily: "'Inter', sans-serif",
                fontWeight: 800,
                fontSize: "clamp(2rem, 5vw, 3.5rem)",
                lineHeight: 1,
                letterSpacing: "-0.02em",
              }}
            >
              Start The Conversation
            </h2>
            <p className="text-#15171B/70" style={{ fontFamily: "'Inter', sans-serif", fontSize: "1.0625rem", lineHeight: 1.7 }}>
              Whether you want to partner on a project, book Susan for a speaking engagement, or simply share your story, we'd love to hear from you.
            </p>
          </div>

          <AnimatePresence mode="wait">
            {showSuccess ? (
              <motion.div
                key="success-anim"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="relative flex flex-col items-center justify-center mt-12 w-full max-w-[600px] h-[300px] mx-auto overflow-hidden"
              >
                {/* Phase 1: The Launch (Tracing Lines) */}
                <motion.div
                  initial={{ width: 0, opacity: 1, left: 0 }}
                  animate={{ width: "50%", opacity: 0 }}
                  transition={{ duration: 0.6, ease: "easeIn" }}
                  className="absolute top-1/2 h-[2px] bg-[#C51C48]"
                  style={{ y: "-50%", originX: 1 }}
                />
                <motion.div
                  initial={{ width: 0, opacity: 1, right: 0 }}
                  animate={{ width: "50%", opacity: 0 }}
                  transition={{ duration: 0.6, ease: "easeIn" }}
                  className="absolute top-1/2 h-[2px] bg-[#C51C48]"
                  style={{ y: "-50%", originX: 0 }}
                />

                {/* Phase 2: The Bloom (Ripple Impact) */}
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 20, opacity: [0, 1, 0] }}
                  transition={{ delay: 0.6, duration: 1.2, ease: "easeOut" }}
                  className="absolute top-1/2 left-1/2 w-8 h-8 bg-gradient-to-r from-[#F3E8E3] to-[#C51C48]/20 rounded-full blur-sm"
                  style={{ x: "-50%", y: "-50%" }}
                />
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 12, opacity: [0, 0.4, 0] }}
                  transition={{ delay: 0.7, duration: 1.5, ease: "easeOut" }}
                  className="absolute top-1/2 left-1/2 w-12 h-12 border border-[#C51C48] rounded-full blur-[1px]"
                  style={{ x: "-50%", y: "-50%" }}
                />

                {/* Phase 3: The Reveal (Text) */}
                <motion.div
                  initial={{ opacity: 0, y: 20, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ delay: 1.0, duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
                  className="relative z-10 flex flex-col items-center text-center"
                >
                  <div className="text-[#C51C48] mb-2">
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                      <polyline points="22 4 12 14.01 9 11.01"></polyline>
                    </svg>
                  </div>
                  <h3 className="text-[#15171B] font-bold text-[clamp(2rem,4vw,3rem)] leading-tight tracking-tight">Boom! Sent.</h3>
                  <p className="text-[#15171B]/70 font-medium text-lg mt-2">Your message is securely on its way.</p>
                </motion.div>
              </motion.div>
            ) : (
            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-8 md:gap-12 mt-12 max-w-[600px] mx-auto"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                <div className="relative">
                  <input type="text" placeholder="First Name" name="firstName" required className="w-full bg-transparent border-b border-[#15171B]/20 py-3 text-[#15171B] placeholder-[#15171B]/40 focus:border-[#C51C48] focus:outline-none transition-colors rounded-none" style={{ fontFamily: "'Inter', sans-serif" }} />
                  <ValidationError field="firstName" prefix="First Name" errors={state.errors} />
                </div>
                <div className="relative">
                  <input type="text" placeholder="Last Name" name="lastName" required className="w-full bg-transparent border-b border-[#15171B]/20 py-3 text-[#15171B] placeholder-[#15171B]/40 focus:border-[#C51C48] focus:outline-none transition-colors rounded-none" style={{ fontFamily: "'Inter', sans-serif" }} />
                  <ValidationError field="lastName" prefix="Last Name" errors={state.errors} />
                </div>
              </div>
              <div className="relative">
                <input type="email" placeholder="Email Address" name="email" required className="w-full bg-transparent border-b border-[#15171B]/20 py-3 text-[#15171B] placeholder-[#15171B]/40 focus:border-[#C51C48] focus:outline-none transition-colors rounded-none" style={{ fontFamily: "'Inter', sans-serif" }} />
                <ValidationError field="email" prefix="Email" errors={state.errors} />
              </div>
              <div className="relative">
                <input type="hidden" name="subject" value={selectedSubject} required />
                <div 
                  className={`w-full bg-transparent border-b py-3 focus:outline-none transition-colors cursor-pointer flex items-center justify-between ${selectedSubject ? 'text-[#15171B]' : 'text-[#15171B]/40'} ${subjectOpen ? 'border-[#C51C48]' : 'border-[#15171B]/20'}`}
                  style={{ fontFamily: "'Inter', sans-serif" }}
                  onClick={() => setSubjectOpen(!subjectOpen)}
                >
                  <span>{selectedSubject || "Subject"}</span>
                  <ChevronDown size={18} className={`transition-transform duration-300 text-[#15171B]/40 ${subjectOpen ? 'rotate-180' : ''}`} />
                </div>
                
                {subjectOpen && (
                  <div className="absolute top-full left-0 w-full mt-1 bg-white border border-[#15171B]/5 rounded-xl shadow-[0_8px_30px_rgba(0,0,0,0.06)] z-50 overflow-hidden" style={{ fontFamily: "'Inter', sans-serif" }}>
                    {subjectOptions.map((option, idx) => (
                      <div 
                        key={idx}
                        className="px-5 py-3.5 text-[#15171B] hover:bg-[#F3E8E3]/50 hover:text-[#C51C48] transition-colors cursor-pointer text-[0.95rem]"
                        onClick={() => {
                          setSelectedSubject(option);
                          setSubjectOpen(false);
                        }}
                      >
                        {option}
                      </div>
                    ))}
                  </div>
                )}
                <ValidationError field="subject" prefix="Subject" errors={state.errors} />
              </div>
              <div className="relative">
                <textarea placeholder="Message" name="message" rows={4} required className="w-full bg-transparent border-b border-[#15171B]/20 py-3 text-[#15171B] placeholder-[#15171B]/40 focus:border-[#C51C48] focus:outline-none transition-colors resize-none rounded-none" style={{ fontFamily: "'Inter', sans-serif" }}></textarea>
                <ValidationError field="message" prefix="Message" errors={state.errors} />
              </div>
              <MagneticButton
                type="submit"
                disabled={state.submitting}
                className="mt-6 px-10 py-4 rounded-full bg-[#15171B] text-white hover:bg-[#C51C48] hover:shadow-[0_0_24px_rgba(192,44,107,0.3)] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 w-fit mx-auto flex items-center justify-center"
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 600,
                  fontSize: "0.875rem",
                  letterSpacing: "0.05em",
                  textTransform: "uppercase",
                }}
              >
                {state.submitting ? "Sending..." : "Send Message"}
              </MagneticButton>
            </form>
            )}
          </AnimatePresence>
        </div>
      </section>
    </div>
  );
}
