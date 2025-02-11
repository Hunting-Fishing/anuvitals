
import { WelcomeHeader } from "@/components/home/WelcomeHeader";
import { QuickActionCards } from "@/components/home/QuickActionCards";
import { HealthOverview } from "@/components/home/HealthOverview";
import { GettingStartedGuide } from "@/components/home/GettingStartedGuide";
import { useUser } from "@supabase/auth-helpers-react";
import { Navigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import { useEffect } from "react";

export default function IndexPage() {
  const user = useUser();
  const { toast } = useToast();

  useEffect(() => {
    if (!user) {
      toast({
        title: "Welcome to Health Track",
        description: "Please sign in or create an account to access all features.",
        duration: 5000,
      });
    }
  }, []);

  if (user === undefined) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="container mx-auto p-6 min-h-screen flex items-center justify-center">
        <Card className="p-8 max-w-md w-full text-center space-y-6 animate-fade-in">
          <h1 className="text-3xl font-bold">Welcome to Health Track</h1>
          <p className="text-muted-foreground">
            Please log in or create an account to access your health dashboard.
          </p>
          <Button asChild className="w-full">
            <Link to="/auth">Get Started</Link>
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <ErrorBoundary>
      <div className="container mx-auto p-6 space-y-8 animate-fade-in">
        <WelcomeHeader />
        <div className="grid gap-8 md:grid-cols-2">
          <div className="space-y-8">
            <ErrorBoundary>
              <QuickActionCards />
              <HealthOverview />
            </ErrorBoundary>
          </div>
          <div className="md:pl-4">
            <ErrorBoundary>
              <GettingStartedGuide />
            </ErrorBoundary>
          </div>
        </div>
      </div>
    </ErrorBoundary>
  );
}
