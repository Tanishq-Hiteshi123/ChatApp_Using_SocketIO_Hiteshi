import axios from "axios"
import { BACKEND_URL } from "../constants"

const registerService = async(userDetails) =>{
 
    const res = await axios.post(`${BACKEND_URL}/user/registerUser` , userDetails)

    return res;
    
}
const loginService = async(userDetails) =>{
 
    const res = await axios.post(`${BACKEND_URL}/user/loginUser` , userDetails)

    return res;
    
}

const fetchAllTheUsersService = async() =>{
    
    const response = await axios.get(`${BACKEND_URL}/user/allUsers` , {headers : {"authorization" :  `Bearer ${localStorage.getItem("token")}`}})

    return response
      

}
export {registerService , loginService , fetchAllTheUsersService}