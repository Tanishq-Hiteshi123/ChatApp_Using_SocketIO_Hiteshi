import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../Context/userContext'
import { convertTheTimeStamp } from '../lib/utils'
import { getUserByIdService } from '../Services/userService'

function SingleMessage({elem}) {

  const {sendTo , userInfo} = useContext(UserContext) 

   console.log(elem , "Element") 

   const [senderName , setSenderName] = useState("")

   const fetchUserById = async (userId) =>{
    
     const {data} = await getUserByIdService(userId)

     console.log(data)

     setSenderName(data.data.username)

   }

   useEffect(() =>{
      
     fetchUserById(elem.senderId)

  } , [])

  return (
    <div className={`w-full h-12 ${userInfo.id == elem.senderId ? "justify-end" : "justify-start"}  flex items-center mt-4 `}>
         <div className={`w-max shadow-md rounded-md  p-2 ${userInfo.id == elem.senderId ? "bg-blue-500 text-white  " : "bg-gray-300"} `}>
         <h1>{elem.content}</h1>
         <p className='text-[0.6rem]'>{senderName == userInfo.username ? "You" : senderName}</p>
         </div>
    </div>
  )
}



export default SingleMessage
