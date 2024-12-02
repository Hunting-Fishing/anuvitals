import React from "react";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Star, Rocket, Info, Link, Zap, Shield, Search, Brain, Dna, Flask, Microscope, Laptop, BookOpen, Workflow } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="container mx-auto py-8 px-4 min-h-screen bg-gradient-to-br from-background to-secondary/20">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center space-y-4 mb-12">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-fade-in">
            Nourish Navigator
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Your intelligent companion for nutrition analysis and health optimization
          </p>
        </div>
        
        <Tabs defaultValue="features" className="space-y-8">
          <TabsList className="grid w-full grid-cols-3 gap-4 p-1 bg-secondary/20 backdrop-blur-sm rounded-2xl">
            <TabsTrigger 
              value="features" 
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground relative overflow-hidden group transition-all duration-300 hover:bg-primary/80"
            >
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-primary/10 to-accent/10 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
              <Zap className="w-4 h-4 mr-2" />
              Features
            </TabsTrigger>
            <TabsTrigger 
              value="integrations"
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground relative overflow-hidden group transition-all duration-300 hover:bg-primary/80"
            >
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-primary/10 to-accent/10 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
              <Link className="w-4 h-4 mr-2" />
              Integrations
            </TabsTrigger>
            <TabsTrigger 
              value="howto"
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground relative overflow-hidden group transition-all duration-300 hover:bg-primary/80"
            >
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-primary/10 to-accent/10 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
              <BookOpen className="w-4 h-4 mr-2" />
              How to Use
            </TabsTrigger>
          </TabsList>

          <TabsContent value="features" className="space-y-8 animate-fade-in">
            <Card className="p-6 bg-gradient-to-br from-secondary/50 to-background border-none shadow-lg backdrop-blur-sm">
              <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                <Rocket className="w-6 h-6 text-primary" />
                Key Features
              </h2>
              <div className="grid gap-6 md:grid-cols-2">
                {[
                  {
                    icon: <Search className="w-8 h-8 text-primary" />,
                    title: "Product Scanning",
                    description: "Scan food products to get detailed nutritional information and health analysis.",
                  },
                  {
                    icon: <Brain className="w-8 h-8 text-primary" />,
                    title: "Blood Work Analysis",
                    description: "Upload and track your blood work results with automated analysis and recommendations.",
                  },
                  {
                    icon: <Dna className="w-8 h-8 text-primary" />,
                    title: "Diet Guides",
                    description: "Access comprehensive diet guides and nutritional recommendations.",
                  },
                  {
                    icon: <Flask className="w-8 h-8 text-primary" />,
                    title: "Health Tracking",
                    description: "Monitor your nutritional progress and health metrics over time.",
                  },
                ].map((feature, index) => (
                  <div 
                    key={index}
                    className="group p-6 rounded-xl bg-background/50 backdrop-blur-sm hover:bg-primary/5 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg"
                  >
                    <div className="mb-4 transform transition-transform group-hover:scale-110">
                      {feature.icon}
                    </div>
                    <h3 className="text-xl font-medium mb-2 text-primary group-hover:text-accent transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground group-hover:text-foreground transition-colors">
                      {feature.description}
                    </p>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="integrations" className="space-y-8 animate-fade-in">
            <Card className="p-6 bg-gradient-to-br from-secondary/50 to-background border-none shadow-lg backdrop-blur-sm">
              <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                <Shield className="w-6 h-6 text-primary" />
                Integrations
              </h2>
              <div className="space-y-6">
                {[
                  {
                    icon: <Laptop className="w-8 h-8 text-primary" />,
                    title: "Supabase Integration",
                    description: "Secure data storage and authentication powered by Supabase.",
                    features: [
                      "User authentication and profile management",
                      "Secure storage of health data",
                      "Real-time data synchronization"
                    ]
                  },
                  {
                    icon: <Microscope className="w-8 h-8 text-primary" />,
                    title: "OCR Technology",
                    description: "Advanced optical character recognition for blood work analysis.",
                    features: [
                      "Automated data extraction from medical reports",
                      "High accuracy text recognition",
                      "Support for multiple file formats"
                    ]
                  }
                ].map((integration, index) => (
                  <div 
                    key={index}
                    className="group p-6 rounded-xl bg-background/50 backdrop-blur-sm hover:bg-primary/5 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg"
                  >
                    <div className="mb-4 transform transition-transform group-hover:scale-110">
                      {integration.icon}
                    </div>
                    <h3 className="text-xl font-medium mb-2 text-primary group-hover:text-accent transition-colors">
                      {integration.title}
                    </h3>
                    <p className="text-muted-foreground mb-4 group-hover:text-foreground transition-colors">
                      {integration.description}
                    </p>
                    <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                      {integration.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="group-hover:text-foreground transition-colors">
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="howto" className="space-y-8 animate-fade-in">
            <Card className="p-6 bg-gradient-to-br from-secondary/50 to-background border-none shadow-lg backdrop-blur-sm">
              <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                <Workflow className="w-6 h-6 text-primary" />
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
                    className="group p-6 rounded-xl bg-background/50 backdrop-blur-sm hover:bg-primary/5 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg"
                  >
                    <h3 className="text-xl font-medium mb-4 text-primary group-hover:text-accent transition-colors">
                      {section.title}
                    </h3>
                    <ol className="list-decimal list-inside space-y-3">
                      {section.steps.map((step, stepIndex) => (
                        <li 
                          key={stepIndex}
                          className="text-muted-foreground group-hover:text-foreground transition-colors pl-4"
                        >
                          {step}
                        </li>
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