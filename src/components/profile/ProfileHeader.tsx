import { User } from "@supabase/auth-helpers-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";

interface ProfileHeaderProps {
  user: User | null;
  profile: {
    full_name?: string;
    avatar_url?: string;
    username?: string;
  };
}

export function ProfileHeader({ user, profile }: ProfileHeaderProps) {
  const initials = profile.full_name
    ?.split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase() || user?.email?.[0].toUpperCase() || "?";

  return (
    <Card className="border-none bg-gradient-to-r from-primary/10 via-primary/5 to-background mb-8">
      <CardContent className="pt-6">
        <div className="flex flex-col items-center space-y-4">
          <Avatar className="h-24 w-24 border-4 border-background">
            <AvatarImage src={profile.avatar_url || undefined} />
            <AvatarFallback className="text-lg">{initials}</AvatarFallback>
          </Avatar>
          <div className="space-y-1 text-center">
            <h2 className="text-2xl font-bold">{profile.full_name}</h2>
            <p className="text-muted-foreground">@{profile.username || user?.email?.split("@")[0]}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}