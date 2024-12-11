const User = require("../Models/userModel")
const errorHandler = require("../utils/errorHandler")
const unknownErrorHandler = require("../utils/unknownErrorHandler")
const jwt = require("jsonwebtoken")

const isAuthenticated = async(req , res , next) =>{
    
     try {
        
        const authToken = await req.headers["authorization"]
        if (authToken && authToken.split(" ")[1]){
            
             const token = authToken.split(" ")[1]

             const decodedUser = jwt.verify(token , process.env.JWT_SECRET)

             req.user = await User.findByPk(decodedUser.userId)

             next()

        }
        else {
             return errorHandler(res , 401 , "UnAuthorised Access Denied")
        }

     }
     catch (error) {
 
         return unknownErrorHandler(res , error.message)
         
     }

}

module.exports = isAuthenticated