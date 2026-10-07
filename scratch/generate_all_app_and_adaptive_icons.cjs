const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

// 1. Master Square Logo SVG (512x512) - Exact Website Design
const masterSquareSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512" fill="none">
  <defs>
    <!-- Background Gradient -->
    <linearGradient id="sq-bg" x1="60" y1="40" x2="452" y2="472" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#0e172a" />
      <stop offset="45%" stop-color="#080e1b" />
      <stop offset="100%" stop-color="#040711" />
    </linearGradient>

    <!-- Lightning Bolt Gradient (Cyan to Neon Magenta) -->
    <linearGradient id="sq-bolt" x1="3" y1="2" x2="21" y2="22" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#00f0ff" />
      <stop offset="100%" stop-color="#ff007a" />
    </linearGradient>

    <!-- Subtle Cyan Ambient Glow -->
    <filter id="sq-glow" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="10" result="blur" />
      <feComposite in="SourceGraphic" in2="blur" operator="over" />
    </filter>
  </defs>

  <!-- Full Background Base -->
  <rect width="512" height="512" fill="#060913" />

  <!-- Classic TypeBaazi Squircle Badge -->
  <rect x="24" y="24" width="464" height="464" rx="108" fill="url(#sq-bg)" stroke="#00f0ff" stroke-width="20" stroke-opacity="0.95" />
  <rect x="38" y="38" width="436" height="436" rx="94" stroke="#ffffff" stroke-width="2.5" stroke-opacity="0.2" />

  <!-- Centered Lightning Bolt -->
  <g transform="translate(256, 256) scale(14.5) translate(-12, -12)">
    <path d="M13 2L3 14H12L11 22L21 10H12L13 2Z" fill="url(#sq-bolt)" stroke="#00f0ff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" opacity="0.4" filter="url(#sq-glow)" />
    <path d="M13 2L3 14H12L11 22L21 10H12L13 2Z" fill="url(#sq-bolt)" stroke="#00f0ff" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" />
  </g>
</svg>`;

// 2. Android Adaptive Icon Foreground SVG (108x108 canvas with 66dp safe zone)
// In Android Adaptive Icons: The entire viewport is 108x108.
// The central 72dp is the visible circle/squircle mask area.
// The TypeBaazi squircle badge is placed at (23, 23) with size 62x62, rx="14".
// This ensures that whether the launcher uses a circle, rounded square, squircle, or teardrop mask,
// the entire neon cyan border and lightning bolt are 100% visible and centered!
const adaptiveForegroundSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 108 108" width="432" height="432" fill="none">
  <defs>
    <linearGradient id="adapt-bg" x1="26" y1="24" x2="82" y2="84" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#0e172a" />
      <stop offset="45%" stop-color="#080e1b" />
      <stop offset="100%" stop-color="#040711" />
    </linearGradient>

    <linearGradient id="adapt-bolt" x1="3" y1="2" x2="21" y2="22" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#00f0ff" />
      <stop offset="100%" stop-color="#ff007a" />
    </linearGradient>

    <filter id="adapt-glow" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="1.5" result="blur" />
      <feComposite in="SourceGraphic" in2="blur" operator="over" />
    </filter>
  </defs>

  <!-- Centered TypeBaazi Squircle Badge in 66dp Safe Area -->
  <rect x="23" y="23" width="62" height="62" rx="14" fill="url(#adapt-bg)" stroke="#00f0ff" stroke-width="2.6" stroke-opacity="0.95" />
  <rect x="25" y="25" width="58" height="58" rx="12" stroke="#ffffff" stroke-width="0.5" stroke-opacity="0.25" />

  <!-- Centered Lightning Bolt -->
  <g transform="translate(54, 54) scale(1.95) translate(-12, -12)">
    <path d="M13 2L3 14H12L11 22L21 10H12L13 2Z" fill="url(#adapt-bolt)" stroke="#00f0ff" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" opacity="0.4" filter="url(#adapt-glow)" />
    <path d="M13 2L3 14H12L11 22L21 10H12L13 2Z" fill="url(#adapt-bolt)" stroke="#00f0ff" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" />
  </g>
</svg>`;

