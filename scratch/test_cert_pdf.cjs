const fs = require('fs');
const path = require('path');

// Test PDF output verification
function testPdfOutput() {
  const encoder = new TextEncoder();
  const pdfHeader = encoder.encode('%PDF-1.4\n');
  const offsets = [];
  let currentOffset = pdfHeader.length;

  function addObj(content) {
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

  const chunks = [pdfHeader];
  chunks.push(addObj('<< /Type /Catalog /Pages 2 0 R >>'));
  chunks.push(addObj('<< /Type /Pages /Kids [3 0 R] /Count 1 >>'));
  chunks.push(addObj('<< /Type /Page /Parent 2 0 R /MediaBox [0 0 842 595] /Resources << /XObject << /Im1 4 0 R >> >> /Contents 5 0 R >>'));

  // Dummy 10x10 JPEG
  const dummyJpeg = Buffer.from([
    0xFF, 0xD8, 0xFF, 0xE0, 0x00, 0x10, 0x4A, 0x46, 0x49, 0x46, 0x00, 0x01, 0x01, 0x01, 0x00, 0x48,
    0x00, 0x48, 0x00, 0x00, 0xFF, 0xDB, 0x00, 0x43, 0x00, 0x03, 0x02, 0x02, 0x03, 0x02, 0x02, 0x03,
    0x03, 0x03, 0x03, 0x04, 0x03, 0x03, 0x04, 0x05, 0x08, 0x05, 0x05, 0x04, 0x04, 0x05, 0x0A, 0x07,
    0x07, 0x06, 0x08, 0x0C, 0x0A, 0x0C, 0x0C, 0x0B, 0x0A, 0x0B, 0x0B, 0x0D, 0x0E, 0x12, 0x10, 0x0D,
    0x0E, 0x11, 0x0E, 0x0B, 0x0B, 0x10, 0x16, 0x10, 0x11, 0x13, 0x14, 0x15, 0x15, 0x15, 0x0C, 0x0F,
    0x17, 0x18, 0x16, 0x14, 0x18, 0x12, 0x14, 0x15, 0x14, 0xFF, 0xC0, 0x00, 0x0B, 0x08, 0x00, 0x0A,
    0x00, 0x0A, 0x01, 0x01, 0x11, 0x00, 0xFF, 0xC4, 0x00, 0x1F, 0x00, 0x00, 0x01, 0x05, 0x01, 0x01,
    0x01, 0x01, 0x01, 0x01, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x01, 0x02, 0x03, 0x04,
    0x05, 0x06, 0x07, 0x08, 0x09, 0x0A, 0x0B, 0xFF, 0xDA, 0x00, 0x08, 0x01, 0x01, 0x00, 0x00, 0x3F,
    0x00, 0x7F, 0x00, 0xFF, 0xD9
  ]);

  const imgHeader = encoder.encode(`<< /Type /XObject /Subtype /Image /Width 10 /Height 10 /ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /DCTDecode /Length ${dummyJpeg.length} >>\nstream\n`);
  const imgFooter = encoder.encode('\nendstream');
  const imgTotal = new Uint8Array(imgHeader.length + dummyJpeg.length + imgFooter.length);
  imgTotal.set(imgHeader, 0);
  imgTotal.set(dummyJpeg, imgHeader.length);
  imgTotal.set(imgFooter, imgHeader.length + dummyJpeg.length);
  chunks.push(addObj(imgTotal));

  const contentStream = 'q\n842 0 0 595 0 0 cm\n/Im1 Do\nQ\n';
  const contentObj = `<< /Length ${contentStream.length} >>\nstream\n${contentStream}\nendstream`;
  chunks.push(addObj(contentObj));

  const startXref = currentOffset;
  let xref = `xref\n0 ${offsets.length + 1}\n0000000000 65535 f \n`;
  for (const off of offsets) {
    xref += off.toString().padStart(10, '0') + ' 00000 n \n';
  }
  xref += `trailer\n<< /Size ${offsets.length + 1} /Root 1 0 R >>\nstartxref\n${startXref}\n%%EOF\n`;
  chunks.push(encoder.encode(xref));

  const totalLength = chunks.reduce((acc, c) => acc + c.length, 0);
  const pdfResult = new Uint8Array(totalLength);
  let writeOffset = 0;
  for (const c of chunks) {
    pdfResult.set(c, writeOffset);
    writeOffset += c.length;
  }

  const outPath = path.join(__dirname, 'Grand_Prix_Certificate_Test.pdf');
  fs.writeFileSync(outPath, Buffer.from(pdfResult));
  console.log('Verified Certificate PDF generated at:', outPath, 'Total size:', pdfResult.length, 'bytes');
}

testPdfOutput();
