import {
  HashRouter as Router,
  Routes,
  Route,
  Navigate
} from "react-router-dom";
import React from "react";

import Home from "./Pages/home";
import Signup from "./Pages/Signup";
import About from "./Pages/about";
import MyProfile from "./Pages/myProfile";
import FollowersPage from "./Pages/followersPage";
import Following from "./Pages/following";
import Notifications from './Pages/Notifications';
import RecentPosts from './Pages/recentPosts';
import Logout from './Pages/logout';
import Dashboard from './Pages/Dashboard';           
import CreatePost from './Pages/CreatePost';         
import ProtectedRoute from "./Components/ProtectedRoute"; 
import Layout from "./Layout";
import Login from "./Pages/login";
import ChatBot from "./Pages/chatBot"

export default function App() {
  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Navigate to="/home/trending" />} />
          <Route path="/home" element={<Navigate to="/home/trending" />} />
          <Route path="/home/*" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/about" element={<About />} />
          <Route path="/recentposts" element={<RecentPosts />} />
          <Route path="/myProfile" element={<MyProfile />} />
          <Route path="/followersPage" element={<FollowersPage />} />
          <Route path="/following" element={<Following />} />
          <Route path="/notification" element={<Notifications />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/login" element={<Login/>} />
          <Route path="/chatbot" element={<ChatBot/>} />

  
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/create"
            element={
              <ProtectedRoute>
                <CreatePost />
              </ProtectedRoute>
            }
          />
        </Route>
      </Routes>
    </Router>
  );
}
