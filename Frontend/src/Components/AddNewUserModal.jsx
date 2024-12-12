import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useContext, useEffect, useState } from "react"
import { CheckboxDemo } from "./CheckBoxComponent"
import { UserContext } from "../Context/userContext"
import { addNewMemberToGroupService, createNewGroupService } from "../Services/groupService"
import { isCheck } from "../lib/utils"

export function AddNewUserModal({group}) {

     const {allUsers , isAddMemberModalOpen , setIsAddMemberModalOpen , allGroups, setAllGroups} = useContext(UserContext)

     const [addNewMemberDetails , setAddNewMemberDetails] = useState({name : group.name , members : []})


     const handleCheckChange = (e , elem) =>{
      
        if (isCheck(addNewMemberDetails , elem)) {
            let oldMembers = addNewMemberDetails.members;
    
           let newMembers = oldMembers.filter ((x) => x != elem.id)
           console.log(newMembers)
    
           setAddNewMemberDetails({...addNewMemberDetails , members : newMembers})
        }
        else {
    
          setAddNewMemberDetails({...addNewMemberDetails , members : [...addNewMemberDetails.members , String(elem.id)]})
        }
      }
    useEffect (() =>{
      
         console.log(group)
      
    } , [])

    const handleAddNewMembers = async () =>{
        
       try {
         const {data} = await addNewMemberToGroupService(addNewMemberDetails)
         
         if (data.success) {
          
              console.log(data)

              setIsAddMemberModalOpen(false)
            }
       }
       catch (error) {
         throw new Error (error)
       }

    }

  return (
    <Dialog open = {isAddMemberModalOpen} onOpenChange={() => setIsAddMemberModalOpen(false)} >

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Members</DialogTitle>
          
        </DialogHeader>
        <div className="grid gap-8 py-4">
         
          <div className="flex items-center justify-start flex-col gap-3 h-max h-max-60  p-2">
            {
                 allUsers?.map((user , index) =>{
                    
                     return ( !group.members.includes(String(user.id)) && <div className=" w-[100%] flex items-center justify-start gap-3">
                         <input type="checkbox" onChange={(e) => handleCheckChange(e , user)} name="" id={user.id} checked = {isCheck(addNewMemberDetails , user)} />
                         <p>{user.username}</p>
                     </div> )

                 })
            }
          </div>
        </div>
        <DialogFooter>
          <Button onClick = {handleAddNewMembers} >Add To Group</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
 
 
