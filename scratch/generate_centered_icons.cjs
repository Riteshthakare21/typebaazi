const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

// 1. Web / Standard Square App Icon SVG (512x512)
const webIconSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512" fill="none">
  <defs>
    <linearGradient id="bg-grad" x1="0" y1="0" x2="512" y2="512" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#0e172a" />
      <stop offset="50%" stop-color="#080e1b" />
      <stop offset="100%" stop-color="#040711" />
    </linearGradient>
    <linearGradient id="bolt-grad" x1="3" y1="2" x2="21" y2="22" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#00f0ff" />
      <stop offset="100%" stop-color="#ff007a" />
    </linearGradient>
    <filter id="bolt-glow" x="-30%" y="-30%" width="160%" height="160%">
      <feGaussianBlur stdDeviation="12" result="blur" />
      <feComposite in="SourceGraphic" in2="blur" operator="over" />
    </filter>
  </defs>

  <!-- Solid Background -->
  <rect width="512" height="512" rx="112" fill="url(#bg-grad)" />
  <rect x="6" y="6" width="500" height="500" rx="106" stroke="#00f0ff" stroke-width="8" stroke-opacity="0.5" />

  <!-- Perfectly Centered Lightning Bolt -->
  <g transform="translate(256, 256) scale(16.5) translate(-12, -12)">
    <path d="M13 2L3 14H12L11 22L21 10H12L13 2Z" fill="url(#bolt-grad)" stroke="#00f0ff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" opacity="0.6" filter="url(#bolt-glow)" />
    <path d="M13 2L3 14H12L11 22L21 10H12L13 2Z" fill="url(#bolt-grad)" stroke="#00f0ff" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" />
  </g>
</svg>`;

// 2. PWA Maskable Full-Bleed Icon SVG (512x512)
const maskableIconSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512" fill="none">
  <defs>
    <linearGradient id="mask-bg" x1="0" y1="0" x2="512" y2="512" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#0e172a" />
      <stop offset="50%" stop-color="#080e1b" />
      <stop offset="100%" stop-color="#040711" />
    </linearGradient>
    <linearGradient id="mask-bolt" x1="3" y1="2" x2="21" y2="22" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#00f0ff" />
      <stop offset="100%" stop-color="#ff007a" />
    </linearGradient>
    <filter id="mask-glow" x="-30%" y="-30%" width="160%" height="160%">
      <feGaussianBlur stdDeviation="10" result="blur" />
      <feComposite in="SourceGraphic" in2="blur" operator="over" />
    </filter>
  </defs>

  <!-- Full Bleed Background without Border for Safe Masking -->
  <rect width="512" height="512" fill="url(#mask-bg)" />

  <!-- Perfectly Centered Lightning Bolt in 60% Safe Zone (diameter ~300px) -->
  <g transform="translate(256, 256) scale(13.5) translate(-12, -12)">
    <path d="M13 2L3 14H12L11 22L21 10H12L13 2Z" fill="url(#mask-bolt)" stroke="#00f0ff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" opacity="0.6" filter="url(#mask-glow)" />
    <path d="M13 2L3 14H12L11 22L21 10H12L13 2Z" fill="url(#mask-bolt)" stroke="#00f0ff" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" />
  </g>
</svg>`;

