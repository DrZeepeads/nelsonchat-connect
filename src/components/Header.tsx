import React from "react";
import { Stethoscope } from "lucide-react";

const Header: React.FC = () => (
  <header className="border-b border-gray-200 bg-white py-4">
    <div className="container mx-auto max-w-4xl px-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="bg-blue-500 p-2 rounded-lg">
            <Stethoscope className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-800">NelsonBot</h1>
            <p className="text-sm text-gray-600">AI-Enhanced Pediatric Care</p>
          </div>
        </div>
      </div>
    </div>
  </header>
);

export default Header;