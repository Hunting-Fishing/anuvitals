import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import { Upload, Loader2 } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { format } from "date-fns";
import { ExtractedResult } from "@/types/bloodwork";
import { processImage } from "@/utils/ocrProcessor";
import { ExtractedResults } from "./ExtractedResults";
import { UploadGuidelines } from "./UploadGuidelines";

export function BloodWorkUpload() {
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState<string>("");
  const [results, setResults] = useState<ExtractedResult[]>([]);
  const { toast } = useToast();
  const supabase = useSupabaseClient();
  const user = useUser();

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
      const extractedResults = await processImage(file, setProgress);
      setResults(extractedResults);

      if (extractedResults.length === 0) {
        toast({
          title: "No Results Found",
          description: "Could not detect any blood work results in the image. Please try a clearer image or enter values manually.",
          variant: "destructive",
        });
        return;
      }

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

        <ExtractedResults results={results} />
        <UploadGuidelines />
      </div>
    </Card>
  );
}