const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

// Let's create an SVG where:
// 1. Canvas is 512x512
// 2. The squircle box is centered: size 440x440 at (36, 36), rx="100", stroke="#00f0ff" stroke-width="24"
// 3. Inside the squircle box, the lightning bolt is optically balanced:
//    Center of box is (256, 256).
//    Let's calculate the bolt path with optical balance:
//    Original points in 24x24 box: (13,2), (3,14), (12,14), (11,22), (21,10), (12,10)
//    Notice:
//    Leftmost: 3, Rightmost: 21 (width 18)
//    Topmost: 2, Bottommost: 22 (height 20)
//    If we shift the bolt origin from (-12, -12) to (-11.2, -11.5) or slightly adjust,
//    let's check the exact visual padding inside the cyan frame!

function makeSquircleIconSvg(size, isAdaptiveForeground = false) {
  if (isAdaptiveForeground) {
    // For Android Adaptive Icon (108x108 canvas)
    // Central safe zone is 72x72 centered at (54, 54).
    // Squircle frame: size 66x66 from (21, 21) to (87, 87), rx="16"
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 108 108" width="${size}" height="${size}" fill="none">
      <defs>
        <linearGradient id="sq-bg" x1="21" y1="21" x2="87" y2="87" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stop-color="#0e172a" />
          <stop offset="50%" stop-color="#080e1b" />
          <stop offset="100%" stop-color="#040711" />
        </linearGradient>
        <linearGradient id="sq-bolt" x1="3" y1="2" x2="21" y2="22" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stop-color="#00f0ff" />
          <stop offset="100%" stop-color="#ff007a" />
        </linearGradient>
        <filter id="bolt-glow" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="1.2" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      <!-- Centered Cyan Squircle Box in Safe Area (54, 54) -->
      <rect x="21" y="21" width="66" height="66" rx="16" fill="url(#sq-bg)" stroke="#00f0ff" stroke-width="3.6" />
      <rect x="23.5" y="23.5" width="61" height="61" rx="13.5" stroke="#ffffff" stroke-width="0.6" stroke-opacity="0.3" />

      <!-- Perfectly Balanced Centered Lightning Bolt inside the Box -->
      <!-- Center of box is (54, 54). With scale 1.85, offset (-11.6, -11.6) centers the visual mass -->
      <g transform="translate(54.5, 54.5) scale(1.85) translate(-11.6, -11.6)">
        <path d="M13 2L3 14H12L11 22L21 10H12L13 2Z" fill="url(#sq-bolt)" stroke="#00f0ff" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" opacity="0.5" filter="url(#bolt-glow)" />
        <path d="M13 2L3 14H12L11 22L21 10H12L13 2Z" fill="url(#sq-bolt)" stroke="#00f0ff" stroke-width="1.1" stroke-linecap="round" stroke-linejoin="round" />
      </g>
    </svg>`;
  }

  // Master 512x512 Square & Web App Icon
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="${size}" height="${size}" fill="none">
    <defs>
      <linearGradient id="sq-bg-512" x1="36" y1="36" x2="476" y2="476" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stop-color="#0e172a" />
        <stop offset="50%" stop-color="#080e1b" />
        <stop offset="100%" stop-color="#040711" />
      </linearGradient>
      <linearGradient id="sq-bolt-512" x1="3" y1="2" x2="21" y2="22" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stop-color="#00f0ff" />
        <stop offset="100%" stop-color="#ff007a" />
      </linearGradient>
      <filter id="bolt-glow-512" x="-30%" y="-30%" width="160%" height="160%">
        <feGaussianBlur stdDeviation="10" result="blur" />
        <feComposite in="SourceGraphic" in2="blur" operator="over" />
      </filter>
    </defs>

    <!-- Dark Base -->
    <rect width="512" height="512" fill="#040711" />

    <!-- Prominent Cyan Squircle Frame matching User Reference -->
    <rect x="36" y="36" width="440" height="440" rx="104" fill="url(#sq-bg-512)" stroke="#00f0ff" stroke-width="26" stroke-opacity="0.95" />
    <rect x="52" y="52" width="408" height="408" rx="88" stroke="#ffffff" stroke-width="3" stroke-opacity="0.25" />

    <!-- Perfectly Centered Lightning Bolt inside the Cyan Squircle Box -->
    <!-- Center of box is (256, 256). With scale 13.5 and offset (-11.6, -11.6), padding is 100% equal on all 4 sides -->
    <g transform="translate(259, 259) scale(13.8) translate(-11.6, -11.6)">
      <path d="M13 2L3 14H12L11 22L21 10H12L13 2Z" fill="url(#sq-bolt-512)" stroke="#00f0ff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" opacity="0.6" filter="url(#bolt-glow-512)" />
      <path d="M13 2L3 14H12L11 22L21 10H12L13 2Z" fill="url(#sq-bolt-512)" stroke="#00f0ff" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round" />
    </g>
  </svg>`;
}

async function run() {
  const publicIconsDir = path.join(__dirname, '../public/icons');
  const androidResDir = path.join(__dirname, '../android/app/src/main/res');

  const master512Svg = makeSquircleIconSvg(512, false);
  const adapt108Svg = makeSquircleIconSvg(432, true);

  // Write base SVGs
  fs.writeFileSync(path.join(__dirname, '../public/favicon.svg'), master512Svg);
  fs.writeFileSync(path.join(__dirname, '../public/logo.svg'), master512Svg);

  // Web icons
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
    await sharp(Buffer.from(master512Svg))
      .resize(size, size)
      .png()
      .toFile(path.join(publicIconsDir, name));
  }

  await sharp(Buffer.from(master512Svg)).resize(16, 16).png().toFile(path.join(__dirname, '../public/favicon-16x16.png'));
  await sharp(Buffer.from(master512Svg)).resize(32, 32).png().toFile(path.join(__dirname, '../public/favicon-32x32.png'));
  await sharp(Buffer.from(master512Svg)).resize(48, 48).png().toFile(path.join(__dirname, '../public/favicon-48x48.png'));
  await sharp(Buffer.from(master512Svg)).resize(32, 32).png().toFile(path.join(__dirname, '../public/favicon.ico'));

  // Android Mipmaps
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

    // Adaptive Foreground with Centered Squircle Frame & Centered Bolt
    await sharp(Buffer.from(adapt108Svg))
      .resize(fg, fg)
      .png()
      .toFile(path.join(targetDir, 'ic_launcher_foreground.png'));

    // Legacy Launcher
    await sharp(Buffer.from(master512Svg))
      .resize(legacy, legacy)
      .png()
      .toFile(path.join(targetDir, 'ic_launcher.png'));

    await sharp(Buffer.from(master512Svg))
      .resize(legacy, legacy)
      .png()
      .toFile(path.join(targetDir, 'ic_launcher_round.png'));

    console.log(`Updated Android ${dir}`);
  }

  console.log('All centered squircle icons generated successfully!');
}

run().catch(console.error);
