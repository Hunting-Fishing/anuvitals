import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FeaturesTab } from "@/components/about/FeaturesTab";
import { HowToTab } from "@/components/about/HowToTab";
import { IntegrationsTab } from "@/components/about/IntegrationsTab";
import { QRCodeSVG } from "qrcode.react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AboutPage() {
  const appUrl = "https://clean-eats.lovable.app";

  return (
    <div className="container mx-auto p-6 space-y-8">
      <div className="flex justify-between items-start">
        <h1 className="text-3xl font-bold">About Nourish Navigator</h1>
        <Card className="w-64">
          <CardHeader>
            <CardTitle className="text-center">Scan to Open App</CardTitle>
          </CardHeader>
          <CardContent className="flex justify-center p-4">
            <QRCodeSVG
              value={appUrl}
              size={200}
              level="H"
              includeMargin={true}
              className="bg-white p-2 rounded"
            />
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="features" className="w-full">
        <TabsList>
          <TabsTrigger value="features">Features</TabsTrigger>
          <TabsTrigger value="howto">How To Use</TabsTrigger>
          <TabsTrigger value="integrations">Integrations</TabsTrigger>
        </TabsList>
        <TabsContent value="features">
          <FeaturesTab />
        </TabsContent>
        <TabsContent value="howto">
          <HowToTab />
        </TabsContent>
        <TabsContent value="integrations">
          <IntegrationsTab />
        </TabsContent>
      </Tabs>
    </div>
  );
}