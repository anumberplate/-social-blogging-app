import { Link } from "react-router-dom";
import { useState } from "react";
import companyLogo from "../assets/icons/Navbar/company-logo.png";
import homeIcon from "../assets/icons/Navbar/home-icon.png";
import infoIcon from "../assets/icons/Navbar/info-icon.png";
import userIcon from "../assets/icons/Navbar/user-icon.png";
import magnifyImage from "../assets/icons/Navbar/magnifying-glass.png";

export default function Navbar() {
  const [dark, setDark] = useState(false);

  const toggleDark = () => {
    setDark(!dark);
    document.documentElement.classList.toggle("dark", !dark);
  };

  return (
    <header className="font-inter w-full shadow-sm bg-white dark:bg-gray-900 dark:text-white">
      <nav className="sticky w-full p-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        {/* Logo + Brand */}
        <div className="flex items-center gap-2 mb-2 sm:mb-0">
          <img src={companyLogo} alt="logo" className="w-10 h-10" />
          <h1 className="font-bold text-xl whitespace-nowrap">Creative Corner</h1>
        </div>

        {/* Right-side icons */}
        <div className="flex items-center gap-4 flex-wrap justify-center">
          <Link to="/">
            <img src={homeIcon} alt="Home" className="w-6 h-6 sm:w-8 sm:h-8" />
          </Link>
          <Link to="/Signup">
            <img src={infoIcon} alt="Info" className="w-6 h-6 sm:w-8 sm:h-8" />
          </Link>
          <Link to="/profile">
            <img src={userIcon} alt="User" className="w-6 h-6 sm:w-8 sm:h-8" />
          </Link>
          <button onClick={toggleDark} className="text-xl">
            {dark ? "🌙" : "☀️"}
          </button>
        </div>
      </nav>

      {/* Search Section */}
      <section className="flex items-center gap-4 px-4 pb-4 sm:px-6">
        <button className="w-10 h-10 text-2xl sm:hidden">&#9776;</button>

        <div className="relative w-full">
          <input
            type="text"
            placeholder="Search"
            className="w-full pl-4 pr-10 py-2 border-2 border-solid rounded-2xl drop-shadow-md dark:bg-gray-800"
            style={{ boxShadow: "0 4px 6px 4px #C6F7D3" }}
          />
          <button className="absolute right-3 top-1/2 -translate-y-1/2">
            <img src={magnifyImage} alt="search" className="w-4 h-4" />
          </button>
        </div>
      </section>
    </header>
  );
}
