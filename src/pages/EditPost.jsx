/* eslint-disable no-unused-vars */

import { useContext, useEffect, useState } from "react"
import Footer from "../components/Footer"
import Navbar from "../components/Navbar"
import {ImCross} from 'react-icons/im'
import axios from "axios"
import { URL } from "../url"
import { useNavigate, useParams } from "react-router-dom"
import { UserContext } from "../context/UserContext"
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Header from "../components/Header"

const formats = [
  'header', 'font', 'size',
  'bold', 'italic', 'underline', 'strike', 'blockquote',
  'list', 'bullet', 'indent',
  'link',
];

const modules = {
  toolbar: [
    [{ 'header': '1'}, {'header': '2'}, { 'font': [] }],
    [{size: []}],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
    ['link'],
  ]
};


const EditPost = () => {

    const postId=useParams().id
    const {user}=useContext(UserContext)
    const navigate=useNavigate()
    const [title,setTitle]=useState("")
    const [desc,setDesc]=useState("")
    const [file,setFile]=useState(null)
    const [cat,setCat]=useState("")
    const [cats,setCats]=useState([])
    const [imageUrl, setImageUrl] = useState("");
    const [quillError, setQuillError] = useState(false);

    const fetchPost=async()=>{
      try{
        const res=await axios.get(URL+"/api/posts/"+postId)
        setTitle(res.data.title)
        setDesc(res.data.desc)
        setFile(res.data.photo)
        setCats(res.data.categories)

      }
      catch(err){
        console.log(err)
      }
    }

    const handleFileChange = (e) => {
      const selectedFile = e.target.files[0];
      setImageUrl(URL.createObjectURL(selectedFile)); // Set the URL of the selected image
      setFile(selectedFile);
    }

    const handleUpdate=async (e)=>{
      e.preventDefault()
      if (!desc) { // Check if the quill is empty
        setQuillError(true);
        return;
      }
      setQuillError(false);
      const post={
        title,
        desc,
        author:user.username,
        userId:user._id,
        categories:cats
      }

      if(file){
        const data=new FormData()
        const filename=Date.now()+file.name
        data.append("img",filename)
        data.append("file",file)
        post.photo=filename
        // console.log(data)
        //img upload
        try{
          const imgUpload=await axios.post(URL+"/api/upload",data)
          // console.log(imgUpload.data)
          setImageUrl("");

        }
        catch(err){
          console.log(err)
        }
      }
      //post upload
     
      try{
        const res=await axios.put(URL+"/api/posts/"+postId,post,{withCredentials:true})
        navigate("/posts/post/"+res.data._id)
        // console.log(res.data)

      }
      catch(err){
        console.log(err)
      }
    }

    useEffect(()=>{
      fetchPost()
    },[postId])

    const deleteCategory=(i)=>{
       let updatedCats=[...cats]
       updatedCats.splice(i)
       setCats(updatedCats)
    }

    const addCategory=()=>{
        let updatedCats=[...cats]
        updatedCats.push(cat) 
        setCat("")
        setCats(updatedCats)
    }
  return (
    <div>
        <Header/>
        <div className='px-6 md:px-[200px] mt-8'>
        <h1 className='font-bold md:text-[25px] text-xl font-roboto mb-3'>Update Article</h1>
        <form className='w-full flex flex-col space-y-4 md:space-y-8 mt-4'>
          <input onChange={(e)=>setTitle(e.target.value)} value={title} type="text" placeholder='Enter post title' 
          className='text-[30px] py-2 outline-none border-b-2 border-b-slate-500 font-semibold font-roboto'/>
          {/* <input onChange={(e)=>setFile(e.target.files[0])} type="file"  className='px-4'/> */}

          {imageUrl && (
            <div>
              <img src={imageUrl} alt="Selected" style={{ maxWidth: "100%" }} /> {/* Render selected image */}
            </div>
           )} 

          <div>
          <label htmlFor="file" className='cursor-pointer transition 
          font-semibold text-[20px]'>Upload Article Image</label> <br />
          <input onChange={handleFileChange} id='file' type="file" required  className='mt-2'/>
          </div>

          <div className='flex flex-col'>
            <div className='flex items-center space-x-4 md:space-x-8'>
                <input value={cat} onChange={(e)=>setCat(e.target.value)} className='py-2 font-semibold outline-none border-b-2 border-b-slate-500' placeholder='Enter post category' type="text"/>
                <div onClick={addCategory} className='bg-black text-white px-4 py-2 font-semibold cursor-pointer'>Add</div>
            </div>

            {/* categories */}
            <div className='flex mt-3 w-full flex-wrap'>
            {cats?.map((c,i)=>(
                <div key={i} className='flex justify-center items-center space-x-2 mr-4 
                bg-gray-200 px-2 py-1 my-2 font-semibold text-[16px] hover:scale-105 cursor-pointer transition font-poppins'>
                <p>{c}</p>
                <p onClick={()=>deleteCategory(i)} className='text-red-600 bg-white rounded-full cursor-pointer p-1 text-sm'><ImCross/></p>
            </div>
            ))}
            
            
            </div>
          </div>
          {/* <textarea onChange={(e)=>setDesc(e.target.value)} value={desc} rows={15} cols={30} className='px-4 py-2 outline-none' placeholder='Enter post description'/> */}
          <div>
      <ReactQuill
        theme="snow"
        className="h-[400px] mb-6"
        placeholder='Write Article...'
        onChange={(html)=>setDesc(html)}
        value={desc}
        formats={formats}
        modules={modules}
      />
    </div>

    {quillError && (
              <p className="text-red-600 font-bold text-[18px] uppercase">This field is required!!!</p>
            )}
          <button onClick={handleUpdate} className='bg-black w-full mx-auto text-white font-semibold px-4 py-2 md:text-xl text-lg'>Update</button>
        </form>

        </div>
        <Footer/>
    </div>
  )
}

export default EditPost