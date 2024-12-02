import React from 'react';
import { Alert, AlertDescription } from "@/components/ui/alert";
import { ExtractedResult } from "@/types/bloodwork";

interface ExtractedResultsProps {
  results: ExtractedResult[];
}

export function ExtractedResults({ results }: ExtractedResultsProps) {
  if (results.length === 0) return null;

  return (
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
  );
}