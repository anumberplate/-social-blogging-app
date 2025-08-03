import React from "react"
export default function RecentPosts(){
  return(
    <article>
      <h2>
        My posts
      </h2>
      <section className = "grid grid-rows-3" >
        <div className = "grid grid-cols-2">
          <p>My posts</p>
          <p>Date</p>
        </div>
        <div className = "grid grid-cols-2">
          <img src="" alt="" />
          <p>30/7/2025</p>
        </div>
        <div className = "grid grid-cols-2">
          <img src="" alt="" />
          <p>27/7/2025</p>
        </div>
      </section>
      
      <h2>
        DRAFTS
      </h2>
      <section className = "grid grid-rows-2">
        <div className = "grid grid-cols-2">
          <img src="" alt="" />
          <p>27/7/2025</p>
        </div>
        <div className = "grid grid-cols-2">
          <img src="" alt="" />
          <p>27/7/2025</p>
        </div>

      </section>
    </article>
  )
}