const express = require ("express")
require("dotenv").config()
const app = express()
const http = require("http")
const cors = require("cors")
const PORT = process.env.PORT || 8000
const sequelize = require("./configurations/database.js")
const userRouter = require("./routes/userRouter.js")
const groupRouter = require("./routes/groupRouter.js")
const messageRouter = require("./routes/messageRouter.js")
const { initizationOfSocket } = require("./configurations/socketConfig.js")
const User = require("./Models/userModel.js")
const Message = require("./Models/messageModel.js")
const { where } = require("sequelize")

// Backend Connectivity :-
sequelize.authenticate()
.then(() =>{
     console.log("DataBase Connected SuccessFully")
})
.catch((error) =>{
     console.log("Error While connecting the database ", error.message)
})

// Initializing the WebSocket Server :-


const server = app.listen(PORT , () =>{
     
     console.log("Server is running on the PORT " , 8080)
     
}) 
const io = initizationOfSocket(server)

io.on("connection" , (socket) =>{
      

      console.log("Connection is Done!!!" , socket.id)

     // Update the socketId of the User :-
     socket.on("requestToConnect" , async({userId}) =>{
           console.log("UserId " , userId)
        if (userId) {
          const updatedUser = await User.update({
               socketId : socket.id
         } , {
               where : {
                    id : userId
               }
         });
         console.log(updatedUser ,  " Updated ")
        }

     })

     socket.on("send_message" , async({senderId , receiverId , content , isGroup}) =>{
          let newMessage;
          console.log(senderId , content , receiverId , isGroup)
          if (isGroup) {
                newMessage = await Message.create({
                    content,
                    senderId,
                    groupId : receiverId,
                    
              })

          
          }
          else {
                newMessage = await Message.create({
                    content,
                    senderId,
                    receiverId,
                    
              })
          }

          //      Emit the Message to receiver :-
          const receiverSocketId = await User.findByPk(receiverId); 
          // console.log(receiverSocketId)
          if (receiverSocketId && receiverSocketId.dataValues && receiverSocketId.dataValues.socketId) {
              io.to(receiverSocketId.dataValues.socketId).emit("receivedMessage", {
                 newMessage
              });
          }

     })



})


// Express Middlwares :-
app.use(cors({
      origin : "*",
      credentials : true
}))


app.use(express.json())
app.use(express.urlencoded({extended : true}))

// Routes Middlewares :-
app.use("/api/user" , userRouter)
app.use("/api/group" , groupRouter)
app.use("/api/message" , messageRouter)



