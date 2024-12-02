import { BloodWorkUpload } from "@/components/bloodwork/BloodWorkUpload";
import { BloodWorkEntry } from "@/components/bloodwork/BloodWorkEntry";
import { BloodWorkHistory } from "@/components/bloodwork/BloodWorkHistory";
import { BloodWorkTrends } from "@/components/bloodwork/BloodWorkTrends";

export default function BloodWorkPage() {
  return (
    <div className="container mx-auto py-6 space-y-6">
      <h2 className="text-3xl font-bold">Blood Work Analysis</h2>
      
      <div className="grid gap-6 md:grid-cols-2">
        <BloodWorkUpload />
        <BloodWorkEntry />
      </div>
      
      <BloodWorkHistory />
      <BloodWorkTrends />
    </div>
  );
}