const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

// ==========================================
// 1. MASTER SQUARE LOGO SVG (512x512)
// Exact website design: Dark base, Squircle with Cyan Neon Stroke, Centered Glowing Lightning Bolt
// ==========================================
const masterLogoSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512" fill="none">
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

// ==========================================
// 2. ANDROID ADAPTIVE ICON FOREGROUND (108x108 viewport)
// Centered glowing lightning bolt filling the adaptive icon safe zone (~54dp size)
// on a transparent canvas, so it fits edge-to-edge inside the launcher's squircle/circle mask!
// ==========================================
const adaptiveForegroundSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 108 108" width="432" height="432" fill="none">
  <defs>
    <linearGradient id="adapt-bolt" x1="3" y1="2" x2="21" y2="22" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#00f0ff" />
      <stop offset="100%" stop-color="#ff007a" />
    </linearGradient>

    <filter id="adapt-glow" x="-30%" y="-30%" width="160%" height="160%">
      <feGaussianBlur stdDeviation="2.5" result="blur" />
      <feComposite in="SourceGraphic" in2="blur" operator="over" />
    </filter>
  </defs>

  <!-- Glowing Lightning Bolt perfectly sized for Adaptive Icon Safe Zone (54dp diameter) -->
  <g transform="translate(54, 54) scale(2.7) translate(-12, -12)">
    <path d="M13 2L3 14H12L11 22L21 10H12L13 2Z" fill="url(#adapt-bolt)" stroke="#00f0ff" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" opacity="0.5" filter="url(#adapt-glow)" />
    <path d="M13 2L3 14H12L11 22L21 10H12L13 2Z" fill="url(#adapt-bolt)" stroke="#00f0ff" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" />
  </g>
</svg>`;

// ==========================================
// 3. ANDROID 12+ SPLASH ICON SVG (480x480)
// The entire square badge scaled to fit inside the 160dp circular splash mask
// ==========================================
const splashIconSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 480 480" width="480" height="480" fill="none">
  <defs>
    <linearGradient id="sp-bg" x1="110" y1="95" x2="370" y2="385" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#0e172a" />
      <stop offset="45%" stop-color="#080e1b" />
      <stop offset="100%" stop-color="#040711" />
    </linearGradient>

    <linearGradient id="sp-bolt" x1="3" y1="2" x2="21" y2="22" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#00f0ff" />
      <stop offset="100%" stop-color="#ff007a" />
    </linearGradient>

    <filter id="sp-glow" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="8" result="blur" />
      <feComposite in="SourceGraphic" in2="blur" operator="over" />
    </filter>
  </defs>

  <!-- Centered Rounded-Square Squircle Badge in Safe Circle -->
  <rect x="85" y="85" width="310" height="310" rx="72" fill="url(#sp-bg)" stroke="#00f0ff" stroke-width="14" stroke-opacity="0.95" />
  <rect x="94" y="94" width="292" height="292" rx="63" stroke="#ffffff" stroke-width="1.8" stroke-opacity="0.2" />

  <!-- Centered Lightning Bolt -->
  <g transform="translate(240, 240) scale(9.8) translate(-12, -12)">
    <path d="M13 2L3 14H12L11 22L21 10H12L13 2Z" fill="url(#sp-bolt)" stroke="#00f0ff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" opacity="0.4" filter="url(#sp-glow)" />
    <path d="M13 2L3 14H12L11 22L21 10H12L13 2Z" fill="url(#sp-bolt)" stroke="#00f0ff" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" />
  </g>
</svg>`;

async function run() {
  const rootDir = process.cwd();
  const androidResDir = path.join(rootDir, 'android', 'app', 'src', 'main', 'res');
  const drawableDir = path.join(androidResDir, 'drawable');
  const valuesDir = path.join(androidResDir, 'values');
  const valuesV31Dir = path.join(androidResDir, 'values-v31');
  const anydpiDir = path.join(androidResDir, 'mipmap-anydpi-v26');

  console.log('=== Final Android Splash & Launcher Alignment Starting ===');

  // 1. Clean old conflicting files
  const drawableV24 = path.join(androidResDir, 'drawable-v24');
  if (fs.existsSync(drawableV24)) fs.rmSync(drawableV24, { recursive: true, force: true });

  const oldSplashPng = path.join(drawableDir, 'splash.png');
  if (fs.existsSync(oldSplashPng)) fs.unlinkSync(oldSplashPng);

  // 2. Write splash_logo.png (512x512) and splash_icon.png (480x480)
  const masterBuf = Buffer.from(masterLogoSvg);
  const splashIconBuf = Buffer.from(splashIconSvg);
  const adaptBuf = Buffer.from(adaptiveForegroundSvg);

  await sharp(masterBuf).resize(512, 512).png({ quality: 100 }).toFile(path.join(drawableDir, 'splash_logo.png'));
  await sharp(splashIconBuf).resize(480, 480).png({ quality: 100 }).toFile(path.join(drawableDir, 'splash_icon.png'));
  console.log('✓ Generated drawable/splash_logo.png & drawable/splash_icon.png');

  // 3. Write layer-list drawable/splash.xml
  // This uses Android LayerList with gravity="center" so the logo is NEVER stretched on any screen ratio!
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
  console.log('✓ Written non-stretching layer-list drawable/splash.xml');

  // 4. Update all orientation-specific splash directories with non-stretched layer-list or centered bitmaps
  const orientDirs = [
    'drawable-port-mdpi', 'drawable-port-hdpi', 'drawable-port-xhdpi', 'drawable-port-xxhdpi', 'drawable-port-xxxhdpi',
    'drawable-land-mdpi', 'drawable-land-hdpi', 'drawable-land-xhdpi', 'drawable-land-xxhdpi', 'drawable-land-xxxhdpi'
  ];

  for (const d of orientDirs) {
    const oDir = path.join(androidResDir, d);
    if (fs.existsSync(oDir)) {
      // Remove old stretched splash.png and replace with splash.xml linking to splash_logo
      const oldPng = path.join(oDir, 'splash.png');
      if (fs.existsSync(oldPng)) fs.unlinkSync(oldPng);
      fs.writeFileSync(path.join(oDir, 'splash.xml'), splashLayerListXml);
    }
  }
  console.log('✓ Updated all orientation-specific drawables with non-stretching layer-list');

  // 5. Update Android Adaptive Foreground & Legacy Launcher Icons
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

    // Adaptive Foreground (Edge-to-edge clean launcher artwork)
    await sharp(adaptBuf)
      .resize(d.foregroundSize, d.foregroundSize)
      .png({ quality: 100 })
      .toFile(path.join(tDir, 'ic_launcher_foreground.png'));

    // Legacy Square Launcher Icon (Master logo badge)
    await sharp(masterBuf)
      .resize(d.iconSize, d.iconSize)
      .png({ quality: 100 })
      .toFile(path.join(tDir, 'ic_launcher.png'));

    // Legacy Round Launcher Icon
    await sharp(masterBuf)
      .resize(d.iconSize, d.iconSize)
      .png({ quality: 100 })
      .toFile(path.join(tDir, 'ic_launcher_round.png'));

    console.log(`✓ Generated ${d.dir} assets`);
  }

  // 6. Update Adaptive Icon XML
  const adaptiveXml = `<?xml version="1.0" encoding="utf-8"?>
<adaptive-icon xmlns:android="http://schemas.android.com/apk/res/android">
    <background android:drawable="@color/ic_launcher_background"/>
    <foreground android:drawable="@mipmap/ic_launcher_foreground"/>
</adaptive-icon>
`;
  if (!fs.existsSync(anydpiDir)) fs.mkdirSync(anydpiDir, { recursive: true });
  fs.writeFileSync(path.join(anydpiDir, 'ic_launcher.xml'), adaptiveXml);
  fs.writeFileSync(path.join(anydpiDir, 'ic_launcher_round.xml'), adaptiveXml);

  // 7. Update Colors XML
  if (!fs.existsSync(valuesDir)) fs.mkdirSync(valuesDir, { recursive: true });
  const colorsXml = `<?xml version="1.0" encoding="utf-8"?>
<resources>
    <color name="colorPrimary">#060913</color>
    <color name="colorPrimaryDark">#040711</color>
    <color name="colorAccent">#00f0ff</color>
    <color name="splashBackground">#060913</color>
    <color name="ic_launcher_background">#060913</color>
</resources>
`;
  fs.writeFileSync(path.join(valuesDir, 'colors.xml'), colorsXml);

  // 8. Update Base Styles XML & Android 12+ styles.xml
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

  console.log('=== All Android Splash & Launcher Assets Fixed Cleanly! ===');
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});
