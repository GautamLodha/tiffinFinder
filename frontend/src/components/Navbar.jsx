import { Home, LogOut, Sun, Moon,Compass } from "lucide-react";
import { useState } from "react";

export default function Navbar() {
  const [active, setActive] = useState("home");
  const [dark, setDark] = useState(false);

  return (
    <div className="fixed bottom-4 left-0 right-0 flex justify-center">
      <div className="flex justify-between items-center bg-white shadow-lg rounded-full px-6 py-3 w-fit max-w-md">

        {/* Home */}
        <button
          onClick={() => setActive("home")}
          className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-200 
            ${
              active === "home"
                ? "bg-orange-500 text-white"
                : "text-gray-500 hover:bg-gray-200"
            }`}
        >
          <Home className="w-4 h-4" />
          <span className="text-sm">Home</span>
        </button>

        {/* Logout */}
        <button
          onClick={() => setActive("logout")}
          className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-200 
            ${
              active === "logout"
                ? "bg-orange-500 text-white"
                : "text-gray-500 hover:bg-gray-200"
            }`}
        >
          <LogOut className="w-4 h-4" />
          <span className="text-sm">Logout</span>
        </button>

        <button
          onClick={() => setActive("explore")}
          className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-200 
            ${
              active === "explore"
                ? "bg-orange-500 text-white"
                : "text-gray-500 hover:bg-gray-200"
            }`}
        >
          <Compass className="w-4 h-4" />
          <span className="text-sm">explore</span>
        </button>
        

      </div>
    </div>
  );
}