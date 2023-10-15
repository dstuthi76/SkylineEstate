import React from 'react'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import Home from './pages/Home';
import About from './pages/About';
import Signin from './pages/Signin';
import Profile from './pages/profile';
import SignOut from './pages/SignOut';
import Header from './components/header'
export default function  () {
  return <BrowserRouter>
  <Header/>
  <Routes>
    <Route path="/" element={<Home/>}/>
    <Route path="/About" element={<About/>}/>
    <Route path="/SignIn" element={<Signin/>}/>
    <Route path="/Profile" element={<Profile/>}/>
    <Route path="/SignUp" element={<SignOut/>}/>
  </Routes>
  </BrowserRouter>
}
