import Tesseract from 'tesseract.js';

export const enhanceImage = async (imageData: ImageData): Promise<ImageData> => {
  // Basic image enhancement
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  canvas.width = imageData.width;
  canvas.height = imageData.height;
  
  if (ctx) {
    ctx.putImageData(imageData, 0, 0);
    
    // Increase contrast
    ctx.filter = 'contrast(1.2) brightness(1.1)';
    ctx.drawImage(canvas, 0, 0);
    
    return ctx.getImageData(0, 0, canvas.width, canvas.height);
  }
  
  return imageData;
};

export const detectRotation = async (file: File): Promise<number> => {
  // Use Tesseract to detect text orientation
  const { data: { orientation } } = await Tesseract.recognize(file, 'eng', {
    logger: () => {},
  });
  return orientation?.angle || 0;
};

export const rotateImage = (imageData: ImageData, angle: number): ImageData => {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  canvas.width = imageData.width;
  canvas.height = imageData.height;
  
  if (ctx) {
    ctx.putImageData(imageData, 0, 0);
    ctx.translate(canvas.width/2, canvas.height/2);
    ctx.rotate((angle * Math.PI) / 180);
    ctx.translate(-canvas.width/2, -canvas.height/2);
    ctx.drawImage(canvas, 0, 0);
    
    return ctx.getImageData(0, 0, canvas.width, canvas.height);
  }
  
  return imageData;
};