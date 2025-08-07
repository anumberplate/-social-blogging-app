import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Signup() {
  const navigate = useNavigate();
  const { refreshUser } = useAuth();

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
    cpassword: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.password !== form.cpassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/signup`, {
        username: form.fullName,
        email: form.email,
        password: form.password,
      });

      localStorage.setItem("token", res.data.token);

      // fetch user info from /api/auth/me and set in context
      await refreshUser();

      navigate("/home");
    } catch (err) {
      console.error("Signup error:", err);
      const message = err.response?.data?.message || err.message || "Signup failed";
      alert(message);
    }
  };

  return (
    <article className="mt-48">
      <h2 className="whitespace-nowrap font-bold text-center text-2xl mb-10 dark:text-white">
        CREATE YOUR ACCOUNT
      </h2>

      <form onSubmit={handleSubmit} className="flex flex-col px-10 md:px-56">
        <fieldset>
          <label htmlFor="fullName" className="font-bold dark:text-white">
            Full name
          </label>
          <input
            type="text"
            placeholder="Full name"
            name="fullName"
            id="fullName"
            value={form.fullName}
            onChange={handleChange}
            style={{ boxShadow: "0 4px 4px 0 #0A8F9A" }}
            className="pl-4 py-2 pr-4 bg-[#F5F5F5] w-full border-solid rounded-2xl border-2 mb-8"
            autoComplete="name"
            required
          />

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
            className="pl-4 py-2 pr-4 w-full bg-[#F5F5F5] border-solid rounded-2xl border-2 mb-8"
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
            className="pl-4 py-2 pr-4 w-full bg-[#F5F5F5] border-solid rounded-2xl border-2 mb-8"
            autoComplete="new-password"
            required
          />

          <label htmlFor="cpassword" className="font-bold dark:text-white">
            Confirm password
          </label>
          <input
            type="password"
            placeholder="Confirm Password"
            name="cpassword"
            id="cpassword"
            value={form.cpassword}
            onChange={handleChange}
            style={{ boxShadow: "0 4px 4px 0 #0A8F9A" }}
            className="pl-4 py-2 pr-4 w-full bg-[#F5F5F5] border-solid rounded-2xl border-2 mb-8"
            autoComplete="new-password"
            required
          />
        </fieldset>

        <div className="flex flex-col content-center">
          <button
            type="submit"
            className="font-bold mb-3 p-3 px-9 bg-[#0A8F9A] text-black rounded-3xl mx-auto"
          >
            SIGN UP
          </button>
          <p className="text-center text-black dark:text-white">
            Already have an account?{" "}
            <span className="text-[#0A8F9A] cursor-pointer" onClick={() => navigate("/login")}>
              sign in
            </span>
          </p>
        </div>
      </form>
    </article>
  );
}
