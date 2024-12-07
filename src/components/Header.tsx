import React from "react";
import { Stethoscope } from "lucide-react";

const Header: React.FC = () => (
  <header className="w-full bg-blue-600 text-white p-4 flex flex-col items-center shadow-md">
    <div className="text-center mb-2">
      <span className="text-4xl font-bold">NelsonBot</span>
    </div>
    <div className="flex items-center justify-center space-x-3 mb-4">
      <Stethoscope className="w-8 h-8" />
      <span className="text-lg font-medium">AI-Enhanced Pediatric Care</span>
    </div>
    <div className="text-sm text-center">
    </div>
  </header>
);

export default Header;

