import React, { useState } from "react";
import { Menu, X, Sun, Moon, LogIn, LogOut, History } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DropdownMenu } from "@/components/ui/dropdown-menu";

const MenuBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const toggleDarkMode = () => setIsDarkMode(!isDarkMode);

  return (
    <nav className="bg-gray-800 text-white p-4 flex justify-between items-center">
      <div className="text-xl font-bold">NelsonBot</div>
      <div className="relative">
        <button onClick={toggleMenu} className="focus:outline-none">
          {isOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </button>
        {isOpen && (
          <DropdownMenu>
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 ring-1 ring-black ring-opacity-5 z-50">
              <Button 
                className="w-full flex justify-start items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" 
                variant="ghost"
              >
                <LogIn className="mr-2 h-4 w-4" /> Sign In
              </Button>
              <Button 
                className="w-full flex justify-start items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" 
                variant="ghost"
              >
                <LogOut className="mr-2 h-4 w-4" /> Sign Out
              </Button>
              <Button 
                className="w-full flex justify-start items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" 
                variant="ghost"
                onClick={() => console.log("History clicked")}
              >
                <History className="mr-2 h-4 w-4" /> Chat History
              </Button>
              <Button 
                className="w-full flex justify-start items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" 
                variant="ghost"
                onClick={toggleDarkMode}
              >
                {isDarkMode ? (
                  <>
                    <Sun className="mr-2 h-4 w-4" /> Light Mode
                  </>
                ) : (
                  <>
                    <Moon className="mr-2 h-4 w-4" /> Dark Mode
                  </>
                )}
              </Button>
            </div>
          </DropdownMenu>
        )}
      </div>
    </nav>
  );
};

export default MenuBar;