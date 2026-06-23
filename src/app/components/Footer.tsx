export function Footer() {
  return (
    <footer className="bg-[#FAF9F6] text-#15171B border-t border-#15171B/10">
      <div className="max-w-[1400px] mx-auto px-6 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-6">
            <span
              style={{
                fontFamily: "'Inter', sans-serif",
                fontWeight: 800,
                fontSize: "1rem",
                letterSpacing: "0.08em",
              }}
            >
              SUSAN GRACE
            </span>
            <p
              className="text-#15171B/30 text-xs hidden md:block"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              © {new Date().getFullYear()} Susan Grace. All rights reserved.
            </p>
          </div>
          <a
            href="#contact"
            className="px-5 py-2 rounded-full border border-#15171B/20 text-#15171B/70 hover:border-[#C51C48] hover:text-[#C51C48] transition-all duration-300"
            style={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: 600,
              fontSize: "0.75rem",
              letterSpacing: "0.05em",
              textTransform: "uppercase",
            }}
          >
            Partner With Susan
          </a>
        </div>
        <p
          className="text-#15171B/30 text-xs text-center mt-6 md:hidden"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          © {new Date().getFullYear()} Susan Grace. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
