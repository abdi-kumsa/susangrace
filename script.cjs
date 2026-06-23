const fs = require('fs');

try {
  let home = fs.readFileSync('src/app/pages/Home.tsx', 'utf8');

  // 1. Add rounded corners to buttons & inputs (px-7, px-6, px-5, etc)
  home = home.replace(/bg-\[#C51C48\] text-white/g, 'rounded-full bg-[#C51C48] text-white');
  home = home.replace(/border border-white\/30 text-white/g, 'rounded-full border border-white/30 text-white');
  home = home.replace(/border border-white\/20 text-white/g, 'rounded-full border border-white/20 text-white');
  home = home.replace(/border border-\[#15171B\]\/30 text-\[#15171B\]/g, 'rounded-full border border-[#15171B]/30 text-[#15171B]');
  home = home.replace(/px-5 py-4 bg-white\/06 border/g, 'rounded-xl px-5 py-4 bg-white/06 border');
  home = home.replace(/px-5 py-4 border border-white\/15/g, 'rounded-xl px-5 py-4 border border-white/15');
  home = home.replace(/className="absolute p-6 max-w-\[400px\]/g, 'className="absolute p-6 max-w-[400px] rounded-2xl');
  home = home.replace(/className="bg-\[#1A1C20\] p-6 max-w-\[500px\]/g, 'className="bg-[#1A1C20] p-6 max-w-[500px] rounded-2xl');

  // Add animation classes
  const sections = [
    { ref: 'beliefsSection', match: 'max-w-[1200px] mx-auto' },
    { ref: 'movementSection', match: 'max-w-[1200px] mx-auto grid' },
    { ref: 'storiesTeaser', match: 'max-w-[1200px] mx-auto' },
    { ref: 'workSection', match: 'max-w-[1200px] mx-auto grid' },
    { ref: 'aboutTeaser', match: 'max-w-[1200px] mx-auto grid' },
    { ref: 'finalSection', match: 'max-w-[700px] mx-auto text-center' }
  ];

  sections.forEach(sec => {
    const escapedMatch = sec.match.replace(/\[/g, '\\[').replace(/\]/g, '\\]');
    const regex = new RegExp('<section [^>]*ref={' + sec.ref + '\\.ref}[^>]*>[\\s\\S]*?<div className="(' + escapedMatch + '[^"]*)"');
    const match = home.match(regex);
    if (match) {
      const fullMatch = match[0];
      const classStr = match[1];
      const repl = fullMatch.replace('className="' + classStr + '"', 'className={`' + classStr + ' transition-all duration-[1200ms] ease-out ${' + sec.ref + '.inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-16"}`}');
      home = home.replace(fullMatch, repl);
    }
  });

  // Ripple effect section
  if (!home.includes('rippleEffectSection = useInView')) {
    home = home.replace('const finalSection = useInView(0.2);', 'const finalSection = useInView(0.2);\n  const rippleEffectSection = useInView(0.2);');
    home = home.replace('<section id="ripple-effect" style={{ background: "#15171B" }}>', '<section id="ripple-effect" ref={rippleEffectSection.ref} style={{ background: "#15171B" }}>');
    home = home.replace('<div className="max-w-[1400px] mx-auto px-6 pt-8 pb-16">', '<div className={`max-w-[1400px] mx-auto px-6 pt-8 pb-16 transition-all duration-[1200ms] ease-out ${rippleEffectSection.inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-16"}`}>');
  }

  home = home.replace('className="relative aspect-[4/5] w-full max-w-[440px]"', 'className="relative aspect-[4/5] w-full max-w-[440px] rounded-2xl overflow-hidden"');

  fs.writeFileSync('src/app/pages/Home.tsx', home);
  console.log("Home.tsx updated");

  // Nav & Footer
  let nav = fs.readFileSync('src/app/components/Nav.tsx', 'utf8');
  nav = nav.replace(/bg-\[#C51C48\] text-white/g, 'rounded-full bg-[#C51C48] text-white');
  fs.writeFileSync('src/app/components/Nav.tsx', nav);

  let footer = fs.readFileSync('src/app/components/Footer.tsx', 'utf8');
  footer = footer.replace(/border border-white\/20 text-white\/60/g, 'rounded-full border border-white/20 text-white/60');
  fs.writeFileSync('src/app/components/Footer.tsx', footer);

  console.log("Nav and Footer updated");

} catch (err) {
  console.error("Error:", err);
}
