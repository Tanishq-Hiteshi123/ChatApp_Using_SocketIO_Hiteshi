import React, { useContext, useState } from 'react'
import { IoIosSend } from "react-icons/io";
import { UserContext } from '../Context/userContext';
function MessageBar({allMessages , setAllMessages , socket}) {

  const [content , setContent] = useState("")
  const {sendTo , userInfo} = useContext(UserContext)
  console.log(sendTo)

  const handleChange = (e) =>{
    
    setContent(e.target.value)

    if (e.key == "Enter") {
      handleSendMessage()
    }
      

  }

  const handleSendMessage = (e) =>{
     
   
    
    if (sendTo) 
      {
        
        if (content.trim() == "") {
             return;
        }

        socket.emit("send_message" , {content , senderId : userInfo.id , receiverId : sendTo , isGroup : false})
        let data = {content , senderId : userInfo.id , receiverId : sendTo , isGroup : false}
        setAllMessages((prev) => {
          return [...prev , data]
      })
     
        setContent("")

      }

  }

   
  return (
    <div className='w-[80%] flex items-center  justify-center fixed  bottom-10'>
      <div class="group w-[90%]  m-auto ">
      <div class="relative flex  items-center  w-[100%]">
        <input onChange={handleChange} onKeyDown={handleChange} value={content} id="8" type="text" class="peer relative h-10 w-[100%] rounded-md bg-gray-50 pl-4 pr-20 font-thin outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:drop-shadow-lg" placeholder='type...'/>
        <button onClick={handleSendMessage}  class="absolute right-0 h-10 w-[5vw] rounded-r-md bg-blue-200 text-xs font-semibold flex justify-center items-center text-white transition-all duration-200 ease-in-out group-focus-within:bg-blue-400 group-focus-within:hover:bg-blue-600"> <IoIosSend  size={"1.4rem"}/></button>
      </div>
    </div>
    </div>
  )
}

export default MessageBar
    