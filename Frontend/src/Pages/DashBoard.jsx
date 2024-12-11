import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../Context/userContext'
import Navbar from '../Components/Navbar'
import SideBar from '../Components/SideBar'
import MessageBar from '../Components/MessageBar'
import SingleMessage from '../Components/SingleMessage'
import axios from 'axios'
import { fetchAllTheUsersService } from '../Services/userService'
import { fetchAllGroupsService } from '../Services/groupService'
import {io} from 'socket.io-client'
import {v4 as uuidV4} from 'uuid'
import { fetchAllMessagesService } from '../Services/messageService'

const SOCKET_SERVER_URL = "http://localhost:8080"
function DashBoard() {
   
    const [currentSocket , setCurrentSocket] = useState(null)
    const [allMessages , setAllMessages] = useState([])

    const {setAllUsers , setAllGroups , userInfo , sendTo} = useContext(UserContext);
   console.log(userInfo)
    useEffect(() => {
        // Initialize Socket.IO client
        const socket = io(SOCKET_SERVER_URL);

        setCurrentSocket(socket)

        // Listen for connection event
        socket.on("connect", () => {
            console.log("Connected to server with ID:", socket.id);
        });

        socket.emit("requestToConnect" , {userId : userInfo?.id})

      
        const roomId = uuidV4()
        socket.emit("join_room" , {user : userInfo.id , roomId})

        socket.on("receivedMessage" , (data) =>{
             console.log("Message Received " , data)
            
             setAllMessages((prev) => {
                 return [...prev , data.newMessage]
             })

        })

        // Clean up connection on unmount
        return () => {
            socket.disconnect();
            console.log("Disconnected from server");
        };
    }, []);
    
 

 
  const fetchAllUser = async() =>{
    
      try {
        
        const allUsersResponse = await fetchAllTheUsersService()
        setAllUsers(allUsersResponse.data.data)
        console.log(allUsersResponse.data.data)

        const allGroupsResponse = await fetchAllGroupsService()
        setAllGroups(allGroupsResponse.data.data)

      } catch (error) {
         console.log(error) 
      }

  }
  useEffect(() =>{
     fetchAllUser()
  } , [])

 
  const fetchAllMessages = async() =>{
    
    if (userInfo && sendTo) {
        try {
            const {data} = await fetchAllMessagesService({user1 : userInfo.id, user2 : sendTo})
            console.log(data.data.allMessages)
            setAllMessages(data.data.allMessages)

         } catch (error) {
            console.log(error)
         }
    }

  }
  useEffect(() =>{
    
      fetchAllMessages ()

  } , [sendTo])


  useEffect(() =>{
     
  } , [allMessages])  

  console.log("allMessages" , allMessages)

  return (
    <div>
      <Navbar />
      <div className='flex '>
        <SideBar  />
        
        <div className=' h-screen w-full'>
             <div className=' chat message-area h-[90vh] p-16 overflow-y-scroll '>
                  
               {
                 allMessages.map((elem , index) =>{
                     console.log(elem)
                    return <SingleMessage key={index}  elem = {elem} />

                 })
               }
                  
             </div>
           
            <MessageBar allMessages = {allMessages} setAllMessages = {setAllMessages} socket = {currentSocket} />
           
        </div>

      </div>
    </div>
  )
}

export default DashBoard
