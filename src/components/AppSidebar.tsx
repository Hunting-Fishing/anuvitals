import { Home, Scan, LineChart, CalendarDays, ShoppingCart, Leaf, Activity, Settings } from "lucide-react";
import { useLocation } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

const menuItems = [
  { title: "Home", icon: Home, url: "/" },
  { title: "Scan Product", icon: Scan, url: "/scan" },
  { title: "Insights", icon: LineChart, url: "/insights" },
  { title: "Meal Plans", icon: CalendarDays, url: "/meal-plans" },
  { title: "Shopping List", icon: ShoppingCart, url: "/shopping" },
  { title: "Sustainability", icon: Leaf, url: "/sustainability" },
  { title: "Health & Fitness", icon: Activity, url: "/health" },
  { title: "Settings", icon: Settings, url: "/settings" },
];

export function AppSidebar() {
  const location = useLocation();

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a 
                      href={item.url} 
                      className="flex items-center gap-3 px-3 py-2"
                      data-active={location.pathname === item.url}
                    >
                      <item.icon className="h-5 w-5" />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}