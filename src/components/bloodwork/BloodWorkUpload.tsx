
import { Card } from "@/components/ui/card";
import { useBloodworkProcessing } from "@/hooks/use-bloodwork-processing";
import { FileUploadZone } from "./FileUploadZone";
import { ResultsVerification } from "./ResultsVerification";
import { UploadGuidelines } from "./UploadGuidelines";
import { BloodWorkProgress } from "./BloodWorkProgress";
import { BloodWorkErrorBoundary } from "./BloodWorkErrorBoundary";
import { BloodWorkLoading } from "./BloodWorkLoading";

export function BloodWorkUpload() {
  const {
    isUploading,
    progress,
    progressPercent,
    results,
    confidenceScores,
    batchStatus,
    handleFileUpload,
    handleVerification,
    handleResultEdit
  } = useBloodworkProcessing();

  return (
    <BloodWorkErrorBoundary>
      <Card className="p-6">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Upload Blood Work Results</h3>
          
          <FileUploadZone
            onFileSelect={handleFileUpload}
            disabled={isUploading}
          />

          {isUploading && <BloodWorkLoading />}

          <BloodWorkProgress
            isUploading={isUploading}
            progress={progress}
            progressPercent={progressPercent}
            batchStatus={batchStatus}
          />

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
    </BloodWorkErrorBoundary>
  );
}
