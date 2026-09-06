const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

// Master High-Resolution Full-Bleed Circular Logo SVG (512x512)
// Designed so the entire square/circle is completely filled with TypeBaazi cyan/purple gradient glow,
// dark high-contrast center, and perfectly centered signature lightning bolt.
const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512" fill="none">
  <defs>
    <!-- Full-Bleed Dark Obsidian Background Gradient -->
    <radialGradient id="space-bg" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
      <stop offset="0%" stop-color="#0b1120" />
      <stop offset="55%" stop-color="#060913" />
      <stop offset="85%" stop-color="#080e1f" />
      <stop offset="100%" stop-color="#0a0518" />
    </radialGradient>

    <!-- Outer Vibrant Cyan to Neon Purple Gradient Ring -->
    <linearGradient id="neon-ring-grad" x1="10%" y1="10%" x2="90%" y2="90%">
      <stop offset="0%" stop-color="#00f0ff" />
      <stop offset="45%" stop-color="#00d8ff" />
      <stop offset="75%" stop-color="#a855f7" />
      <stop offset="100%" stop-color="#ff007a" />
    </linearGradient>

    <!-- Ambient Outer Glow Gradient -->
    <radialGradient id="perimeter-glow" cx="50%" cy="50%" r="50%">
      <stop offset="65%" stop-color="#000000" stop-opacity="0" />
      <stop offset="82%" stop-color="#00f0ff" stop-opacity="0.22" />
      <stop offset="96%" stop-color="#ff007a" stop-opacity="0.35" />
      <stop offset="100%" stop-color="#a855f7" stop-opacity="0.5" />
    </radialGradient>

    <!-- Lightning Bolt Gradient (Cyan #00f0ff to Magenta #ff007a) -->
    <linearGradient id="bolt-grad-hd" x1="3" y1="2" x2="21" y2="22" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#00f0ff" />
      <stop offset="50%" stop-color="#38bdf8" />
      <stop offset="100%" stop-color="#ff007a" />
    </linearGradient>

    <!-- Deep Center Contrast Shadow behind the bolt -->
    <radialGradient id="center-contrast" cx="50%" cy="50%" r="35%">
      <stop offset="0%" stop-color="#030712" stop-opacity="0.95" />
      <stop offset="80%" stop-color="#060913" stop-opacity="0.8" />
      <stop offset="100%" stop-color="#060913" stop-opacity="0" />
    </radialGradient>

    <!-- Cyber Cyan Glow Filter -->
    <filter id="bolt-glow" x="-30%" y="-30%" width="160%" height="160%">
      <feGaussianBlur stdDeviation="12" result="blur" />
      <feComposite in="SourceGraphic" in2="blur" operator="over" />
    </filter>
  </defs>

  <!-- 1. Full Square Background Base (Zero transparent/white edges) -->
  <rect width="512" height="512" fill="#060913" />

  <!-- 2. Rich Deep Space Disc -->
  <circle cx="256" cy="256" r="256" fill="url(#space-bg)" />

  <!-- 3. Ambient Perimeter Glow blending into the edge -->
  <circle cx="256" cy="256" r="256" fill="url(#perimeter-glow)" />

  <!-- 4. High-Energy Cyan/Purple Dual-Ring Border (No gaps, edge-to-edge) -->
  <circle cx="256" cy="256" r="242" stroke="url(#neon-ring-grad)" stroke-width="22" />
  <circle cx="256" cy="256" r="226" stroke="#00f0ff" stroke-width="3" stroke-opacity="0.4" />

  <!-- 5. Dark Center Contrast Core (Ensures the lightning symbol pops with ultra-clarity) -->
  <circle cx="256" cy="256" r="190" fill="url(#center-contrast)" />

  <!-- 6. Perfectly Centered TypeBaazi Lightning Bolt -->
  <!-- Coordinates: 18px wide (x: 3 to 21), 20px high (y: 2 to 22), centered at (256, 256) -->
  <g transform="translate(256, 256) scale(15.2) translate(-12, -12)">
    <!-- Soft Cyan Glow Halo -->
    <path d="M13 2L3 14H12L11 22L21 10H12L13 2Z" fill="url(#bolt-grad-hd)" stroke="#00f0ff" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" opacity="0.45" filter="url(#bolt-glow)" />
    <!-- Crisp Foreground Lightning Symbol -->
    <path d="M13 2L3 14H12L11 22L21 10H12L13 2Z" fill="url(#bolt-grad-hd)" stroke="#00f0ff" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round" />
  </g>
</svg>`;

// Scalable Compact Favicon SVG (32x32)
const compactSvgContent = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="32" height="32" fill="none">
  <defs>
    <radialGradient id="fav-bg-core" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#0b1120" />
      <stop offset="70%" stop-color="#060913" />
      <stop offset="100%" stop-color="#0a0518" />
    </radialGradient>
    <linearGradient id="fav-ring" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#00f0ff" />
      <stop offset="100%" stop-color="#ff007a" />
    </linearGradient>
    <linearGradient id="fav-bolt-hd" x1="3" y1="2" x2="21" y2="22" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#00f0ff" />
      <stop offset="100%" stop-color="#ff007a" />
    </linearGradient>
  </defs>
  <!-- Full Background -->
  <rect width="32" height="32" fill="#060913" />
  <circle cx="16" cy="16" r="16" fill="url(#fav-bg-core)" />
  <!-- Vibrant Cyan to Purple Ring -->
  <circle cx="16" cy="16" r="14.8" stroke="url(#fav-ring)" stroke-width="2.4" />
  <!-- Centered Bolt -->
  <g transform="translate(16, 16) scale(0.95) translate(-12, -12)">
    <path d="M13 2L3 14H12L11 22L21 10H12L13 2Z" fill="url(#fav-bolt-hd)" stroke="#00f0ff" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round" />
  </g>
</svg>`;

async function run() {
  const publicDir = path.join(process.cwd(), 'public');
  const iconsDir = path.join(publicDir, 'icons');

  if (!fs.existsSync(iconsDir)) {
    fs.mkdirSync(iconsDir, { recursive: true });
  }

  // 1. Write SVG files
  fs.writeFileSync(path.join(publicDir, 'favicon.svg'), compactSvgContent);
  fs.writeFileSync(path.join(publicDir, 'logo-circle.svg'), svgContent);
  console.log('Saved public/favicon.svg and public/logo-circle.svg');

  const svgBuffer = Buffer.from(svgContent);

  // 2. Generate all PNG sizes
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
      .png({ quality: 100, compressionLevel: 9 })
      .toFile(outPath);
    console.log(`Generated ${item.name} (${item.size}x${item.size})`);
  }

  // 3. Generate multi-resolution favicon.ico (16, 32, 48)
  const icoSizes = [16, 32, 48];
  const images = [];
  for (const s of icoSizes) {
    const pngBuf = await sharp(svgBuffer).resize(s, s).png().toBuffer();
    images.push({ size: s, buffer: pngBuf });
  }

  const count = images.length;
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0); // Reserved
  header.writeUInt16LE(1, 2); // ICO type
  header.writeUInt16LE(count, 4); // Number of images

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
  console.log(`Generated multi-resolution favicon.ico (${icoBuffer.length} bytes)`);
}

run().catch(console.error);
