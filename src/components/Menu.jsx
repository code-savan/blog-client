/* eslint-disable no-unused-vars */
import { useContext } from "react"
import { UserContext } from "../context/UserContext"
import axios from "axios"
import { URL } from "../url"
import { Link, useNavigate } from "react-router-dom"
import data from '../assets/links'


const Menu = () => {
const {user}=useContext(UserContext)
const {setUser}=useContext(UserContext)
const navigate=useNavigate()

const handleLogout=async()=>{
  try{
    const res=await axios.get(URL+"/api/auth/logout",{withCredentials:true})
    // console.log(res)
    setUser(false)
    navigate("/login")

  }
  catch(err){
    console.log(err)
  }
}
  return (
    <div className="bg-[#0f0f0f] z-10 flex flex-col items-start absolute top-12 right-6 md:right-32 rounded-md p-2 space-y-1">
      {user && 
      <div className="w-full bg-[#1b1b1bbd] rounded-lg py-2 shadow-md px-10">
    <img  src={user.isAdmin? data.images.logo : "https://res.cloudinary.com/dvcma7mex/image/upload/v1709867902/pngegg_fdpihj.png"} 
    alt="profile"
    className="rounded-full w-[70px] h-[70px] mx-auto" />
      </div>}
    {!user && <Link to="/login" className="w-full"><h3 className="text-white text-sm hover:text-gray-500 cursor-pointer px-2 py-1 w-full hover:bg-[#202020b2] rounded-md">Login</h3></Link>}
    {!user && <Link to="/register" className="w-full"><h3 className="text-white text-sm hover:text-gray-500 cursor-pointer px-2 py-1 w-full hover:bg-[#202020b2] rounded-md">Register</h3></Link>}

    {user && <Link to={"/profile/"+user._id} className="w-full"><h3 className="text-white text-sm hover:text-gray-500 cursor-pointer px-2 py-1 w-full hover:bg-[#202020b2] rounded-md">Profile</h3></Link>}
    {user && <div className="w-full">
    {user.isAdmin && <Link to="/write" className="w-full"><h3 className="text-white text-sm hover:text-gray-500 cursor-pointer px-2 py-1 w-full hover:bg-[#202020b2] rounded-md md:hidden block">Write</h3></Link>}
    {user.isAdmin && <Link to={"/myblogs/"+user._id} className="w-full"><h3 className="text-white text-sm hover:text-gray-500 cursor-pointer px-2 py-1 w-full hover:bg-[#202020b2] rounded-md">My blogs</h3></Link>}
    </div>}
    
    <Link to={"/reach-out"} className="w-full"><h3 className="text-white text-sm hover:text-gray-500 cursor-pointer px-2 py-1 w-full hover:bg-[#202020b2] rounded-md">Reach Out</h3></Link>
    {user &&<h3 onClick={handleLogout} className="text-white text-sm hover:text-gray-500 cursor-pointer px-2 py-1 w-full hover:bg-[#202020b2] rounded-md">Logout</h3>}

    </div>
  )
}

export default Menu