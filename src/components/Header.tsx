import React from "react";
import { Stethoscope } from "lucide-react";
import { Menubar } from "@/components/ui/menubar";

const Header: React.FC = () => (
  <header className="w-full bg-blue-600 text-white p-4 flex flex-col md:flex-row items-center justify-between shadow-md">
    <div className="flex items-center space-x-3">
      <Stethoscope className="w-8 h-8 text-white" />
      <h1 className="text-2xl font-bold tracking-tight">Nelsonbot</h1>
      <span className="text-sm bg-blue-500 px-2 py-1 rounded-full">
        Pediatric AI Assistant
      </span>
    </div>
    <div className="mt-4 md:mt-0">
      <Menubar className="bg-blue-500 border-blue-400" />
    </div>
  </header>
);

export default Header;