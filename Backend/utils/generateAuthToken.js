const jwt = require("jsonwebtoken")

const generateAuthToken = (userDetails) =>{
    
     return jwt.sign(userDetails , process.env.JWT_SECRET , {
         expiresIn : "7d"
     })

}
module.exports = generateAuthToken;