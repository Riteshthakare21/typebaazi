const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

// ==========================================
// 1. EXACT OFFICIAL TYPEBAAZI MASTER LOGO (512x512)
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
// 2. ANDROID 12+ SPLASH ICON SVG (480x480)
// Android 12 masks windowSplashScreenAnimatedIcon to a 160dp circle (diameter = 160dp).
// Inside the 160dp circle, the safe icon zone is central 112dp (70% of canvas).
// In 480x480 canvas, size is 316x316 placed at (82, 82).
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

// ==========================================
// 3. ANDROID ADAPTIVE ICON FOREGROUND SVG (108x108)
// 108dp canvas with central 66dp safe zone
// ==========================================
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

async function run() {
  const rootDir = process.cwd();
  const androidResDir = path.join(rootDir, 'android', 'app', 'src', 'main', 'res');

  console.log('=== Cleaning & Rebuilding Android Splash & Branding ===');

  // 1. DELETE ANY CONFLICTING DEFAULT ANDROID STUDIO ASSETS
  const drawableV24 = path.join(androidResDir, 'drawable-v24');
  if (fs.existsSync(drawableV24)) {
    fs.rmSync(drawableV24, { recursive: true, force: true });
    console.log('✓ Removed conflicting default drawable-v24 directory');
  }

  const masterBuf = Buffer.from(masterLogoSvg);
  const splashIconBuf = Buffer.from(splashIconSvg);
  const adaptBuf = Buffer.from(adaptiveForegroundSvg);

  // 2. Generate Android 12+ splash_icon.png in drawable and mipmaps
  const drawableDir = path.join(androidResDir, 'drawable');
  if (!fs.existsSync(drawableDir)) fs.mkdirSync(drawableDir, { recursive: true });

  await sharp(splashIconBuf)
    .resize(480, 480)
    .png({ quality: 100 })
    .toFile(path.join(drawableDir, 'splash_icon.png'));
  console.log('✓ Generated drawable/splash_icon.png (480x480 for Android 12+)');

  // 3. Generate Android Adaptive Foreground & Legacy Icons for all screen densities
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

    // Adaptive Foreground
    await sharp(adaptBuf)
      .resize(d.foregroundSize, d.foregroundSize)
      .png({ quality: 100 })
      .toFile(path.join(tDir, 'ic_launcher_foreground.png'));

    // Legacy Square Launcher Icon (Exact master logo)
    await sharp(masterBuf)
      .resize(d.iconSize, d.iconSize)
      .png({ quality: 100 })
      .toFile(path.join(tDir, 'ic_launcher.png'));

    // Legacy Round Launcher Icon
    await sharp(masterBuf)
      .resize(d.iconSize, d.iconSize)
      .png({ quality: 100 })
      .toFile(path.join(tDir, 'ic_launcher_round.png'));

    console.log(`✓ Updated ${d.dir} assets`);
  }

  // 4. Generate All Fullscreen Splash Drawables
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

    // Logo size: exactly 42% of min dimension
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

  // 5. Update Colors XML
  const valuesDir = path.join(androidResDir, 'values');
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
  const oldBgFile = path.join(valuesDir, 'ic_launcher_background.xml');
  if (fs.existsSync(oldBgFile)) fs.unlinkSync(oldBgFile);
  console.log('✓ Updated values/colors.xml');

  // 6. Update Base Styles XML
  const stylesXml = `<?xml version="1.0" encoding="utf-8"?>
<resources>
    <!-- Base application theme. -->
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

  // 7. Update Android 12+ (API 31+) values-v31/styles.xml
  const valuesV31Dir = path.join(androidResDir, 'values-v31');
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
  console.log('✓ Written values-v31/styles.xml for official Android 12+ SplashScreen API');

  // 8. Update Adaptive Icon XML in mipmap-anydpi-v26
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
  console.log('✓ Written mipmap-anydpi-v26 adaptive-icon XML');

  console.log('=== Android Branding & Splash Screen Fixed Successfully ===');
}

run().catch(err => {
  console.error('Error fixing splash & branding:', err);
  process.exit(1);
});
