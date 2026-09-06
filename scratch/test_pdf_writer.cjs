const fs = require('fs');
const path = require('path');

// Test PDF synthesis from raw JPEG bytes
function createPdfFromJpeg(jpegBuffer, width, height) {
  const pdfHeader = Buffer.from('%PDF-1.4\n');
  const offsets = [];

  function addObj(content) {
    offsets.push(currentOffset);
    const objHeader = Buffer.from(`${offsets.length} 0 obj\n`);
    const objFooter = Buffer.from('\nendobj\n');
    const full = Buffer.concat([objHeader, content, objFooter]);
    currentOffset += full.length;
    return full;
  }

  let currentOffset = pdfHeader.length;
  const chunks = [pdfHeader];

  // Obj 1: Catalog
  chunks.push(addObj(Buffer.from('<< /Type /Catalog /Pages 2 0 R >>')));

  // Obj 2: Pages
  chunks.push(addObj(Buffer.from('<< /Type /Pages /Kids [3 0 R] /Count 1 >>')));

  // Obj 3: Page (Landscape A4: 842 x 595 pt)
  chunks.push(addObj(Buffer.from('<< /Type /Page /Parent 2 0 R /MediaBox [0 0 842 595] /Resources << /XObject << /Im1 4 0 R >> >> /Contents 5 0 R >>')));

  // Obj 4: Image XObject
  const imgHeader = Buffer.from(`<< /Type /XObject /Subtype /Image /Width ${width} /Height ${height} /ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /DCTDecode /Length ${jpegBuffer.length} >>\nstream\n`);
  const imgFooter = Buffer.from('\nendstream');
  const imgObj = Buffer.concat([imgHeader, jpegBuffer, imgFooter]);
  chunks.push(addObj(imgObj));

  // Obj 5: Contents
  const contentStream = Buffer.from('q\n842 0 0 595 0 0 cm\n/Im1 Do\nQ\n');
  const contentObj = Buffer.from(`<< /Length ${contentStream.length} >>\nstream\n${contentStream.toString()}\nendstream`);
  chunks.push(addObj(contentObj));

  // Xref
  const startXref = currentOffset;
  let xref = `xref\n0 ${offsets.length + 1}\n0000000000 65535 f \n`;
  for (const off of offsets) {
    xref += off.toString().padStart(10, '0') + ' 00000 n \n';
  }
  xref += `trailer\n<< /Size ${offsets.length + 1} /Root 1 0 R >>\nstartxref\n${startXref}\n%%EOF\n`;

  chunks.push(Buffer.from(xref));
  return Buffer.concat(chunks);
}

// Test with a dummy 1x1 JPEG
const dummyJpeg = Buffer.from([
  0xFF, 0xD8, 0xFF, 0xE0, 0x00, 0x10, 0x4A, 0x46, 0x49, 0x46, 0x00, 0x01, 0x01, 0x01, 0x00, 0x48,
  0x00, 0x48, 0x00, 0x00, 0xFF, 0xDB, 0x00, 0x43, 0x00, 0x03, 0x02, 0x02, 0x03, 0x02, 0x02, 0x03,
  0x03, 0x03, 0x03, 0x04, 0x03, 0x03, 0x04, 0x05, 0x08, 0x05, 0x05, 0x04, 0x04, 0x05, 0x0A, 0x07,
  0x07, 0x06, 0x08, 0x0C, 0x0A, 0x0C, 0x0C, 0x0B, 0x0A, 0x0B, 0x0B, 0x0D, 0x0E, 0x12, 0x10, 0x0D,
  0x0E, 0x11, 0x0E, 0x0B, 0x0B, 0x10, 0x16, 0x10, 0x11, 0x13, 0x14, 0x15, 0x15, 0x15, 0x0C, 0x0F,
  0x17, 0x18, 0x16, 0x14, 0x18, 0x12, 0x14, 0x15, 0x14, 0xFF, 0xC0, 0x00, 0x0B, 0x08, 0x00, 0x01,
  0x00, 0x01, 0x01, 0x01, 0x11, 0x00, 0xFF, 0xC4, 0x00, 0x1F, 0x00, 0x00, 0x01, 0x05, 0x01, 0x01,
  0x01, 0x01, 0x01, 0x01, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x01, 0x02, 0x03, 0x04,
  0x05, 0x06, 0x07, 0x08, 0x09, 0x0A, 0x0B, 0xFF, 0xDA, 0x00, 0x08, 0x01, 0x01, 0x00, 0x00, 0x3F,
  0x00, 0x7F, 0x00, 0xFF, 0xD9
]);

const pdf = createPdfFromJpeg(dummyJpeg, 1, 1);
const outPath = path.join(__dirname, 'test_certificate.pdf');
fs.writeFileSync(outPath, pdf);
console.log('PDF written successfully, bytes:', pdf.length);
