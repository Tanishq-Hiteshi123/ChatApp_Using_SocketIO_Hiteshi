
 
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useContext, useState } from "react"
import { UserContext } from "../Context/userContext"
import { AddNewUserModal } from "./AddNewUserModal"
 

    
export function GroupDropDown({group}) {

    const {isAddMemberModalOpen , setIsAddMemberModalOpen} = useContext(UserContext)
    const handleAddMember = () =>{
        setIsAddMemberModalOpen(true)
    }
 
  return (
    <div>

    
    <DropdownMenu>
      <DropdownMenuTrigger className = "outline-none border-none">
        <p className="text-3xl mb-4" >...</p>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        
        <DropdownMenuSeparator />
        <DropdownMenuCheckboxItem
         onClick = {handleAddMember}
        >
          Add Member
        </DropdownMenuCheckboxItem>

        <DropdownMenuCheckboxItem
          
          className = "text-red-600 hover:text-red-800"
        >
          Delete Group
        </DropdownMenuCheckboxItem>
      </DropdownMenuContent>
    </DropdownMenu>
       {
         isAddMemberModalOpen && <AddNewUserModal group = {group} />
       }
    </div>
  )
}