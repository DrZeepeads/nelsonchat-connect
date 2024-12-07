import { Menubar, MenubarContent, MenubarItem, MenubarMenu, MenubarTrigger, MenubarSeparator } from "@/components/ui/menubar"
import { Menu, LogIn, UserPlus, History, Home } from "lucide-react"
import ChatArea from "@/components/ChatArea"
import { DirectionProvider } from "@radix-ui/react-direction"

const Index = () => {
  return (
    <DirectionProvider dir="ltr">
      <div className="min-h-screen flex w-full flex-col">
        <div className="fixed top-0 left-0 right-0 z-50">
          <div className="h-2 w-full hover-trigger" />
          <Menubar className="border-t border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 transition-all duration-300 ease-in-out transform -translate-y-full group-hover/menu:translate-y-0 hover:translate-y-0 w-full shadow-md">
            <MenubarMenu>
              <MenubarTrigger className="cursor-pointer hover:bg-accent/50 transition-colors duration-200">
                <Menu className="h-4 w-4 mr-2" />
                <span className="text-sm font-medium">Menu</span>
              </MenubarTrigger>
              <MenubarContent className="animate-in slide-in-from-top-2 duration-200">
                <MenubarItem className="flex items-center p-3 hover:bg-accent/50 transition-colors duration-200">
                  <Home className="h-4 w-4 mr-2" />
                  <span className="font-medium">Home</span>
                </MenubarItem>
                <MenubarSeparator />
                <MenubarItem className="flex items-center p-3 hover:bg-accent/50 transition-colors duration-200">
                  <LogIn className="h-4 w-4 mr-2" />
                  <span className="font-medium">Sign In</span>
                </MenubarItem>
                <MenubarItem className="flex items-center p-3 hover:bg-accent/50 transition-colors duration-200">
                  <UserPlus className="h-4 w-4 mr-2" />
                  <span className="font-medium">Sign Up</span>
                </MenubarItem>
                <MenubarSeparator />
                <MenubarItem className="flex items-center p-3 hover:bg-accent/50 transition-colors duration-200">
                  <History className="h-4 w-4 mr-2" />
                  <span className="font-medium">History</span>
                </MenubarItem>
              </MenubarContent>
            </MenubarMenu>
          </Menubar>
        </div>
        <div className="flex flex-1">
          <ChatArea />
        </div>
      </div>
    </DirectionProvider>
  )
}

export default Index