// 3. Android Adaptive Icon Foreground SVG (108x108 Viewport with 66dp Safe Zone)
// Note: Android draws the launcher background from @color/ic_launcher_background (#080e1b).
// The foreground MUST NOT have a nested box/border so the launcher icon looks seamless and clean!
const androidForegroundSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 108 108" width="432" height="432" fill="none">
  <defs>
    <linearGradient id="fg-bolt" x1="3" y1="2" x2="21" y2="22" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#00f0ff" />
      <stop offset="100%" stop-color="#ff007a" />
    </linearGradient>
    <filter id="fg-glow" x="-30%" y="-30%" width="160%" height="160%">
      <feGaussianBlur stdDeviation="1.8" result="blur" />
      <feComposite in="SourceGraphic" in2="blur" operator="over" />
    </filter>
  </defs>

  <!-- Transparent Background with Perfectly Centered Lightning Bolt in Safe Area -->
  <g transform="translate(54, 54) scale(2.65) translate(-12, -12)">
    <path d="M13 2L3 14H12L11 22L21 10H12L13 2Z" fill="url(#fg-bolt)" stroke="#00f0ff" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" opacity="0.5" filter="url(#fg-glow)" />
    <path d="M13 2L3 14H12L11 22L21 10H12L13 2Z" fill="url(#fg-bolt)" stroke="#00f0ff" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" />
  </g>
</svg>`;

// 4. Android Legacy Round Icon SVG (512x512)
const androidLegacyRoundSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512" fill="none">
  <defs>
    <linearGradient id="lr-bg" x1="0" y1="0" x2="512" y2="512" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#0e172a" />
      <stop offset="50%" stop-color="#080e1b" />
      <stop offset="100%" stop-color="#040711" />
    </linearGradient>
    <linearGradient id="lr-bolt" x1="3" y1="2" x2="21" y2="22" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#00f0ff" />
      <stop offset="100%" stop-color="#ff007a" />
    </linearGradient>
    <filter id="lr-glow" x="-30%" y="-30%" width="160%" height="160%">
      <feGaussianBlur stdDeviation="10" result="blur" />
      <feComposite in="SourceGraphic" in2="blur" operator="over" />
    </filter>
  </defs>

  <circle cx="256" cy="256" r="256" fill="url(#lr-bg)" />
  <circle cx="256" cy="256" r="248" stroke="#00f0ff" stroke-width="8" stroke-opacity="0.5" />

  <g transform="translate(256, 256) scale(14.5) translate(-12, -12)">
    <path d="M13 2L3 14H12L11 22L21 10H12L13 2Z" fill="url(#lr-bolt)" stroke="#00f0ff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" opacity="0.6" filter="url(#lr-glow)" />
    <path d="M13 2L3 14H12L11 22L21 10H12L13 2Z" fill="url(#lr-bolt)" stroke="#00f0ff" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" />
  </g>
</svg>`;

async function main() {
  const publicIconsDir = path.join(__dirname, '../public/icons');
  const androidResDir = path.join(__dirname, '../android/app/src/main/res');

  // Save base SVGs to public
  fs.writeFileSync(path.join(__dirname, '../public/favicon.svg'), webIconSvg);
  fs.writeFileSync(path.join(__dirname, '../public/logo.svg'), webIconSvg);
  fs.writeFileSync(path.join(__dirname, '../public/logo-circle.svg'), androidLegacyRoundSvg);

  // 1. Generate Public Web Icons
  const webSizes = [
    { name: 'icon-48.png', size: 48 },
    { name: 'icon-96.png', size: 96 },
    { name: 'icon-144.png', size: 144 },
    { name: 'icon-192.png', size: 192 },
    { name: 'icon-512.png', size: 512 },
    { name: 'apple-touch-icon.png', size: 180 },
  ];

  for (const { name, size } of webSizes) {
    await sharp(Buffer.from(webIconSvg))
      .resize(size, size)
      .png()
      .toFile(path.join(publicIconsDir, name));
    console.log(`Generated public/icons/${name} (${size}x${size})`);
  }

  // Favicon 16, 32, 48 in public
  await sharp(Buffer.from(webIconSvg)).resize(16, 16).png().toFile(path.join(__dirname, '../public/favicon-16x16.png'));
  await sharp(Buffer.from(webIconSvg)).resize(32, 32).png().toFile(path.join(__dirname, '../public/favicon-32x32.png'));
  await sharp(Buffer.from(webIconSvg)).resize(48, 48).png().toFile(path.join(__dirname, '../public/favicon-48x48.png'));
  await sharp(Buffer.from(webIconSvg)).resize(32, 32).png().toFile(path.join(__dirname, '../public/favicon.ico'));

  // Maskable Web Icons
  const maskSizes = [
    { name: 'icon-maskable-192.png', size: 192 },
    { name: 'icon-maskable-512.png', size: 512 },
  ];
  for (const { name, size } of maskSizes) {
    await sharp(Buffer.from(maskableIconSvg))
      .resize(size, size)
      .png()
      .toFile(path.join(publicIconsDir, name));
    console.log(`Generated public/icons/${name} (${size}x${size})`);
  }

  // 2. Generate Android Mipmap Icons
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
    await sharp(Buffer.from(androidForegroundSvg))
      .resize(fg, fg)
      .png()
      .toFile(path.join(targetDir, 'ic_launcher_foreground.png'));

    // Legacy Square Launcher
    await sharp(Buffer.from(webIconSvg))
      .resize(legacy, legacy)
      .png()
      .toFile(path.join(targetDir, 'ic_launcher.png'));

    // Legacy Round Launcher
    await sharp(Buffer.from(androidLegacyRoundSvg))
      .resize(legacy, legacy)
      .png()
      .toFile(path.join(targetDir, 'ic_launcher_round.png'));

    console.log(`Generated Android ${dir}: fg(${fg}x${fg}), legacy(${legacy}x${legacy})`);
  }

  console.log('All icons generated with perfect optical centering!');
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
