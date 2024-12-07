import React from "react";
import { Stethoscope } from "lucide-react";

const Header: React.FC = () => (
  <header className="w-full bg-white text-gray-800 p-2 flex items-center justify-center shadow-sm">
    <div className="flex items-center space-x-2">
      <Stethoscope className="w-8 h-8 text-blue-600" />
      <h1 className="text-2xl font-bold text-blue-600">NelsonBot</h1>
    </div>
  </header>
);

export default Header;


