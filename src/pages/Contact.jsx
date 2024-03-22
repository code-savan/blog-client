/* eslint-disable no-unused-vars */
import Footer from "../components/Footer"
import Header from "../components/Header"
import {BeatLoader} from 'react-spinners';
import { useState } from "react"



const Contact = () => {
  const [loading,setLoading]=useState(false)
  const [message,setMessage]=useState("")
  const [author,setAuthor]=useState("")
  const [email,setEmail]=useState("")

  return (
    <>
    <Header/>
    <div className="w-full md:px-24 px-6">
    <form>
        <h2 className="text-xl font-poppins font-semibold mt-6">Reach out to me with a message</h2>
    <div className="w-full mt-4 font-poppins">
        <textarea onChange={(e)=>setMessage(e.target.value)} type="text" required 
        placeholder="Write a message..." className="w-full border border-solid  outline-none py-2 px-4 mt-4 md:mt-0 md:mb-4 
        md:min-h-[350px] md:max-h-[350px] min-h-[200px] max-h-[200px]"/>
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
          "Send Message"}
          {loading && <BeatLoader color="#fff" />}
        </button>
    </div>
        </form>
    </div>
    <Footer/>
    </>
  )
}

export default Contact