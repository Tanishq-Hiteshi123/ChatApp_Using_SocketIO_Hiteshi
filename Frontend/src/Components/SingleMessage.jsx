import React, { useContext } from 'react'
import { UserContext } from '../Context/userContext'
import { convertTheTimeStamp } from '../lib/utils'

function SingleMessage({elem}) {

  const {sendTo , userInfo} = useContext(UserContext) 

   console.log()

  return (
    <div className={`w-full h-12 ${userInfo.id == elem.senderId ? "justify-end" : "justify-start"}  flex items-center mt-4 `}>
         <div className={`w-max shadow-md rounded-md  p-2 ${userInfo.id == elem.senderId ? "bg-blue-500 text-white  " : "bg-gray-300"} `}>
         <h1>{elem.content}</h1>
         {/* <p className='text-xs'>{convertTheTimeStamp(elem.createdAt).split(" ").slice(-2)[0] }</p> */}
         </div>
    </div>
  )
}



export default SingleMessage
