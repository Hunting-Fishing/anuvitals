import { BrowserMultiFormatReader } from '@zxing/browser';
import { BarcodeFormat, DecodeHintType } from '@zxing/library';

export function useScanner() {
  const setupScanner = async () => {
    const hints = new Map();
    hints.set(DecodeHintType.POSSIBLE_FORMATS, [
      BarcodeFormat.EAN_13,
      BarcodeFormat.EAN_8,
      BarcodeFormat.UPC_A,
      BarcodeFormat.UPC_E,
    ]);
    hints.set(DecodeHintType.TRY_HARDER, true);

    const codeReader = new BrowserMultiFormatReader(hints);
    
    try {
      const devices = await BrowserMultiFormatReader.listVideoInputDevices();
      console.log('Available camera devices:', devices);

      if (devices.length === 0) {
        throw new Error("No camera devices found");
      }

      // Try to find a back camera
      const backCamera = devices.find(device => 
        device.label.toLowerCase().includes('back') || 
        device.label.toLowerCase().includes('rear')
      );

      return {
        codeReader,
        deviceId: backCamera ? backCamera.deviceId : devices[0].deviceId
      };
    } catch (error) {
      console.error("Scanner setup error:", error);
      throw error;
    }
  };

  return { setupScanner };
}