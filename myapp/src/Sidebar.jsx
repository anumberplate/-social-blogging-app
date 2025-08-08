import { useSidebar } from "./context/SidebarContext";
import { useAuth } from "./context/AuthContext";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faXmark } from '@fortawesome/free-solid-svg-icons';


const Sidebar = () => {
  const { isSidebarOpen, toggleSidebar } = useSidebar();
  const { isLoggedIn, user } = useAuth();


  return (
    <div className={`fixed top-0 left-0 h-full w-72 bg-white shadow-lg transition-transform z-50
      ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
      <button onClick={toggleSidebar} className="text-2xl text-gray-800 md:ml-64 md:mr-0 md:pr-0 dark:text-white">
        <FontAwesomeIcon icon={faXmark} className= "p-0 m-0"/>
      </button>
      <ul className="flex flex-col gap-4 p-6">
        <li className = "font-inter text-xl"><Link to="/">Home</Link></li>
        {isLoggedIn && <li className = "font-inter text-xl"><Link to="/myprofile">Profile</Link></li>}
        {isLoggedIn && <li className = "font-inter text-xl"><Link to="/createpost">Create</Link></li>}
        {isLoggedIn && <li className = "font-inter text-xl"><Link to="/about">About</Link></li>}
        {isLoggedIn && <li className = "font-inter text-xl"><Link to="/following">Following</Link></li>}
        {isLoggedIn && <li className = "font-inter text-xl"><Link to="/followerspage">Followers</Link></li>}
        {isLoggedIn && <li className = "font-inter text-xl"><Link to="/recentposts">Recent posts</Link></li>}
        {isLoggedIn && <li className = "font-inter text-xl"><Link to="/chatbot">AI chatbot</Link></li>}
        {isLoggedIn && <li className = "font-inter text-xl"><Link to="/logout">Log out</Link></li>}
      </ul>
      
</div>
  );
};

export default Sidebar;
