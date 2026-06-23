const fs = require('fs');

try {
  const files = ['src/app/pages/Home.tsx', 'src/app/components/Nav.tsx', 'src/app/components/Footer.tsx'];

  files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');

    // 1. Replace Archivo with Playfair Display
    content = content.replace(/'Archivo',\s*sans-serif/g, "'Playfair Display', serif");
    
    // 2. Adjust font weights for Playfair (900 is a bit heavy, 700/800 is better for editorial)
    // Actually, let's just let it be 900 if it was 900, Playfair supports 900.

    // 3. Replace Barlow Condensed with Inter
    content = content.replace(/'Barlow Condensed',\s*sans-serif/g, "'Inter', sans-serif");
    
    // 4. Reduce extreme letter spacing for Inter uppercase since it's much wider than Barlow Condensed
    content = content.replace(/letterSpacing: "0\.2em"/g, 'letterSpacing: "0.1em"');
    content = content.replace(/letterSpacing: "0\.15em"/g, 'letterSpacing: "0.08em"');
    content = content.replace(/letterSpacing: "0\.12em"/g, 'letterSpacing: "0.05em"');
    content = content.replace(/letterSpacing: "0\.1em"/g, 'letterSpacing: "0.05em"');

    fs.writeFileSync(file, content);
  });
  console.log("High-End Editorial fonts applied!");
} catch(err) {
  console.error(err);
}
