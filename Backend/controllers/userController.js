// Register User :-

const { Sequelize } = require("sequelize");
const sequelize = require("../configurations/database.js");
const User = require("../Models/userModel.js");
const comparePassword = require("../utils/comparePassword.js");
const errorHandler = require("../utils/errorHandler");
const generateAuthToken = require("../utils/generateAuthToken.js");
const hashPassword = require("../utils/hashThePassword");
const responseHandler = require("../utils/responseHandler");
const unknownErrorHandler = require("../utils/unknownErrorHandler")

const registerUser = async(req , res) =>{
    
     try {
      
        const {username , email , password} = req.body;

        if (!username || !email || !password) {

             return errorHandler(res , 400 , "Please Provide all details")

        }

        //  Check If User Already Exist :-
        const isExist = await User.findOne({
            where : {
                 email
            }
        })
        if (isExist?.dataValues) {
             return errorHandler(res , 400 , "User already exist with this email")
        }
        console.log(isExist?.dataValues)

        const hashedOne = await hashPassword(password)

        //  Create the User :-
        const newUser = await User.create({
             email,
             username,
             password : hashedOne
        })

        return responseHandler(res , 201 , "User CreatedSuccessfully" , newUser)

        
     }
     catch (error) {

        return unknownErrorHandler(res , error.message)

     }

}

const loginUser = async(req , res) =>{
    
     try {

        const {email , password} = req.body;

        if (!email || !password) {
            
             return errorHandler(res , 400 , "Please Provide all Details")

        }

        //  Check if User exist or not :-
        const isExist = await User.findOne({
             where : {
                 email
             }
        })
        if (!isExist) {
            
             return errorHandler(res , 400 , "User does not exist")

        }

        //  Check The Password :-
        const isMatch = await comparePassword(password , isExist.password)

        if (!isMatch){
            return errorHandler(res , 402 , "Invalid Credentials")
        }

        // Generate the Token :-
        const authToken = generateAuthToken({userId : isExist.id , userName : isExist.username})

        return responseHandler(res , 200 , "User LoggedIn SuccessFully" ,{isExist , authToken})
        
     } catch (error) {
        
        return unknownErrorHandler(res , error.message)

     }

}

const getUserDetails = async(req , res) =>{
    
     try {
                 
         const authUser = req.user

         return responseHandler(res , 200 , "auth User Details" , authUser)
     }
     catch (error) {

         return unknownErrorHandler(res , error.message)
         
     }
 
}

const getAllUser = async(req , res) =>{
    
     try {
         
        // Fetching all User Other Than Me !!!
       const allUsers = await User.findAll({
         where : {
            id : {
                [Sequelize.Op.ne] : req.user.id
            }
         }
       })


       return responseHandler(res , 200 , "All Users" , allUsers)



     }
     catch (error) {
        
        return unknownErrorHandler(res , error.message)

     }

}

const getUserById = async(req , res) =>{
     
       try {
           const {userId} = req.params;

           if (!userId) {
               
                return errorHandler(res , 400 , "User Id is not provided")

           }

           const userDetails = await User.findByPk(userId)

           if (!userDetails.dataValues) {
                return errorHandler(res , 404 , "User not found with this id")
           }

           return responseHandler(res , 200 , "User Details ", userDetails)
       }
       catch (error) {
           return unknownErrorHandler(res , error.message)
       }

}

module.exports  = {registerUser , loginUser , getUserDetails , getAllUser , getUserById}