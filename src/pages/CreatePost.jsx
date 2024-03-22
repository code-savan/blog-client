/* eslint-disable no-unused-vars */
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import {ImCross} from 'react-icons/im'
import { useContext, useState } from 'react'
import { UserContext } from '../context/UserContext'
import { URL } from '../url'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

import {BeatLoader} from 'react-spinners';
import Header from '../components/Header'


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

const CreatePost = () => {
   
    const [title,setTitle]=useState("")
    const [desc,setDesc]=useState("")
    const [file,setFile]=useState("")
    const {user}=useContext(UserContext)
    const [cat,setCat]=useState("")
    const [cats,setCats]=useState([])
    const [imageUrl, setImageUrl] = useState("");
    const [quillError, setQuillError] = useState(false);
  const [loading, setLoading] = useState(false)

    const navigate=useNavigate()

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

    const handleFileChange = async (e) => {
      // console.log("changed")
      const selectedFile = e.target.files[0];
      // console.log(selectedFile)
      // setFile(selectedFile);
      // setImageUrl(URL.createObjectURL(selectedFile)); 
        const formData = new FormData();
        formData.append("file", selectedFile);
        formData.append("upload_preset", "zua79mtx");
      
        const cloudName = 'dvcma7mex';
        const uploadURL = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;
      
        try {
          const response = await fetch(uploadURL, {
            method: "POST",
            body: formData,
          });
      
          if (response.ok) {
            const data = await response.json();
            if (data.secure_url) {
              const image = data.secure_url
              console.log("Image uploaded successfully. URL:", data.secure_url);
              setImageUrl(image)
              setFile(image)
            }
            
          }}    
          catch (err){
            console.log(err)
            
          }
      
    }

    const handleCreate= async (e)=>{
        e.preventDefault()
        if (!desc) { // Check if the quill is empty
          setQuillError(true);
          return;
        }
        setQuillError(false);
        setLoading(true)
        const post={
          title,
          desc,
          photo:file,
          author:user.username,
          userId:user._id,
          categories:cats
        }
        
        //post upload

        try{
          const res =await axios.post(URL+"/api/posts/create", post, {withCredentials:true})
          navigate("/posts/post/"+res.data._id)
          // console.log(res.data)
          
        }
        catch(err){
          console.log(err)
        }
        setLoading(false)
    }



    return (
      <>
      {user.isAdmin ? (
      <div>
        <Header/>
        <div className='px-6 md:px-[200px] mt-8 font-poppins'>
        <h1 className='font-bold md:text-2xl text-xl'>Create new Article</h1>

        <form className='w-full flex flex-col space-y-4 md:space-y-8 mt-4' onSubmit={handleCreate}>
          <input onChange={(e)=>setTitle(e.target.value)} type="text" placeholder='Title...' 
          className='text-[40px] py-2 outline-none focus:border-b-2 focus:border-b-slate-500 font-semibold font-roboto' required/>
          
          {imageUrl && (
            <div>
              <img src={imageUrl} alt="Selected" style={{ maxWidth: "100%" }} /> {/* Render selected image */}
            </div>
          )}

          <div>
          <label htmlFor="file" className='cursor-pointer transition 
          font-semibold text-[20px]'>Upload Article Image</label> <br />
          <input onChange={handleFileChange} id='file' type="file" required className='mt-2'/>
          </div>

          <div className='flex flex-col'>
            <div className='flex items-center space-x-4 md:space-x-8'>
                <input value={cat} onChange={(e)=>setCat(e.target.value)} className='py-2 font-semibold outline-none border-b-2 border-b-slate-500'
                 placeholder='Enter post category' type="text"/>
                <div onClick={addCategory} className='bg-black text-white px-4 py-2 font-semibold cursor-pointer'>Add</div>
            </div>

            {/* categories */}
            <div className='flex mt-3 w-full flex-wrap'>
            {cats?.map((c,i)=>(
                <div key={i} className='flex justify-center items-center space-x-2 mr-4 
                bg-gray-200 px-2 py-1 my-2 font-semibold text-[16px] hover:scale-105 cursor-pointer transition'>
                <p>{c}</p>
                <p onClick={()=>deleteCategory(i)} className='text-red-600 bg-white rounded-full cursor-pointer p-1 text-sm'><ImCross/></p>
            </div>
            ))}
            
            
            </div>
          </div>
            

            <div>
      <ReactQuill
        theme="snow"
        className="h-[400px] mb-5"
        placeholder='Write Article...'
        onChange={(html)=>setDesc(html)}
        formats={formats}
        modules={modules}
      />
    </div>

    {quillError && (
              <p className="text-red-600 font-bold text-[18px] uppercase">This field is required!!!</p>
            )}
       <button
        type='submit'
        className={`w-full mx-auto text-white font-semibold px-4 py-2 md:text-xl text-lg transition flex justify-center items-center bg-black`}
        disabled={loading}>
          {loading ? 
          "Publishing " : 
          "Publish Article"}
          {loading && <BeatLoader color="#fff" />}
        </button>
        </form>

        </div>
        <Footer/>
    </div>)
    :  (
   window.location.href = '/'
   )}
   </>
    )
}

export default CreatePost