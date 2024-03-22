/* eslint-disable no-unused-vars */
import { useContext, useEffect, useState } from "react"
import Footer from "../components/Footer"
import Navbar from "../components/Navbar"
import ProfilePosts from "../components/ProfilePosts"
import axios from "axios"
import { URL } from "../url"
import { UserContext } from "../context/UserContext"
import { useNavigate, useParams } from "react-router-dom"
import Header from "../components/Header"
import data from '../assets/links'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

const Profile = () => {
  const param=useParams().id
  const [username,setUsername]=useState("")
  const [email,setEmail]=useState("")
  const {user,setUser}=useContext(UserContext)
  const navigate=useNavigate()
  const [posts,setPosts]=useState([])
  const [updated,setUpdated]=useState(false)
  const [updatedp,setUpdatedp]=useState(false)
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [passwordVisible2, setPasswordVisible2] = useState(false);
  const [cp, setCp] = useState(false);
  const [np, setNp] = useState(false);

  useEffect(()=>{
    fetchProfile()
  
  },[param])
  
  useEffect(()=>{
    fetchUserPosts()
  
  },[param])

  // console.log(user)
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };
  const togglePasswordVisibility2 = () => {
    setPasswordVisible2(!passwordVisible2);
  };

const fetchProfile=async ()=>{
  try{
     const res=await axios.get(URL+"/api/users/"+user._id)
     setUsername(res.data.username)
     setEmail(res.data.email)
  }
  catch(err){
     console.log(err)
  }
}

// const handleUserUpdate = async (e) => {
//   e.preventDefault();
//   setUpdated(false);
//   try {
//     const res = await axios.put(URL + "/api/users/" + user._id,{
//             username,
//             email,
//             currentPassword: cp,
//             newPassword: np
//           }, 
//       { withCredentials: true });
//     // console.log(res.data)
//     setUpdated(true);
//   } catch (err) {
//     console.log(err);
//     setUpdated(false);
//   }
// };


// const handlePasswordUpdate = async (e) => {
//   e.preventDefault();
//   try {
//     console.log(cp + np)
//     const res = await axios.put(URL + "/api/users/" + user._id, {
//       currentPassword: cp,
//       newPassword: np
//     }, { withCredentials: true });
//     console.log(res.data);
//     if (res.status === 200) {
//       setUpdatedp(true);
//     }    
//   } catch (err) {
//     console.log(err);
//     setUpdatedp(false);
//   }
// }

// const handleUserDelete=async()=>{
//   try{
//     const res=await axios.delete(URL+"/api/users/"+user._id,{withCredentials:true})
//     setUser(null)
//     navigate("/")
//     // console.log(res.data)

//   }
//   catch(err){
//     console.log(err)
//   }
// }
// console.log(user)

const handleUserUpdate = async (e) => {
  e.preventDefault();
  setUpdated(false);
  try {
    let requestBody = {};
    if (np) {
      requestBody = {
        currentPassword: cp,
        newPassword: np
      };
    }
    if (username) {
      requestBody.username = username;
    }
    if (email) {
      requestBody.email = email;
    }
    const res = await axios.put(URL + "/api/users/" + user._id, requestBody, { withCredentials: true });
    if (res.status === 200) {
      console.log(res.data); // Log data only if the request was successful
      setUpdated(true);
    } else {
      setUpdatedp(true); // Set updatedp to true if there was an issue
    }
  } catch (err) {
    console.log(err);
    setUpdatedp(true); // Set updatedp to true if there was an error
    setUpdated(false);
  }
};


const fetchUserPosts=async ()=>{
  try{
    const res=await axios.get(URL+"/api/posts/user/"+user._id)
    // console.log(res.data)
    setPosts(res.data)


  }
  catch(err){
    console.log(err)
  }
}



  return (
    <div>
      <Header/>
      <div className="min-h-[80vh] px-8 md:px-[100px] mt-8 flex md:flex-row flex-col-reverse md:items-start items-start md:space-x-28">
        <div className="flex flex-col md:w-[65%] w-full mt-8 md:mt-0">
         {user.isAdmin && <h1 className="text-xl font-bold mb-4 font-roboto">Your posts:</h1>}
          {posts?.map((p)=>(
            <ProfilePosts key={p._id} p={p}/>
          ))}
        </div>
        <div className="md:sticky md:top-6 flex justify-start md:justify-end items-start md:w-[35%] w-full md:items-end ">
        <div className=" flex flex-col space-y-4 items-start font-poppins w-full">
        {/* <h1 className="text-xl font-bold mb-2 font-roboto">Profile</h1> */}
        <form className="space-y-4" onSubmit={handleUserUpdate}>
        <img src={user.isAdmin? data.images.logo : "https://res.cloudinary.com/dvcma7mex/image/upload/v1709867902/pngegg_fdpihj.png"} className="w-[120px] h-[120px] rounded-full mx-auto shadow-md" alt="profile" />
          <input onChange={(e)=>setUsername(e.target.value)} value={username}
          className="border-[2px] border-gray-600 border-solid outline-none px-4 py-2 text-gray-500 w-full" placeholder="Your Fullname" type="text"/>
          <input onChange={(e)=>setEmail(e.target.value)} value={email} 
          className="border-[2px] border-gray-600 border-solid outline-none px-4 py-2 text-gray-500 w-full" placeholder="Your email" type="email"/>
         
          <div className="relative w-full mb-4">
          <input onChange={(e)=>setCp(e.target.value)}
          className="border-[2px] border-gray-600 border-solid outline-none px-4 py-2 text-gray-500 w-full" 
          placeholder="Current Password" type={passwordVisible ? 'text' : 'password'} autoComplete="current-password" required/>
           <div className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer" onClick={togglePasswordVisibility}>
         <FontAwesomeIcon icon={passwordVisible ? faEyeSlash : faEye} />
        </div>
        </div>
          
        <div className="relative w-full">
          <input onChange={(e)=>setNp(e.target.value)}
          className="border-[2px] border-gray-600 border-solid outline-none px-4 py-2 text-gray-500 w-full" 
          placeholder="New Password" type={passwordVisible2 ? 'text' : 'password'} />
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer" onClick={togglePasswordVisibility2}>
         <FontAwesomeIcon icon={passwordVisible2 ? faEyeSlash : faEye} />
        </div>
        </div>

       
          <div className="mt-8 w-full">
            <button type="submit" className="text-white font-semibold bg-black px-4 py-2 hover:text-black hover:bg-gray-400 w-full">Update Profile</button>
          </div>
          </form>
          <div className="w-full">
          {updated && <h3 className="text-green-500 text-[18px] text-center font-poppins ">User updated successfully!</h3>}
          {updatedp && <h3 className="text-red-500 text-xl text-center font-poppins ">Check Password Field!</h3>}
          {user.isAdmin && <h3 className="text-orange-500 text-sm font-poppins ">Make sure to logout and login again when you change your 
           password so you can save new password to browser!</h3>}
          </div>

        </div>
          
        </div>
      </div>
      <Footer/>
    </div>
  )
}

export default Profile