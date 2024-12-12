const { Op } = require("sequelize");
const Message = require("../Models/messageModel");
const errorHandler = require("../utils/errorHandler");
const unknownErrorHandler = require("../utils/unknownErrorHandler");
const responseHandler = require("../utils/responseHandler");

const getAllMessageOne = async(req , res) =>{
    
    try {
     
        const { user1, user2 } = req.query;
        
        if (!user1 || !user2) {
            
            return errorHandler(res , 400 , "Both the users Id is required")

        }

        const allMessages = await Message.findAll({
            where: {
               [Op.or]: [
                    { senderId: user1, receiverId: user2 },
                    { senderId: user2, receiverId: user1 }
                ]
            }
        });



        return responseHandler(res , 200 , "All Messages" , {allMessages})
        
    }
    catch (error) {
        
         return unknownErrorHandler(res , error.message)

    }

}
const getAllGroupMessagesById = async (req , res) =>{
 
    try {
 
        const {groupId} = req.params;

        if (!groupId) {

             return errorHandler(res , 400 , "Please Provide the groupId")

        }

        const allGroupMessage = await Message.findAll({
            where: {
                groupId 
             }
        })

        return responseHandler(res , 200 , "All Group Messages" , {allGroupMessage})

        

    }
    catch (error) {
        
         return unknownErrorHandler(res , error.message)

    }
    
}
module.exports = {getAllMessageOne , getAllGroupMessagesById}