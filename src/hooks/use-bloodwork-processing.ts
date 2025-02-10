
import { useState } from "react";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import { useToast } from "@/hooks/use-toast";
import { ExtractedResult } from "@/types/bloodwork";
import { processImage } from "@/utils/ocrProcessor";
import { enhanceImage, detectRotation, rotateImage } from "@/utils/imageProcessor";
import { extractPdfPages, isPDF } from "@/utils/pdfProcessor";
import { format } from "date-fns";

export const useBloodworkProcessing = () => {
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
        for (let i = 0; i < pages.length; i++) {
          setProgress(`Processing PDF page ${i + 1}/${pages.length}`);
          setProgressPercent((i + 1) / pages.length * 100);
        }
      } else {
        setProgress("Enhancing image quality...");
        setProgressPercent(20);
        
        const imageBlob = new Blob([file], { type: file.type });
        const enhancedImage = await enhanceImage(imageBlob);
        const rotation = await detectRotation(file);
        const processedImage = rotation ? await rotateImage(enhancedImage, rotation) : enhancedImage;

        setProgress("Extracting text...");
        setProgressPercent(40);
        
        const extractedResults = await processImage(processedImage, (p) => {
          setProgress(p);
          setProgressPercent(40 + (p.includes("Processing") ? 30 : 50));
        });

        return extractedResults;
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
            fileResults.forEach(result => {
              allConfidenceScores[result.marker] = 0.8;
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

  return {
    isUploading,
    progress,
    progressPercent,
    results,
    confidenceScores,
    batchStatus,
    handleFileUpload,
    handleVerification,
    handleResultEdit
  };
};
