/**
 * TypeBaazi Official Certificate Generator
 * High-Resolution (2400x1600, 300 DPI) Canvas -> PDF Generator
 * Creates valid, downloadable PDF certificates for Grand Prix victories and speed milestones.
 */

export interface CertificateData {
  userName?: string;
  wpm: number;
  accuracy: number;
  errors?: number;
  timeSec?: number;
  trackName?: string;
  date?: string;
  certificateId?: string;
}

// Authentic Handwritten Signature Data URL for R. Thakare
export const THAKARE_SIGNATURE_DATA_URL = 'data:image/png;base64,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';

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
  const pdfHeader = encoder.encode('%PDF-1.4\n');
  const offsets: number[] = [];

  function addObj(content: Uint8Array | string): Uint8Array {
    offsets.push(currentOffset);
    const body = typeof content === 'string' ? encoder.encode(content) : content;
    const objNum = offsets.length;
    const header = encoder.encode(`${objNum} 0 obj\n`);
    const footer = encoder.encode('\nendobj\n');

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
  const imgHeader = encoder.encode(`<< /Type /XObject /Subtype /Image /Width ${width} /Height ${height} /ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /DCTDecode /Length ${jpegBytes.length} >>\nstream\n`);
  const imgFooter = encoder.encode('\nendstream');
  const imgTotal = new Uint8Array(imgHeader.length + jpegBytes.length + imgFooter.length);
  imgTotal.set(imgHeader, 0);
  imgTotal.set(jpegBytes, imgHeader.length);
  imgTotal.set(imgFooter, imgHeader.length + jpegBytes.length);
  chunks.push(addObj(imgTotal));

  // Obj 5: Page Contents (draw Image 1 to full 842x595 landscape)
  const contentStream = 'q\n842 0 0 595 0 0 cm\n/Im1 Do\nQ\n';
  const contentObj = `<< /Length ${contentStream.length} >>\nstream\n${contentStream}\nendstream`;
  chunks.push(addObj(contentObj));

  // Cross-reference table
  const startXref = currentOffset;
  let xref = `xref\n0 ${offsets.length + 1}\n0000000000 65535 f \n`;
  for (const off of offsets) {
    xref += off.toString().padStart(10, '0') + ' 00000 n \n';
  }
  xref += `trailer\n<< /Size ${offsets.length + 1} /Root 1 0 R >>\nstartxref\n${startXref}\n%%EOF\n`;
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

  // Preload signature image in parallel
  let signatureImg: HTMLImageElement | null = null;
  try {
    signatureImg = await loadImage(THAKARE_SIGNATURE_DATA_URL);
  } catch (e) {
    console.warn('Could not preload signature image, fallback will be used', e);
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
  ctx.fillStyle = 'rgba(212, 175, 55, 0.03)';
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
  const playerName = (data.userName || 'Speed Champion').trim();
  ctx.save();
  ctx.fillStyle = '#1e3a8a'; // Deep royal navy blue
  ctx.font = 'bold 68px "Georgia", "Playfair Display", "Times New Roman", serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(playerName, width / 2, 510);

  // Decorative Golden Underline with Diamond Center
  const nameWidth = Math.max(540, ctx.measureText(playerName).width + 90);
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

  // 8. METRIC BOXES (4 Luxury Cards)
  const metricCards = [
    { lbl: 'TYPING VELOCITY', val: data.wpm + ' WPM', color: '#0284c7' },
    { lbl: 'ACCURACY', val: data.accuracy + '%', color: '#059669' },
    { lbl: 'TOTAL ERRORS', val: (data.errors ?? 0) + ' Errors', color: (data.errors ?? 0) === 0 ? '#059669' : '#dc2626' },
    { lbl: 'RACE DURATION', val: (data.timeSec ?? 12).toFixed(1) + 's', color: '#d97706' }
  ];

  const cardW = 380;
  const cardH = 130;
  const cardGap = 40;
  const totalCardsW = 4 * cardW + 3 * cardGap;
  const startCardX = (width - totalCardsW) / 2;
  const cardY = 755;

  metricCards.forEach((card, idx) => {
    const cx = startCardX + idx * (cardW + cardGap);

    // Box Background & Shadow
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

  // 9. FOOTER SECTION (Date, Gold Medallion Seal, Real Signature, Signer Info)
  const footerY = 990;

  // Left Column: Date & Verification ID
  const todayStr = data.date || new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  const certId = data.certificateId || '#TB-' + Math.floor(100000 + Math.random() * 900000);

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
    const drawSigW = 260;
    const drawSigH = 150;
    const drawSigX = sigCenterX - drawSigW / 2;
    const drawSigY = sigLineY - 120;
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
  ctx.strokeStyle = '#cbd5e1';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(sigCenterX - 140, sigLineY);
  ctx.lineTo(sigCenterX + 140, sigLineY);
  ctx.stroke();

  // Signatory Name & Official Title
  ctx.textAlign = 'center';
  ctx.fillStyle = '#0f172a';
  ctx.font = 'bold 22px "Inter", "Segoe UI", sans-serif';
  ctx.fillText('R. Thakare', sigCenterX, sigLineY + 28);

  ctx.fillStyle = '#64748b';
  ctx.font = '600 15px "Inter", sans-serif';
  ctx.fillText('Authorized Signatory • TypeBaazi Board', sigCenterX, sigLineY + 54);
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
    const safeName = (data.userName || 'Champion').replace(/[^a-zA-Z0-9_-]/g, '_');
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
    const safeName = (data.userName || 'Champion').replace(/[^a-zA-Z0-9_-]/g, '_');
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
