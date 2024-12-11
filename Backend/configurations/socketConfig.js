const {Server} = require("socket.io")

let io;
const initizationOfSocket = (server) =>{
    
      io = new Server(server , {
         cors : {
             origin : "*"
         }
      })



    return io;

}


const getSocketInstance = () =>{
    
     if (!io) {

         throw new Error ("Server is not initialized...")

     }

     return io;

}

module.exports = {initizationOfSocket , getSocketInstance}