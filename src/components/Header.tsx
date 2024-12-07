import React from "react";
import { Stethoscope } from "lucide-react";

const Header: React.FC = () => (
  <header className="w-full bg-blue-600 text-white p-4 flex items-center justify-center space-x-3 shadow-md">
    <Stethoscope className="w-8 h-8 text-white" />
    <h1 className="text-2xl font-bold tracking-tight">Nelsonbot</h1>
    <span className="text-sm bg-blue-500 px-2 py-1 rounded-full ml-2">
      Pediatric AI Assistant
    </span>
  </header>
);

export default Header;