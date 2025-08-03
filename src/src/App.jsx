import { HashRouter as Router, Routes, Route } from "react-router-dom"

import Home from "./Pages/home"
import Signup from "./Pages/Signup"
import Profile from "./Pages/profile"
import About from "./Pages/about"
import MyProfile from "./Pages/myProfile"
import FollowersPage from "./Pages/followersPage"
import Following from "./Pages/following"
import Notifications from './Pages/Notifications'

import Layout from "./Layout"

export default function App(){
  return (
    <Router>
      <Routes>
        <Route element = {<Layout />}>
          <Route path = '/' element = {<Home />}/>
          <Route path = '/signup' element = {<Signup />}/>
          <Route path = '/profile' element = {<Profile />}/>
          <Route path = '/about' element = {<About />}/>
          <Route path = '/myProfile' element = {<MyProfile />}/>
          <Route path = '/followersPage' element = {<FollowersPage />}/>
          <Route path = '/following' element = {<Following />}/>
          <Route path = '/notification' element = {<Notifications />}/>
        </Route>
      </Routes>
    </Router>
  ) 
}