// 3. Compact Favicon SVG (32x32)
const compactSquareSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="32" height="32" fill="none">
  <defs>
    <linearGradient id="bolt-grad-fav" x1="3" y1="2" x2="21" y2="22" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#00f0ff" />
      <stop offset="100%" stop-color="#ff007a" />
    </linearGradient>
  </defs>
  <rect width="32" height="32" fill="#060913" rx="8" />
  <rect x="1.5" y="1.5" width="29" height="29" rx="7" fill="#080e1b" stroke="#00f0ff" stroke-width="1.6" />
  <g transform="translate(4, 4)">
    <path d="M13 2L3 14H12L11 22L21 10H12L13 2Z" fill="url(#bolt-grad-fav)" stroke="#00f0ff" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>
  </g>
</svg>`;

// 4. Legacy Round Icon SVG (512x512)
const legacyRoundSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512" fill="none">
  <defs>
    <linearGradient id="rnd-bg" x1="60" y1="40" x2="452" y2="472" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#0e172a" />
      <stop offset="45%" stop-color="#080e1b" />
      <stop offset="100%" stop-color="#040711" />
    </linearGradient>

    <linearGradient id="rnd-bolt" x1="3" y1="2" x2="21" y2="22" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#00f0ff" />
      <stop offset="100%" stop-color="#ff007a" />
    </linearGradient>

    <filter id="rnd-glow" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="10" result="blur" />
      <feComposite in="SourceGraphic" in2="blur" operator="over" />
    </filter>
  </defs>

  <rect width="512" height="512" fill="#060913" />
  <!-- Circular Badge -->
  <circle cx="256" cy="256" r="230" fill="url(#rnd-bg)" stroke="#00f0ff" stroke-width="20" stroke-opacity="0.95" />
  <circle cx="256" cy="256" r="216" stroke="#ffffff" stroke-width="2.5" stroke-opacity="0.2" />

  <!-- Centered Lightning Bolt -->
  <g transform="translate(256, 256) scale(14.5) translate(-12, -12)">
    <path d="M13 2L3 14H12L11 22L21 10H12L13 2Z" fill="url(#rnd-bolt)" stroke="#00f0ff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" opacity="0.4" filter="url(#rnd-glow)" />
    <path d="M13 2L3 14H12L11 22L21 10H12L13 2Z" fill="url(#rnd-bolt)" stroke="#00f0ff" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" />
  </g>
</svg>`;

