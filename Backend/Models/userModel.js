const {DataTypes} = require("sequelize")
const sequelize = require("../configurations/database.js")

const User = sequelize.define("User" , {
     username : {
         type : DataTypes.STRING,
         allowNull : false
     },
     email : {
         type : DataTypes.STRING,
         allowNull : false,
         unique : true
     },
     password : {
         type : DataTypes.STRING,
         allowNull : false
     },
     socketId :  {
        type : DataTypes.STRING,
        allowNull : true
     }
} , { 
    timestamps : true
})

module.exports = User