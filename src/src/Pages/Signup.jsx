import React from "react"
export default function home(){
  return (
    <article className="mt-36">
      <h2 className = "whitespace-nowrap font-bold text-center sm: text-2xl mb-10">CREATE YOUR ACCOUNT</h2>
      <form className = "flex flex-col px-10">
          <fieldset>
            <label htmlFor="fullName" className = "font-bold">Full name</label>
            <input type="text" placeholder = "Full name" 
            name="fullName" 
            id="fullName" 
            style = {{ boxShadow: "0 4px 4px 0 #0A8F9A" }}
            className = " pl-4 py-2 pr-4 border w-full drop-shadow-green border-solid rounded-2xl border-2 mb-8"
            autocomplete/>

            <label htmlFor="email" className = "font-bold">Email Address</label>
            <input type="email" placeholder = "Email Address" 
            name="email" 
            id="email" 
            style = {{ boxShadow: "0 4px 4px 0 #0A8F9A" }}
            className = " pl-4 py-2 pr-4 border w-full drop-shadow-green border-solid rounded-2xl border-2 mb-8"
            autocomplete/>

            <label htmlFor="password" className = "font-bold">Password</label>
            <input type="password" placeholder = "Password" 
            name="password"
            id="password" 
            style = {{ boxShadow: "0 4px 4px 0 #0A8F9A" }}
            className = " pl-4 py-2 pr-4 border w-full drop-shadow-green border-solid rounded-2xl border-2 mb-8"
            autocomplete/>

            <label htmlFor="confirm password" className = "font-bold">Confirm password</label>
            <input type="text" placeholder = "Confirm Password" 
            name="cpassword"
            id="cpassword"
            style = {{ boxShadow: "0 4px 4px 0 #0A8F9A" }} 
            className = " pl-4 py-2 pr-4 border w-full drop-shadow-green border-solid rounded-2xl border-2 mb-8"
            autocomplete/>

          </fieldset>
      </form>
      <div className = "flex flex-col content-center">
        <button className = "font-bold mb-3 p-3 px-9 bg-[#0A8F9A] text-black rounded-3xl mx-auto">SIGN UP</button>
        <p className = "text-center">Already have an account? <span className = "text-[#0A8F9A]">sign in</span></p>
      </div>
    </article>
  )
}