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
import { useContext, useState } from "react"
import { CheckboxDemo } from "./CheckBoxComponent"
import { UserContext } from "../Context/userContext"
import { createNewGroupService } from "../Services/groupService"

export function GroupModel() {


    const [groupDetails , setGroupDetails] = useState({name : "" , members : []})
    const {allUsers , userInfo , setUserInfo , isGroupModalOpen , setIsGroupModalOpen} = useContext(UserContext)
     
    console.log(groupDetails)
    
   
    console.log(allUsers)

    const handleCreateGroup = async() =>{
        
         try {
          const {data} = await createNewGroupService(groupDetails)

          if (data.success) {
            setIsGroupModalOpen(false)
          }
         }
         catch(error) {

            throw new Error (error)

         }

    }
  return (
    <Dialog open = {isGroupModalOpen} onOpenChange={() => setIsGroupModalOpen(false)} >

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create New Group</DialogTitle>
          
        </DialogHeader>
        <div className="grid gap-8 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              id="name"
              placeholder = "Example"
              className="col-span-3"
              value = {groupDetails.name}
              onChange = {(e) => setGroupDetails({...groupDetails , name : e.target.value})}
            />
          </div>
          <div className="flex items-center justify-start flex-col gap-3 h-max h-max-60  p-2">
             {
                 allUsers?.map((elem , index) =>{
                     return   <CheckboxDemo elem = {elem} setGroupDetails = {setGroupDetails}   groupDetails = {groupDetails} />
                    
                  
                 })
             }
          </div>
        </div>
        <DialogFooter>
          <Button onClick = {handleCreateGroup}>Create Group</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
 
