const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

// =========================================================================
// 1. MASTER STANDARD LOGO SVG (512x512) - "purpose": "any"
// Exact 1:1 scale of Navbar.astro brand logo:
// <rect x="1.5" y="1.5" width="29" height="29" rx="8" fill="#080e1b" stroke="#00f0ff" stroke-width="1.6" />
// <g transform="translate(4, 4)"><path d="M13 2L3 14H12L11 22L21 10H12L13 2Z" ... stroke-width="1.4" /></g>
// =========================================================================
const masterAnySvg = `<svg width="512" height="512" viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bolt-grad-any" x1="48" y1="32" x2="336" y2="352" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#00f0ff"/>
      <stop offset="100%" stop-color="#ff007a"/>
    </linearGradient>
  </defs>

  <!-- Exact Squircle Badge matching Navbar Logo -->
  <rect x="24" y="24" width="464" height="464" rx="128" fill="#080e1b" stroke="#00f0ff" stroke-width="25.6" />
  
  <!-- Exact Centered Lightning Bolt -->
  <g transform="translate(64, 64) scale(16)">
    <path d="M13 2L3 14H12L11 22L21 10H12L13 2Z" fill="url(#bolt-grad-any)" stroke="#00f0ff" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>
  </g>
</svg>`;

// =========================================================================
// 2. MASTER MASKABLE LOGO SVG (512x512) - "purpose": "maskable"
// Meets W3C Maskable Icon Standard:
// - Edge-to-edge solid background: #080e1b
// - Complete TypeBaazi logo strictly inside 80% Safe Zone (352x352 in center)
// - Launcher circle / squircle / teardrop crop will NEVER cut the cyan border or bolt!
// =========================================================================
const masterMaskableSvg = `<svg width="512" height="512" viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bolt-grad-mask" x1="33" y1="22" x2="231" y2="242" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#00f0ff"/>
      <stop offset="100%" stop-color="#ff007a"/>
    </linearGradient>
  </defs>

  <!-- Edge-to-edge full canvas background -->
  <rect width="512" height="512" fill="#080e1b"/>

  <!-- Centered Squircle Badge inside Safe Zone (352x352) -->
  <rect x="80" y="80" width="352" height="352" rx="96" fill="#080e1b" stroke="#00f0ff" stroke-width="19.2" />
  
  <!-- Centered Lightning Bolt -->
  <g transform="translate(110.4, 110.4) scale(12.138)">
    <path d="M13 2L3 14H12L11 22L21 10H12L13 2Z" fill="url(#bolt-grad-mask)" stroke="#00f0ff" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>
  </g>
</svg>`;

// =========================================================================
// 3. ANDROID ADAPTIVE FOREGROUND SVG (432x432 / 108dp canvas)
// Safe zone is central 66dp-72dp. Logo is 68dp x 68dp.
// =========================================================================
const adaptiveForegroundSvg = `<svg width="432" height="432" viewBox="0 0 108 108" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bolt-grad-adapt" x1="10" y1="7" x2="71" y2="74" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#00f0ff"/>
      <stop offset="100%" stop-color="#ff007a"/>
    </linearGradient>
  </defs>

  <!-- Centered Squircle Badge inside 72dp Safe Area (68dp x 68dp) -->
  <rect x="20" y="20" width="68" height="68" rx="18.7" fill="#080e1b" stroke="#00f0ff" stroke-width="3.7" />
  
  <!-- Centered Lightning Bolt -->
  <g transform="translate(29.4, 29.4) scale(2.35)">
    <path d="M13 2L3 14H12L11 22L21 10H12L13 2Z" fill="url(#bolt-grad-adapt)" stroke="#00f0ff" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>
  </g>
</svg>`;

// =========================================================================
// 4. ANDROID 12+ SPLASH ICON SVG (480x480)
// Central 288x288 icon window inside splash system
// =========================================================================
const splashIconSvg = `<svg width="480" height="480" viewBox="0 0 480 480" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bolt-grad-splash" x1="45" y1="30" x2="315" y2="330" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#00f0ff"/>
      <stop offset="100%" stop-color="#ff007a"/>
    </linearGradient>
  </defs>

  <!-- Centered Squircle Badge inside Splash Window (300x300) -->
  <rect x="90" y="90" width="300" height="300" rx="82" fill="#080e1b" stroke="#00f0ff" stroke-width="16.5" />
  
  <!-- Centered Lightning Bolt -->
  <g transform="translate(115.8, 115.8) scale(10.34)">
    <path d="M13 2L3 14H12L11 22L21 10H12L13 2Z" fill="url(#bolt-grad-splash)" stroke="#00f0ff" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>
  </g>
</svg>`;

