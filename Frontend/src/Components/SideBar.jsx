import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../Context/userContext'
import { GroupDropDown } from './GroupDropDown'

function SideBar() {
    const [toggleMenu , setToggleMenu] = useState(false)
    const {allUsers, allGroups , sendTo , setSendTo , userInfo} = useContext(UserContext)
    const [searchName , setSearchName] = useState("")
    const [searchData , setSearchData] = useState([])
    
  


    const handleToggleShowMenu = () =>{
        
         setToggleMenu(!toggleMenu)

    }

    const handleChange = (e) =>{
      
      setSearchName(e.target.value)
      let old = [...allUsers , ...allGroups]
     
     setSearchData(old.filter((elem , index) =>{
         return elem?.name?.toLowerCase().includes(e.target.value.toLowerCase()) || elem?.username?.toLowerCase().includes(e.target.value.toLowerCase())
      }))

      if (e.target.value == "") {
         setSearchData([])
      }

    }

    useEffect(() =>{
    } , [allGroups])
    console.log(allGroups , "All Groups")
 
    
  return (
    <div>
      <div className="relative min-h-screen md:flex">

  <div className="bg-gray-800 text-gray-200 flex justify-between md:hidden">
    <a href="#" className="block p-4 text-white font-bold">Chat App</a>

 

    <button className="mobile-menu-button p-4 focus:outline-none focus:bg-gray-700" onClick={handleToggleShowMenu}>
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
      </svg>
    </button>
  </div>

  <div className={`sidebar bg-blue-900 text-blue-100 w-64 p-2 space-y-2 md:relative md:translate-x-0 absolute inset-y-0 left-0 transform transition duration-200 ease-in-out ${toggleMenu ? "-translate-x-full" : ""} `}>
    <a href="#" className="text-white flex items-center space-x-2 p-3">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
      </svg>
      <span className="text-2xl font-extrabold">ChatApp</span>
    </a>

    <div class="relative flex  items-center  w-[100%]">
        <input id="8" type="text" class="peer relative h-10 w-[100%] rounded-md bg-gray-50 pl-4 pr-20 font-thin outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:drop-shadow-lg" placeholder='Search...' onChange={handleChange} value={searchName} />
      
        
      </div>
    
   {
     searchData.length > 0 ?    <div className='text-left flex items-start justify-center flex-col gap-12 '>
        <nav className='overflow-y-scroll h-[40vh] w-full list'>
       
       {
         searchData.map((elem , index) =>{
              
             return  <p onClick={() => setSendTo(elem.id)} className={`block py-2.5 px-4 rounded transition duration-200 w-full hover:text-white cursor-pointer hover:bg-blue-600 ${sendTo == elem.id ? "bg-blue-500" : ""} `}>{elem.name ? elem.name : elem.username}</p>

         })
       }
      
   
       </nav>
     </div> : searchName == "" ? <div className='text-left flex items-start justify-center flex-col gap-12 '>
      <p className="block py-2.5 px-4 rounded transition duration-200 w-full hover:text-white text-xl ">Private</p>
         <nav className='overflow-y-scroll h-[40vh] w-full list'>
          {
             allUsers?.map ((user , index) =>{
        
                return <p onClick={() => setSendTo(user.id)} className={`block py-2.5 px-4 rounded transition duration-200 w-full hover:text-white cursor-pointer hover:bg-blue-600 ${sendTo == user.id ? "bg-blue-500" : ""} `}>{user.username}</p>
             })
          }       
    
        </nav>
        <hr className='text-white h-[10px] w-full'/>
        <p className="block py-2.5 px-4 rounded transition duration-200 w-full hover:text-white text-xl ">Group</p>
        <nav className='overflow-y-scroll h-[40vh] w-full list'>
        {
             allGroups?.map ((group , index) =>{
                    
               console.log(group.members , userInfo.id , "Thisis")
                if (group.members.includes(String(userInfo.id))) {
                  return <div className=''>
                    <p className=" flex items-center justify-between gap-4 py-2.5 px-4 rounded transition duration-200 w-full hover:text-white cursor-pointer hover:bg-blue-600">{group.name} {userInfo.id == group.createdBy ? <GroupDropDown group = {group}/> : ""} </p>
                    
                  </div>
                }
             })
          }  
   
      </nav> 
      </div> : <h1>No Result Found</h1>   
   }
    
  </div>

  
</div>

    </div>
  )
}

export default SideBar
