import React, { useContext, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom';
import { UserContext } from '../Context/userContext';
import { HiUserGroup } from "react-icons/hi2";
import { GroupModel } from './GroupModel';
function Navbar() {
    const navigate = useNavigate()

    const {userInfo , setUserInfo , isGroupModalOpen , setIsGroupModalOpen} = useContext(UserContext)
  

    const handleLogout = () =>{
        
        

        //  Clear The localStorage and userInfo from Context :-
        localStorage.removeItem("token")
        localStorage.removeItem("authUser")
        setUserInfo(null)
        navigate("/login")
        
        

    }

    console.log(isGroupModalOpen)

    
  return (
    <div>
      



    <header>
      <div className="px-4 py-2 text-white flex  justify-between bg-blue-900">
        <h1 className=''>Chat App</h1>
        <div className={ "md:flex  md:pt-0 pt-10 w-full md:w-auto"} id="menu">
        <ul className='flex items-center justify-center gap-4'>
          <NavLink to={"/"} className="md:inline-block cursor-pointer hover:text-gray-500 border-b md:border-none py-2 px-3">Chat</NavLink>
          <li onClick={() => setIsGroupModalOpen(true)} className="md:inline-block cursor-pointer hover:text-gray-500 border-b md:border-none   px-3 "> <HiUserGroup size={"1.4rem"} /> </li>
          <p onClick={handleLogout} className="md:inline-block cursor-pointer hover:text-gray-500 border-b md:border-none py-2 px-3">Logout</p>
          <NavLink to={"/profile"} className="md:inline-block cursor-pointer rounded-full bg-white text-blue-600 hover:text-gray-500 border-b md:border-none py-2 px-4">{userInfo.username[0].toUpperCase()}</NavLink>
        </ul>
        </div>
        <div className= "cursor-pointer md:hidden">
          <input class="menu-btn hidden" type="checkbox" id="menu-btn"/>
          <label class="menu-icon block cursor-pointer md:hidden px-2 py-4 relative select-none" for="menu-btn">
            <span class="navicon bg-white-darkest flex items-center relative"></span>
          </label>
      </div>
      </div>
    </header>

      {
         isGroupModalOpen && <GroupModel />
      }



    </div>
  )
}

export default Navbar
