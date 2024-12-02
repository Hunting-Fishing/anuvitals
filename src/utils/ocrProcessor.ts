import { createWorker } from "tesseract.js";
import { ExtractedResult } from "@/types/bloodwork";
import { bloodWorkMarkers } from "@/utils/bloodWorkMarkers";

export const processImage = async (
  imageBlob: Blob,
  onProgress: (progress: string) => void
): Promise<ExtractedResult[]> => {
  const worker = await createWorker({
    logger: (m) => {
      if (m.status === 'recognizing text') {
        onProgress(`Processing image... ${Math.round(m.progress * 100)}%`);
      }
    }
  });

  try {
    await worker.loadLanguage('eng');
    await worker.initialize('eng');

    const { data: { text } } = await worker.recognize(imageBlob);
    
    onProgress("Analyzing text...");
    
    // Process the extracted text to find blood work results
    const results: ExtractedResult[] = [];
    const lines = text.split('\n');
    
    lines.forEach(line => {
      bloodWorkMarkers.forEach(marker => {
        const pattern = new RegExp(
          `(${marker.variations.join('|')})\\s*[:-]?\\s*(\\d+\\.?\\d*)\\s*(\\w+/?\\w*)?`,
          'i'
        );
        const match = line.match(pattern);
        if (match) {
          results.push({
            marker: marker.name,
            value: match[2],
            unit: match[3] || ''
          });
        }
      });
    });

    await worker.terminate();
    return results;
  } catch (error) {
    await worker.terminate();
    throw error;
  }
};