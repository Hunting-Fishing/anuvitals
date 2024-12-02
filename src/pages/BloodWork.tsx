import { BloodWorkUpload } from "@/components/bloodwork/BloodWorkUpload";
import { BloodWorkEntry } from "@/components/bloodwork/BloodWorkEntry";
import { BloodWorkHistory } from "@/components/bloodwork/BloodWorkHistory";
import { BloodWorkTrends } from "@/components/bloodwork/BloodWorkTrends";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function BloodWorkPage() {
  return (
    <div className="container mx-auto py-6 space-y-6">
      <h2 className="text-3xl font-bold">Blood Work Analysis</h2>
      
      <Tabs defaultValue="entry" className="space-y-6">
        <TabsList>
          <TabsTrigger value="entry">Enter Results</TabsTrigger>
          <TabsTrigger value="upload">Upload Results</TabsTrigger>
          <TabsTrigger value="history">History</TabsTrigger>
          <TabsTrigger value="trends">Trends</TabsTrigger>
        </TabsList>

        <TabsContent value="entry">
          <BloodWorkEntry />
        </TabsContent>

        <TabsContent value="upload">
          <BloodWorkUpload />
        </TabsContent>

        <TabsContent value="history">
          <BloodWorkHistory />
        </TabsContent>

        <TabsContent value="trends">
          <BloodWorkTrends />
        </TabsContent>
      </Tabs>
    </div>
  );
}