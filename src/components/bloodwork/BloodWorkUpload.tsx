import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Card } from "@/components/ui/card";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import { Loader2 } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { format } from "date-fns";
import { ExtractedResult } from "@/types/bloodwork";
import { processImage } from "@/utils/ocrProcessor";
import { FileUploadZone } from "./FileUploadZone";
import { ResultsVerification } from "./ResultsVerification";
import { UploadGuidelines } from "./UploadGuidelines";
import { enhanceImage, detectRotation, rotateImage } from "@/utils/imageProcessor";
import { extractPdfPages, isPDF } from "@/utils/pdfProcessor";
import { Progress } from "@/components/ui/progress";

export function BloodWorkUpload() {
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState<string>("");
  const [progressPercent, setProgressPercent] = useState(0);
  const [results, setResults] = useState<ExtractedResult[]>([]);
  const [confidenceScores, setConfidenceScores] = useState<Record<string, number>>({});
  const [batchStatus, setBatchStatus] = useState<Record<string, string>>({});
  const { toast } = useToast();
  const supabase = useSupabaseClient();
  const user = useUser();

  const processFile = async (file: File) => {
    try {
      if (isPDF(file)) {
        const pages = await extractPdfPages(file);
        // Process each page
        for (let i = 0; i < pages.length; i++) {
          setProgress(`Processing PDF page ${i + 1}/${pages.length}`);
          setProgressPercent((i + 1) / pages.length * 100);
          // Convert PDF page to image and process
          // Implementation details here
        }
      } else {
        // Process image
        setProgress("Enhancing image quality...");
        setProgressPercent(20);
        
        const img = new Image();
        const imageData = await createImageBitmap(file).then(bitmap => {
          const canvas = document.createElement('canvas');
          canvas.width = bitmap.width;
          canvas.height = bitmap.height;
          const ctx = canvas.getContext('2d');
          ctx?.drawImage(bitmap, 0, 0);
          return ctx?.getImageData(0, 0, bitmap.width, bitmap.height);
        });

        if (imageData) {
          const enhancedImage = await enhanceImage(imageData);
          const rotation = await detectRotation(file);
          const processedImage = rotation ? rotateImage(enhancedImage, rotation) : enhancedImage;

          setProgress("Extracting text...");
          setProgressPercent(40);
          
          const extractedResults = await processImage(processedImage, (p) => {
            setProgress(p);
            setProgressPercent(40 + (p.includes("Processing") ? 30 : 50));
          });

          return extractedResults;
        }
      }
    } catch (error) {
      console.error("Error processing file:", error);
      throw error;
    }
  };

  const handleFileUpload = async (files: File[]) => {
    if (!user) return;
    setIsUploading(true);
    setBatchStatus({});

    try {
      // Create batch upload record
      const { data: batchUpload, error: batchError } = await supabase
        .from('blood_work_batch_uploads')
        .insert({
          user_id: user.id,
          status: 'processing',
          file_paths: files.map(f => f.name)
        })
        .select()
        .single();

      if (batchError) throw batchError;

      // Process each file
      const allResults: ExtractedResult[] = [];
      const allConfidenceScores: Record<string, number> = {};

      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        setBatchStatus(prev => ({
          ...prev,
          [file.name]: 'processing'
        }));

        try {
          const fileResults = await processFile(file);
          if (fileResults) {
            allResults.push(...fileResults);
            // Calculate confidence scores
            fileResults.forEach(result => {
              allConfidenceScores[result.marker] = 0.8; // Example confidence score
            });
          }
          setBatchStatus(prev => ({
            ...prev,
            [file.name]: 'completed'
          }));
        } catch (error) {
          setBatchStatus(prev => ({
            ...prev,
            [file.name]: 'failed'
          }));
          console.error(`Error processing file ${file.name}:`, error);
        }
      }

      setResults(allResults);
      setConfidenceScores(allConfidenceScores);

      // Update batch upload status
      await supabase
        .from('blood_work_batch_uploads')
        .update({ status: 'completed' })
        .eq('id', batchUpload.id);

    } catch (error) {
      toast({
        title: "Processing Failed",
        description: "There was an error processing your files. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
      setProgress("");
      setProgressPercent(0);
    }
  };

  const handleVerification = async (verifiedResults: ExtractedResult[]) => {
    if (!user) return;

    try {
      const formattedResults: Record<string, { value: number; unit: string }> = {};
      verifiedResults.forEach((result) => {
        formattedResults[result.marker] = {
          value: parseFloat(result.value),
          unit: result.unit
        };
      });

      const { error } = await supabase.from("blood_work_results").insert({
        user_id: user.id,
        test_date: format(new Date(), 'yyyy-MM-dd'),
        results: formattedResults,
        verified: true,
        verification_date: new Date().toISOString(),
        confidence_scores: confidenceScores
      });

      if (error) throw error;

      toast({
        title: "Success",
        description: "Blood work results have been verified and saved.",
      });

      // Reset state
      setResults([]);
      setConfidenceScores({});
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save verified results.",
        variant: "destructive",
      });
    }
  };

  const handleResultEdit = (index: number, value: string) => {
    setResults(prev => {
      const newResults = [...prev];
      newResults[index] = { ...newResults[index], value };
      return newResults;
    });
  };

  return (
    <Card className="p-6">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Upload Blood Work Results</h3>
        
        <FileUploadZone
          onFileSelect={handleFileUpload}
          disabled={isUploading}
        />

        {(isUploading || progress) && (
          <div className="space-y-2">
            <Alert>
              <AlertDescription>{progress}</AlertDescription>
            </Alert>
            <Progress value={progressPercent} className="w-full" />
          </div>
        )}

        {Object.keys(batchStatus).length > 0 && (
          <div className="space-y-2">
            <h4 className="font-medium">Batch Processing Status:</h4>
            {Object.entries(batchStatus).map(([filename, status]) => (
              <div key={filename} className="flex items-center justify-between">
                <span>{filename}</span>
                <span className={cn(
                  "text-sm",
                  status === 'completed' && "text-green-500",
                  status === 'failed' && "text-red-500",
                  status === 'processing' && "text-blue-500"
                )}>
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </span>
              </div>
            ))}
          </div>
        )}

        {results.length > 0 && (
          <ResultsVerification
            results={results}
            onVerify={handleVerification}
            onEdit={handleResultEdit}
            confidenceScores={confidenceScores}
          />
        )}

        <UploadGuidelines />
      </div>
    </Card>
  );
}