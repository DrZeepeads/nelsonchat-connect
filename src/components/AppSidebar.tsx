import { Home, History, Settings, LogIn, LogOut } from "lucide-react";
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

// Define menu item type for better type safety
interface MenuItem {
  title: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  href: string;
}

// Navigation menu items
const menuItems: MenuItem[] = [
  { title: "Home", icon: Home, href: "/" },
  { title: "History", icon: History, href: "#" },
  { title: "Settings", icon: Settings, href: "#" },
];

// Authentication menu items
const authItems: MenuItem[] = [
  { title: "Sign In", icon: LogIn, href: "#" },
  { title: "Sign Out", icon: LogOut, href: "#" },
];

// Reusable menu rendering function
function renderMenuItems(items: MenuItem[]) {
  return items.map((item) => (
    <SidebarMenuItem key={item.title}>
      <SidebarMenuButton asChild>
        <a href={item.href} aria-label={item.title}>
          <item.icon className="h-4 w-4" />
          <span>{item.title}</span>
        </a>
      </SidebarMenuButton>
    </SidebarMenuItem>
  ));
}

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarContent>
        {/* Navigation Group */}
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>{renderMenuItems(menuItems)}</SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Account Group */}
        <SidebarGroup>
          <SidebarGroupLabel>Account</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>{renderMenuItems(authItems)}</SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}