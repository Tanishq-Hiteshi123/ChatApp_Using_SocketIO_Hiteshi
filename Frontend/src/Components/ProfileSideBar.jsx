import React from 'react'
import { FaUserEdit } from "react-icons/fa";
function ProfileSideBar() {
  return (
    <div className='h-screen w-[20vw] bg-gray-200'>
       <div className='w-[100%] flex justify-center mt-4'>
           <img src="https://imgs.search.brave.com/_BWWH9TRk3bovRmd17gUhoqgTYg6oJZi6gyqZHUHvAM/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9hdmF0/YXIuaXJhbi5saWFy/YS5ydW4vcHVibGlj/LzM0" alt="" className='w-[40%] h-[40%]'/>
            <FaUserEdit className='absolute top-[12.3rem] left-[13rem] cursor-pointer bg-white p-1 rounded-full' size={"1.4rem"}/> 
       </div>
    </div>
  )
}

export default ProfileSideBar
