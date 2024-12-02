import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Home, ScanLine, Book } from "lucide-react";
import { NavLink } from "react-router-dom";
import { useSidebar } from "./ui/sidebar";

export function AppSidebar() {
  const { collapsed } = useSidebar();

  return (
    <div
      className={cn(
        "flex flex-col gap-4 py-2 border-r bg-gray-100/40 dark:bg-gray-800/40",
        collapsed ? "w-16" : "w-64"
      )}
    >
      <div className="px-3 py-2">
        <h2 className={cn("text-lg font-semibold tracking-tight", collapsed && "hidden")}>
          Nourish Navigator
        </h2>
      </div>
      <ScrollArea className="flex-1">
        <div className="flex flex-col gap-2 px-2">
          <NavLink to="/" className={({ isActive }) => cn(isActive && "bg-secondary")}>
            <Button variant="ghost" className="w-full justify-start">
              <Home className="mr-2 h-4 w-4" />
              {!collapsed && "Dashboard"}
            </Button>
          </NavLink>
          <NavLink to="/scan" className={({ isActive }) => cn(isActive && "bg-secondary")}>
            <Button variant="ghost" className="w-full justify-start">
              <ScanLine className="mr-2 h-4 w-4" />
              {!collapsed && "Scan Product"}
            </Button>
          </NavLink>
          <NavLink to="/diets/category/all" className={({ isActive }) => cn(isActive && "bg-secondary")}>
            <Button variant="ghost" className="w-full justify-start">
              <Book className="mr-2 h-4 w-4" />
              {!collapsed && "Diet Guide"}
            </Button>
          </NavLink>
        </div>
      </ScrollArea>
    </div>
  );
}