async function main() {
  const rootDir = process.cwd();
  const publicDir = path.join(rootDir, 'public');
  const iconsDir = path.join(publicDir, 'icons');
  const androidResDir = path.join(rootDir, 'android', 'app', 'src', 'main', 'res');

  console.log('=== TypeBaazi Official Icon Generation Starting ===');

  // Ensure directories exist
  [publicDir, iconsDir, androidResDir].forEach(d => {
    if (!fs.existsSync(d)) fs.mkdirSync(d, { recursive: true });
  });

  // 1. Write Master SVGs
  fs.writeFileSync(path.join(publicDir, 'logo.svg'), masterSquareSvg);
  fs.writeFileSync(path.join(publicDir, 'favicon.svg'), compactSquareSvg);
  console.log('✓ Written public/logo.svg & public/favicon.svg');

  const masterBuf = Buffer.from(masterSquareSvg);
  const adaptBuf = Buffer.from(adaptiveForegroundSvg);
  const roundBuf = Buffer.from(legacyRoundSvg);

  // 2. Generate Web & PWA Icons
  const pwaTargets = [
    { name: 'favicon-16x16.png', dir: publicDir, size: 16, buf: masterBuf },
    { name: 'favicon-32x32.png', dir: publicDir, size: 32, buf: masterBuf },
    { name: 'favicon-48x48.png', dir: publicDir, size: 48, buf: masterBuf },
    { name: 'icon-48.png', dir: iconsDir, size: 48, buf: masterBuf },
    { name: 'icon-96.png', dir: iconsDir, size: 96, buf: masterBuf },
    { name: 'icon-144.png', dir: iconsDir, size: 144, buf: masterBuf },
    { name: 'apple-touch-icon.png', dir: iconsDir, size: 180, buf: masterBuf },
    { name: 'icon-192.png', dir: iconsDir, size: 192, buf: masterBuf },
    { name: 'icon-maskable-192.png', dir: iconsDir, size: 192, buf: masterBuf },
    { name: 'icon-512.png', dir: iconsDir, size: 512, buf: masterBuf },
    { name: 'icon-maskable-512.png', dir: iconsDir, size: 512, buf: masterBuf }
  ];

  for (const t of pwaTargets) {
    await sharp(t.buf).resize(t.size, t.size).png({ quality: 100 }).toFile(path.join(t.dir, t.name));
    console.log(`✓ Generated PWA Icon: ${t.name} (${t.size}x${t.size})`);
  }

  // 3. Generate multi-resolution favicon.ico
  const icoSizes = [16, 32, 48];
  const images = [];
  for (const s of icoSizes) {
    const b = await sharp(masterBuf).resize(s, s).png().toBuffer();
    images.push({ size: s, buffer: b });
  }
  const count = images.length;
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(count, 4);
  let offset = 6 + count * 16;
  const directoryEntries = [];
  const imageBuffers = [];
  for (const img of images) {
    const dirEntry = Buffer.alloc(16);
    dirEntry.writeUInt8(img.size === 256 ? 0 : img.size, 0);
    dirEntry.writeUInt8(img.size === 256 ? 0 : img.size, 1);
    dirEntry.writeUInt8(0, 2);
    dirEntry.writeUInt8(0, 3);
    dirEntry.writeUInt16LE(1, 4);
    dirEntry.writeUInt16LE(32, 6);
    dirEntry.writeUInt32LE(img.buffer.length, 8);
    dirEntry.writeUInt32LE(offset, 12);
    directoryEntries.push(dirEntry);
    imageBuffers.push(img.buffer);
    offset += img.buffer.length;
  }
  fs.writeFileSync(path.join(publicDir, 'favicon.ico'), Buffer.concat([header, ...directoryEntries, ...imageBuffers]));
  console.log('✓ Generated public/favicon.ico');

  // 4. Generate Android Adaptive Icons & Legacy Icons for all screen densities
  const androidDensities = [
    { dir: 'mipmap-mdpi', iconSize: 48, foregroundSize: 108 },
    { dir: 'mipmap-hdpi', iconSize: 72, foregroundSize: 162 },
    { dir: 'mipmap-xhdpi', iconSize: 96, foregroundSize: 216 },
    { dir: 'mipmap-xxhdpi', iconSize: 144, foregroundSize: 324 },
    { dir: 'mipmap-xxxhdpi', iconSize: 192, foregroundSize: 432 }
  ];

  for (const d of androidDensities) {
    const targetDir = path.join(androidResDir, d.dir);
    if (!fs.existsSync(targetDir)) fs.mkdirSync(targetDir, { recursive: true });

    // A. Adaptive Foreground (108dp base canvas)
    await sharp(adaptBuf)
      .resize(d.foregroundSize, d.foregroundSize)
      .png({ quality: 100 })
      .toFile(path.join(targetDir, 'ic_launcher_foreground.png'));

    // B. Legacy Square Launcher Icon
    await sharp(masterBuf)
      .resize(d.iconSize, d.iconSize)
      .png({ quality: 100 })
      .toFile(path.join(targetDir, 'ic_launcher.png'));

    // C. Legacy Round Launcher Icon
    await sharp(roundBuf)
      .resize(d.iconSize, d.iconSize)
      .png({ quality: 100 })
      .toFile(path.join(targetDir, 'ic_launcher_round.png'));

    console.log(`✓ Generated Android ${d.dir} assets (icon: ${d.iconSize}px, foreground: ${d.foregroundSize}px)`);
  }

  // 5. Update Android Adaptive Icon XML in mipmap-anydpi-v26
  const anydpiDir = path.join(androidResDir, 'mipmap-anydpi-v26');
  if (!fs.existsSync(anydpiDir)) fs.mkdirSync(anydpiDir, { recursive: true });

  const adaptiveXml = `<?xml version="1.0" encoding="utf-8"?>
<adaptive-icon xmlns:android="http://schemas.android.com/apk/res/android">
    <background android:drawable="@drawable/ic_launcher_background"/>
    <foreground android:drawable="@mipmap/ic_launcher_foreground"/>
</adaptive-icon>
`;

  fs.writeFileSync(path.join(anydpiDir, 'ic_launcher.xml'), adaptiveXml);
  fs.writeFileSync(path.join(anydpiDir, 'ic_launcher_round.xml'), adaptiveXml);
  console.log('✓ Written mipmap-anydpi-v26 ic_launcher.xml & ic_launcher_round.xml');

  // 6. Update background drawable XML
  const drawableDir = path.join(androidResDir, 'drawable');
  if (!fs.existsSync(drawableDir)) fs.mkdirSync(drawableDir, { recursive: true });

  const backgroundXml = `<?xml version="1.0" encoding="utf-8"?>
<vector xmlns:android="http://schemas.android.com/apk/res/android"
    android:width="108dp"
    android:height="108dp"
    android:viewportWidth="108"
    android:viewportHeight="108">
    <path
        android:fillColor="#060913"
        android:pathData="M0,0h108v108h-108z" />
</vector>
`;
  fs.writeFileSync(path.join(drawableDir, 'ic_launcher_background.xml'), backgroundXml);

  const valuesDir = path.join(androidResDir, 'values');
  if (!fs.existsSync(valuesDir)) fs.mkdirSync(valuesDir, { recursive: true });
  const colorXml = `<?xml version="1.0" encoding="utf-8"?>
<resources>
    <color name="ic_launcher_background">#060913</color>
</resources>
`;
  fs.writeFileSync(path.join(valuesDir, 'ic_launcher_background.xml'), colorXml);
  console.log('✓ Updated ic_launcher_background XML with exact website dark background #060913');

  // 7. Update Android Splash Screens
  const splashDensities = [
    { dir: 'drawable', w: 512, h: 512 },
    { dir: 'drawable-port-mdpi', w: 320, h: 480 },
    { dir: 'drawable-port-hdpi', w: 480, h: 800 },
    { dir: 'drawable-port-xhdpi', w: 720, h: 1280 },
    { dir: 'drawable-port-xxhdpi', w: 960, h: 1600 },
    { dir: 'drawable-port-xxxhdpi', w: 1280, h: 1920 },
    { dir: 'drawable-land-mdpi', w: 480, h: 320 },
    { dir: 'drawable-land-hdpi', w: 800, h: 480 },
    { dir: 'drawable-land-xhdpi', w: 1280, h: 720 },
    { dir: 'drawable-land-xxhdpi', w: 1600, h: 960 },
    { dir: 'drawable-land-xxxhdpi', w: 1920, h: 1280 }
  ];

  for (const s of splashDensities) {
    const sDir = path.join(androidResDir, s.dir);
    if (!fs.existsSync(sDir)) fs.mkdirSync(sDir, { recursive: true });

    // Logo size in splash: ~40% of min dimension
    const logoSize = Math.round(Math.min(s.w, s.h) * 0.42);
    const logoPng = await sharp(masterBuf).resize(logoSize, logoSize).png().toBuffer();

    await sharp({
      create: {
        width: s.w,
        height: s.h,
        channels: 4,
        background: { r: 6, g: 9, b: 19, alpha: 1 } // #060913
      }
    })
      .composite([{ input: logoPng, gravity: 'center' }])
      .png({ quality: 100 })
      .toFile(path.join(sDir, 'splash.png'));

    console.log(`✓ Generated splash screen: ${s.dir}/splash.png (${s.w}x${s.h})`);
  }

  console.log('=== All Icons & Adaptive Assets Generated Successfully! ===');
}

main().catch(err => {
  console.error('Error generating icons:', err);
  process.exit(1);
});
