const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

// 1. Master High-Resolution Circular SVG (512x512)
const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512" fill="none">
  <defs>
    <!-- Background Gradient -->
    <linearGradient id="bg-grad" x1="80" y1="60" x2="432" y2="452" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#0f172a" />
      <stop offset="40%" stop-color="#080e1b" />
      <stop offset="100%" stop-color="#030712" />
    </linearGradient>

    <!-- Lightning Bolt Gradient (Cyan to Electric Pink) -->
    <linearGradient id="bolt-grad" x1="3" y1="2" x2="21" y2="22" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#00f0ff" />
      <stop offset="100%" stop-color="#ff007a" />
    </linearGradient>

    <!-- Inner Radial Glow -->
    <radialGradient id="inner-glow" cx="256" cy="256" r="230" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#00f0ff" stop-opacity="0.16" />
      <stop offset="70%" stop-color="#ff007a" stop-opacity="0.06" />
      <stop offset="100%" stop-color="#000000" stop-opacity="0" />
    </radialGradient>

    <!-- Glow Filter for Ambient Cyber Lighting -->
    <filter id="cyan-glow" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="8" result="blur" />
      <feComposite in="SourceGraphic" in2="blur" operator="over" />
    </filter>
  </defs>

  <!-- Perfect Circular Badge Background -->
  <circle cx="256" cy="256" r="244" fill="url(#bg-grad)" />

  <!-- Ambient Inner Glow -->
  <circle cx="256" cy="256" r="244" fill="url(#inner-glow)" />

  <!-- Outer Glowing Cyan Ring -->
  <circle cx="256" cy="256" r="240" stroke="#00f0ff" stroke-width="18" stroke-opacity="0.95" />
  
  <!-- Subtle Inner Border Accent -->
  <circle cx="256" cy="256" r="226" stroke="#ffffff" stroke-width="2" stroke-opacity="0.25" />

  <!-- Perfectly Centered TypeBaazi Lightning Bolt -->
  <!-- Bounding box: 18 wide x 20 high, scaled x14.5 and centered at (256, 256) -->
  <g transform="translate(256, 256) scale(14.5) translate(-12, -12)">
    <!-- Bolt Soft Glow Shadow -->
    <path d="M13 2L3 14H12L11 22L21 10H12L13 2Z" fill="url(#bolt-grad)" stroke="#00f0ff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" opacity="0.4" filter="url(#cyan-glow)"/>
    <!-- Main High-Contrast Sharp Bolt -->
    <path d="M13 2L3 14H12L11 22L21 10H12L13 2Z" fill="url(#bolt-grad)" stroke="#00f0ff" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>
  </g>
</svg>`;

// 2. Compact Scalable Favicon SVG (32x32)
const compactSvgContent = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="32" height="32" fill="none">
  <defs>
    <linearGradient id="fav-bg" x1="4" y1="4" x2="28" y2="28" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#0f172a" />
      <stop offset="100%" stop-color="#030712" />
    </linearGradient>
    <linearGradient id="fav-bolt" x1="3" y1="2" x2="21" y2="22" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#00f0ff" />
      <stop offset="100%" stop-color="#ff007a" />
    </linearGradient>
  </defs>
  <!-- Circular Badge -->
  <circle cx="16" cy="16" r="15" fill="url(#fav-bg)" stroke="#00f0ff" stroke-width="1.8" />
  <!-- Centered Bolt -->
  <g transform="translate(16, 16) scale(0.92) translate(-12, -12)">
    <path d="M13 2L3 14H12L11 22L21 10H12L13 2Z" fill="url(#fav-bolt)" stroke="#00f0ff" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>
  </g>
</svg>`;

async function run() {
  const publicDir = path.join(process.cwd(), 'public');
  const iconsDir = path.join(publicDir, 'icons');
  
  if (!fs.existsSync(iconsDir)) {
    fs.mkdirSync(iconsDir, { recursive: true });
  }

  // Save SVGs
  fs.writeFileSync(path.join(publicDir, 'favicon.svg'), compactSvgContent);
  fs.writeFileSync(path.join(publicDir, 'logo-circle.svg'), svgContent);
  console.log('Saved favicon.svg and logo-circle.svg');

  const svgBuffer = Buffer.from(svgContent);

  // Generate PNG sizes
  const sizes = [
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

  const pngBuffers = {};

  for (const item of sizes) {
    const outPath = path.join(item.dir, item.name);
    const buf = await sharp(svgBuffer)
      .resize(item.size, item.size)
      .png({ quality: 100, compressionLevel: 9 })
      .toBuffer();
    fs.writeFileSync(outPath, buf);
    pngBuffers[item.size] = buf;
    console.log(`Generated ${item.name} (${item.size}x${item.size})`);
  }

  // Build multi-size favicon.ico (16, 32, 48)
  const icoSizes = [16, 32, 48];
  const images = [];
  for (const s of icoSizes) {
    const pngBuf = await sharp(svgBuffer).resize(s, s).png().toBuffer();
    images.push({ size: s, buffer: pngBuf });
  }

  // ICO header: 6 bytes (Reserved 2, Type 2, Count 2)
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
    dirEntry.writeUInt8(img.size === 256 ? 0 : img.size, 0); // Width
    dirEntry.writeUInt8(img.size === 256 ? 0 : img.size, 1); // Height
    dirEntry.writeUInt8(0, 2); // Color palette
    dirEntry.writeUInt8(0, 3); // Reserved
    dirEntry.writeUInt16LE(1, 4); // Color planes
    dirEntry.writeUInt16LE(32, 6); // Bits per pixel
    dirEntry.writeUInt32LE(img.buffer.length, 8); // Image size in bytes
    dirEntry.writeUInt32LE(offset, 12); // Offset of image data
    directoryEntries.push(dirEntry);
    imageBuffers.push(img.buffer);
    offset += img.buffer.length;
  }

  const icoBuffer = Buffer.concat([header, ...directoryEntries, ...imageBuffers]);
  fs.writeFileSync(path.join(publicDir, 'favicon.ico'), icoBuffer);
  console.log(`Generated multi-resolution favicon.ico (${icoBuffer.length} bytes)`);
}

run().catch(console.error);
