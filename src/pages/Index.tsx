import { DirectionProvider } from "@radix-ui/react-direction"
import ChatArea from "@/components/ChatArea"
import Header from "@/components/Header"

const Index = () => {
  return (
    <DirectionProvider dir="ltr">
      <div className="min-h-screen flex w-full flex-col bg-[#0A0F1C]">
        <Header />
        <div className="flex flex-1">
          <ChatArea />
        </div>
      </div>
    </DirectionProvider>
  )
}

export default Index