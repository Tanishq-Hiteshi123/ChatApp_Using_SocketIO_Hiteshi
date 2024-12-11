const { Sequelize } = require("sequelize");
const Group = require("../Models/groupModel.js");
const errorHandler = require("../utils/errorHandler.js")
const unknownErrorHandler = require("../utils/unknownErrorHandler");
const responseHandler = require("../utils/responseHandler");
const { v4: uuidv4 } = require('uuid');
const { GROUP_CREATED } = require("../EventEmitter.js");
const { getSocketInstance } = require("../configurations/socketConfig.js");

//  Fetch All The Group Details :-
const getAllGroups = async (req , res) =>{
    
     try {
        
        const authUser = req.user;

        //  Fetch all the group in which the authUser is a member :-
        const allGroups = await Group.findAll({
            where : {
                 members : {
                     [Sequelize.Op.contains] : [authUser.id]
                 }
            }
        })

        return responseHandler(res , 200 , "All Groups" , allGroups)

     }
     catch (error) {
        
         return unknownErrorHandler(res , error.message)

     }

}

const createGroup = async (req , res) =>{
    
    try {

        const io = getSocketInstance()

        if (!io) {
             throw new Error("Socket is not initailized yet...")
        }

         const {groupName , members} = req.body;

         if (!groupName || !members) {
            
             return errorHandler(res , 400 , "Please Provide All Details")

         }

         if (members.length < 2){
             return errorHandler(res , 400 , "Making Group atleast 3 members are required")
         } 

        //   Generate the UUID for group Id :-
        const groupId = uuidv4()
         
        const allMembers = [...members , req.user.id]

        // Create the group :-
        const newGroup = await Group.create({
             name : groupName,
             allMembers,
             groupId,
             createdBy : req.user.id
        })

        // Emit the event to Users of group that group Created SuccessFully :-

        
        

        return responseHandler(res , 200 , "Group Created SuccessFully" , newGroup)

         
    }
    catch (error) {

         return unknownErrorHandler(res , error.message)

    }

}
module.exports = {getAllGroups , createGroup}