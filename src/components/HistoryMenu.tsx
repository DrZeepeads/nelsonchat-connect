import { Clock } from "lucide-react";
import {
  MenubarMenu,
  MenubarTrigger,
  MenubarContent,
  MenubarItem,
} from "@/components/ui/menubar";

const historyItems = [
  { id: 1, text: "Recent Chat 1", timestamp: "10:30 AM" },
  { id: 2, text: "Recent Chat 2", timestamp: "Yesterday" },
  { id: 3, text: "Recent Chat 3", timestamp: "2 days ago" },
];

// History Item Component
const HistoryItem: React.FC<{ text: string; timestamp: string }> = ({ text, timestamp }) => (
  <MenubarItem
    className="flex justify-between items-center px-2 py-1 hover:bg-muted rounded-md cursor-pointer"
    role="menuitem"
  >
    <span>{text}</span>
    <span className="text-xs text-muted-foreground">{timestamp}</span>
  </MenubarItem>
);

export function HistoryMenu() {
  return (
    <MenubarMenu>
      <MenubarTrigger className="flex items-center cursor-pointer" aria-label="Open History Menu">
        <Clock className="h-4 w-4 mr-2" aria-hidden="true" />
        History
      </MenubarTrigger>
      <MenubarContent className="bg-white shadow-lg rounded-md">
        {historyItems.map((item) => (
          <HistoryItem key={item.id} text={item.text} timestamp={item.timestamp} />
        ))}
      </MenubarContent>
    </MenubarMenu>
  );
}