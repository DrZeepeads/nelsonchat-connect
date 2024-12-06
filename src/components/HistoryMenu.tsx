import { Clock } from "lucide-react";
import {
  MenubarMenu,
  MenubarTrigger,
  MenubarContent,
  MenubarItem,
} from "@/components/ui/menubar";

export function HistoryMenu() {
  const historyItems = [
    { id: 1, text: "Recent Chat 1", timestamp: "10:30 AM" },
    { id: 2, text: "Recent Chat 2", timestamp: "Yesterday" },
    { id: 3, text: "Recent Chat 3", timestamp: "2 days ago" },
  ];

  return (
    <MenubarMenu>
      <MenubarTrigger className="cursor-pointer">
        <Clock className="h-4 w-4 mr-2" />
        History
      </MenubarTrigger>
      <MenubarContent>
        {historyItems.map((item) => (
          <MenubarItem key={item.id} className="flex justify-between">
            <span>{item.text}</span>
            <span className="text-xs text-muted-foreground">{item.timestamp}</span>
          </MenubarItem>
        ))}
      </MenubarContent>
    </MenubarMenu>
  );
}