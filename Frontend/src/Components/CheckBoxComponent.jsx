import { Checkbox } from "@/components/ui/checkbox"
import { isCheck } from "../lib/utils"


export function CheckboxDemo({elem , groupDetails , setGroupDetails}) {

  const handleCheckChange = (e) =>{
      
    if (isCheck(groupDetails , elem)) {
        let oldMembers = groupDetails.members;

       let newMembers = oldMembers.filter ((x) => x != elem.id)
       console.log(newMembers)

       setGroupDetails({...groupDetails , members : newMembers})
    }
    else {

      setGroupDetails({...groupDetails , members : [...groupDetails.members , elem.id]})
    }
  }
  console.log(groupDetails)
    return (
      <div className="flex items-center space-x-2 w-[10vw]">
        <input type="checkbox" checked = {isCheck(groupDetails , elem)} onChange={handleCheckChange}/>
        <label
          htmlFor={elem.id}
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          
        >
          {elem.username}
        </label>
      </div>
    )
}