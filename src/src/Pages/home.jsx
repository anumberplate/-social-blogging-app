import Img1 from "../assets/images/Homepage/img-1.png"
import Img2 from "../assets/images/Homepage/img-2.png"
import Img3 from "../assets/images/Homepage/img-3.png"


export default function home(){
  return (
    <>
      <article className = "font-inter mt-10 text-2xl">
        <h2 className = "text-center font-bold mb-8">WELCOME TO CREATIVE CORNER</h2>
        <p className = "text-center mb-10 text-[#0A8F9A] font-bold">
          <span className="whitespace-nowrap block">Your space to </span>
          <span className="whitespace-nowrap">express, share and inspire</span>
        </p>

        <p className = "font-bold text-center text-2xl">Recent Posts</p>
        <p className = "font-bold text-center text-xl text-[#0A8F9A] mb-5">
          <a href = "">view all posts</a>
        </p>

        <section className="grid grid-rows-2 md:flex md:flex-row">

          <div>
            <div className= "mx-auto p-8 h-72 overflow-hidden">
              <img src={Img3} 
              alt="img-1" 
              className = "w-full h-full border rounded-3xl object-cover"/>
            
            </div>
            <p className="text-xl text-center font-bold text-[#0A8F9A]">
              <span className = "text-black font-normal">How I paint My Feelings </span>
              Read more
            </p>
            <p className = "text-xl text-center">Jayden Muriuki</p>
          </div>

          <div className = "flex w-full gap-6 p-4 border rounded-[2rem]">

            <div className = "whitespace-nowrap">
              <div className= "h-28 w-36 mb-4">
                <img src={Img2} alt="" className = "w-full h-full object-cover rounded-[2rem]"/>     
              </div>
              <p className = "text-[0.8rem] py-0 my-0 font-bold">"Whispers of  the Rain"</p>
              <p className="text-[0.8rem] py-0 my-0 ">By Amina Wanjiku</p>
              <p className = "text-[#0A8F9A] text-[0.8rem] font-bold py-0 my-0">Read more</p>
            </div>

            <div className = "whitespace-nowrap">
              <div className= "h-28 w-36 mb-4">
                <img src={Img1} alt="" className = "w-full h-full object-cover rounded-[2rem]"/>     
              </div>
              <p className = "text-[0.8rem] font-bold">"Healing trough colour"</p>
              <p className="text-[0.8rem]">By Kennedy Ombasa</p>
              <p className = "text-[#0A8F9A] text-[0.8rem] font-bold">Read more</p>
            </div>

          </div>

        </section>
      </article>
    </>
    )
}