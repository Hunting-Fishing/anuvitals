import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FeaturesTab } from "@/components/about/FeaturesTab";
import { IntegrationsTab } from "@/components/about/IntegrationsTab";
import { HowToTab } from "@/components/about/HowToTab";

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
              Features
            </TabsTrigger>
            <TabsTrigger 
              value="integrations"
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground relative overflow-hidden group transition-all duration-300 hover:bg-primary/80"
            >
              Integrations
            </TabsTrigger>
            <TabsTrigger 
              value="howto"
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground relative overflow-hidden group transition-all duration-300 hover:bg-primary/80"
            >
              How to Use
            </TabsTrigger>
          </TabsList>

          <TabsContent value="features" className="space-y-8 animate-fade-in">
            <FeaturesTab />
          </TabsContent>

          <TabsContent value="integrations" className="space-y-8 animate-fade-in">
            <IntegrationsTab />
          </TabsContent>

          <TabsContent value="howto" className="space-y-8 animate-fade-in">
            <HowToTab />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}