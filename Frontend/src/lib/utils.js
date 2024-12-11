import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}


export function isCheck (groupDetails , elem) {
     console.log(groupDetails)
     for (let i = 0; i < groupDetails["members"].length; i++) {
      
         if (groupDetails["members"][i] == elem.id) {
           return true;
         }
      
     }

     return false

}

export function convertTheTimeStamp () {
  const inputTimestamp = "2024-12-11 18:09:00.347+05:30";

 
  const date = new Date(inputTimestamp);
  

  const options = {
    timeZone: "Asia/Kolkata",
    year: "numeric",
    month: "long", 
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  };
  
  const formattedTime = new Intl.DateTimeFormat("en-IN", options).format(date);
  
  console.log(formattedTime)
  return formattedTime
}