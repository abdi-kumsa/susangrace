import { useState, useEffect } from "react";
import { X, Menu } from "lucide-react";

const links = [
  { label: "Home", to: "#hero" },
  { label: "The Movement", to: "#movement" },
  { label: "The Women", to: "#ripple-effect" },
  { label: "Stories", to: "#stories" },
  { label: "About", to: "#about" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const navBg = scrolled
    ? "bg-[#FAF9F6] border-b border-[rgba(21,23,27,0.1)]"
    : "bg-transparent";
  const textColor = scrolled ? "text-[#15171B]" : "text-#15171B";
  const logoColor = scrolled ? "text-[#15171B]" : "text-#15171B";

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${navBg}`}
        style={{ height: "72px" }}
      >
        <div className="max-w-[1400px] mx-auto px-6 h-full flex items-center justify-between">
          {/* Wordmark */}
          <a href="#hero" className={`${logoColor} transition-colors duration-500 flex items-center gap-3`}>
            <img src="/9-removebg-preview.png" alt="Susan Grace" className="w-10 h-10 rounded-full object-cover border border-#15171B/10 bg-[#F3E8E3]" />
            <span
              style={{
                fontFamily: "'Inter', sans-serif",
                fontWeight: 800,
                fontSize: "1.125rem",
                letterSpacing: "0.08em",
              }}
            >
              SUSAN GRACE
            </span>
          </a>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-8">
            {links.map((l) => (
              <a
                key={l.to}
                href={l.to}
                className={`${textColor} transition-colors duration-500 hover:text-[#C51C48]`}
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 600,
                  fontSize: "0.8125rem",
                  letterSpacing: "0.05em",
                  textTransform: "uppercase",
                }}
              >
                {l.label}
              </a>
            ))}
            <a
              href="#contact"
              className="px-5 py-2 rounded-full bg-[#C51C48] text-white hover:shadow-[0_0_20px_rgba(192,44,107,0.5)] transition-all duration-300"
              style={{
                fontFamily: "'Inter', sans-serif",
                fontWeight: 600,
                fontSize: "0.8125rem",
                letterSpacing: "0.05em",
                textTransform: "uppercase",
              }}
            >
              Partner With Susan
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMenuOpen(true)}
            className={`md:hidden ${textColor} transition-colors duration-500 p-2`}
            aria-label="Open menu"
          >
            <Menu size={24} />
          </button>
        </div>
      </nav>

      {/* Full-screen mobile menu */}
      <div
        className={`fixed inset-0 z-[100] bg-[#FAF9F6] flex flex-col transition-all duration-500 ${
          menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="flex items-center justify-between px-6 h-[72px] border-b border-#15171B/10">
          <div className="flex items-center gap-3">
            <img src="/9-removebg-preview.png" alt="Susan Grace" className="w-8 h-8 rounded-full object-cover border border-#15171B/10 bg-[#F3E8E3]" />
            <span
              className="text-#15171B"
              style={{
                fontFamily: "'Inter', sans-serif",
                fontWeight: 800,
                fontSize: "1.125rem",
                letterSpacing: "0.08em",
              }}
            >
              SUSAN GRACE
            </span>
          </div>
          <button
            onClick={() => setMenuOpen(false)}
            className="text-#15171B p-2"
            aria-label="Close menu"
          >
            <X size={24} />
          </button>
        </div>
        <div className="flex-1 flex flex-col justify-center px-8 gap-2">
          {links.map((l, i) => (
            <a
              key={l.to}
              href={l.to}
              onClick={() => setMenuOpen(false)}
              className="text-#15171B/70 hover:text-#15171B py-4 border-b border-#15171B/10 transition-colors duration-200"
              style={{
                fontFamily: "'Inter', sans-serif",
                fontWeight: 800,
                fontSize: "clamp(1.75rem, 5vw, 2.5rem)",
                transitionDelay: `${i * 40}ms`,
              }}
            >
              {l.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setMenuOpen(false)}
            className="mt-8 px-6 py-4 rounded-full bg-[#C51C48] text-white text-center"
            style={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: 600,
              fontSize: "1rem",
              letterSpacing: "0.05em",
              textTransform: "uppercase",
            }}
          >
            Partner With Susan
          </a>
        </div>
        <div className="px-8 pb-8">
          <p
            className="text-#15171B/40"
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "0.75rem",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
            }}
          >
            Women of Purpose. Bold Faith. Unapologetic Self-Worth.
          </p>
        </div>
      </div>
    </>
  );
}
