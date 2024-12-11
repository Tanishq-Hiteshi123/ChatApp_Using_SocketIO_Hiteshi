const {DataTypes} = require("sequelize")
const sequelize = require("../configurations/database")


const Group = sequelize.define("Group" , {
     name : {
        type : DataTypes.STRING,
        allowNull : false
     },
     groupId : {
         type : DataTypes.STRING,
         allowNull : true
     },
     members : {
         type : DataTypes.ARRAY(DataTypes.STRING),
         allowNull : true,
         defaultValue : []
     },
     createdBy : {
         type : DataTypes.STRING,
         allowNull : false
     }
} , {
    timestamps : true
})  

module.exports = Group