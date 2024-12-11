import { createContext, useState } from "react";

export const UserContext = createContext()


export const UserContextProvider = ({ children }) => {

   const [userInfo, setUserInfo] = useState(null)
   const [allUsers, setAllUsers] = useState(null)
   const [allGroups, setAllGroups] = useState(null)
   const [isGroupModalOpen , setIsGroupModalOpen] = useState(false)
   const [sendTo , setSendTo] = useState("")

   return <UserContext.Provider value={{ userInfo, setUserInfo, allUsers, setAllUsers, allGroups, setAllGroups , sendTo , setSendTo , isGroupModalOpen , setIsGroupModalOpen }}>
      {children}
   </UserContext.Provider>

}

