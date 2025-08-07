import React, { useEffect, useState } from "react";
import ProfileIcon from "../assets/icons/ProfilePage/profile-icon.png";
import axios from "axios";

export default function Dashboard() {
  const [user, setUser] = useState({ username: "", email: "" });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    axios.get(`${import.meta.env.VITE_API_URL}/api/auth/user`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => {
      const { username, email } = res.data.user;
      setUser({ username, email });
    })
    .catch((err) => {
      console.error("Failed to load user data", err);
    });
  }, []);

  return (
    <article className="min-h-screen flex flex-col mt-24 pt-12 text-black bg-[#FAF5F5] md:bg-white">
      <section className="text-center mb-10 mt-10">
        <h2 className="font-bold text-2xl font-martel mb-4">Dashboard</h2>
        <img src={ProfileIcon} alt="Profile" className="mx-auto h-24 w-24 mb-6" />
      </section>

      <section className="px-6">
        <form className="flex flex-col gap-0 md:px-24 lg:px-64 md:content-center">
          <fieldset className="flex flex-col gap-4 mb-10">
            <label htmlFor="username" className="hidden md:block text-gray">Username</label>
            <div className="p-[2px] bg-gradient-to-r from-cyan-400 to-purple-500 rounded-[1rem]">
              <input
                type="text"
                value={user?.username || " "}
                readOnly
                id="userName"
                className="py-2 pl-4 md:py-6 pr-4 w-full bg-white rounded-[0.8rem] outline-none"
              />
            </div>

            <label htmlFor="email" className="hidden md:block">Email</label>
            <div className="p-[2px] bg-gradient-to-r from-cyan-400 to-purple-500 rounded-[1rem]">
              <input
                type="email"
                value={user?.email || " "}
                readOnly
                id="email"
                className="pl-4 py-2 md:py-6 pr-4 w-full bg-white rounded-[0.8rem] outline-none"
              />
            </div>
          </fieldset>

          <button
            type="submit"
            disabled
            className="bg-white mb-6 border border-gray-400 text-black drop-shadow-[0_6px_4px_#000] font-bold font-martel py-2 mt-2 mx-auto shadow-md hover:shadow-lg transition-all w-72 opacity-50 cursor-not-allowed"
          >
            Update profile (Coming soon)
          </button>

          <p className="mb-6 text-center text-[#0A8F9A] underline cursor-pointer">
            Add another Account
          </p>

          <a
            href="/create"
            className="mb-6 bg-[#9554EF] text-black py-2 rounded font-bold font-martel drop-shadow-[0_6px_2px_#000] mx-auto hover:bg-teal-800 transition-all w-72 text-center"
          >
            Create post
          </a>
        </form>
      </section>
    </article>
  );
}
