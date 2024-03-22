/* eslint-disable react/prop-types */

const ProfilePosts = ({p}) => {
  // console.log(p)
  return (
    <div className="w-full md:flex mt-12 md:space-x-4">
    {/* left */}
    <div className="w-full md:w-[35%] flex justify-center items-center"> 
    <img src={p.photo} alt="" className="h-full w-full object-cover"/>
    </div>
    {/* right */}
    <div className="md:flex md:flex-col w-full md:w-[65%] ">
      <h1 className="text-[20px] font-bold md:mb-2 md:text-2xl mt-2 md:mt-0 font-roboto truncate">
      {p.title}
      </h1>
      <div className="flex mb-2 text-sm font-semibold text-gray-500 items-center justify-between md:mb-4 font-madimi">
       <p>@{p.author}</p>
       <div className="flex space-x-2">
       <p>{new Date(p.updatedAt).toString().slice(4,15)}</p>
       {/* <p>{new Date(p.updatedAt).toString().slice(16,24)}</p> */}
       </div>
      </div>
      <div className="text-sm md:text-lg font-poppins" dangerouslySetInnerHTML={{ __html: `${p.desc.slice(0, 160)}...  <br>Read more` }}></div>
    </div>

    </div>
  )
}

export default ProfilePosts