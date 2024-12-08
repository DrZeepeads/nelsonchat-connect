import React from "react";
import { Stethoscope } from "lucide-react";

const Header: React.FC = () => (
  <header
    className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white p-4 flex items-center justify-between shadow-lg"
    aria-label="Application Header"
  >
    <div className="flex items-center space-x-3">
      <Stethoscope className="w-8 h-8" aria-label="NelsonBot Logo" />
      <h1 className="text-2xl md:text-3xl font-extrabold tracking-wide">NelsonBot</h1>
    </div>
    <p className="text-xs md:text-sm italic opacity-90 text-right">
      AI-Enhanced Pediatric Care
    </p>
  </header>
);

export default Header;