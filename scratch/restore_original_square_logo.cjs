const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

// 1. High-Resolution Master Square Logo (512x512 with sleek squircle rounded corners)
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
  <!-- 18 wide x 20 high, scaled x14.5 and centered at (256, 256) -->
  <g transform="translate(256, 256) scale(14.5) translate(-12, -12)">
    <path d="M13 2L3 14H12L11 22L21 10H12L13 2Z" fill="url(#sq-bolt)" stroke="#00f0ff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" opacity="0.4" filter="url(#sq-glow)" />
    <path d="M13 2L3 14H12L11 22L21 10H12L13 2Z" fill="url(#sq-bolt)" stroke="#00f0ff" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" />
  </g>
</svg>`;

// 2. Compact Favicon SVG (32x32)
const compactSquareSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="32" height="32" fill="none">
  <defs>
    <linearGradient id="bolt-grad-fav" x1="3" y1="2" x2="21" y2="22" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#00f0ff" />
      <stop offset="100%" stop-color="#ff007a" />
    </linearGradient>
  </defs>
  <!-- Exact Rounded Cyan Badge Container matching Original Website Header Logo -->
  <rect x="1.5" y="1.5" width="29" height="29" rx="8" fill="#080e1b" stroke="#00f0ff" stroke-width="1.6" />
  <!-- Exact Centered Lightning Bolt -->
  <g transform="translate(4, 4)">
    <path d="M13 2L3 14H12L11 22L21 10H12L13 2Z" fill="url(#bolt-grad-fav)" stroke="#00f0ff" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>
  </g>
</svg>`;

async function run() {
  const publicDir = path.join(process.cwd(), 'public');
  const iconsDir = path.join(publicDir, 'icons');

  if (!fs.existsSync(iconsDir)) {
    fs.mkdirSync(iconsDir, { recursive: true });
  }

  // 1. Write SVGs
  fs.writeFileSync(path.join(publicDir, 'favicon.svg'), compactSquareSvg);
  fs.writeFileSync(path.join(publicDir, 'logo.svg'), masterSquareSvg);
  console.log('Saved classic square favicon.svg and logo.svg');

  const svgBuffer = Buffer.from(masterSquareSvg);

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
    console.log(`Restored ${item.name} (${item.size}x${item.size})`);
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
  console.log(`Restored multi-resolution favicon.ico (${icoBuffer.length} bytes)`);
}

run().catch(console.error);
