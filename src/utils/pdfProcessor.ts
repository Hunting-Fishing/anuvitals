import { PDFDocument } from 'pdf-lib';

export const extractPdfPages = async (file: File): Promise<Uint8Array[]> => {
  const arrayBuffer = await file.arrayBuffer();
  const pdfDoc = await PDFDocument.load(arrayBuffer);
  const pages = [];
  
  for (let i = 0; i < pdfDoc.getPageCount(); i++) {
    const newPdf = await PDFDocument.create();
    const [copiedPage] = await newPdf.copyPages(pdfDoc, [i]);
    newPdf.addPage(copiedPage);
    pages.push(await newPdf.save());
  }
  
  return pages;
};

export const isPDF = (file: File): boolean => {
  return file.type === 'application/pdf';
};