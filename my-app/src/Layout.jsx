import React from "react"
import { Outlet } from "react-router-dom"
import  Navbar from "./Components/Navbar"
import Sidebar from './Sidebar';
import { useAuth } from './context/AuthContext';

export default function Layout(){
  const { isLoggedIn } = useAuth();
  return(
    <>
      <Navbar />
      <Sidebar key={isLoggedIn ? "loggedIn" : "guest"} />
      <main>
        <Outlet />
      </main> 
    </>
  )
} 