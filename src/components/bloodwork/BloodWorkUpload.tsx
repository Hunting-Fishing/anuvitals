import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import { Upload, Loader2 } from "lucide-react";
import { createWorker } from "tesseract.js";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface ExtractedResult {
  marker: string;
  value: string;
  unit: string;
}

export function BloodWorkUpload() {
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState<string>("");
  const { toast } = useToast();
  const supabase = useSupabaseClient();
  const user = useUser();

  const processImage = async (file: File): Promise<ExtractedResult[]> => {
    const worker = await createWorker('eng');
    
    try {
      // Convert file to base64
      const reader = new FileReader();
      const base64Image = await new Promise<string>((resolve) => {
        reader.onload = (e) => resolve(e.target?.result as string);
        reader.readAsDataURL(file);
      });

      setProgress("Analyzing image...");
      const { data: { text } } = await worker.recognize(base64Image);
      
      // Process the extracted text to find blood work results
      const results: ExtractedResult[] = [];
      const lines = text.split('\n');
      
      // Common blood work markers and their variations
      const markers = [
        { name: 'Hemoglobin', variations: ['HGB', 'Hgb', 'Hemoglobin'] },
        { name: 'White Blood Cells', variations: ['WBC', 'White Blood Cells', 'Leukocytes'] },
        { name: 'Platelets', variations: ['PLT', 'Platelets', 'Thrombocytes'] },
        // Add more markers as needed
      ];

      lines.forEach(line => {
        markers.forEach(marker => {
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

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !user) return;

    setIsUploading(true);
    setProgress("Processing image...");

    try {
      // Process the image and extract results
      const results = await processImage(file);

      if (results.length === 0) {
        toast({
          title: "No Results Found",
          description: "Could not detect any blood work results in the image. Please try a clearer image or enter values manually.",
          variant: "destructive",
        });
        return;
      }

      // Format the results for display
      const formattedResults = results.map(result => 
        `${result.marker}: ${result.value} ${result.unit}`
      ).join('\n');

      toast({
        title: "Results Extracted",
        description: "The following results were found:\n" + formattedResults,
      });

      // TODO: Add a confirmation step before saving to database
      // For now, we'll just show what was found

    } catch (error) {
      toast({
        title: "Processing Failed",
        description: "There was an error processing your blood work image. Please try again or enter values manually.",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
      setProgress("");
    }
  };

  return (
    <Card className="p-6">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Upload Blood Work Results</h3>
        <div className="flex items-center gap-4">
          <Input
            type="file"
            accept=".jpg,.jpeg,.png,.pdf"
            onChange={handleFileUpload}
            disabled={isUploading}
            className="max-w-md"
          />
          <Button disabled={isUploading}>
            {isUploading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processing...
              </>
            ) : (
              <>
                <Upload className="mr-2 h-4 w-4" />
                Upload
              </>
            )}
          </Button>
        </div>

        {progress && (
          <Alert>
            <AlertDescription>{progress}</AlertDescription>
          </Alert>
        )}

        <Alert>
          <AlertDescription>
            Upload a clear image of your blood work results. The system will attempt to automatically extract the values.
            For best results:
            <ul className="list-disc pl-4 mt-2">
              <li>Ensure the image is clear and well-lit</li>
              <li>Text should be clearly visible and not blurry</li>
              <li>Values and units should be readable</li>
            </ul>
          </AlertDescription>
        </Alert>
      </div>
    </Card>
  );
}