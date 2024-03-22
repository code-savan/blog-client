import data from "../assets/links"
import { Link, useLocation, useNavigate } from "react-router-dom"
import {BsSearch} from 'react-icons/bs'
import {FaBars} from 'react-icons/fa'
import { useContext, useState } from "react"
import Menu from "./Menu"
import { UserContext } from "../context/UserContext"

const Header = () => {

    const [prompt,setPrompt]=useState("")
    const [menu,setMenu]=useState(false)
    const navigate=useNavigate()
    const path=useLocation().pathname
    
    // console.log(prompt)
    
  
    const showMenu=()=>{
      setMenu(!menu)
    }
    
     
      const {user}=useContext(UserContext)
      // console.log(user)


  return (
    <div className="w-full h-[300px] text-white">
       <div className="w-full bg-black px-6 md:px-24 py-3 flex items-center justify-between">
        <p className="font-poppins text-[15px]">{new Date().toString().slice(4,15)}</p>

        <div className="hidden md:flex items-center justify-center space-x-2 md:space-x-4 font-semibold">
          {user && <div>
            {user.isAdmin? <h3><Link to="/write">Write</Link></h3> : ""}
            </div>}
      {/* {user.isAdmin? <h3><Link to="/write">Write</Link></h3> : ""} */}
      {user? <div onClick={showMenu}>
        <p className="cursor-pointer relative"><FaBars/></p>
        {menu && <Menu/>}
      </div>:
      <div className="flex space-x-3"><h3 className="hover:scale-105 transition"><Link to="/register">Register</Link></h3> 
       <h3 className="hover:scale-105 transition"><Link to="/login" className="hover:scale-110 transition">Login</Link></h3> </div>}
    </div>

    <div onClick={showMenu} className="md:hidden text-lg">
      <p className="cursor-pointer relative"><FaBars/></p>
      {menu && <Menu/>}
    </div>
       </div>
       <div className="w-full py-12 px-6 md:px-24" style={{backgroundImage: `url(${data.images.black2})`, 
       backgroundRepeat: "no-repeat", backgroundSize: "cover", backgroundPositionY: "start", backgroundPositionX: "end"}}>
       <Link to="/">
        <p className="font-bold font-poppins text-[40px] md:text-[50px] leading-[45px]">Dr Lawson Akpulonu</p>
        <p className="font-poppins text-[30px]">Official Website</p></Link>
</div>
<div className="w-full bg-black px-6 md:px-24 py-3 md:flex items-center justify-between">
    <div className="md:space-x-8 md:flex">
     <Link className="hidden md:block hover:scale-105 transition" to="/"><p className="font-poppins text-[15px] font-semibold cursor-pointer">Home</p></Link>
     {/* <Link className="hidden md:block hover:scale-105 transition" to="/about"><p className="font-poppins text-[15px] font-semibold cursor-pointer">About</p></Link> */}
     <Link className="hidden md:block hover:scale-105 transition" to="/reach-out"><p className="font-poppins text-[15px] font-semibold">Reach Out</p></Link>
        {/*<p className="font-poppins text-[15px] font-semibold">Home</p> */}
        
    </div>

    {path==="/" && 
    <div className="flex justify-center items-center space-x-0 relative">
    <input onChange={(e)=>setPrompt(e.target.value)} 
     onKeyDown={(e) => e.key === 'Enter' && navigate(prompt ? `?search=${prompt}` : '/')}
    className="outline-none border-b border-b-slate-500 mr-2 py-1 pr-8 pl-1 text-white text-[16px] 
    font-semibold transition-all bg-black w-full" 
    placeholder="Search..." type="text"/>
    <span onClick={()=>navigate(prompt?"?search="+prompt:navigate("/"))} 
     className="cursor-pointer absolute right-2"><BsSearch/></span>
    
    </div>}

       </div>

    </div>
  )
}

export default Header