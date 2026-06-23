const fs = require('fs');

try {
  const files = ['src/app/pages/Home.tsx', 'src/app/components/Nav.tsx', 'src/app/components/Footer.tsx'];

  files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');

    // 1. Protect buttons that must keep white text
    content = content.replace(/bg-\[#C51C48\] text-white/g, 'bg-[#C51C48] TEXT_WHITE_TEMP');
    content = content.replace(/text-white hover:shadow/g, 'TEXT_WHITE_TEMP hover:shadow');
    content = content.replace(/<span\s+className="px-2 py-1 bg-\[#C51C48\] text-white/g, '<span className="px-2 py-1 bg-[#C51C48] TEXT_WHITE_TEMP');
    content = content.replace(/<ArrowRight size={16} \/>/g, '<ArrowRight size={16} />'); // no text color change needed here usually

    // 2. Protect original Dark Charcoal hex from being turned into light bg
    content = content.replace(/#15171B/g, 'DARK_TEMP');

    // 3. Swap Backgrounds
    content = content.replace(/bg-\[DARK_TEMP\]/g, 'bg-[#FAF9F6]');
    content = content.replace(/bg-\[#1A1C20\]/g, 'bg-[#F3E8E3]');
    content = content.replace(/bg-\[#F2F0EE\]/g, 'bg-[#FAF9F6]');
    content = content.replace(/bg-\[#FBEAEE\]/g, 'bg-[#F3E8E3]');
    content = content.replace(/background: "DARK_TEMP"/g, 'background: "#FAF9F6"');
    content = content.replace(/background: "#F2F0EE"/g, 'background: "#FAF9F6"');
    content = content.replace(/background: "#FBEAEE"/g, 'background: "#F3E8E3"');

    // 4. Swap Text Colors (White -> Dark)
    content = content.replace(/text-white\/70/g, 'text-DARK_TEMP/70');
    content = content.replace(/text-white\/60/g, 'text-DARK_TEMP/70');
    content = content.replace(/text-white\/50/g, 'text-DARK_TEMP/60');
    content = content.replace(/text-white\/40/g, 'text-DARK_TEMP/50');
    content = content.replace(/text-white\/30/g, 'text-DARK_TEMP/40');
    content = content.replace(/text-white\/25/g, 'text-DARK_TEMP/30');
    content = content.replace(/text-white\/20/g, 'text-DARK_TEMP/30');
    content = content.replace(/text-white\/10/g, 'text-DARK_TEMP/20');
    content = content.replace(/text-white/g, 'text-DARK_TEMP');

    // 5. Swap Borders
    content = content.replace(/border-white\/30/g, 'border-DARK_TEMP/30');
    content = content.replace(/border-white\/20/g, 'border-DARK_TEMP/20');
    content = content.replace(/border-white\/15/g, 'border-DARK_TEMP/15');
    content = content.replace(/border-white\/10/g, 'border-DARK_TEMP/10');
    content = content.replace(/border-white\/5/g, 'border-DARK_TEMP/5');

    // 6. Inline style colors
    content = content.replace(/color: "rgba\(242,240,238,0\.06\)"/g, 'color: "rgba(21,23,27,0.04)"');
    content = content.replace(/color: "rgba\(242,240,238,0\.4\)"/g, 'color: "rgba(21,23,27,0.5)"');
    content = content.replace(/color: "rgba\(255,255,255,0\.2\)"/g, 'color: "rgba(21,23,27,0.3)"');
    content = content.replace(/color: "#FFFFFF"/g, 'color: "DARK_TEMP"');
    content = content.replace(/color: "#F2F0EE"/g, 'color: "DARK_TEMP"');
    
    // 7. Inputs
    content = content.replace(/bg-white\/06/g, 'bg-DARK_TEMP/5');
    content = content.replace(/background: "rgba\(255,255,255,0\.04\)"/g, 'background: "rgba(21,23,27,0.04)"');

    // 8. Gradients & Specifics
    content = content.replace(/rgba\(10,15,47,0\.5\)/g, 'rgba(192,44,107,0.02)'); // About image

    // 9. Restore placeholders
    content = content.replace(/TEXT_WHITE_TEMP/g, 'text-white');
    content = content.replace(/DARK_TEMP/g, '#15171B');

    // 10. Component-specific fixes
    if (file.includes('Nav.tsx')) {
      // Mobile menu background
      content = content.replace(/bg-\[#15171B\] flex flex-col/g, 'bg-[#FAF9F6] flex flex-col');
    }
    if (file.includes('Home.tsx')) {
      // Voice cards background inside Ripple Effect
      content = content.replace(/bg-white p-4/g, 'bg-[#F3E8E3] p-4');
    }

    fs.writeFileSync(file, content);
  });
  console.log("Modern Editorial theme applied!");
} catch(err) {
  console.error(err);
}
