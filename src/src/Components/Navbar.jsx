import React from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faXmark } from '@fortawesome/free-solid-svg-icons';
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import companyLogo from "../assets/icons/Navbar/company-logo.png";
import homeIcon from "../assets/icons/Navbar/home-icon.png";
import infoIcon from "../assets/icons/Navbar/info-icon.png";
import userIcon from "../assets/icons/Navbar/user-icon.png";
import magnifyImage from "../assets/icons/Navbar/magnifying-glass.png";


export default function Navbar() {
  const [dark, setDark] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => setMenuOpen(!menuOpen);

  useEffect(() => {
  const storedTheme = localStorage.getItem('theme');
  if (storedTheme === 'dark') {
    document.documentElement.classList.add('dark');
    setDark(true);
  }
  }, []);

  const toggleDark = () => {
    const newTheme = !dark;
    setDark(newTheme);
    document.documentElement.classList.toggle('dark', newTheme);
    localStorage.setItem('theme', newTheme ? 'dark' : 'light');
  };


  return (
    <header className="fixed top-0 font-inter w-full shadow-sm bg-white dark:bg-gray-900 dark:text-white">
      <nav className="w-full px-4 pt-3 pb-8 mb-2 flex items-center justify-between gap-4 font-inter flex-nowrap md:mb-4 border-b-4 border-b-[#36C5D1] md:border-none md:py-3">
        {/* Logo + Brand */}
        <div className="flex items-center gap-3 min-w-0 ">
          <img src={companyLogo} alt="logo" className="hidden md:block w-10 h-10" />
          <h1 className="text-xl font-bold whitespace-nowrap md:hidden">Creative Corner</h1>
        </div>
        <h1 className="hidden md:block text-3xl font-bold whitespace-nowrap">Creative Corner</h1>

        <button onClick={toggleMenu} className="md:hidden text-2xl text-gray-800 md:ml-64 md:mr-0 md:pr-0 dark:text-white">
          <FontAwesomeIcon icon={menuOpen ? faXmark : faBars} className= "p-0 m-0"/>
        </button>

        {/* Icons and theme toggle */}
        <div className="hidden md:flex items-center gap-2 flex-shrink-0">
          <Link to="/" className="hover:scale-105 transition">
            <img src={homeIcon} alt="Home" className="w-6 h-6 sm:w-7 sm:h-7" />
          </Link>

          <Link to="/Signup" className="hover:scale-105 transition">
            <img src={infoIcon} alt="Info" className="w-6 h-6 sm:w-7 sm:h-7" />
          </Link>

          <Link to="/profile" className="hover:scale-105 transition">
            <img src={userIcon} alt="User" className="w-6 h-6 sm:w-7 sm:h-7" />
          </Link>

          <button
            onClick={toggleDark}
            className="text-xl hover:scale-110 transition-transform"
            title="Toggle Theme"
          >
            {dark ? "🌙" : "☀️"}
          </button>
        </div>
      </nav>


      {/* Search Section */}
      <section className="flex items-center gap-4 px-4 pb-4 sm:px-6 md:flex flex-row justify-center">
        <button onClick={toggleMenu} className="text-2xl text-gray-800 md:ml-64 md:mr-0 md:pr-0 dark:text-white">
          <FontAwesomeIcon icon={menuOpen ? faXmark : faBars} className= "p-0 m-0"/>
        </button>

        <div className="relative w-full md:pr-24 lg:pr-64">
          <input
            type="text"
            placeholder="Search"
            className="w-full pl-4 pr-10 py-2 border-2 border-solid rounded-2xl drop-shadow-md md:py-4 dark:bg-gray-800"
            style={{ boxShadow: "0 4px 6px 4px #C6F7D3" }}
          />
          <button className="absolute right-3 md:-right-[-120px] lg:-right-[-280px] top-1/2 -translate-y-1/2">
            <img src={magnifyImage} alt="search" className="w-4 h-4" />
          </button>
        </div>
      </section>
    </header>
  );
}
