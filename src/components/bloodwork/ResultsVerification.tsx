import React from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ExtractedResult } from "@/types/bloodwork";
import { cn } from "@/lib/utils";

interface ResultsVerificationProps {
  results: ExtractedResult[];
  onVerify: (verifiedResults: ExtractedResult[]) => void;
  onEdit: (index: number, value: string) => void;
  confidenceScores: Record<string, number>;
}

export function ResultsVerification({
  results,
  onVerify,
  onEdit,
  confidenceScores
}: ResultsVerificationProps) {
  return (
    <Card className="p-4">
      <h3 className="text-lg font-semibold mb-4">Verify Results</h3>
      <div className="space-y-4">
        {results.map((result, index) => (
          <div key={index} className="grid grid-cols-3 gap-4 items-center">
            <Label>{result.marker}</Label>
            <Input
              type="text"
              value={result.value}
              onChange={(e) => onEdit(index, e.target.value)}
              className={cn(
                confidenceScores[result.marker] < 0.8 && "border-yellow-500",
                confidenceScores[result.marker] < 0.5 && "border-red-500"
              )}
            />
            <span className="text-sm text-gray-500">
              Confidence: {(confidenceScores[result.marker] * 100).toFixed(1)}%
            </span>
          </div>
        ))}
        <Button onClick={() => onVerify(results)} className="mt-4">
          Confirm Results
        </Button>
      </div>
    </Card>
  );
}