// FetchAll The Conversation of User (One - One) :-

import axios from "axios"
import { BACKEND_URL } from "../constants"

const fetchAllMessagesService = async ({user1 , user2}) =>{
    console.log(user1 , user2 , "IDs")
    const response = await axios.get(`${BACKEND_URL}/message/getAllMessage?user1=${user1}&user2=${user2}` , {headers : {"authorization" : `Bearer ${localStorage.getItem("token")}`}})

      return response

}

export {fetchAllMessagesService}