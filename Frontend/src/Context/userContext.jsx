import { createContext, useState } from "react";

export const UserContext = createContext()


export const UserContextProvider = ({ children }) => {

   const [userInfo, setUserInfo] = useState(localStorage.getItem("authUser") ? JSON.parse(localStorage.getItem("authUser"))  : null)
   const [allUsers, setAllUsers] = useState([])
   const [allGroups, setAllGroups] = useState([])
   const [isGroupModalOpen , setIsGroupModalOpen] = useState(false)
   const [isAddMemberModalOpen , setIsAddMemberModalOpen] = useState(false)
   const [sendTo , setSendTo] = useState("")

   return <UserContext.Provider value={{ userInfo, setUserInfo, allUsers, setAllUsers, allGroups, setAllGroups , sendTo , setSendTo , isGroupModalOpen , setIsGroupModalOpen , isAddMemberModalOpen , setIsAddMemberModalOpen }}>
      {children}
   </UserContext.Provider>

}

