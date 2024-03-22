/* eslint-disable no-unused-vars */
import { useNavigate, useParams } from "react-router-dom"
import Comment from "../components/Comment"
import Footer from "../components/Footer"
import Navbar from "../components/Navbar"
import {BiEdit} from 'react-icons/bi'
import {MdDelete} from 'react-icons/md'
import axios from "axios"
import { URL } from "../url"
import { useContext, useEffect, useState } from "react"
import { UserContext } from "../context/UserContext"
import Loader from "../components/Loader"
import Header from "../components/Header"
import {BeatLoader} from 'react-spinners';

const PostDetails = () => {

  const postId=useParams().id
  const [post,setPost]=useState({})
  const {user}=useContext(UserContext)
  const [comments,setComments]=useState([])
  const [comment,setComment]=useState("")
  const [author,setAuthor]=useState("")
  const [email,setEmail]=useState("")
  const [loader,setLoader]=useState(false)
  const [loading,setLoading]=useState(false)
  const navigate=useNavigate()
  

  const fetchPost=async()=>{
    try{
      const res= await axios.get(URL+"/api/posts/"+postId)
      // console.log(res.data)
      setPost(res.data)
    }
    catch(err){
      console.log(err)
    }
  }

  const handleDeletePost=async ()=>{

    try{
      const res=await axios.delete(URL+"/api/posts/"+postId,{withCredentials:true})
      console.log(res.data)
      navigate("/")

    }
    catch(err){
      console.log(err)
    }

  }

  useEffect(()=>{
    fetchPost()

  },[postId])

  const fetchPostComments=async()=>{
    setLoader(true)
    try{
      const res=await axios.get(URL+"/api/comments/post/"+postId)
      setComments(res.data)
      setLoader(false)

    }
    catch(err){
      setLoader(true)
      console.log(err)
    }
  }

  useEffect(()=>{
    fetchPostComments()

  },[postId])

  const postComment=async(e)=>{
    e.preventDefault()
    try{
      setLoading(true)
      const res=await axios.post(URL+"/api/comments/create",
      {comment:comment,author:author,email:email,postId:postId,userId:Date.now()},
      {withCredentials:true})
      
      // fetchPostComments()
      // setComment("")
      setLoading(false)
      window.location.reload(true)
    }
    catch(err){
      setLoading(false)
         console.log(err)
    }

  }

  const months = {
    0: "JAN", 1: "FEB", 2: "MAR", 3: "APR", 4: "MAY", 5: "JUN",
    6: "JUL", 7: "AUG", 8: "SEP", 9: "OCT", 10: "NOV", 11: "DEC"
  };
  
  const formatTime = (date) => {
    const options = { hour: 'numeric', minute: '2-digit' };
    const time = new Date(date).toLocaleTimeString('en-US', options);
    const meridiem = time.slice(-2) === 'AM' ? 'AM' : 'PM';
    const formattedTime = time.slice(0, -6) + meridiem;
    return formattedTime;
  };
  
  const formatDate = (date) => {
    const month = months[new Date(date).getMonth()];
    const day = new Date(date).getDate();
    const year = new Date(date).getFullYear();
    return `${month}. ${day}, ${year}`;
  };
  
  const formattedDate = formatDate(post.updatedAt);
  const formattedTime = formatTime(post.updatedAt);
  
  const formattedDateTime = `${formattedDate} ${formattedTime} WAT`;


  
  return (
    <div>
        <Header/>
        {loader?<div className="h-[80vh] flex justify-center items-center w-full"><Loader/></div>
        :
        <div className="w-full">
        <div className="mb-12 px-8 md:px-[150px]">
         <h1 className="text-2xl font-bold text-black md:text-[35px] font-poppins tracking-tighter leading-[50px]">{post.title}</h1>
    
        </div>
        <div className="px-8 md:pl-[150px] md:pr-[520px] mt-8">
        <div className="mt-2 md:mt-4 font-roboto">
        <p className="font-bold font-roboto uppercase mb-2 tracking-wider">By {post.author}</p>
       <div className="flex space-x-2 text-gray-600 text-[14px]">
       <p>{formattedDateTime}</p>
       </div>
        </div>
        {user.isAdmin && <div className=" mt-6">
          {/* <div className="border-b border-b-gray-200 w-full mb-3"/> */}
          <div className="flex items-center justify-end space-x-2 w-full">
            <p className="cursor-pointer text-[25px] hover:scale-110" onClick={()=>navigate("/edit/"+postId)}><BiEdit/></p>
            <p className="cursor-pointer text-[25px] hover:scale-110 hover:text-red-600" onClick={handleDeletePost}><MdDelete/></p>
            </div>
          {/* <div className="border-b border-b-gray-200 w-full my-3"/> */}
         </div>}
        
        <img src={post.photo} className="w-full  mx-auto mt-8" alt=""/>
         {/* <p className="mx-auto mt-8">{post.desc}</p> */}
         <div className="flex items-center mt-8 space-x-4 font-semibold font-madimi">
          <div className="flex items-center flex-wrap md:space-x-2">
          {post.categories?.map((c,i)=>(
            <>
            <div key={i} className="bg-gray-300 rounded-lg px-3 py-1 font-normal my-1 mx-2 md:mx-0">{c}</div>
            </>
            
          ))}
            
          </div>
         </div>
       <div className="mx-auto mt-8 text-[18px] font-poppins leading-[35px]" dangerouslySetInnerHTML={{ __html: post.desc }}></div>

         <div className="flex flex-col mt-4">
         <h3 className="mt-6 mb-4 font-semibold font-madimi">Comments:</h3>
         {comments?.map((c)=>(
          <Comment key={c._id} c={c} post={post} />
         ))}
           
         </div>
         {/* write a comment */}
         
      <form onSubmit={postComment}>
    <div className="w-full mt-4 font-poppins">
        <textarea onChange={(e)=>setComment(e.target.value)} type="text" required 
        placeholder="Write a comment" className="w-full border border-solid outline-none py-2 px-4 mt-4 md:mt-0 md:mb-4 
        min-h-[150px] max-h-[150px]"/>
        <div className="md:flex w-full md:space-x-5 mb-5"> 
        <input onChange={(e)=>setAuthor(e.target.value)} type="text" required 
        placeholder="Fullname" className="w-full border border-solid outline-none py-2 px-4 mt-4 md:mt-0"/>
        <input onChange={(e)=>setEmail(e.target.value)} type="text" required 
        placeholder="Email (For Feedback)" className="w-full border border-solid outline-none py-2 px-4 mt-4 md:mt-0"/>
        </div>
        <button type="submit" className="bg-black text-sm text-white px-2 py-3 w-full mt-4 md:mt-0 text-[20px] 
        font-poppins flex justify-center items-center" disabled={loading}>
           {loading ? 
          "" : 
          "Add Comment"}
          {loading && <BeatLoader color="#fff" />}
        </button>
    </div>
        </form>
        </div>
        </div>}
        <Footer/>
    </div>
  )
}

export default PostDetails