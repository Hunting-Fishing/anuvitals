import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import { Upload, Loader2 } from "lucide-react";
import { createWorker } from "tesseract.js";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { format } from "date-fns";

interface ExtractedResult {
  marker: string;
  value: string;
  unit: string;
}

export function BloodWorkUpload() {
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState<string>("");
  const [results, setResults] = useState<ExtractedResult[]>([]);
  const { toast } = useToast();
  const supabase = useSupabaseClient();
  const user = useUser();

  const processImage = async (file: File): Promise<ExtractedResult[]> => {
    const worker = await createWorker({
      logger: (m) => {
        if (m.status === 'recognizing text') {
          setProgress(`Processing image... ${Math.round(m.progress * 100)}%`);
        }
      }
    });

    try {
      await worker.loadLanguage('eng');
      await worker.initialize('eng');

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
        { name: 'Red Blood Cells', variations: ['RBC', 'Red Blood Cells', 'Erythrocytes'] },
        { name: 'Glucose', variations: ['GLU', 'Glucose', 'Blood Sugar'] },
        { name: 'Cholesterol', variations: ['CHOL', 'Cholesterol', 'Total Cholesterol'] },
        { name: 'HDL', variations: ['HDL', 'HDL-C', 'High Density Lipoprotein'] },
        { name: 'LDL', variations: ['LDL', 'LDL-C', 'Low Density Lipoprotein'] },
        { name: 'Triglycerides', variations: ['TG', 'TRIG', 'Triglycerides'] },
        { name: 'Vitamin D', variations: ['VIT D', 'Vitamin D', '25-OH Vitamin D'] },
        { name: 'TSH', variations: ['TSH', 'Thyroid Stimulating Hormone'] },
        { name: 'Free T4', variations: ['FT4', 'Free T4', 'Thyroxine'] },
        { name: 'Free T3', variations: ['FT3', 'Free T3', 'Triiodothyronine'] },
        { name: 'PSA', variations: ['PSA', 'Prostate Specific Antigen'] },
        { name: 'CA-125', variations: ['CA-125', 'CA 125', 'Cancer Antigen 125'] }
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

  const saveResults = async (results: ExtractedResult[]) => {
    if (!user) return;

    const formattedResults: Record<string, { value: number; unit: string }> = {};
    results.forEach((result) => {
      formattedResults[result.marker] = {
        value: parseFloat(result.value),
        unit: result.unit
      };
    });

    try {
      const { error } = await supabase.from("blood_work_results").insert({
        user_id: user.id,
        test_date: format(new Date(), 'yyyy-MM-dd'),
        results: formattedResults
      });

      if (error) throw error;

      toast({
        title: "Success",
        description: "Blood work results have been saved successfully.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save blood work results.",
        variant: "destructive",
      });
    }
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !user) return;

    // Check file type
    const validTypes = ['image/jpeg', 'image/png', 'image/jpg', 'application/pdf'];
    if (!validTypes.includes(file.type)) {
      toast({
        title: "Invalid File Type",
        description: "Please upload a JPG, PNG, or PDF file.",
        variant: "destructive",
      });
      return;
    }

    setIsUploading(true);
    setProgress("Processing image...");

    try {
      // Process the image and extract results
      const extractedResults = await processImage(file);
      setResults(extractedResults);

      if (extractedResults.length === 0) {
        toast({
          title: "No Results Found",
          description: "Could not detect any blood work results in the image. Please try a clearer image or enter values manually.",
          variant: "destructive",
        });
        return;
      }

      // Format the results for display
      const formattedResults = extractedResults.map(result => 
        `${result.marker}: ${result.value} ${result.unit}`
      ).join('\n');

      toast({
        title: "Results Extracted",
        description: "The following results were found:\n" + formattedResults,
      });

      // Save the results
      await saveResults(extractedResults);

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

        {results.length > 0 && (
          <Alert>
            <AlertDescription>
              <div className="space-y-2">
                <h4 className="font-semibold">Extracted Results:</h4>
                {results.map((result, index) => (
                  <div key={index}>
                    {result.marker}: {result.value} {result.unit}
                  </div>
                ))}
              </div>
            </AlertDescription>
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
              <li>Supported formats: JPG, PNG, PDF</li>
            </ul>
          </AlertDescription>
        </Alert>
      </div>
    </Card>
  );
}