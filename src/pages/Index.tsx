import { SidebarProvider } from "@/components/ui/sidebar"
import AppSidebar from "@/components/AppSidebar"
import Header from "@/components/Header"

const Index = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full flex-col">
        <Header />
        <div className="flex flex-1">
          <AppSidebar />
          <main className="flex-1 p-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-4">Welcome to Nelsonbot</h2>
              <p className="text-gray-600">
                Your AI assistant for pediatric medicine
              </p>
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  )
}

export default Index