const bcryptjs = require("bcryptjs")

const hashPassword = async(enteredPassword) =>{

   return await bcryptjs.hash(enteredPassword , 10)

}

module.exports = hashPassword