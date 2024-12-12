// Service for fetching all the groups with includes Me :-

import axios from "axios"
import { BACKEND_URL } from "../constants"

const fetchAllGroupsService = async () =>{
    
     const response = await axios.get(`${BACKEND_URL}/group/getAllGroups` , {headers : {"authorization" : `Bearer ${localStorage.getItem("token")}`}})
      return response
}


const createNewGroupService = async(groupDetails) =>{
       console.log(`${BACKEND_URL}/group/createGroup`)
       const response = await axios.post(`${BACKEND_URL}/group/createGroup` , groupDetails , {headers : {"authorization" : `Bearer ${localStorage.getItem("token")}`}})
       
       return response;
}

const addNewMemberToGroupService = async (groupDetails) => {
       
       const response = await axios.post(`${BACKEND_URL}/group/addNewMember` , groupDetails , {headers : {"authorization" : `Bearer ${localStorage.getItem("token")}`}})

       return response
        

}
export {fetchAllGroupsService , createNewGroupService , addNewMemberToGroupService}