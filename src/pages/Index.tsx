import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Header } from "@/components/Header";
import { MetricsCards } from "@/components/MetricsCards";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Scan } from "lucide-react";

const Index = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gray-50">
        <AppSidebar />
        <main className="flex-1">
          <Header />
          <div className="p-8">
            <div className="mb-8 flex items-center justify-between">
              <h1 className="text-3xl font-bold">Dashboard</h1>
              <Button className="gap-2">
                <Scan className="h-5 w-5" />
                Scan Product
              </Button>
            </div>
            
            <MetricsCards />
            
            <div className="mt-8">
              <Tabs defaultValue="daily" className="w-full">
                <TabsList>
                  <TabsTrigger value="daily">Daily Overview</TabsTrigger>
                  <TabsTrigger value="insights">Insights</TabsTrigger>
                  <TabsTrigger value="meal-plans">Meal Plans</TabsTrigger>
                  <TabsTrigger value="sustainability">Sustainability</TabsTrigger>
                </TabsList>
                <TabsContent value="daily" className="mt-6">
                  <div className="rounded-lg border bg-card p-6">
                    <h3 className="font-semibold mb-4">Today's Activity</h3>
                    <p className="text-muted-foreground">No products scanned yet today. Click the Scan Product button to get started!</p>
                  </div>
                </TabsContent>
                <TabsContent value="insights">
                  <div className="rounded-lg border bg-card p-6">
                    <h3 className="font-semibold mb-4">Your Insights</h3>
                    <p className="text-muted-foreground">Track your nutrition patterns to see personalized insights.</p>
                  </div>
                </TabsContent>
                <TabsContent value="meal-plans">
                  <div className="rounded-lg border bg-card p-6">
                    <h3 className="font-semibold mb-4">Weekly Meal Plan</h3>
                    <p className="text-muted-foreground">Start planning your meals for a healthier lifestyle.</p>
                  </div>
                </TabsContent>
                <TabsContent value="sustainability">
                  <div className="rounded-lg border bg-card p-6">
                    <h3 className="font-semibold mb-4">Environmental Impact</h3>
                    <p className="text-muted-foreground">Track your eco-friendly choices and their impact.</p>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Index;