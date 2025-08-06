import { createContext, useContext, useState } from "react";

const SidebarContext = createContext();

export const SidebarProvider = ({ children }) => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen((prev) => !prev);
  const closeSidebar = () => setSidebarOpen(false);
  const openSidebar = () => setSidebarOpen(true);

  return (
    <SidebarContext.Provider value={{ isSidebarOpen, toggleSidebar, closeSidebar, openSidebar }}>
      {children}
    </SidebarContext.Provider>
  );
};

export const useSidebar = () => useContext(SidebarContext);