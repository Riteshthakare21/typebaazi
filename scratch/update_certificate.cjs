const fs = require('fs');
const path = require('path');

const sigDataUrl = fs.readFileSync(path.join(__dirname, 'signature_data_url.txt'), 'utf8').trim();

const code = `/**
 * TypeBaazi Official Certificate Generator
 * High-Resolution (2400x1600, 300 DPI) Canvas -> PDF Generator
 * Creates valid, downloadable PDF certificates for Grand Prix victories and speed milestones.
 */

export interface CertificateData {
  userName?: string;
  playerName?: string;
  wpm: number;
  accuracy: number | string;
  errors?: number;
  timeSec?: number | string;
  raceDuration?: number | string;
  trackName?: string;
  date?: string;
  issueDate?: string;
  certificateId?: string;
  verificationId?: string;
  gameMode?: string;
  language?: string;
  position?: number;
}

// Authentic Handwritten Signature Data URL for R. Thakare
export const THAKARE_SIGNATURE_DATA_URL = '${sigDataUrl}';

/**
 * Helper to preload an image from Data URL or path
 */
function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error('Failed to load image: ' + src.substring(0, 40)));
    img.src = src;
  });
}

/**
 * Converts raw JPEG Blob/ArrayBuffer into a valid, standard PDF 1.4 binary file.
 */
export function convertJpegToPdf(jpegBytes: Uint8Array, width: number, height: number): Uint8Array {
  const encoder = new TextEncoder();
  const pdfHeader = encoder.encode('%PDF-1.4\\n');
  const offsets: number[] = [];

  function addObj(content: Uint8Array | string): Uint8Array {
    offsets.push(currentOffset);
    const body = typeof content === 'string' ? encoder.encode(content) : content;
    const objNum = offsets.length;
    const header = encoder.encode(\`\${objNum} 0 obj\\n\`);
    const footer = encoder.encode('\\nendobj\\n');

    const totalLen = header.length + body.length + footer.length;
    const combined = new Uint8Array(totalLen);
    combined.set(header, 0);
    combined.set(body, header.length);
    combined.set(footer, header.length + body.length);

    currentOffset += combined.length;
    return combined;
  }

  let currentOffset = pdfHeader.length;
  const chunks: Uint8Array[] = [pdfHeader];

  // Obj 1: Catalog
  chunks.push(addObj('<< /Type /Catalog /Pages 2 0 R >>'));

  // Obj 2: Pages
  chunks.push(addObj('<< /Type /Pages /Kids [3 0 R] /Count 1 >>'));

  // Obj 3: Page (Landscape A4: 842 x 595 pt)
  chunks.push(addObj('<< /Type /Page /Parent 2 0 R /MediaBox [0 0 842 595] /Resources << /XObject << /Im1 4 0 R >> >> /Contents 5 0 R >>'));

  // Obj 4: Image XObject (JPEG stream with DCTDecode)
  const imgHeader = encoder.encode(\`<< /Type /XObject /Subtype /Image /Width \${width} /Height \${height} /ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /DCTDecode /Length \${jpegBytes.length} >>\\nstream\\n\`);
  const imgFooter = encoder.encode('\\nendstream');
  const imgTotal = new Uint8Array(imgHeader.length + jpegBytes.length + imgFooter.length);
  imgTotal.set(imgHeader, 0);
  imgTotal.set(jpegBytes, imgHeader.length);
  imgTotal.set(imgFooter, imgHeader.length + jpegBytes.length);
  chunks.push(addObj(imgTotal));

  // Obj 5: Page Contents (draw Image 1 to full 842x595 landscape)
  const contentStream = 'q\\n842 0 0 595 0 0 cm\\n/Im1 Do\\nQ\\n';
  const contentObj = \`<< /Length \${contentStream.length} >>\\nstream\\n\${contentStream}\\nendstream\`;
  chunks.push(addObj(contentObj));

  // Cross-reference table
  const startXref = currentOffset;
  let xref = \`xref\\n0 \${offsets.length + 1}\\n0000000000 65535 f \\n\`;
  for (const off of offsets) {
    xref += off.toString().padStart(10, '0') + ' 00000 n \\n';
  }
  xref += \`trailer\\n<< /Size \${offsets.length + 1} /Root 1 0 R >>\\nstartxref\\n\${startXref}\\n%%EOF\\n\`;
  chunks.push(encoder.encode(xref));

  // Merge all chunks into single Uint8Array
  const totalLength = chunks.reduce((acc, c) => acc + c.length, 0);
  const pdfResult = new Uint8Array(totalLength);
  let writeOffset = 0;
  for (const c of chunks) {
    pdfResult.set(c, writeOffset);
    writeOffset += c.length;
  }

  return pdfResult;
}

/**
 * Draws the high-resolution luxury Grand Prix Championship certificate onto a Canvas.
 */
export async function generateGrandPrixCertificateCanvas(data: CertificateData): Promise<HTMLCanvasElement> {
  const width = 2400;
  const height = 1600;
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Canvas 2D context not available');

  // Preload signature image
  let signatureImg: HTMLImageElement | null = null;
  try {
    signatureImg = await loadImage(THAKARE_SIGNATURE_DATA_URL);
  } catch (e) {
    console.warn('Could not preload signature image, fallback vector will be used', e);
  }

  // 1. BACKGROUND (Luxury Ivory Parchment with Multi-Stage Gradient)
  const bgGrad = ctx.createLinearGradient(0, 0, width, height);
  bgGrad.addColorStop(0, '#fefcf8');
  bgGrad.addColorStop(0.35, '#f9f5ea');
  bgGrad.addColorStop(0.7, '#f4eee0');
  bgGrad.addColorStop(1, '#eee7d5');
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, width, height);

  // Background Fine Guilloché / Security Grid Pattern
  ctx.save();
  ctx.strokeStyle = 'rgba(212, 175, 55, 0.05)';
  ctx.lineWidth = 1;
  for (let x = 0; x < width; x += 28) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, height);
    ctx.stroke();
  }
  for (let y = 0; y < height; y += 28) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(width, y);
    ctx.stroke();
  }
  ctx.restore();

  // Subtle Watermark Radial Emblem in Center
  ctx.save();
  ctx.translate(width / 2, height / 2 + 20);
  ctx.fillStyle = 'rgba(212, 175, 55, 0.035)';
  ctx.beginPath();
  ctx.arc(0, 0, 380, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = 'rgba(212, 175, 55, 0.05)';
  ctx.lineWidth = 2;
  ctx.stroke();
  ctx.restore();

  // 2. LUXURY METALLIC GOLD BORDER SYSTEM
  const goldGrad = ctx.createLinearGradient(60, 60, width - 60, height - 60);
  goldGrad.addColorStop(0, '#bf953f');
  goldGrad.addColorStop(0.2, '#fcf6ba');
  goldGrad.addColorStop(0.4, '#b38728');
  goldGrad.addColorStop(0.6, '#fbf5b7');
  goldGrad.addColorStop(0.85, '#aa771c');
  goldGrad.addColorStop(1, '#d4af37');

  // Heavy Outer Gold Border
  ctx.save();
  ctx.strokeStyle = goldGrad;
  ctx.lineWidth = 18;
  ctx.strokeRect(55, 55, width - 110, height - 110);

  // Inner Thin Gold Filigree Border
  ctx.lineWidth = 3.5;
  ctx.strokeStyle = '#c5a059';
  ctx.strokeRect(88, 88, width - 176, height - 176);

  // Dotted Inner Accent
  ctx.setLineDash([8, 8]);
  ctx.lineWidth = 2;
  ctx.strokeStyle = 'rgba(179, 135, 40, 0.55)';
  ctx.strokeRect(106, 106, width - 212, height - 212);
  ctx.setLineDash([]);

  // Ornate Corner Flourishes (✦)
  ctx.fillStyle = '#b89726';
  ctx.font = 'bold 42px "Segoe UI Symbol", sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('✦', 128, 128);
  ctx.fillText('✦', width - 128, 128);
  ctx.fillText('✦', 128, height - 128);
  ctx.fillText('✦', width - 128, height - 128);

  // Corner Accent Radii
  ctx.strokeStyle = 'rgba(191, 149, 63, 0.4)';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(128, 128, 30, 0, Math.PI * 2);
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(width - 128, 128, 30, 0, Math.PI * 2);
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(128, height - 128, 30, 0, Math.PI * 2);
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(width - 128, height - 128, 30, 0, Math.PI * 2);
  ctx.stroke();
  ctx.restore();

  // 3. BRAND HEADER (TypeBaazi Speed Typing Academy)
  ctx.save();
  ctx.translate(width / 2 - 210, 175);
  // Gold badge circle
  const badgeGrad = ctx.createLinearGradient(-30, -30, 30, 30);
  badgeGrad.addColorStop(0, '#bf953f');
  badgeGrad.addColorStop(0.5, '#fcf6ba');
  badgeGrad.addColorStop(1, '#aa771c');
  ctx.fillStyle = badgeGrad;
  ctx.beginPath();
  ctx.arc(0, 0, 30, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = '#78350f';
  ctx.lineWidth = 2;
  ctx.stroke();

  // Lightning bolt inside header badge
  ctx.fillStyle = '#0f172a';
  ctx.beginPath();
  ctx.moveTo(3, -18);
  ctx.lineTo(-15, 2);
  ctx.lineTo(-2, 2);
  ctx.lineTo(-4, 18);
  ctx.lineTo(15, -2);
  ctx.lineTo(3, -2);
  ctx.closePath();
  ctx.fill();
  ctx.restore();

  // Brand Name & Subtitle
  ctx.save();
  ctx.fillStyle = '#0f172a';
  ctx.font = '900 40px "Outfit", "Inter", "Segoe UI", sans-serif';
  ctx.textAlign = 'left';
  ctx.letterSpacing = '4px';
  ctx.fillText('TYPEBAAZI', width / 2 - 162, 170);

  ctx.fillStyle = '#854d0e';
  ctx.font = '700 17.5px "Inter", "Segoe UI", sans-serif';
  ctx.fillText('OFFICIAL SPEED TYPING ACADEMY • अधिकृत गौरव प्रमाणपत्र', width / 2 - 162, 198);
  ctx.restore();

  // 4. CHAMPIONSHIP RIBBON TAG
  ctx.save();
  const tagX = width / 2;
  const tagY = 270;
  const tagW = 500;
  const tagH = 48;
  const tagGrad = ctx.createLinearGradient(tagX - tagW / 2, tagY, tagX + tagW / 2, tagY);
  tagGrad.addColorStop(0, '#78350f');
  tagGrad.addColorStop(0.5, '#b45309');
  tagGrad.addColorStop(1, '#78350f');
  ctx.fillStyle = tagGrad;
  ctx.beginPath();
  ctx.roundRect(tagX - tagW / 2, tagY - tagH / 2, tagW, tagH, 24);
  ctx.fill();
  ctx.strokeStyle = '#fef08a';
  ctx.lineWidth = 2.5;
  ctx.stroke();

  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 18.5px "Inter", "Segoe UI", sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('🏆  GRAND PRIX 1ST PLACE CHAMPION  🏆', tagX, tagY);
  ctx.restore();

  // 5. MAIN CERTIFICATE TITLE
  ctx.save();
  ctx.fillStyle = '#0f172a';
  ctx.font = 'bold 56px "Cinzel", "Georgia", "Times New Roman", serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('CERTIFICATE OF VICTORY', width / 2, 360);

  ctx.fillStyle = '#64748b';
  ctx.font = '700 18px "Inter", "Segoe UI", sans-serif';
  ctx.letterSpacing = '3.5px';
  ctx.fillText('THIS DISTINCTION IS PROUDLY CONFERRED UPON', width / 2, 420);
  ctx.restore();

  // 6. RECIPIENT NAME (Hero Element)
  const recipientName = (data.userName || data.playerName || 'Ritesh Thakare').trim();
  ctx.save();
  ctx.fillStyle = '#1e3a8a'; // Deep royal navy blue
  ctx.font = 'bold 68px "Georgia", "Playfair Display", "Times New Roman", serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(recipientName, width / 2, 510);

  // Decorative Golden Underline with Diamond Center
  const nameWidth = Math.max(540, ctx.measureText(recipientName).width + 90);
  const lineY = 566;
  ctx.strokeStyle = '#d4af37';
  ctx.lineWidth = 2.5;
  ctx.beginPath();
  ctx.moveTo(width / 2 - nameWidth / 2, lineY);
  ctx.lineTo(width / 2 - 30, lineY);
  ctx.moveTo(width / 2 + 30, lineY);
  ctx.lineTo(width / 2 + nameWidth / 2, lineY);
  ctx.stroke();

  // Center Diamond Star
  ctx.fillStyle = '#b89726';
  ctx.font = '24px "Segoe UI Symbol", sans-serif';
  ctx.fillText('✦', width / 2, lineY + 1);
  ctx.restore();

  // 7. CITATION NARRATIVE
  ctx.save();
  ctx.fillStyle = '#334155';
  ctx.font = '500 23px "Inter", "Georgia", sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  const citation1 = 'For demonstrating supreme keyboard dexterity, lightning-fast typing velocity, and achieving glorious';
  const citation2 = '1st Place Victory against the TypeBaazi AI Bot in the Grand Prix Speed Championship race.';
  ctx.fillText(citation1, width / 2, 640);
  ctx.fillText(citation2, width / 2, 680);
  ctx.restore();

  // 8. METRIC BOXES (4 Luxury Cards - Exact Match to Visual Reference)
  const formattedWpm = String(data.wpm ?? 28);
  const rawAcc = data.accuracy ?? 90.4;
  const formattedAcc = String(rawAcc).includes('%') ? String(rawAcc) : rawAcc + '%';
  const rawErrors = data.errors ?? 0;
  const formattedErrors = rawErrors === 1 ? '1 Error' : rawErrors + ' Errors';
  const rawDuration = data.timeSec ?? data.raceDuration ?? 12.0;
  const numDuration = typeof rawDuration === 'number' ? rawDuration : parseFloat(String(rawDuration)) || 12.0;
  const formattedDuration = numDuration.toFixed(1) + 's';

  const metricCards = [
    { lbl: 'TYPING VELOCITY', val: formattedWpm + ' WPM', color: '#0284c7' },
    { lbl: 'ACCURACY', val: formattedAcc, color: '#059669' },
    { lbl: 'TOTAL ERRORS', val: formattedErrors, color: rawErrors === 0 ? '#059669' : '#dc2626' },
    { lbl: 'RACE DURATION', val: formattedDuration, color: '#d97706' }
  ];

  const cardW = 380;
  const cardH = 130;
  const cardGap = 40;
  const totalCardsW = 4 * cardW + 3 * cardGap;
  const startCardX = (width - totalCardsW) / 2;
  const cardY = 755;

  metricCards.forEach((card, idx) => {
    const cx = startCardX + idx * (cardW + cardGap);

    // Box Background & Border
    ctx.save();
    ctx.fillStyle = '#ffffff';
    ctx.strokeStyle = '#e2e8f0';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.roundRect(cx, cardY, cardW, cardH, 16);
    ctx.fill();
    ctx.stroke();

    // Top Accent Bar
    ctx.fillStyle = card.color;
    ctx.beginPath();
    ctx.roundRect(cx + 36, cardY, cardW - 72, 4.5, 2);
    ctx.fill();

    // Label
    ctx.fillStyle = '#64748b';
    ctx.font = 'bold 15px "Inter", "Segoe UI", sans-serif';
    ctx.textAlign = 'center';
    ctx.letterSpacing = '1px';
    ctx.fillText(card.lbl, cx + cardW / 2, cardY + 44);

    // Value
    ctx.fillStyle = '#0f172a';
    ctx.font = '900 38px "Outfit", "Inter", "Segoe UI", sans-serif';
    ctx.fillText(card.val, cx + cardW / 2, cardY + 95);
    ctx.restore();
  });

  // 9. FOOTER SECTION (Date, Gold Medallion Seal, Real Handwritten Signature, Signer Info)
  const footerY = 990;

  // Left Column: Date of Issuance & Verification ID
  const todayStr = data.date || data.issueDate || new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  const certId = data.certificateId || data.verificationId || '#TB-' + Math.floor(100000 + Math.random() * 900000);

  ctx.save();
  ctx.textAlign = 'left';

  ctx.fillStyle = '#64748b';
  ctx.font = '700 16px "Inter", sans-serif';
  ctx.letterSpacing = '0.5px';
  ctx.fillText('DATE OF ISSUANCE', 280, footerY + 80);

  ctx.fillStyle = '#0f172a';
  ctx.font = 'bold 24px "Inter", sans-serif';
  ctx.fillText(todayStr, 280, footerY + 114);

  ctx.fillStyle = '#64748b';
  ctx.font = '600 16px "Inter", sans-serif';
  ctx.fillText('VERIFICATION ID: ' + certId, 280, footerY + 148);
  ctx.restore();

  // Center: Official Embossed Gold Seal Medallion with Ribbon Tails
  ctx.save();
  const sealX = width / 2;
  const sealY = footerY + 105;

  // Ribbon Tails below seal
  ctx.fillStyle = '#92400e';
  ctx.beginPath();
  ctx.moveTo(sealX - 35, sealY + 42);
  ctx.lineTo(sealX - 58, sealY + 130);
  ctx.lineTo(sealX - 30, sealY + 108);
  ctx.lineTo(sealX - 10, sealY + 130);
  ctx.lineTo(sealX - 15, sealY + 46);
  ctx.closePath();
  ctx.fill();

  ctx.beginPath();
  ctx.moveTo(sealX + 35, sealY + 42);
  ctx.lineTo(sealX + 58, sealY + 130);
  ctx.lineTo(sealX + 30, sealY + 108);
  ctx.lineTo(sealX + 10, sealY + 130);
  ctx.lineTo(sealX + 15, sealY + 46);
  ctx.closePath();
  ctx.fill();

  // Outer Sawtooth / Sunburst Medallion
  const sealGrad = ctx.createRadialGradient(sealX, sealY, 10, sealX, sealY, 95);
  sealGrad.addColorStop(0, '#fef08a');
  sealGrad.addColorStop(0.45, '#eab308');
  sealGrad.addColorStop(0.8, '#ca8a04');
  sealGrad.addColorStop(1, '#a16207');

  ctx.fillStyle = sealGrad;
  ctx.beginPath();
  const points = 36;
  for (let i = 0; i < points * 2; i++) {
    const r = i % 2 === 0 ? 86 : 77;
    const a = (i * Math.PI) / points;
    const x = sealX + r * Math.cos(a);
    const y = sealY + r * Math.sin(a);
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }
  ctx.closePath();
  ctx.fill();
  ctx.strokeStyle = '#78350f';
  ctx.lineWidth = 2.5;
  ctx.stroke();

  // Inner Embossed Gold Ring
  ctx.fillStyle = '#ca8a04';
  ctx.beginPath();
  ctx.arc(sealX, sealY, 64, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = '#fef9c3';
  ctx.lineWidth = 2;
  ctx.stroke();

  // Seal Text
  ctx.fillStyle = '#451a03';
  ctx.font = 'bold 12.5px "Inter", sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('★ TYPEBAAZI ★', sealX, sealY - 24);

  ctx.font = '900 16.5px "Outfit", sans-serif';
  ctx.fillStyle = '#ffffff';
  ctx.fillText('OFFICIAL', sealX, sealY - 4);
  ctx.fillText('WINNER', sealX, sealY + 16);

  ctx.font = 'bold 10.5px "Inter", sans-serif';
  ctx.fillStyle = '#451a03';
  ctx.fillText('★ VERIFIED ★', sealX, sealY + 36);
  ctx.restore();

  // Right Column: Official Handwritten Signature & Signer Info
  ctx.save();
  const sigCenterX = width - 380;
  const sigLineY = footerY + 88;

  // Draw the User's Authentic Handwritten Signature Image
  if (signatureImg && signatureImg.complete && signatureImg.naturalWidth > 0) {
    const drawSigW = 270;
    const drawSigH = 155;
    const drawSigX = sigCenterX - drawSigW / 2;
    const drawSigY = sigLineY - 124;
    ctx.drawImage(signatureImg, drawSigX, drawSigY, drawSigW, drawSigH);
  } else {
    // Vector fallback resembling authentic stroke
    ctx.strokeStyle = '#1e3a8a';
    ctx.lineWidth = 3.5;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.beginPath();
    ctx.moveTo(sigCenterX - 110, sigLineY - 40);
    ctx.lineTo(sigCenterX - 70, sigLineY - 85);
    ctx.lineTo(sigCenterX - 85, sigLineY - 20);
    ctx.lineTo(sigCenterX - 40, sigLineY - 60);
    ctx.lineTo(sigCenterX - 15, sigLineY - 35);
    ctx.lineTo(sigCenterX + 10, sigLineY - 50);
    ctx.lineTo(sigCenterX + 35, sigLineY - 35);
    ctx.lineTo(sigCenterX + 65, sigLineY - 45);
    ctx.lineTo(sigCenterX + 95, sigLineY - 35);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(sigCenterX - 130, sigLineY - 30);
    ctx.lineTo(sigCenterX + 110, sigLineY - 22);
    ctx.stroke();
  }

  // Underline beneath Signature
  ctx.strokeStyle = '#94a3b8';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(sigCenterX - 140, sigLineY);
  ctx.lineTo(sigCenterX + 140, sigLineY);
  ctx.stroke();

  // Signatory Board Name & Designation matching reference
  ctx.textAlign = 'center';
  ctx.fillStyle = '#0f172a';
  ctx.font = 'bold 22px "Inter", "Segoe UI", sans-serif';
  ctx.fillText('TypeBaazi Certification Board', sigCenterX, sigLineY + 28);

  ctx.fillStyle = '#64748b';
  ctx.font = '700 15px "Inter", sans-serif';
  ctx.letterSpacing = '0.5px';
  ctx.fillText('DIRECTOR OF SPEED ASSESSMENTS', sigCenterX, sigLineY + 54);
  ctx.restore();

  // Bottom Security & Verification Bar
  ctx.save();
  ctx.fillStyle = '#94a3b8';
  ctx.font = '500 13.5px "Inter", sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('🔒 Digitally Verified Certificate of Achievement • Authenticated on TypeBaazi Global Cloud • https://typebaazi.com', width / 2, height - 80);
  ctx.restore();

  return canvas;
}

/**
 * Downloads high-resolution PNG image directly from certificate canvas.
 */
export async function downloadGrandPrixCertificateImage(data: CertificateData, filename?: string): Promise<boolean> {
  try {
    const canvas = await generateGrandPrixCertificateCanvas(data);
    const dataUrl = canvas.toDataURL('image/png', 1.0);
    const safeName = (data.userName || data.playerName || 'Champion').replace(/[^a-zA-Z0-9_-]/g, '_');
    const defaultFilename = filename || 'TypeBaazi_Certificate_' + safeName + '_' + data.wpm + 'WPM.png';

    const a = document.createElement('a');
    a.style.display = 'none';
    a.href = dataUrl;
    a.download = defaultFilename;
    document.body.appendChild(a);
    a.click();

    setTimeout(() => {
      document.body.removeChild(a);
    }, 2000);

    return true;
  } catch (err) {
    console.error('Certificate PNG download failed:', err);
    return false;
  }
}

/**
 * Generates the certificate as a downloadable PDF and triggers browser file download.
 */
export async function downloadGrandPrixCertificatePdf(data: CertificateData, filename?: string): Promise<boolean> {
  try {
    const canvas = await generateGrandPrixCertificateCanvas(data);

    // Convert Canvas to High-Quality JPEG Blob
    const jpegBlob = await new Promise<Blob>((resolve, reject) => {
      canvas.toBlob(
        (blob) => {
          if (blob) resolve(blob);
          else reject(new Error('Canvas toBlob failed'));
        },
        'image/jpeg',
        0.96
      );
    });

    const arrayBuffer = await jpegBlob.arrayBuffer();
    const jpegBytes = new Uint8Array(arrayBuffer);

    // Convert JPEG to standard 100% valid PDF 1.4
    const pdfBytes = convertJpegToPdf(jpegBytes, canvas.width, canvas.height);
    const pdfBlob = new Blob([pdfBytes], { type: 'application/pdf' });

    // Generate meaningful filename
    const safeName = (data.userName || data.playerName || 'Champion').replace(/[^a-zA-Z0-9_-]/g, '_');
    const defaultFilename = filename || 'TypeBaazi_Grand_Prix_Certificate_' + safeName + '_' + data.wpm + 'WPM.pdf';

    // Trigger Browser Download
    const downloadUrl = URL.createObjectURL(pdfBlob);
    const a = document.createElement('a');
    a.style.display = 'none';
    a.href = downloadUrl;
    a.download = defaultFilename;
    document.body.appendChild(a);
    a.click();

    setTimeout(() => {
      document.body.removeChild(a);
      URL.revokeObjectURL(downloadUrl);
    }, 3000);

    return true;
  } catch (err) {
    console.error('Certificate PDF generation error, falling back to PNG image download:', err);
    return downloadGrandPrixCertificateImage(data, filename);
  }
}
`;

const targetFile = path.join(__dirname, '../src/lib/certificateGenerator.ts');
fs.writeFileSync(targetFile, code);
console.log('Successfully updated src/lib/certificateGenerator.ts');
