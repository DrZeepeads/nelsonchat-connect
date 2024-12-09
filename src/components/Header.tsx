import React from "react";
import { Stethoscope } from "lucide-react";

const Header: React.FC = () => (
  <header
    className="w-full bg-gradient-to-r from-[#9b87f5] to-[#7E69AB] text-white py-4 px-6 flex items-center justify-between shadow-lg relative z-50"
    aria-label="Application Header"
  >
    <div className="flex items-center space-x-4">
      <div className="bg-white/10 p-2 rounded-lg backdrop-blur-sm">
        <Stethoscope className="w-7 h-7 text-white" aria-label="NelsonBot Logo" />
      </div>
      <div className="flex flex-col">
        <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">
          NelsonBot
        </h1>
        <p className="text-xs md:text-sm font-medium text-white/80">
          AI-Enhanced Pediatric Care
        </p>
      </div>
    </div>
    <div className="hidden md:block">
      <div className="px-4 py-2 bg-white/10 rounded-full backdrop-blur-sm">
        <span className="text-sm font-medium">Your Pediatric Assistant</span>
      </div>
    </div>
  </header>
);

export default Header;