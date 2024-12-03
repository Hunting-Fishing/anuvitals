import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { useNavigate } from "react-router-dom";
import { MetricsCards } from "@/components/MetricsCards";
import { useUser } from "@supabase/auth-helpers-react";

export function Index() {
  const navigate = useNavigate();
  const user = useUser();

  return (
    <div className="container mx-auto p-6 animate-fade-in">
      <header className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Welcome to Health Companion</h1>
        <p className="text-muted-foreground text-lg">
          Your personal guide to healthier food choices
        </p>
      </header>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Quick Scan</CardTitle>
            <CardDescription>
              Scan product barcodes to get instant health insights
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button 
              onClick={() => navigate("/scan")}
              className="w-full"
              size="lg"
              aria-label="Go to product scanner"
            >
              Start Scanning
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Your Profile</CardTitle>
            <CardDescription>
              Customize your health preferences and dietary needs
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button 
              onClick={() => navigate("/profile")}
              className="w-full"
              variant="outline"
              size="lg"
              aria-label="Go to your profile"
            >
              View Profile
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>AI Assistant</CardTitle>
            <CardDescription>
              Get personalized nutrition advice and recommendations
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button 
              onClick={() => navigate("/ai")}
              className="w-full"
              variant="secondary"
              size="lg"
              aria-label="Chat with AI assistant"
            >
              Start Chat
            </Button>
          </CardContent>
        </Card>
      </div>

      <section className="mt-12" aria-label="Your health metrics">
        <h2 className="text-2xl font-semibold mb-6">Your Health Overview</h2>
        <ScrollArea className="h-[300px] rounded-md border p-4">
          {user ? (
            <MetricsCards />
          ) : (
            <div className="space-y-4">
              <Skeleton className="h-[125px] w-full rounded-lg" />
              <Skeleton className="h-[125px] w-full rounded-lg" />
            </div>
          )}
        </ScrollArea>
      </section>

      <section className="mt-12" aria-label="Getting started guide">
        <h2 className="text-2xl font-semibold mb-6">Getting Started</h2>
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>New to Health Companion?</CardTitle>
              <CardDescription>
                Follow these steps to get the most out of your experience
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ol className="list-decimal list-inside space-y-2">
                <li>Complete your health profile</li>
                <li>Set your dietary preferences</li>
                <li>Try scanning your first product</li>
                <li>Chat with our AI assistant for personalized advice</li>
              </ol>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Need Help?</CardTitle>
              <CardDescription>
                Resources to help you navigate the application
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Button 
                  onClick={() => navigate("/about")}
                  variant="link"
                  className="w-full justify-start p-0 h-auto font-normal"
                  aria-label="Learn how to use the application"
                >
                  → How to use Health Companion
                </Button>
                <Button 
                  onClick={() => navigate("/about?tab=features")}
                  variant="link"
                  className="w-full justify-start p-0 h-auto font-normal"
                  aria-label="View application features"
                >
                  → Feature overview
                </Button>
                <Button 
                  onClick={() => navigate("/about?tab=integrations")}
                  variant="link"
                  className="w-full justify-start p-0 h-auto font-normal"
                  aria-label="Learn about our integrations"
                >
                  → Available integrations
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}