import React from "react"
import profilePic from "../assets/images/MyProfilepage/profile-img.png"
export default function MyProfile(){
  return(
    <article>
      <section className = "grid grid-cols-2 gap-4 w-full items-center">
        <div className = "rounded-full overflow-hidden ">
          <img src={profilePic} alt="" className = "w-full h-full object-cover" />
        </div>
        <div>
          <p>June Kwamboka</p>
          <p>amingajune2@gmail.com</p>
          <button>Edit profile</button>
        </div>
      </section>
      <div className = "flex flex-row gap-0 justify-center p-2 ">
        <button className = "z-10 w-32 bg-[#00272B] text-white border rounded-2xl p-2"> 
          GENERAL    
        </button>  
        <button className = "ml-[-0.2rem] w-32 bg-[#D9D9D9] text-black border rounded-xl p-2">
          LOCATIONS
        </button>
      </div>

      <section className = "px-4">
        <p>Full name</p>
        <div className = "border rounded-2xl mb-8 p-2">
          <p>June Kwamboka</p>
        </div>

        <p>Email name</p>
        <div className = "border rounded-2xl mb-8 p-2">
          <p>June Kwamboka</p>
        </div>

        <p>Phone Number</p>
        <div className = "border rounded-2xl mb-8 p-2">
          <p>June Kwamboka</p>
        </div>

        <p>User name</p>
        <div className = "border rounded-2xl mb-8 p-2">
          <p>June Kwamboka</p>
        </div>
        <button className = "bg-[#0A8F9A]">
          Save Changes
        </button>
      </section>
    </article>
  )
}