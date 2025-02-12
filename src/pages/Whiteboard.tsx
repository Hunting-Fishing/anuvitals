
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ExternalLink, MessageCircle, FileText, Globe, GitBranch, CheckCircle2, XCircle } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function WhiteboardPage() {
  return (
    <div className="container mx-auto p-6">
      <Card className="p-6">
        <h1 className="text-2xl font-semibold mb-4">Build Utilities</h1>
        
        <Tabs defaultValue="resources" className="space-y-4">
          <TabsList>
            <TabsTrigger value="resources">Resources</TabsTrigger>
            <TabsTrigger value="integrations">Integrations</TabsTrigger>
          </TabsList>

          <TabsContent value="resources" className="space-y-6">
            {/* GPT Chat Log Section */}
            <div>
              <h2 className="text-xl font-medium mb-2">Bluetooth Chat Implementations</h2>
              <p className="text-muted-foreground mb-4">
                Access the ChatGPT conversation log for the BT Water Bottle project.
              </p>
              <Button
                onClick={() => window.open('https://chatgpt.com/c/673c1804-f58c-800d-b1c8-9160508b3f6d', '_blank')}
                className="flex items-center gap-2"
              >
                <MessageCircle className="h-4 w-4" />
                View Chat Log
                <ExternalLink className="h-4 w-4" />
              </Button>
            </div>

            {/* Direct File Link Section */}
            <div className="pt-4 border-t">
              <h2 className="text-xl font-medium mb-2">Project Documentation</h2>
              <p className="text-muted-foreground mb-4">
                Access the direct link to the project documentation file on OneDrive.
              </p>
              <Button
                onClick={() => window.open('https://1drv.ms/f/c/beb63686da10b275/EpUER6r2fyBKo5Lm0uzpHx0B1a2h1PJ50x93n5qVIroCvw?e=4JdR67', '_blank')}
                className="flex items-center gap-2"
              >
                <FileText className="h-4 w-4" />
                View Document
                <ExternalLink className="h-4 w-4" />
              </Button>
            </div>

            {/* Miro Section */}
            <div className="pt-4 border-t">
              <h2 className="text-xl font-medium mb-2">Miro Whiteboard</h2>
              <p className="text-muted-foreground mb-4">
                Access Miro's collaborative whiteboard platform for visual collaboration, brainstorming, and planning.
              </p>
              <div className="space-y-2">
                <Button
                  onClick={() => window.open('https://miro.com/app/dashboard/', '_blank')}
                  className="flex items-center gap-2"
                >
                  Open Miro Dashboard
                  <ExternalLink className="h-4 w-4" />
                </Button>
                <p className="text-sm text-muted-foreground">
                  Note: You'll need to sign up for a free Miro account if you haven't already.
                </p>
              </div>
            </div>

            {/* Microsoft Section */}
            <div className="pt-4 border-t">
              <h2 className="text-xl font-medium mb-2">Microsoft Tools</h2>
              <p className="text-muted-foreground mb-4">
                Access Microsoft's suite of collaborative tools including Whiteboard and Office 365.
              </p>
              <div className="flex flex-col gap-3">
                <Button
                  onClick={() => window.open('https://whiteboard.microsoft.com', '_blank')}
                  className="flex items-center gap-2"
                >
                  Open Microsoft Whiteboard
                  <ExternalLink className="h-4 w-4" />
                </Button>
                <Button
                  onClick={() => window.open('https://www.office.com', '_blank')}
                  className="flex items-center gap-2"
                >
                  Open Office 365
                  <ExternalLink className="h-4 w-4" />
                </Button>
                <p className="text-sm text-muted-foreground">
                  Note: Microsoft account required for access.
                </p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="integrations" className="space-y-4">
            <div>
              <h2 className="text-xl font-medium mb-2">Integrations Tracking</h2>
              <p className="text-muted-foreground mb-4">
                Monitor and track the status of various project integrations.
              </p>
              <div className="space-y-4">
                {/* API Integrations */}
                <div className="bg-secondary/20 p-4 rounded-lg">
                  <h3 className="font-medium mb-2 flex items-center gap-2">
                    <Globe className="h-4 w-4" />
                    API Integrations
                  </h3>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                    <li className="flex items-center justify-between p-2 hover:bg-secondary/30 rounded-md">
                      OpenFood Facts API 
                      <span className="text-green-500">Active</span>
                    </li>
                    <li className="flex items-center justify-between p-2 hover:bg-secondary/30 rounded-md">
                      Edamam Recipe API
                      <span className="text-green-500">Active</span>
                    </li>
                    <li className="flex items-center justify-between p-2 hover:bg-secondary/30 rounded-md">
                      Spoonacular API
                      <span className="text-green-500">Active</span>
                    </li>
                    <li className="flex items-center justify-between p-2 hover:bg-secondary/30 rounded-md">
                      USDA Food Data API
                      <span className="text-yellow-500">Pending</span>
                    </li>
                  </ul>

                  {/* OpenFood Facts API Details */}
                  <div className="mt-4 border-t pt-4">
                    <h4 className="font-medium mb-3">OpenFood Facts API Setup Details</h4>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between p-2 bg-secondary/10 rounded-md">
                        <span>Authentication</span>
                        <CheckCircle2 className="h-5 w-5 text-green-500" />
                      </div>
                      <div className="flex items-center justify-between p-2 bg-secondary/10 rounded-md">
                        <span>Product Search</span>
                        <CheckCircle2 className="h-5 w-5 text-green-500" />
                      </div>
                      <div className="flex items-center justify-between p-2 bg-secondary/10 rounded-md">
                        <span>Product Details</span>
                        <CheckCircle2 className="h-5 w-5 text-green-500" />
                      </div>
                      <div className="flex items-center justify-between p-2 bg-secondary/10 rounded-md">
                        <span>Categories</span>
                        <CheckCircle2 className="h-5 w-5 text-green-500" />
                      </div>
                      <div className="flex items-center justify-between p-2 bg-secondary/10 rounded-md">
                        <span>Allergens</span>
                        <CheckCircle2 className="h-5 w-5 text-green-500" />
                      </div>
                      <div className="flex items-center justify-between p-2 bg-secondary/10 rounded-md">
                        <span>Brands</span>
                        <CheckCircle2 className="h-5 w-5 text-green-500" />
                      </div>
                      <div className="flex items-center justify-between p-2 bg-secondary/10 rounded-md">
                        <span>Product Contribution</span>
                        <XCircle className="h-5 w-5 text-yellow-500" />
                      </div>
                      <div className="flex items-center justify-between p-2 bg-secondary/10 rounded-md">
                        <span>Error Handling</span>
                        <CheckCircle2 className="h-5 w-5 text-green-500" />
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Infrastructure Integrations */}
                <div className="bg-secondary/20 p-4 rounded-lg">
                  <h3 className="font-medium mb-2 flex items-center gap-2">
                    <GitBranch className="h-4 w-4" />
                    Infrastructure Integrations
                  </h3>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                    <li className="flex items-center justify-between p-2 hover:bg-secondary/30 rounded-md">
                      Supabase Authentication
                      <span className="text-green-500">Active</span>
                    </li>
                    <li className="flex items-center justify-between p-2 hover:bg-secondary/30 rounded-md">
                      Supabase Database
                      <span className="text-green-500">Active</span>
                    </li>
                    <li className="flex items-center justify-between p-2 hover:bg-secondary/30 rounded-md">
                      Supabase Edge Functions
                      <span className="text-green-500">Active</span>
                    </li>
                    <li className="flex items-center justify-between p-2 hover:bg-secondary/30 rounded-md">
                      Supabase Storage
                      <span className="text-yellow-500">Pending</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
}