async function buildAllAssets() {
  const rootDir = process.cwd();
  const publicDir = path.join(rootDir, 'public');
  const iconsDir = path.join(publicDir, 'icons');
  const androidResDir = path.join(rootDir, 'android', 'app', 'src', 'main', 'res');
  const drawableDir = path.join(androidResDir, 'drawable');
  const valuesDir = path.join(androidResDir, 'values');
  const valuesV31Dir = path.join(androidResDir, 'values-v31');
  const anydpiDir = path.join(androidResDir, 'mipmap-anydpi-v26');

  console.log('=== Building Perfect PWA, Favicon, Splash & Android Icon Pipeline ===');

  if (!fs.existsSync(iconsDir)) fs.mkdirSync(iconsDir, { recursive: true });

  // 1. Write Master SVGs
  fs.writeFileSync(path.join(publicDir, 'logo.svg'), masterAnySvg);
  fs.writeFileSync(path.join(publicDir, 'favicon.svg'), masterAnySvg);
  console.log('✓ Written public/logo.svg & public/favicon.svg');

  const anyBuf = Buffer.from(masterAnySvg);
  const maskableBuf = Buffer.from(masterMaskableSvg);
  const adaptBuf = Buffer.from(adaptiveForegroundSvg);
  const splashBuf = Buffer.from(splashIconSvg);

  // 2. Generate Favicon PNGs
  const favicons = [
    { name: 'favicon-16x16.png', size: 16 },
    { name: 'favicon-32x32.png', size: 32 },
    { name: 'favicon-48x48.png', size: 48 }
  ];
  for (const f of favicons) {
    await sharp(anyBuf).resize(f.size, f.size).png({ quality: 100 }).toFile(path.join(publicDir, f.name));
    console.log(`✓ Generated public/${f.name}`);
  }

  // 3. Generate Multi-size favicon.ico
  const icoSizes = [16, 32, 48];
  const images = [];
  for (const s of icoSizes) {
    const b = await sharp(anyBuf).resize(s, s).png().toBuffer();
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

  // 4. Generate Standard PWA Icons ("purpose": "any")
  const standardPwa = [
    { name: 'icon-48.png', size: 48 },
    { name: 'icon-96.png', size: 96 },
    { name: 'icon-144.png', size: 144 },
    { name: 'apple-touch-icon.png', size: 180 },
    { name: 'icon-192.png', size: 192 },
    { name: 'icon-512.png', size: 512 }
  ];
  for (const p of standardPwa) {
    await sharp(anyBuf).resize(p.size, p.size).png({ quality: 100 }).toFile(path.join(iconsDir, p.name));
    console.log(`✓ Generated public/icons/${p.name} (any)`);
  }

  // 5. Generate Maskable PWA Icons ("purpose": "maskable")
  const maskablePwa = [
    { name: 'icon-maskable-192.png', size: 192 },
    { name: 'icon-maskable-512.png', size: 512 }
  ];
  for (const m of maskablePwa) {
    await sharp(maskableBuf).resize(m.size, m.size).png({ quality: 100 }).toFile(path.join(iconsDir, m.name));
    console.log(`✓ Generated public/icons/${m.name} (maskable)`);
  }

  // 6. Android Drawables for Non-Stretching Splash Screen
  if (!fs.existsSync(drawableDir)) fs.mkdirSync(drawableDir, { recursive: true });

  const drawableV24 = path.join(androidResDir, 'drawable-v24');
  if (fs.existsSync(drawableV24)) fs.rmSync(drawableV24, { recursive: true, force: true });
  const oldSplashPng = path.join(drawableDir, 'splash.png');
  if (fs.existsSync(oldSplashPng)) fs.unlinkSync(oldSplashPng);

  await sharp(anyBuf).resize(512, 512).png({ quality: 100 }).toFile(path.join(drawableDir, 'splash_logo.png'));
  await sharp(splashBuf).resize(480, 480).png({ quality: 100 }).toFile(path.join(drawableDir, 'splash_icon.png'));
  console.log('✓ Generated drawable/splash_logo.png & drawable/splash_icon.png');

  const splashLayerListXml = `<?xml version="1.0" encoding="utf-8"?>
<layer-list xmlns:android="http://schemas.android.com/apk/res/android">
    <item android:drawable="@color/splashBackground" />
    <item
        android:gravity="center"
        android:width="160dp"
        android:height="160dp"
        android:drawable="@drawable/splash_logo" />
</layer-list>
`;
  fs.writeFileSync(path.join(drawableDir, 'splash.xml'), splashLayerListXml);

  const orientDirs = [
    'drawable-port-mdpi', 'drawable-port-hdpi', 'drawable-port-xhdpi', 'drawable-port-xxhdpi', 'drawable-port-xxxhdpi',
    'drawable-land-mdpi', 'drawable-land-hdpi', 'drawable-land-xhdpi', 'drawable-land-xxhdpi', 'drawable-land-xxxhdpi'
  ];
  for (const d of orientDirs) {
    const oDir = path.join(androidResDir, d);
    if (fs.existsSync(oDir)) {
      const oldPng = path.join(oDir, 'splash.png');
      if (fs.existsSync(oldPng)) fs.unlinkSync(oldPng);
      fs.writeFileSync(path.join(oDir, 'splash.xml'), splashLayerListXml);
    }
  }

  // 7. Android Adaptive & Legacy Mipmap Icons
  const densities = [
    { dir: 'mipmap-mdpi', iconSize: 48, foregroundSize: 108 },
    { dir: 'mipmap-hdpi', iconSize: 72, foregroundSize: 162 },
    { dir: 'mipmap-xhdpi', iconSize: 96, foregroundSize: 216 },
    { dir: 'mipmap-xxhdpi', iconSize: 144, foregroundSize: 324 },
    { dir: 'mipmap-xxxhdpi', iconSize: 192, foregroundSize: 432 }
  ];

  for (const d of densities) {
    const tDir = path.join(androidResDir, d.dir);
    if (!fs.existsSync(tDir)) fs.mkdirSync(tDir, { recursive: true });

    await sharp(adaptBuf)
      .resize(d.foregroundSize, d.foregroundSize)
      .png({ quality: 100 })
      .toFile(path.join(tDir, 'ic_launcher_foreground.png'));

    await sharp(anyBuf)
      .resize(d.iconSize, d.iconSize)
      .png({ quality: 100 })
      .toFile(path.join(tDir, 'ic_launcher.png'));

    await sharp(anyBuf)
      .resize(d.iconSize, d.iconSize)
      .png({ quality: 100 })
      .toFile(path.join(tDir, 'ic_launcher_round.png'));

    console.log(`✓ Generated Android ${d.dir} icons`);
  }

  // 8. Adaptive Icon XML
  const adaptiveXml = `<?xml version="1.0" encoding="utf-8"?>
<adaptive-icon xmlns:android="http://schemas.android.com/apk/res/android">
    <background android:drawable="@color/ic_launcher_background"/>
    <foreground android:drawable="@mipmap/ic_launcher_foreground"/>
</adaptive-icon>
`;
  if (!fs.existsSync(anydpiDir)) fs.mkdirSync(anydpiDir, { recursive: true });
  fs.writeFileSync(path.join(anydpiDir, 'ic_launcher.xml'), adaptiveXml);
  fs.writeFileSync(path.join(anydpiDir, 'ic_launcher_round.xml'), adaptiveXml);

  // 9. Android Colors XML
  if (!fs.existsSync(valuesDir)) fs.mkdirSync(valuesDir, { recursive: true });
  const colorsXml = `<?xml version="1.0" encoding="utf-8"?>
<resources>
    <color name="colorPrimary">#080e1b</color>
    <color name="colorPrimaryDark">#040711</color>
    <color name="colorAccent">#00f0ff</color>
    <color name="splashBackground">#080e1b</color>
    <color name="ic_launcher_background">#080e1b</color>
</resources>
`;
  fs.writeFileSync(path.join(valuesDir, 'colors.xml'), colorsXml);

  // 10. Android Styles XML
  const stylesXml = `<?xml version="1.0" encoding="utf-8"?>
<resources>
    <style name="AppTheme" parent="Theme.AppCompat.DayNight.NoActionBar">
        <item name="colorPrimary">@color/colorPrimary</item>
        <item name="colorPrimaryDark">@color/colorPrimaryDark</item>
        <item name="colorAccent">@color/colorAccent</item>
    </style>

    <style name="AppTheme.NoActionBar" parent="Theme.AppCompat.DayNight.NoActionBar">
        <item name="windowActionBar">false</item>
        <item name="windowNoTitle">true</item>
        <item name="android:background">@null</item>
    </style>

    <style name="AppTheme.NoActionBarLaunch" parent="Theme.SplashScreen">
        <item name="windowSplashScreenBackground">@color/splashBackground</item>
        <item name="windowSplashScreenAnimatedIcon">@drawable/splash_icon</item>
        <item name="postSplashScreenTheme">@style/AppTheme.NoActionBar</item>
        <item name="android:background">@drawable/splash</item>
    </style>
</resources>
`;
  fs.writeFileSync(path.join(valuesDir, 'styles.xml'), stylesXml);

  if (!fs.existsSync(valuesV31Dir)) fs.mkdirSync(valuesV31Dir, { recursive: true });
  const stylesV31Xml = `<?xml version="1.0" encoding="utf-8"?>
<resources>
    <style name="AppTheme.NoActionBarLaunch" parent="Theme.SplashScreen">
        <item name="windowSplashScreenBackground">@color/splashBackground</item>
        <item name="windowSplashScreenAnimatedIcon">@drawable/splash_icon</item>
        <item name="postSplashScreenTheme">@style/AppTheme.NoActionBar</item>
    </style>
</resources>
`;
  fs.writeFileSync(path.join(valuesV31Dir, 'styles.xml'), stylesV31Xml);

  console.log('=== All Icon, Splash & Manifest Assets Built Successfully! ===');
}

buildAllAssets().catch(err => {
  console.error('Error generating assets:', err);
  process.exit(1);
});
