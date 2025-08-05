import React from "react"
import { useLocation } from 'react-router-dom'
import Img1 from "../assets/images/Homepage/img-1.png"
import Img2 from "../assets/images/Homepage/img-2.png"
import Img3 from "../assets/images/Homepage/img-3.png"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart as faHeartRegular, faComment as faCommentRegular } from '@fortawesome/free-regular-svg-icons'
import { faShare, faThumbsUp as faThumbsUpSolid } from '@fortawesome/free-solid-svg-icons' 

const posts = [
  {
    userprofilephoto: Img1,
    username: 'NASA',
    likes: '102',
    time: '6 hours',
    replies: '',
    title: 'NASA discovered a new planet that could save the world',
    content: 'Nasa asked their experiment on planet and they successfully done it. People loved it very much',
    commentSection: [
      {
        username: 'Everlyne Wanjiku',
        userPhoto: Img2,
        content: 'My neighbours will love this!',
        replies: '',
        likes: '12',
        hours: '4'
      }
    ]
  }
]

const hotTopics = [
  {
    title: "Hot topic on personal growth",
    thumbnail : Img3,
    content : "finding one fixed version of myself, but about learning and growing through every experience.",
    datePosted: "1/8/2025"
  },
  {
    title: "Hot topic on personal growth",
    thumbnail : Img2,
    content : "finding one fixed version of myself, but about learning and growing through every experience.",
    datePosted: "1/8/2025"
  }
]

const explore = [
  {
    content: "Abstract design with geometric shapes",
    image: Img1
  }, 
  {
    content: "Sunset over ocean with colorful sky",
    image: Img2
  },
  {
    content: "Landscape photo of snowy mountains",
    image: Img3
  },
  {
    content: "Still life painting with fruits in a bowl",
    image: Img1
  }
]

