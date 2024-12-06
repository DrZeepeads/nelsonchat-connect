import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { History, LogIn } from "lucide-react"
import { Button } from "@/components/ui/button"

const AppSidebar = () => {
  const conversations = [
    { id: 1, title: "Conversation 1" },
    { id: 2, title: "Conversation 2" },
  ]

  return (
    <Sidebar>
      <SidebarHeader>
        <Button className="w-full" variant="default">
          <LogIn className="mr-2" />
          Sign In/Up
        </Button>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Chat History</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {conversations.map((conversation) => (
                <SidebarMenuItem key={conversation.id}>
                  <SidebarMenuButton>
                    <History className="mr-2" />
                    <span>{conversation.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}

export default AppSidebar