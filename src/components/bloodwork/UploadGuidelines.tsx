import React from 'react';
import { Alert, AlertDescription } from "@/components/ui/alert";

export function UploadGuidelines() {
  return (
    <Alert>
      <AlertDescription>
        Upload a clear image of your blood work results. The system will attempt to automatically extract the values.
        For best results:
        <ul className="list-disc pl-4 mt-2">
          <li>Ensure the image is clear and well-lit</li>
          <li>Text should be clearly visible and not blurry</li>
          <li>Values and units should be readable</li>
          <li>Supported formats: JPG, PNG, PDF</li>
        </ul>
      </AlertDescription>
    </Alert>
  );
}