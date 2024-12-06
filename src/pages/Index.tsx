import { SidebarProvider } from "@/components/ui/sidebar"
import AppSidebar from "@/components/AppSidebar"
import Header from "@/components/Header"
import { Menubar, MenubarContent, MenubarItem, MenubarMenu, MenubarTrigger } from "@/components/ui/menubar"
import { Menu } from "lucide-react"

const Index = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full flex-col">
        <Header />
        <Menubar className="border-t border-b">
          <MenubarMenu>
            <MenubarTrigger className="cursor-pointer">
              <Menu className="h-4 w-4 mr-2" />
              Menu
            </MenubarTrigger>
            <MenubarContent>
              <MenubarItem>
                Welcome to Nelsonbot - Your AI assistant for pediatric medicine
              </MenubarItem>
            </MenubarContent>
          </MenubarMenu>
        </Menubar>
        <div className="flex flex-1">
          <AppSidebar />
          <main className="flex-1 p-6">
            <div className="text-center">
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  )
}

export default Index