const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

// Full-Bleed Solid Dark Master SVG (512x512)
// 100% OPAQUE (NO TRANSPARENCY) so Google Search NEVER inserts a white background!
const masterSolidSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512" fill="none">
  <defs>
    <!-- 100% Opaque Solid Dark Cyber Gradient (Covers entire 512x512 canvas) -->
    <linearGradient id="solid-bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0e172a" />
      <stop offset="50%" stop-color="#080e1b" />
      <stop offset="100%" stop-color="#030712" />
    </linearGradient>

    <!-- Glowing Cyan to Electric Pink Gradient for Lightning Bolt -->
    <linearGradient id="bolt-grad-solid" x1="3" y1="2" x2="21" y2="22" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#00f0ff" />
      <stop offset="100%" stop-color="#ff007a" />
    </linearGradient>

    <!-- Subtle Radial Vignette -->
    <radialGradient id="radial-glow" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#00f0ff" stop-opacity="0.12" />
      <stop offset="70%" stop-color="#ff007a" stop-opacity="0.05" />
      <stop offset="100%" stop-color="#000000" stop-opacity="0.4" />
    </radialGradient>

    <!-- Ambient Cyan Glow Filter -->
    <filter id="cyan-glow-filter" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="12" result="blur" />
      <feComposite in="SourceGraphic" in2="blur" operator="over" />
    </filter>
  </defs>

  <!-- 1. FULL CANVAS 100% SOLID OPAQUE RECTANGLE (NO TRANSPARENCY ANYWHERE) -->
  <rect width="512" height="512" fill="url(#solid-bg)" />
  <rect width="512" height="512" fill="url(#radial-glow)" />

  <!-- 2. Full-Bleed Glowing Cyan Outer Border -->
  <rect x="12" y="12" width="488" height="488" rx="100" stroke="#00f0ff" stroke-width="20" stroke-opacity="0.9" />
  <rect x="24" y="24" width="464" height="464" rx="88" stroke="#ffffff" stroke-width="2" stroke-opacity="0.2" />

  <!-- 3. Signature TypeBaazi Lightning Bolt Perfectly Centered -->
  <!-- Dimensions: 18 wide x 20 high, scaled x15.5 and centered at (256, 256) -->
  <g transform="translate(256, 256) scale(15.5) translate(-12, -12)">
    <!-- Soft Glow Backdrop -->
    <path d="M13 2L3 14H12L11 22L21 10H12L13 2Z" fill="url(#bolt-grad-solid)" stroke="#00f0ff" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" opacity="0.4" filter="url(#cyan-glow-filter)" />
    <!-- Crisp High-Contrast Lightning Bolt -->
    <path d="M13 2L3 14H12L11 22L21 10H12L13 2Z" fill="url(#bolt-grad-solid)" stroke="#00f0ff" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" />
  </g>
</svg>`;

// Scalable Compact Favicon SVG (32x32) with 100% Solid Dark Fill
const compactSolidSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="32" height="32" fill="none">
  <defs>
    <linearGradient id="fav-bolt-solid" x1="3" y1="2" x2="21" y2="22" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#00f0ff" />
      <stop offset="100%" stop-color="#ff007a" />
    </linearGradient>
  </defs>
  <!-- 100% Solid Full-Bleed Background (No transparent gaps) -->
  <rect width="32" height="32" fill="#080e1b" />
  <rect x="1" y="1" width="30" height="30" rx="7" stroke="#00f0ff" stroke-width="1.8" />
  <!-- Centered Bolt -->
  <g transform="translate(16, 16) scale(0.96) translate(-12, -12)">
    <path d="M13 2L3 14H12L11 22L21 10H12L13 2Z" fill="url(#fav-bolt-solid)" stroke="#00f0ff" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/>
  </g>
</svg>`;

async function run() {
  const publicDir = path.join(process.cwd(), 'public');
  const iconsDir = path.join(publicDir, 'icons');

  if (!fs.existsSync(iconsDir)) {
    fs.mkdirSync(iconsDir, { recursive: true });
  }

  // 1. Write SVGs
  fs.writeFileSync(path.join(publicDir, 'favicon.svg'), compactSolidSvg);
  fs.writeFileSync(path.join(publicDir, 'logo.svg'), masterSolidSvg);
  console.log('Saved solid full-bleed favicon.svg and logo.svg');

  const svgBuffer = Buffer.from(masterSolidSvg);

  // 2. Generate all PNG sizes with 100% OPAQUE backgrounds (no alpha channel transparency)
  const targets = [
    { name: 'favicon-16x16.png', dir: publicDir, size: 16 },
    { name: 'favicon-32x32.png', dir: publicDir, size: 32 },
    { name: 'favicon-48x48.png', dir: publicDir, size: 48 },
    { name: 'icon-48.png', dir: iconsDir, size: 48 },
    { name: 'icon-96.png', dir: iconsDir, size: 96 },
    { name: 'icon-144.png', dir: iconsDir, size: 144 },
    { name: 'apple-touch-icon.png', dir: iconsDir, size: 180 },
    { name: 'icon-192.png', dir: iconsDir, size: 192 },
    { name: 'icon-maskable-192.png', dir: iconsDir, size: 192 },
    { name: 'icon-512.png', dir: iconsDir, size: 512 },
    { name: 'icon-maskable-512.png', dir: iconsDir, size: 512 }
  ];

  for (const item of targets) {
    const outPath = path.join(item.dir, item.name);
    await sharp(svgBuffer)
      .resize(item.size, item.size)
      .flatten({ background: '#080e1b' }) // Guarantees 100% opaque RGB without alpha transparency
      .png({ quality: 100, compressionLevel: 9 })
      .toFile(outPath);
    console.log(`Generated opaque ${item.name} (${item.size}x${item.size})`);
  }

  // 3. Generate multi-resolution favicon.ico (16, 32, 48) with solid dark background
  const icoSizes = [16, 32, 48];
  const images = [];
  for (const s of icoSizes) {
    const pngBuf = await sharp(svgBuffer)
      .resize(s, s)
      .flatten({ background: '#080e1b' })
      .png()
      .toBuffer();
    images.push({ size: s, buffer: pngBuf });
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

  const icoBuffer = Buffer.concat([header, ...directoryEntries, ...imageBuffers]);
  fs.writeFileSync(path.join(publicDir, 'favicon.ico'), icoBuffer);
  console.log(`Generated opaque multi-resolution favicon.ico (${icoBuffer.length} bytes)`);
}

run().catch(console.error);
