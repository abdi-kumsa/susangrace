const fs = require('fs');

try {
  const files = ['src/app/pages/Home.tsx', 'src/app/components/Nav.tsx'];

  files.forEach(file => {
    if (fs.existsSync(file)) {
      let content = fs.readFileSync(file, 'utf8');
      
      // Replace Playfair Display with Inter
      content = content.replace(/'Playfair Display',\s*serif/g, "'Inter', sans-serif");
      
      // Some weights were 900 for Playfair, which might be too heavy for Inter headers. We can adjust it slightly or leave it.
      // Let's change fontWeight: 900 to fontWeight: 800 just to keep it bold but not black.
      content = content.replace(/fontWeight:\s*900/g, 'fontWeight: 800');

      fs.writeFileSync(file, content);
    }
  });
  console.log("Font changed to Inter everywhere!");
} catch(err) {
  console.error(err);
}
