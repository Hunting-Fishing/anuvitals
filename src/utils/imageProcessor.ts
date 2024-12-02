import Tesseract from 'tesseract.js';

export const enhanceImage = async (imageBlob: Blob): Promise<Blob> => {
  const img = await createImageBitmap(imageBlob);
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  
  if (!ctx) {
    throw new Error('Could not get canvas context');
  }
  
  canvas.width = img.width;
  canvas.height = img.height;
  
  // Apply enhancements
  ctx.filter = 'contrast(1.2) brightness(1.1)';
  ctx.drawImage(img, 0, 0);
  
  return new Promise((resolve) => {
    canvas.toBlob((blob) => {
      resolve(blob!);
    });
  });
};

export const detectRotation = async (file: File): Promise<number> => {
  try {
    const result = await Tesseract.recognize(file, 'eng', {
      logger: () => {},
    });
    
    return result.data.orientation?.angle || 0;
  } catch (error) {
    console.error('Error detecting rotation:', error);
    return 0;
  }
};

export const rotateImage = async (imageBlob: Blob, angle: number): Promise<Blob> => {
  const img = await createImageBitmap(imageBlob);
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  
  if (!ctx) {
    throw new Error('Could not get canvas context');
  }
  
  canvas.width = img.width;
  canvas.height = img.height;
  
  ctx.translate(canvas.width/2, canvas.height/2);
  ctx.rotate((angle * Math.PI) / 180);
  ctx.translate(-canvas.width/2, -canvas.height/2);
  ctx.drawImage(img, 0, 0);
  
  return new Promise((resolve) => {
    canvas.toBlob((blob) => {
      resolve(blob!);
    });
  });
};