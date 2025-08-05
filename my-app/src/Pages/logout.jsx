import React from "react";
import { useNavigate } from "react-router-dom";
import ProfileIcon from "../assets/icons/ProfilePage/profile-icon.png";
import { useAuth } from "../context/AuthContext";

export default function LogOut() {
  const navigate = useNavigate();
  const { setUser } = useAuth(); 

  const handleLogout = () => {
    localStorage.removeItem("token");    
    setUser(null);                       
    navigate("/signup");                  
  };

  return (
    <article className="min-h-screen mt-36 pt-6 bg-[#FAF5F5] md:bg-white px-4">
      <section className="text-center mb-0">
        <h2 className="font-bold text-2xl font-martel mb-4">Profile</h2>
        <img src={ProfileIcon} alt="Profile" className="mx-auto h-24 w-24 mb-6" />
      </section>

      <section className="drop-shadow-[0_4px_4px_#000] rounded-2xl mb-6 py-4 bg-white px-6">
        <p className="text-center font-bold text-2xl mb-8">Are you sure you want to sign out?</p>
        <div className="flex flex-row justify-evenly">
          <button
            onClick={() => navigate(-1)} // Go back
            className="bg-[#00272B] rounded-xl py-2 text-white px-4 w-32"
          >
            Back
          </button>
          <button
            onClick={handleLogout}
            className="bg-[#E83C3C] rounded-xl py-2 text-white px-4 w-32"
          >
            Sign Out
          </button>
        </div>
      </section>

      <section className="text-center">
        <button
          type="submit"
          className="bg-white mb-6 border border-gray-400 text-black drop-shadow-[0_6px_4px_#000] font-bold font-martel py-2 mt-2 mx-auto shadow-md hover:shadow-lg transition-all w-72"
        >
          Update profile
        </button>

        <p className="mb-6 text-center text-[#0A8F9A] underline cursor-pointer">
          Add another Account
        </p>

        <button
          type="button"
          className="mb-10 bg-[#9554EF] text-black py-2 rounded font-bold font-martel drop-shadow-[0_6px_2px_#000] mx-auto hover:bg-teal-800 transition-all w-72"
        >
          Create post
        </button>

        <div className="px-10 font-martel flex justify-between">
          <button onClick={() => alert("Delete coming soon")} className="text-[#E83C3C]">
            Delete Account
          </button>
          <button onClick={handleLogout} className="text-[#E83C3C]">
            Sign Out
          </button>
        </div>
      </section>
    </article>
  );
}
