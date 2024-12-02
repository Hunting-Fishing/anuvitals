import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import { Upload } from "lucide-react";

export function BloodWorkUpload() {
  const [isUploading, setIsUploading] = useState(false);
  const { toast } = useToast();
  const supabase = useSupabaseClient();
  const user = useUser();

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !user) return;

    setIsUploading(true);
    try {
      // For now, we'll implement manual entry. PDF parsing can be added later
      toast({
        title: "Manual Entry Required",
        description: "Please enter your blood work values manually below.",
      });
    } catch (error) {
      toast({
        title: "Upload Failed",
        description: "There was an error uploading your blood work.",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <Card className="p-6">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Upload Blood Work Results</h3>
        <div className="flex items-center gap-4">
          <Input
            type="file"
            accept=".pdf,.jpg,.jpeg,.png"
            onChange={handleFileUpload}
            disabled={isUploading}
            className="max-w-md"
          />
          <Button disabled={isUploading}>
            <Upload className="mr-2 h-4 w-4" />
            Upload
          </Button>
        </div>
      </div>
    </Card>
  );
}