import React from "react";
import { Stethoscope } from "lucide-react";

const Header: React.FC = () => (
  <header className="w-full bg-blue-600 p-4">
    <div className="text-white text-sm">
      Welcome to Nelsonbot! You can chat with me or search the Nelson Textbook by typing /search followed by your query.
    </div>
  </header>
);

export default Header;