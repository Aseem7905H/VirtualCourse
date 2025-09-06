 import React from 'react'
import { Route, Routes , Navigate } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Login from './pages/Login.jsx'
import SignUp from './pages/SignUp.jsx'
import {ToastContainer} from 'react-toastify'
import { useSelector } from 'react-redux' 
export const serverUrl = "http://localhost:8000";
import getCurrentUser from './customHooks.js/getCurrentUser.js'
import Profile from './pages/Profile.jsx'
import ForgetPassword from './pages/ForgetPassword.jsx'
import EditProfile from './pages/EditProfile.jsx'
import Dashboard from './pages/Educator/Dashboard.jsx'
import Courses from './pages/Educator/Courses.jsx'
import CreateCourses from './pages/Educator/CreateCourses.jsx'
 
import getCreatorCourse from './customHooks.js/getCreatorCourse.js'
import EditCourse from './pages/Educator/editCourse.jsx'

import getPublishedCourse from './customHooks.js/getPublishedCourse.js'
import AllCourses from './pages/AllCourses.jsx'

function App() {

  getCurrentUser();
  getCreatorCourse();
  getPublishedCourse();
  const {userData} = useSelector((state) => state.user);

  return ( <>
    <ToastContainer />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={ !userData ? <SignUp /> : <Navigate to="/" />} />
      <Route path="/profile" element={ userData ? <Profile /> : <Navigate to="/signup" />} />
      <Route path="/forget-password" element={   <ForgetPassword /> } />
      <Route path="/editprofile" element={ <EditProfile />} />
      <Route path="/allcourses" element={ <AllCourses />} />
      <Route path="/dashboard" element={ userData?.role==='educator' ? <Dashboard /> : <Navigate to="/signup" />} />
      <Route path="/courses" element={ userData?.role==='educator' ? <Courses /> : <Navigate to="/signup" />} />
      <Route path="/createcourse" element={ userData?.role==='educator' ? <CreateCourses /> : <Navigate to="/signup" />} />
      
      <Route path="/editcourse/:courseId" element={ userData?.role==='educator' ? <EditCourse /> : <Navigate to="/signup" />} />

    </Routes>  </>
  )
}

 


export default App
