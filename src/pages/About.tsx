import React from "react";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Star, Rocket, Info, Link } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="container mx-auto py-8 px-4 animate-fade-in">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          About Nourish Navigator
        </h1>
        
        <Tabs defaultValue="features" className="space-y-8">
          <TabsList className="grid w-full grid-cols-3 gap-4 bg-secondary/20 p-2 rounded-lg">
            <TabsTrigger 
              value="features" 
              className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              <Star className="w-4 h-4" />
              Features
            </TabsTrigger>
            <TabsTrigger 
              value="integrations"
              className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              <Link className="w-4 h-4" />
              Integrations
            </TabsTrigger>
            <TabsTrigger 
              value="howto"
              className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              <Info className="w-4 h-4" />
              How to Use
            </TabsTrigger>
          </TabsList>

          <TabsContent value="features">
            <Card className="p-6 bg-gradient-to-br from-secondary/50 to-background border-none shadow-lg">
              <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
                <Rocket className="w-6 h-6 text-primary" />
                Key Features
              </h2>
              <div className="grid gap-6 md:grid-cols-2">
                {[
                  {
                    title: "Product Scanning",
                    description: "Scan food products to get detailed nutritional information and health analysis.",
                  },
                  {
                    title: "Blood Work Analysis",
                    description: "Upload and track your blood work results with automated analysis and recommendations.",
                  },
                  {
                    title: "Diet Guides",
                    description: "Access comprehensive diet guides and nutritional recommendations.",
                  },
                  {
                    title: "Health Tracking",
                    description: "Monitor your nutritional progress and health metrics over time.",
                  },
                ].map((feature, index) => (
                  <div 
                    key={index}
                    className="p-4 rounded-lg bg-background/50 backdrop-blur-sm hover:bg-primary/5 transition-colors"
                  >
                    <h3 className="text-xl font-medium mb-2 text-primary">{feature.title}</h3>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="integrations">
            <Card className="p-6 bg-gradient-to-br from-secondary/50 to-background border-none shadow-lg">
              <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
                <Link className="w-6 h-6 text-primary" />
                Integrations
              </h2>
              <div className="space-y-6">
                <div className="p-4 rounded-lg bg-background/50 backdrop-blur-sm">
                  <h3 className="text-xl font-medium mb-2 text-primary">Supabase Integration</h3>
                  <p className="text-muted-foreground mb-4">
                    Secure data storage and authentication powered by Supabase.
                  </p>
                  <ul className="list-disc list-inside text-muted-foreground space-y-2">
                    <li>User authentication and profile management</li>
                    <li>Secure storage of health data</li>
                    <li>Real-time data synchronization</li>
                  </ul>
                </div>
                <div className="p-4 rounded-lg bg-background/50 backdrop-blur-sm">
                  <h3 className="text-xl font-medium mb-2 text-primary">OCR Technology</h3>
                  <p className="text-muted-foreground mb-4">
                    Advanced optical character recognition for blood work analysis.
                  </p>
                  <ul className="list-disc list-inside text-muted-foreground space-y-2">
                    <li>Automated data extraction from medical reports</li>
                    <li>High accuracy text recognition</li>
                    <li>Support for multiple file formats</li>
                  </ul>
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="howto">
            <Card className="p-6 bg-gradient-to-br from-secondary/50 to-background border-none shadow-lg">
              <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
                <Info className="w-6 h-6 text-primary" />
                How to Use
              </h2>
              <div className="space-y-6">
                {[
                  {
                    title: "Scanning Products",
                    steps: [
                      "Navigate to the Scan Product page",
                      "Upload a photo of the product barcode",
                      "Review the nutritional information and health analysis",
                    ],
                  },
                  {
                    title: "Blood Work Analysis",
                    steps: [
                      "Go to the Blood Work page",
                      "Upload your blood work report (PDF or image)",
                      "Verify the extracted data",
                      "View analysis and recommendations",
                    ],
                  },
                  {
                    title: "Diet Guides",
                    steps: [
                      "Visit the Diet Guide section",
                      "Browse different diet categories",
                      "Select a diet to view detailed information",
                      "Access food recommendations and restrictions",
                    ],
                  },
                ].map((section, index) => (
                  <div 
                    key={index}
                    className="p-4 rounded-lg bg-background/50 backdrop-blur-sm hover:bg-primary/5 transition-colors"
                  >
                    <h3 className="text-xl font-medium mb-2 text-primary">{section.title}</h3>
                    <ol className="list-decimal list-inside text-muted-foreground space-y-2">
                      {section.steps.map((step, stepIndex) => (
                        <li key={stepIndex}>{step}</li>
                      ))}
                    </ol>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}