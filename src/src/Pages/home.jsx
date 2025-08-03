import React from "react"
import Img1 from "../assets/images/Homepage/img-1.png"
import Img2 from "../assets/images/Homepage/img-2.png"
import Img3 from "../assets/images/Homepage/img-3.png"


export default function home(){
  return (
    <>
      <article className = "font-inter px-2 mt-40 min-h-screen text-2xl">
        <h2 className = "text-center font-bold mb-8">WELCOME TO CREATIVE CORNER</h2>
        <p className = "text-center mb-10 text-[#0A8F9A] font-bold">
          <span className="whitespace-nowrap block">Your space to </span>
          <span className="whitespace-nowrap">express, share and inspire</span>
        </p>

        <p className = "font-bold text-center text-2xl">Recent Posts</p>
        <p className = "font-bold text-center text-xl text-[#0A8F9A] mb-5">
          <a href = "">view all posts</a>
        </p>

        <section className="grid grid-rows-[auto_200px] md:flex md:flex-row md:justify-center md:px-12">

          <div className="w-full">
            <div className= "mx-auto p-8 h-72 overflow-hidden">
              <img src={Img3} 
              alt="img-1" 
              className = "w-full h-full border rounded-blue rounded-3xl object-cover"
              style={{ boxShadow: "0 4px 4px 0 #0A8F9A" }}/>
            
            </div>
            <p className="text-xl text-center font-bold text-[#0A8F9A]">
              <span className = "text-black font-normal">How I paint My Feelings </span>
              Read more
            </p>
            <p className = "text-xl text-center">Jayden Muriuki</p>
          </div>

          <div
                style={{ boxShadow: "0 4px 4px 0 #0A8F9A" }}
                className="mx-4 flex justify-center items-center gap-6 border rounded-[2rem] p-0 md:w-full"
              >
                {/* Card 1 */}
                <div className="whitespace-nowrap">
                  <div className="h-28 w-36 mb-2 overflow-hidden">
                    <img src={Img2} alt="" className="w-full h-full object-cover rounded-[2rem]" />
                  </div>
                  <p className="text-[0.8rem] font-bold m-0 leading-tight">"Whispers of the Rain"</p>
                  <p className="text-[0.8rem] m-0 leading-tight">By Amina Wanjiku</p>
                  <p className="text-[#0A8F9A] text-[0.8rem] font-bold m-0 leading-tight">Read more</p>
                </div>

                {/* Card 2 */}
                <div className="whitespace-nowrap">
                  <div className="h-28 w-36 mb-2 overflow-hidden">
                    <img src={Img1} alt="" className="w-full h-full object-cover rounded-[2rem]" />
                  </div>
                  <p className="text-[0.8rem] font-bold m-0 leading-tight">"Healing through colour"</p>
                  <p className="text-[0.8rem] m-0 leading-tight">By Kennedy Ombasa</p>
                  <p className="text-[#0A8F9A] text-[0.8rem] font-bold m-0 leading-tight">Read more</p>
                </div>
              </div>
        </section>
      </article>
    </>
    )
}