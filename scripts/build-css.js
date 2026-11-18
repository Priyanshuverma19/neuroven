const fs = require('fs');
const path = require('path');
const { compile } = require('@tailwindcss/node');

async function buildCSS() {
  const rootDir = path.resolve(__dirname, '..');
  const sourceCssPath = path.join(rootDir, 'app/tailwind-source.css');
  const outputCssPath = path.join(rootDir, 'app/globals.css');

  // Base CSS containing @import "tailwindcss"
  const baseCss = fs.existsSync(sourceCssPath)
    ? fs.readFileSync(sourceCssPath, 'utf8')
    : '@import "tailwindcss";';

  const compiler = await compile(baseCss, {
    base: rootDir,
    from: sourceCssPath,
    onDependency: () => {},
  });

  // Scan all source files in app and components
  const files = [];
  function scan(dir) {
    if (!fs.existsSync(dir)) return;
    for (const f of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, f.name);
      if (f.isDirectory() && f.name !== 'node_modules' && f.name !== '.next') {
        scan(full);
      } else if (
        f.isFile() &&
        (f.name.endsWith('.tsx') ||
          f.name.endsWith('.ts') ||
          f.name.endsWith('.jsx') ||
          f.name.endsWith('.js'))
      ) {
        files.push(full);
      }
    }
  }

  scan(path.join(rootDir, 'app'));
  scan(path.join(rootDir, 'components'));
  scan(path.join(rootDir, 'data'));
  scan(path.join(rootDir, 'context'));

  const candidates = new Set();
  for (const file of files) {
    const content = fs.readFileSync(file, 'utf8');
    const matches = content.match(/[\w\-/:\[\]#.%]+/g) || [];
    for (const m of matches) candidates.add(m);
  }

  const compiledTailwind = compiler.build([...candidates]);

  // NEURAVAN Design Tokens, Hebrew Typography & RTL System
  const customOverrides = `
:root {
  --nv-parchment: #FAF8F5;
  --nv-parchment-soft: #F5F1EB;
  --nv-canvas-card: #FFFFFF;
  --nv-charcoal: #111827;
  --nv-ink-primary: #121826;
  --nv-ink-secondary: #4B5563;
  --nv-ink-muted: #6B7280;
  --nv-blue: #1D4ED8;
  --nv-blue-hover: #1E40AF;
  --nv-blue-light: #EFF6FF;
  --nv-terracotta: #C25E3E;
  --nv-terracotta-light: #FDF2E9;
  --nv-amber: #D97706;
  --nv-sand: #F4EFE6;
  --nv-border: #E5E0D8;
  --nv-border-subtle: #F0EDE6;
  --nv-sage: #2D5A46;
  --nv-sage-light: #F0FDF4;
}

body {
  background-color: #FAF8F5 !important;
  color: #121826 !important;
  font-family: 'Assistant', 'Heebo', 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif !important;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

/* Hebrew & English Editorial Serif Headings */
[dir="rtl"] h1, [dir="rtl"] h2, [dir="rtl"] h3, [dir="rtl"] .font-serif-title,
.font-hebrew-serif {
  font-family: 'Frank Ruhl Libre', 'David Libre', serif !important;
  letter-spacing: normal;
}

[dir="ltr"] h1, [dir="ltr"] h2, [dir="ltr"] h3, [dir="ltr"] .font-serif-title,
.font-serif-title {
  font-family: 'Newsreader', 'Frank Ruhl Libre', Georgia, Cambria, serif !important;
  letter-spacing: -0.015em;
}

[dir="rtl"] {
  text-align: right;
}

[dir="ltr"] {
  text-align: left;
}

@keyframes soundwave {
  0%, 100% { height: 6px; }
  50% { height: 26px; }
}

.animate-soundwave-1 {
  animation: soundwave 1.2s ease-in-out infinite;
}
.animate-soundwave-2 {
  animation: soundwave 1s ease-in-out infinite 0.2s;
}
.animate-soundwave-3 {
  animation: soundwave 1.4s ease-in-out infinite 0.4s;
}
.animate-soundwave-4 {
  animation: soundwave 0.9s ease-in-out infinite 0.1s;
}

input[type="range"] {
  accent-color: #1D4ED8;
}

::-webkit-scrollbar {
  width: 7px;
  height: 7px;
}
::-webkit-scrollbar-track {
  background: #FAF8F5;
}
::-webkit-scrollbar-thumb {
  background: #D8D2C4;
  border-radius: 4px;
}
::-webkit-scrollbar-thumb:hover {
  background: #B8B0A0;
}
`;

  const finalCss = compiledTailwind + '\n' + customOverrides;
  fs.writeFileSync(outputCssPath, finalCss, 'utf8');
  console.log(`[build-css] Successfully built globals.css (${finalCss.length} bytes) with all Tailwind classes!`);
}

buildCSS().catch((err) => {
  console.error('[build-css] Error:', err);
  process.exit(1);
});
