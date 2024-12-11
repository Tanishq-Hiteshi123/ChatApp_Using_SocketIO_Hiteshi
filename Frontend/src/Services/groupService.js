// Service for fetching all the groups with includes Me :-

import axios from "axios"
import { BACKEND_URL } from "../constants"

const fetchAllGroupsService = async () =>{
    
     const response = await axios.get(`${BACKEND_URL}/group/getAllGroups` , {headers : {"authorization" : `Bearer ${localStorage.getItem("token")}`}})
      return response
}


export {fetchAllGroupsService}