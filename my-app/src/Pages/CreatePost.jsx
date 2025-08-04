import React from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { faPaperPlane } from '@fortawesome/free-regular-svg-icons'; 


export default function RecentPosts(){
  return(
    <article className = "min-h-screen bg-[#FAF5F5] md:bg-white mt-36 font-inter">
      <div className="flex justify-between pl-2 pr-16 pt-4 items-center mb-10">
        <button>
          <FontAwesomeIcon icon={faArrowLeft} className = 'text-[#520D07] font-bold'/>
        </button>
        <h2 className = "font-bold text-3xl">
          Create New Post
        </h2>
      </div>
      <form className = "px-6 mb-6">
        <label htmlFor="postTitle" className = "font-bold">Post Title</label>
        <input
            type="postTitle"
            placeholder="postTitle"
            name="postTitle"
            id="postTitle"
            autoComplete="username"
            className="mt-3 py-4 pl-4 md:py-6 pr-4 w-full bg-transparent border border-1 rounded-[0.4rem] border-black mb-4"
          />
        <label htmlFor="postTitle" className = "font-bold">Content</label>
        <textarea
            placeholder="postTitle"
            name="postContent"
            id="postContent"
            rows = "8"
            className="p-4 mt-3 bg-transparent border border-1 rounded-[0.4rem] border-black h-full w-full"
        ></textarea>
      </form>
      <section className = "flex flex-row content-center gap-6 px-6">
        <button className = "flex items-center w-64 px-2 py-2 bg-black text-white border rounded-xl">
          <FontAwesomeIcon icon={faPaperPlane} className="text-xl text-white-600 mr-2" />
          Publish post 
        </button>
        <button className = "flex items-center w-64 px-4 py-4 bg-black text-white border rounded-xl">
          <svg className = "mr-2" width="18" height="16" viewBox="0 0 18 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M5.66667 3.83334H3.16667C2.72464 3.83334 2.30072 4.00894 1.98816 4.3215C1.67559 4.63406 1.5 5.05798 1.5 5.50001V13C1.5 13.442 1.67559 13.866 1.98816 14.1785C2.30072 14.4911 2.72464 14.6667 3.16667 14.6667H14.8333C15.2754 14.6667 15.6993 14.4911 16.0118 14.1785C16.3244 13.866 16.5 13.442 16.5 13V5.50001C16.5 5.05798 16.3244 4.63406 16.0118 4.3215C15.6993 4.00894 15.2754 3.83334 14.8333 3.83334H12.3333M11.5 7.16668L9 9.66668M9 9.66668L6.5 7.16668M9 9.66668V1.33334" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          Save as Draft
        </button>
      </section>
      
    </article>
  )
}