export default function Home() {
  const { pathname } = useLocation()
  const view = pathname.split('/')[2] 

  return (
    <article className="px-6 mt-40 md:mt-64 pt-24 min-h-screen text-lg md:text-2xl bg-[#FAF5F5] dark:bg-[#2C2626] font-martel w-full md:px-32 lg:px-64"> 
      {view === "trending" && (
        <>
          <h2 className="font-inter font-bold text-xl md:text-3xl dark:text-white mb-4">Trending</h2>    
          {posts.map((post, index) => (  
            <section key={index} className="bg-[#F9F9F9] dark:bg-[#1e1e1e] text-[0.95rem] md:text-lg rounded-2xl my-6 leading-snug md:w-full">
              <div className="w-full p-0 m-0 ">
                <div className="overflow-hidden rounded-t-2xl md:mb-6">
                  <img src={post.userprofilephoto} alt="Post" className="w-full h-full object-cover" />
                </div>
                <div className="px-4">
                  <h3 className="font-bold font-martel mt-4 mb-4 text-[1rem] md:text-[1.2rem] dark:text-white">{post.title}</h3>
                  <p className="mb-4 text-[0.8rem] md:text-[0.8rem] dark:text-gray-300">{post.content}</p>
                  <div className="flex flex-row gap-4 mb-12">
                    <button className="bg-transparent md:text-2xl">
                      <FontAwesomeIcon icon={faHeartRegular} className="cursor-pointer hover:text-red-500" />
                    </button>
                    <button className="bg-transparent md:text-2xl">
                      <FontAwesomeIcon icon={faCommentRegular} className="cursor-pointer hover:text-blue-500" />
                    </button>
                    <button className="bg-transparent md:text-2xl">
                      <FontAwesomeIcon icon={faShare} className="cursor-pointer hover:text-green-500" />
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex justify-between items-center px-4 mb-2 font-bold text-[0.8rem] md:text-[1rem] dark:text-white">
                <h3>{post.likes} Likes</h3>
                <h2><a href="#">Show Less</a></h2>
              </div>

              <div className="px-4 py-4 text-[0.7rem]">
                <ul>
                  {post.commentSection.map((comment, idx) => (
                    <li key={idx} className="mb-4">
                      <div className="flex flex-row gap-x-6">
                        <div className="flex items-start">
                          <div className="overflow-hidden w-12 h-12 md:w-24 md:h-24 rounded-full">
                            <img src={comment.userPhoto} alt="User" className="w-full h-full object-cover" />
                          </div>
                        </div>
                        <div>
                          <h4 className="font-bold mb-1 text-sm md:text-[0.9rem] dark:text-white">{comment.username}</h4>
                          <p className="dark:text-gray-300 md:text-[0.9rem]">{comment.content}</p>
                          <div className="flex justify-between text-sm font-bold mt-1">
                            <p className="text-[0.7rem] md:text-[0.9rem]">{comment.hours} hours ago</p>
                            <p className="text-[0.7rem] md:text-[0.9rem]">{comment.likes} likes</p>
                            <button className="hover:underline text-[0.7rem] md:text-xl">Reply</button>
                          </div>
                          {comment.replies && <button className="text-sm text-gray-600 mt-1">View all replies</button>}
                        </div>
                        <div className="ml-auto">
                          <button>
                            <FontAwesomeIcon icon={faHeartRegular} className="cursor-pointer hover:text-red-500 md:text-3xl" />
                          </button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="relative">
                <input 
                  type="text" 
                  placeholder="Add a comment..." 
                  name="comment"
                  id="comment"
                  className="w-full px-4 py-2 bg-white dark:bg-[#2a2a2a] dark:text-white"
                />
                <button className="absolute right-4 top-1/4 bg-transparent text-gray-500">Post</button>
              </div>
            </section>
          ))}
        </>
      )}

      {view === "hottopics" && (
        <>
          <h2 className="font-inter font-bold text-xl md:text-3xl dark:text-white mb-6">Hot Topics</h2>
          {hotTopics.map((hotTopic, index) => (
            <section key={index} className="bg-white dark:bg-[#1e1e1e] flex flex-row py-2 px-1 mb-4 rounded-2xl">
              <div className="w-full p-1">
                <div className="overflow-hidden rounded-2xl w-36 h-36 md:w-72 md:h-72">
                  <img src={hotTopic.thumbnail} alt="" className="w-full h-full object-cover md:object-center" />
                </div>
              </div>
              <div className="w-full font-inter leading-snug">
                <h3 className="font-bold text-[0.8rem] md:text-2xl dark:text-white mb-2 mt-4">{hotTopic.title}</h3>
                <p className="text-[0.6rem] text-gray-500 dark:text-gray-300 mb-6 md:text-lg">{hotTopic.content}</p>
                <div className="flex flex-row gap-x-6 items-center">
                  <button className="text-[0.6rem] md:text-lg">
                    <FontAwesomeIcon icon={faThumbsUpSolid} className="text-[0.6rem]" />
                  </button>
                  <button className=" text-[0.6rem] md:text-xl font-bold dark:text-white">Comment</button>
                  <p className="text-[0.6rem] md:text-lg dark:text-gray-400">Posted {hotTopic.datePosted}</p>
                </div>
              </div>
            </section>
          ))}
        </>
      )}

      {view === "explore" && (
        <>
          <h2 className="font-inter font-bold text-xl md:text-3xl dark:text-white mb-6 pt-4">Suggested</h2>
          <section className="flex flex-row gap-x-4 mb-10">
            <button className="bg-[#43b9c4ab] px-4 rounded-xl text-[1rem] md:text-lg font-bold font-inter">#Art</button>
            <button className="bg-[#36C5D1AB] rounded-xl text-[1rem] md:text-lg px-4 font-bold font-inter">#Poetry</button>
            <button className="bg-[#36C5D1AB] rounded-xl text-[1rem] md:text-lg px-4 font-bold font-inter">#Photography</button>
          </section>
          <section className="grid grid-cols-2 gap-4">
            {explore.map((item, index) => (
              <div key={index} className="bg-white dark:bg-[#1e1e1e] flex flex-col rounded-xl shadow p-0 w-46 h-auto md:w-full md:h-auto">
                <div className="w-full h-32 md:h-72 rounded-2xl overflow-hidden mb-6">
                  <img src={item.image} alt="" className="w-full h-full object-cover" />
                </div>
                <div className="px-4 pb-1">
                  <p className="font-inter font-bold text-[1rem] md:text-lg text-gray-500 dark:text-gray-300 leading-snug">{item.content}</p>
                </div>
                <button className="text-right pr-4">
                  <FontAwesomeIcon icon={faThumbsUpSolid} className="text-xl" />
                </button>
              </div>
            ))}
          </section>
        </>
      )}
    </article>
  )
}
