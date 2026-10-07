const fs = require('fs');
const path = require('path');

const srcApk = path.join(__dirname, '../android/app/build/outputs/apk/debug/app-debug.apk');
const publicApk = path.join(__dirname, '../public/typebaazi.apk');
const distApk = path.join(__dirname, '../dist/typebaazi.apk');

if (fs.existsSync(srcApk)) {
  fs.copyFileSync(srcApk, publicApk);
  if (fs.existsSync(path.dirname(distApk))) {
    fs.copyFileSync(srcApk, distApk);
  }
  const stat = fs.statSync(publicApk);
  console.log(`Successfully updated public/typebaazi.apk (${(stat.size / (1024 * 1024)).toFixed(2)} MB)`);
} else {
  console.error(`Source APK not found at ${srcApk}`);
}
