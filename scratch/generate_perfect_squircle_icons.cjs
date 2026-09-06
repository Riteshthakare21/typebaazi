const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

// 1. Android Adaptive Foreground Icon SVG (108x108 viewport)
// In Android launchers, the squircle frame sits cleanly inside the safe area.
// Frame: 68x68 at (20, 20), rx="16.5", stroke="#00f0ff" stroke-width="3.8"
// Inner center is (54, 54).
// The lightning bolt is sized and positioned with optical centering so all 4 inner gaps are visually equal.
const adaptiveForegroundSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 108 108" width="432" height="432" fill="none">
  <defs>
    <linearGradient id="af-bg" x1="20" y1="20" x2="88" y2="88" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#0e172a" />
      <stop offset="50%" stop-color="#080e1b" />
      <stop offset="100%" stop-color="#040711" />
    </linearGradient>
    <linearGradient id="af-bolt" x1="3" y1="2" x2="21" y2="22" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#00f0ff" />
      <stop offset="100%" stop-color="#ff007a" />
    </linearGradient>
    <filter id="af-glow" x="-30%" y="-30%" width="160%" height="160%">
      <feGaussianBlur stdDeviation="1.5" result="blur" />
      <feComposite in="SourceGraphic" in2="blur" operator="over" />
    </filter>
  </defs>

  <!-- Cyan Squircle Box Frame -->
  <rect x="20" y="20" width="68" height="68" rx="16.5" fill="url(#af-bg)" stroke="#00f0ff" stroke-width="3.8" stroke-opacity="0.95" />
  <rect x="22.5" y="22.5" width="63" height="63" rx="14" stroke="#ffffff" stroke-width="0.6" stroke-opacity="0.25" />

  <!-- Perfectly Centered Lightning Bolt inside the Squircle Box -->
  <g transform="translate(30.2, 30.2) scale(2.05)">
    <path d="M13 2L3 14H12L11 22L21 10H12L13 2Z" fill="url(#af-bolt)" stroke="#00f0ff" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" opacity="0.6" filter="url(#af-glow)" />
    <path d="M13 2L3 14H12L11 22L21 10H12L13 2Z" fill="url(#af-bolt)" stroke="#00f0ff" stroke-width="1.1" stroke-linecap="round" stroke-linejoin="round" />
  </g>
</svg>`;

// 2. Master Square & Web / PWA App Icon SVG (512x512)
// Frame: 440x440 at (36, 36), rx="106", stroke="#00f0ff" stroke-width="26"
// Inner center is (256, 256).
// With scale 14.5 and translate (87, 87), the bolt is centered.
const masterSquareSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512" fill="none">
  <defs>
    <linearGradient id="ms-bg" x1="36" y1="36" x2="476" y2="476" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#0e172a" />
      <stop offset="50%" stop-color="#080e1b" />
      <stop offset="100%" stop-color="#040711" />
    </linearGradient>
    <linearGradient id="ms-bolt" x1="3" y1="2" x2="21" y2="22" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#00f0ff" />
      <stop offset="100%" stop-color="#ff007a" />
    </linearGradient>
    <filter id="ms-glow" x="-30%" y="-30%" width="160%" height="160%">
      <feGaussianBlur stdDeviation="10" result="blur" />
      <feComposite in="SourceGraphic" in2="blur" operator="over" />
    </filter>
  </defs>

  <!-- Dark Base -->
  <rect width="512" height="512" fill="#040711" />

  <!-- Cyan Squircle Box Frame -->
  <rect x="36" y="36" width="440" height="440" rx="106" fill="url(#ms-bg)" stroke="#00f0ff" stroke-width="26" stroke-opacity="0.95" />
  <rect x="52" y="52" width="408" height="408" rx="90" stroke="#ffffff" stroke-width="3.5" stroke-opacity="0.25" />

  <!-- Perfectly Centered Lightning Bolt inside the Squircle Box -->
  <g transform="translate(87, 87) scale(14.5)">
    <path d="M13 2L3 14H12L11 22L21 10H12L13 2Z" fill="url(#ms-bolt)" stroke="#00f0ff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" opacity="0.6" filter="url(#ms-glow)" />
    <path d="M13 2L3 14H12L11 22L21 10H12L13 2Z" fill="url(#ms-bolt)" stroke="#00f0ff" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round" />
  </g>
</svg>`;

async function main() {
  const publicIconsDir = path.join(__dirname, '../public/icons');
  const androidResDir = path.join(__dirname, '../android/app/src/main/res');

  // Save base SVGs
  fs.writeFileSync(path.join(__dirname, '../public/favicon.svg'), masterSquareSvg);
  fs.writeFileSync(path.join(__dirname, '../public/logo.svg'), masterSquareSvg);

  // Web PNG icons
  const webSizes = [
    { name: 'icon-48.png', size: 48 },
    { name: 'icon-96.png', size: 96 },
    { name: 'icon-144.png', size: 144 },
    { name: 'icon-192.png', size: 192 },
    { name: 'icon-512.png', size: 512 },
    { name: 'apple-touch-icon.png', size: 180 },
    { name: 'icon-maskable-192.png', size: 192 },
    { name: 'icon-maskable-512.png', size: 512 },
  ];

  for (const { name, size } of webSizes) {
    await sharp(Buffer.from(masterSquareSvg))
      .resize(size, size)
      .png()
      .toFile(path.join(publicIconsDir, name));
  }

  await sharp(Buffer.from(masterSquareSvg)).resize(16, 16).png().toFile(path.join(__dirname, '../public/favicon-16x16.png'));
  await sharp(Buffer.from(masterSquareSvg)).resize(32, 32).png().toFile(path.join(__dirname, '../public/favicon-32x32.png'));
  await sharp(Buffer.from(masterSquareSvg)).resize(48, 48).png().toFile(path.join(__dirname, '../public/favicon-48x48.png'));
  await sharp(Buffer.from(masterSquareSvg)).resize(32, 32).png().toFile(path.join(__dirname, '../public/favicon.ico'));

  // Android Mipmap Folders
  const mipmaps = [
    { dir: 'mipmap-mdpi', fg: 108, legacy: 48 },
    { dir: 'mipmap-hdpi', fg: 162, legacy: 72 },
    { dir: 'mipmap-xhdpi', fg: 216, legacy: 96 },
    { dir: 'mipmap-xxhdpi', fg: 324, legacy: 144 },
    { dir: 'mipmap-xxxhdpi', fg: 432, legacy: 192 },
  ];

  for (const { dir, fg, legacy } of mipmaps) {
    const targetDir = path.join(androidResDir, dir);
    if (!fs.existsSync(targetDir)) fs.mkdirSync(targetDir, { recursive: true });

    // Adaptive Foreground
    await sharp(Buffer.from(adaptiveForegroundSvg))
      .resize(fg, fg)
      .png()
      .toFile(path.join(targetDir, 'ic_launcher_foreground.png'));

    // Legacy Launcher Square
    await sharp(Buffer.from(masterSquareSvg))
      .resize(legacy, legacy)
      .png()
      .toFile(path.join(targetDir, 'ic_launcher.png'));

    // Legacy Launcher Round
    await sharp(Buffer.from(masterSquareSvg))
      .resize(legacy, legacy)
      .png()
      .toFile(path.join(targetDir, 'ic_launcher_round.png'));

    console.log(`Generated Android ${dir}`);
  }

  console.log('All icons generated with exact centering!');
}

main().catch(console.error);
