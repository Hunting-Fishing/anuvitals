import { NavLink } from "react-router-dom";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Home, QrCode, User, LogOut } from "lucide-react";

export function AppSidebar() {
  const session = useSession();
  const supabase = useSupabaseClient();
  const { toast } = useToast();

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast({
        title: "Error signing out",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  if (!session) return null;

  return (
    <div className="h-screen w-64 border-r bg-background p-4 flex flex-col">
      <div className="flex-1 space-y-2">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
              isActive
                ? "bg-primary text-primary-foreground"
                : "hover:bg-muted"
            }`
          }
        >
          <Home size={20} />
          <span>Home</span>
        </NavLink>
        
        <NavLink
          to="/scan"
          className={({ isActive }) =>
            `flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
              isActive
                ? "bg-primary text-primary-foreground"
                : "hover:bg-muted"
            }`
          }
        >
          <QrCode size={20} />
          <span>Scan Product</span>
        </NavLink>

        <NavLink
          to="/profile"
          className={({ isActive }) =>
            `flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
              isActive
                ? "bg-primary text-primary-foreground"
                : "hover:bg-muted"
            }`
          }
        >
          <User size={20} />
          <span>Profile</span>
        </NavLink>
      </div>

      <Button
        variant="ghost"
        className="w-full justify-start space-x-2"
        onClick={handleSignOut}
      >
        <LogOut size={20} />
        <span>Sign Out</span>
      </Button>
    </div>
  );
}