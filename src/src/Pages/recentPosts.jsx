import React from "react"
import img1 from "../assets/images/recentPosts/4202dbefba2493fff7868ec7c6232f857d661b44.png"
import img2 from "../assets/images/recentPosts/6679fd7ff423b9f7c2ccce239adba06dc7c3c16e.png"
import img3 from "../assets/images/recentPosts/e81d9fdaeb7cb6fb91b01d754a320d21762b169e.png"
import img4 from "../assets/images/recentPosts/907615d3c5bed53760ddccfae0f2da69a89bb9a3.png"

export default function RecentPosts(){
  return(
    <article className="mt-36 pt-8 font-inter">
      <h2 className = "font-bold text-2xl text-center mb-4">
        My posts
      </h2>
      <section className = "grid grid-rows-[20px_auto_auto] gap-y-6 px-4 mb-8" >
        <div className = "grid grid-cols-2 gap-x-4">
          <p className = "font-bold text-2xl">My posts</p>
          <p className = "font-bold ml-2 text-2xl">Date</p>
        </div>
        <div className = "grid grid-cols-2 gap-x-4">
          <div className = "w-full overflow-hidden rounded-2xl">
            <img src= {img1} alt="" className ="w-full h-full object-cover"/>
          </div>
          <p className = "font-bold ml-2 text-2xl">30/7/2025</p>
        </div>
        <div className = "grid grid-cols-2 gap-x-4 ">
          <div className = "w-full overflow-hidden rounded-2xl">
            <img src= {img2} alt="" className ="w-full h-full object-cover"/>
          </div>
          <p className = "font-bold ml-2 text-2xl">27/7/2025</p>
        </div>
      </section>

      <h2 className = "font-bold text-2xl text-center mb-4">
        DRAFTS
      </h2>
      <section className = "grid grid-rows-2 gap-y-6 px-4" >
        <div className = "grid grid-cols-2 gap-x-4 h-32">
          <div className = "w-full overflow-hidden rounded-2xl">
            <img src= {img3} alt="" className ="w-full h-full object-cover"/>
          </div>
          <p className = "font-bold ml-2 text-2xl">Remove from drafts</p>
        </div>
        <div className = "grid grid-cols-2 gap-x-4 h-32 ">
          <div className = "w-full overflow-hidden rounded-2xl">
            <img src= {img4} alt="" className ="w-full h-full object-cover"/>
          </div>
          <p className = "font-bold ml-2 text-2xl">Remove from drafts</p>
        </div>
      </section>
    </article>
  )
}