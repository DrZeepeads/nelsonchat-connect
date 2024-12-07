import { SidebarProvider } from "@/components/ui/sidebar"
import AppSidebar from "@/components/AppSidebar"
import Header from "@/components/Header"
import { Menubar, MenubarContent, MenubarItem, MenubarMenu, MenubarTrigger } from "@/components/ui/menubar"
import { Menu } from "lucide-react"
import ChatArea from "@/components/ChatArea"
import { SearchBox } from "@/components/SearchBox"

const Index = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full flex-col">
        <Header />
        <Menubar className="border-t border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 transition-all duration-500 ease-in-out transform hover:translate-y-0 -translate-y-0 shadow-sm">
          <MenubarMenu>
            <MenubarTrigger className="cursor-pointer hover:bg-accent/50 transition-colors duration-300">
              <Menu className="h-4 w-4 mr-2" />
              <span className="text-sm font-medium">Menu</span>
            </MenubarTrigger>
            <MenubarContent className="animate-in slide-in-from-top-2 duration-300 opacity-0 data-[state=open]:opacity-100">
              <MenubarItem className="flex flex-col items-start p-3 hover:bg-accent/50 transition-colors duration-200">
                <span className="font-medium">Welcome to Nelsonbot</span>
                <span className="text-xs text-muted-foreground mt-1">Your AI assistant for pediatric medicine</span>
              </MenubarItem>
            </MenubarContent>
          </MenubarMenu>
        </Menubar>
        <div className="p-4">
          <SearchBox />
        </div>
        <div className="flex flex-1">
          <AppSidebar />
          <ChatArea />
        </div>
      </div>
    </SidebarProvider>
  )
}

export default Index