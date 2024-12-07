import React from "react";
import { Stethoscope } from "lucide-react";

const Header: React.FC = () => (
  <header className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white p-4 flex items-center justify-between shadow-lg">
    <div className="flex items-center space-x-3">
      <Stethoscope className="w-8 h-8 text-white" />
      <h1 className="text-3xl font-extrabold tracking-wide">NelsonBot</h1>
    </div>
    <p className="text-sm italic text-white opacity-90">AI-Enhanced Pediatric Care</p>
  </header>
);

export default Header;
