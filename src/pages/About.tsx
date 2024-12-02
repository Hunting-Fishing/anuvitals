import React from "react";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function AboutPage() {
  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8">About Nourish Navigator</h1>
      
      <Tabs defaultValue="features" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="features">Features</TabsTrigger>
          <TabsTrigger value="integrations">Integrations</TabsTrigger>
          <TabsTrigger value="howto">How to Use</TabsTrigger>
        </TabsList>

        <TabsContent value="features">
          <Card className="p-6">
            <h2 className="text-2xl font-semibold mb-4">Key Features</h2>
            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <h3 className="text-xl font-medium mb-2">Product Scanning</h3>
                <p className="text-muted-foreground">
                  Scan food products to get detailed nutritional information and health analysis.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-medium mb-2">Blood Work Analysis</h3>
                <p className="text-muted-foreground">
                  Upload and track your blood work results with automated analysis and recommendations.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-medium mb-2">Diet Guides</h3>
                <p className="text-muted-foreground">
                  Access comprehensive diet guides and nutritional recommendations.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-medium mb-2">Health Tracking</h3>
                <p className="text-muted-foreground">
                  Monitor your nutritional progress and health metrics over time.
                </p>
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="integrations">
          <Card className="p-6">
            <h2 className="text-2xl font-semibold mb-4">Integrations</h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-medium mb-2">Supabase Integration</h3>
                <p className="text-muted-foreground mb-2">
                  Secure data storage and authentication powered by Supabase.
                </p>
                <ul className="list-disc list-inside text-muted-foreground">
                  <li>User authentication and profile management</li>
                  <li>Secure storage of health data</li>
                  <li>Real-time data synchronization</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-medium mb-2">OCR Technology</h3>
                <p className="text-muted-foreground mb-2">
                  Advanced optical character recognition for blood work analysis.
                </p>
                <ul className="list-disc list-inside text-muted-foreground">
                  <li>Automated data extraction from medical reports</li>
                  <li>High accuracy text recognition</li>
                  <li>Support for multiple file formats</li>
                </ul>
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="howto">
          <Card className="p-6">
            <h2 className="text-2xl font-semibold mb-4">How to Use</h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-medium mb-2">Scanning Products</h3>
                <ol className="list-decimal list-inside text-muted-foreground space-y-2">
                  <li>Navigate to the Scan Product page</li>
                  <li>Upload a photo of the product barcode</li>
                  <li>Review the nutritional information and health analysis</li>
                </ol>
              </div>
              <div>
                <h3 className="text-xl font-medium mb-2">Blood Work Analysis</h3>
                <ol className="list-decimal list-inside text-muted-foreground space-y-2">
                  <li>Go to the Blood Work page</li>
                  <li>Upload your blood work report (PDF or image)</li>
                  <li>Verify the extracted data</li>
                  <li>View analysis and recommendations</li>
                </ol>
              </div>
              <div>
                <h3 className="text-xl font-medium mb-2">Diet Guides</h3>
                <ol className="list-decimal list-inside text-muted-foreground space-y-2">
                  <li>Visit the Diet Guide section</li>
                  <li>Browse different diet categories</li>
                  <li>Select a diet to view detailed information</li>
                  <li>Access food recommendations and restrictions</li>
                </ol>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}