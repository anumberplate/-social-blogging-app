import axios from "axios"
import React from "react"
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faXmark } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAuth } from '../context/AuthContext';
import companyLogo from "../assets/icons/Navbar/company-logo.png";
import homeIcon from "../assets/icons/Navbar/home-icon.png";
import infoIcon from "../assets/icons/Navbar/info-icon.png";
import userIcon from "../assets/icons/Navbar/user-icon.png";
import magnifyImage from "../assets/icons/Navbar/magnifying-glass.png";
import { useSidebar } from '../context/SidebarContext';


export default function Navbar() {
  
  const navigate = useNavigate()
  const location = useLocation()

  if (location.pathname === "/chatbot") return null;
  
  const [menuOpen, setMenuOpen] = useState(false);
  const [dark, setDark] = useState(false);
  const toggleMenu = () => setMenuOpen(!menuOpen);
  const { toggleSidebar } = useSidebar();
  
  const { user } = useAuth();

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
  
  const [navLayout, setNavLayout] = useState("default")
 
  useEffect(() => {
    if (location.pathname === "/") {
      setNavLayout("home")
    } else if (location.pathname.startsWith("/home")) {
      setNavLayout("home")
    } else {
      setNavLayout()
    }
  })

 

  const [hideSearchSection, setHideSearchSection] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (location.pathname.startsWith("/home") || location.pathname === "/") {
        if (window.scrollY > 10 ) {
          setHideSearchSection(true)
        } else {
          setHideSearchSection(false)
        }
      } else {
        setHideSearchSection(true)
      }
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  })
  
  return (
    <header className={`fixed top-0 font-inter w-full shadow-none bg-[#FAF5F5] dark:bg-[#374151] dark:pb-6 dark:text-white z-10 pb-10 ${hideSearchSection ? 'h-24': 'h-auto'}`}>
      <nav className="w-full px-2 py-4 md:px-4 bg-white dark:bg-[#374151] md:py-8 flex items-center justify-between font-inter border-b-4 border-b-[#36C5D1] mb-4 md:mb-16">
        <h1 className="text-xl font-bold whitespace-nowrap md:text-4xl md:pl-4">Creative Corner</h1>
        {/* Icons and theme toggle */}
        <div className="flex flex-row items-center gap-2">  
            {user ? (
              <div className="flex flex-row items-center">
                <Link to="/dashboard">
                  <img src="/profile-icon.png" alt="profile" className="w-6 h-6 mr-16" />
                </Link>
                <button onClick={toggleDark} className="flex justify-center items-center text-2xl text-black-500 mr-16 dark:text-white">
                    <FontAwesomeIcon icon={faSun} className="block dark:hidden" />
                    <FontAwesomeIcon icon={faMoon} className="hidden dark:block" />
                </button>
                <button onClick={toggleSidebar} className="text-2xl text-gray-800 md:mr-0 md:pr-0 dark:text-white">
                    <FontAwesomeIcon icon={menuOpen ? faXmark : faBars} className= "p-0 m-0"/>
                </button>
              </div>
            ) : (
              <div className="flex flex-row items-center">
                <Link to="/signup">
                  <div className="inline-block mr-2 md:mr-14 rounded-lg p-[2px] bg-gradient-to-r from-[#36C5D1] to-[#A82ED3]">
                    <button className="bg-white dark:bg-[#1e1e1e] text-black dark:text-white rounded-lg px-4 mr-2 md:px-16 py-2 w-full h-full font-semibold">
                      Sign Up
                    </button>
                  </div>
                </Link>
                <button onClick={toggleDark} className="text-2xl flex justify-center items-center text-black-500 mr-2 md:mr-8 dark:text-white">
                  <FontAwesomeIcon icon={faSun} className="block dark:hidden" />
                  <FontAwesomeIcon icon={faMoon} className="hidden dark:block" />
                </button>
                <button onClick={toggleMenu} className="text-2xl text-gray-800 md:mr-0 md:pr-0 dark:text-white">
                  <FontAwesomeIcon icon={menuOpen ? faXmark : faBars} className= "p-0 m-0"/>
                </button>
              </div>
            )}
          
        </div>
      </nav>


      {/* Search Section */}
      {
      navLayout === "home" && (
            <section
              className={`
                px-6 bg-[#FAF5F5] shadow-none border-none md:px-64 dark:bg-[#374151]
                transition-all duration-30 ease-in-out
                ${hideSearchSection ? 'opacity-0 -translate-y-6 pointer-events-none' : 'opacity-100 translate-y-0'}
              `}
                  >
                <div className="relative w-full mb-6">
                  <input
                    type="text"
                    placeholder="Search"
                    className="w-full pl-4 pr-10 py-2 border-2 border-solid rounded-2xl md:py-4 dark:bg-gray-800"
                    style={{ borderColor: '#A82ED3' }}
                  />
                  <button className="absolute right-3 md:-right-2 lg:right-6 top-1/2 -translate-y-1/2">
                    <img src={magnifyImage} alt="search" className="w-4 h-4" />
                  </button>
                </div>

                <div className="flex flex-row justify-center gap-x-1 w-full md:gap-x-6">
                  {['Trending', 'Games', 'Hot topics', 'Action', 'Explore', 'Kids'].map((label, i) => (
                    <button
                      key={i}
                      className="bg-white dark:text-white dark:bg-[#374151] border-[#A82ED3] border-2 py-1 px-1 text-[0.7rem] md:text-[1rem] md:py-2 md:px-4 rounded-2xl"
                      onClick={() => navigate(`/home/${label.toLowerCase().replace(/\s/g, '')}`)}
                    >
                      {label}
                    </button>
                  ))}
                </div>
            </section>
        ) 
      }
    </header>
    
    
  );
}
