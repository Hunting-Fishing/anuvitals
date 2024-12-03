import { useUser } from "@supabase/auth-helpers-react";
import { Card } from "@/components/ui/card";
import { Wave } from "lucide-react";

export function WelcomeHeader() {
  const user = useUser();
  const firstName = user?.user_metadata?.first_name || "there";

  return (
    <Card className="p-6 bg-gradient-to-r from-purple-50 to-blue-50 border-2 shadow-lg animate-scale-in">
      <div className="flex items-center space-x-3">
        <Wave className="w-8 h-8 text-primary animate-[wave_2s_ease-in-out_infinite]" />
        <h1 className="text-3xl font-bold tracking-tight">
          Welcome back, {firstName}!
        </h1>
      </div>
      <p className="mt-2 text-muted-foreground">
        Track your health journey and discover personalized recommendations.
      </p>
    </Card>
  );
}