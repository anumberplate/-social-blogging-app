import React from "react"
import ProfileIcon from "../assets/icons/ProfilePage/profile-icon.png"
export default function Profile(){
 return(
 <article className="flex flex-col justify-between bg-white text-black">
    <section className="text-center mb-0 mt-10">
      <h2 className="font-bold text-2xl font-martel mb-4">Profile</h2>
      <img src={ProfileIcon} alt="Profile" className="mx-auto h-24 w-24 mb-6" />
    </section>

    <section className="px-6">
      <form className="flex flex-col gap-4">
        <fieldset className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="username"
            name="userName"
            id="userName"
            autoComplete="username"
            className="pl-4 py-2 pr-4 w-full border  border-solid rounded-xl border-2 bg-white shadow-sm"
            style={{ borderImage: 'linear-gradient(to right, #0ff, #90f) 1' }}
          />

          <input
            type="email"
            placeholder="Email"
            name="email"
            id="email"
            autoComplete="email"
            className="pl-4 py-2 pr-4 w-full border-2 border-solid rounded-2xl bg-white outline-none 
              focus:ring-2 focus:ring-purple-500 focus:border-purple-500 
              transition-all duration-300 shadow-sm 
              focus:shadow-md"
            style={{ borderImage: 'linear-gradient(to right, #0ff, #90f) 1' }}
          />
        </fieldset>

        <button
          type="submit"
          className="bg-white border border-gray-400 text-black py-2 mt-2 shadow-md hover:shadow-lg transition-all"
        >
          Update profile
        </button>

        <p className="text-center text-blue-500 underline cursor-pointer">
          Add another Account
        </p>

        <button
          type="button"
          className="bg-teal-700 text-white py-2 rounded shadow-md hover:bg-teal-800 transition-all"
        >
          Create post
        </button>
      </form>
    </section>
  </article>
 )
}