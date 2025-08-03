import AboutImg from "../assets/images/About-page/about-image.png"
import mind from "../assets/icons/About-page/mind.png"
import voice from "../assets/icons/About-page/voice.png"
export default function About(){
  return(
    <article className = "mt-6">
      <h2 className="font-bold text-2xl font-inter text-center mb-4 text-[#36C5D1] ">
        <span className = "whitespace-nowrap">ABOUT </span>
        <span className = "whitespace-nowrap">CREATIVE CORNER</span>
      </h2>
      <p className = " px-12 text-center text-xl text-gray mb-10">
        <span className = "whitespace-nowrap">
          A space where imagination lives
        </span>
        , stories grow, and
        art connects us.
      </p>
      <div className = "px-10 mb-6 ">
        <img src={AboutImg} alt="" className = "w-full h-full object-cover border rounded-3xl"/>
      </div>
      <p className = "px-10 text-center mb-6">
        Creative Corner is a blog platform
        built to inspire and celebrate creativity. Here, artists, writers, and dreamers 
        come together to share their thoughts
        , their work, and their unique voices. 
        Whether it’s poetry, sketches, design ideas, 
        or short stories — 
        this is a place where creativity feels at home.
      </p>
      <p className = "text-center mx-auto font-bold mb-4"> — June Kwamboka, Founder</p>


      <ul className = "text-center font-bold">
          <li className="mb-4">🌈 Expression is powerful</li>
          <li className="mb-4 flex flex-row justify-center">
            <img src={voice} alt="" className = "w-6 mr-2" />
            <p>Every voice matters</p> 
          </li>        
          <li className="mb-4 flex flex-row justify-center">
            <img src={mind} alt="" className = "w-6 mr-2" />
            <p>Creativity is for everyone</p> </li>
      </ul>
    </article>
  )
}