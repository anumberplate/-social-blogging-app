import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import LogoIcon from '../assets/svg/company-logo';

export default function Login() {
  const navigate = useNavigate();
  const { refreshUser } = useAuth();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("/api/auth/login", {
        email: form.email,
        password: form.password,
      });

      localStorage.setItem("token", res.data.token);

      // Fetch user info from /api/auth/me and set in context
      await refreshUser();

      navigate("/home");
    } catch (err) {
      console.error("Login error:", err);
      const message = err.response?.data?.message || err.message || "Login failed";
      alert(message);
    }
  };

  return (
    <article className="mt-52 text-black dark:text-white">
      <div className="flex justify-center items-center mb-4">
        <LogoIcon className="w-12 h-12" />
      </div>

      <h2 className="whitespace-nowrap font-bold text-center text-2xl mb-2">
        Welcome back
      </h2>
      <p className="text-center px-16 mb-4 text-gray-700 dark:text-gray-300">
        We’re excited to have you back, can’t wait to see what you’ve been up to since last logged in.
      </p>

      <form onSubmit={handleSubmit} className="flex flex-col px-10 md:px-56">
        <fieldset>
          <label htmlFor="email" className="font-bold dark:text-white">
            Email Address
          </label>
          <input
            type="email"
            placeholder="Email Address"
            name="email"
            id="email"
            value={form.email}
            onChange={handleChange}
            style={{ boxShadow: "0 4px 4px 0 #0A8F9A" }}
            className="pl-4 py-2 pr-4 w-full bg-[#F5F5F5] dark:bg-[#1e1e1e] border-solid rounded-2xl border-2 mb-8 dark:border-[#0A8F9A] dark:placeholder-gray-400"
            autoComplete="email"
            required
          />

          <label htmlFor="password" className="font-bold dark:text-white">
            Password
          </label>
          <input
            type="password"
            placeholder="Password"
            name="password"
            id="password"
            value={form.password}
            onChange={handleChange}
            style={{ boxShadow: "0 4px 4px 0 #0A8F9A" }}
            className="pl-4 py-2 pr-4 w-full bg-[#F5F5F5] dark:bg-[#1e1e1e] border-solid rounded-2xl border-2 mb-8 dark:border-[#0A8F9A] dark:placeholder-gray-400"
            autoComplete="current-password"
            required
          />
        </fieldset>

        <div className="flex flex-col content-center">
          <button
            type="submit"
            className="font-bold mb-3 p-3 px-9 bg-[#0A8F9A] text-black dark:text-white rounded-3xl mx-auto"
          >
            SIGN IN
          </button>
          <p className="text-center text-black dark:text-white">
            Don't have an account?{" "}
            <span className="text-[#0A8F9A] cursor-pointer" onClick={() => navigate("/signup")}>
              sign up
            </span>
          </p>
        </div>
      </form>
    </article>
  );
}
