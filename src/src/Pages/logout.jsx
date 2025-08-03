import ProfileIcon from "../assets/icons/ProfilePage/profile-icon.png"
export default function LogOut(){
  return(
    <article>
      <section className="text-center mb-0 mt-10">
        <h2 className="font-bold text-2xl font-martel mb-4">Profile</h2>
        <img src={ProfileIcon} alt="Profile" className="mx-auto h-24 w-24 mb-6" />
      </section>
      <section>
        <p>Are you sure you want to sign out</p>
        <button>Back</button>
        <button>Sign Out</button>
      </section>
      <section>
        <button>Update profile</button>
        <button>Create post</button>
        <div>
          <a href="">Delete Account</a>
          <a href="">Sign Out</a>
        </div>
      </section>
    </article>
  )


}