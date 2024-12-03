import { Bell, HelpCircle, Settings, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

interface HeaderProps {
  /** Optional user name to display in the header */
  userName?: string;
}

/**
 * Header component displays the main navigation header with user info and action buttons
 */
export function Header({ userName = "John Doe" }: HeaderProps) {
  return (
    <header 
      className="border-b bg-white p-4"
      role="banner"
      aria-label="Main header"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div 
            className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center"
            aria-hidden="true"
          >
            <User className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h2 className="text-lg font-semibold">Welcome back</h2>
            <p className="text-sm text-gray-500">{userName}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                variant="ghost" 
                size="icon"
                aria-label="Notifications"
              >
                <Bell className="h-5 w-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>View notifications</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                variant="ghost" 
                size="icon"
                aria-label="Help"
              >
                <HelpCircle className="h-5 w-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Get help</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                variant="ghost" 
                size="icon"
                aria-label="Settings"
              >
                <Settings className="h-5 w-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Open settings</TooltipContent>
          </Tooltip>
        </div>
      </div>
    </header>
  );
}