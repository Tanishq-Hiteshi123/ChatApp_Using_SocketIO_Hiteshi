const {DataTypes} = require("sequelize")
const sequelize = require("../configurations/database.js")


const Message = sequelize.define("Message" , {
    
     content : {
        type : DataTypes.STRING,
        allowNull : false
     },
     senderId : {
         type : DataTypes.STRING,
         allowNull : false
     },
     receiverId : {
         type : DataTypes.STRING,
         allowNull : true
     },
     groupId : {
         type : DataTypes.STRING,
         allowNull : true
     }

} , {
     timestamps : true
})

module.exports = Message