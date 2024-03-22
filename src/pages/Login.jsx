import { Link, useNavigate } from "react-router-dom"
import Footer from "../components/Footer"
import { useContext, useState } from "react"
import axios from "axios"
import { URL } from "../url"
import { UserContext } from "../context/UserContext"
import {BeatLoader} from 'react-spinners';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

const Login = () => {
  const [email,setEmail]=useState("") 
  const [password,setPassword]=useState("")
  const [error,setError]=useState(false)
  const {setUser}=useContext(UserContext)
  const [loading, setLoading] = useState(false)
  const [passwordVisible, setPasswordVisible] = useState(false);

  const navigate=useNavigate()

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleLogin=async(e)=>{
    e.preventDefault();
    try{
      setLoading(true)
      const res = await axios.post(URL+"/api/auth/login",{email,password},{withCredentials:true})
      // console.log(res.data)
      setUser(res.data)
      navigate("/")
      setLoading(false)
    }
    catch(err){
      setLoading(false)
      setError(true)
      console.log(err)
    }
  }

  return (
    <>
    <div className="flex items-center justify-between px-6 md:px-[200px] py-4 font-poppins">
    <h1 className="text-lg md:text-xl font-bold"><Link to="/">Home</Link></h1>
    <h3><Link to="/register">Register</Link></h3>
    </div>
    <form onSubmit={handleLogin}>
<div className="w-full flex justify-center items-center h-[80vh] font-poppins">
       <div className="flex flex-col justify-center items-center space-y-4 w-[80%] md:w-[25%]">
         <h1 className="text-xl font-bold text-left font-poppins">Log in to your account</h1>
         <input onChange={(e)=>setEmail(e.target.value)} className="w-full px-4 py-2 border-2 border-black outline-0" 
         type="text" placeholder="Enter your email" autoComplete="email"/>
        
         <div className="relative w-full">
         <input onChange={(e)=>setPassword(e.target.value)} 
         className="w-full px-4 py-2 border-2 border-black outline-0" type={passwordVisible ? 'text' : 'password'} 
         placeholder="Enter your password" autoComplete="current-password"/>
         <div className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer" onClick={togglePasswordVisibility}>
         <FontAwesomeIcon icon={passwordVisible ? faEyeSlash : faEye} />
        </div>
        </div>
        
         <button type="submit" className="w-full px-4 py-4 text-lg font-bold text-white 
         bg-black rounded-lg hover:bg-gray-500 hover:text-black flex justify-center items-center" 
         disabled={loading}>
            {loading ? 
          "" : 
          "Login"}
          {loading && <BeatLoader color="#fff" />}
         </button>
         {error && <h3 className="text-red-500 text-sm ">Wrong Credentials!</h3>}
         <div className="flex justify-center items-center space-x-3">
          <p>New here?</p>
          <p className="text-gray-500 hover:text-black"><Link to="/register">Register</Link></p>
         </div>
       </div>
    </div>
    </form>
    <Footer/>
    </>
    
  )
}

export default Login