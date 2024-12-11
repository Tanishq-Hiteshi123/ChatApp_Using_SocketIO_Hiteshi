import React, { useContext, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom';
import { UserContext } from '../Context/userContext';
import { HiUserGroup } from "react-icons/hi2";
function Navbar() {
    const navigate = useNavigate()
    const [toggleMenu, setToggleMenu] = useState(false);
    const {userInfo , setUserInfo , isGroupModalOpen , setIsGroupModalOpen} = useContext(UserContext)
    const handleToggle = () =>{
      setToggleMenu(!toggleMenu)
    }

    const handleLogout = () =>{
        
         console.log("Handling logout")
         console.log(userInfo , localStorage.getItem("token"))

        //  Clear The localStorage and userInfo from Context :-
        localStorage.removeItem("token")
        setUserInfo(null)
        navigate("/login")
        
        

    }

    console.log(isGroupModalOpen)

    
  return (
    <div>
      



    <header>
      <div className="px-4 py-2 text-white flex  justify-between bg-blue-900">
        <h1 className=''>Chat App</h1>
        <div className={toggleMenu ? "md:flex  md:pt-0 pt-10 w-full md:w-auto" : "hidden md:flex"} id="menu">
        <ul>
          <NavLink to={"/"} className="md:inline-block cursor-pointer hover:text-gray-500 border-b md:border-none py-2 px-3">Chat</NavLink>
          <li onClick={() => setIsGroupModalOpen(true)} className="md:inline-block cursor-pointer hover:text-gray-500 border-b md:border-none  pt-6 px-3 "> <HiUserGroup size={"1.4rem"} /> </li>
          <p onClick={handleLogout} className="md:inline-block cursor-pointer hover:text-gray-500 border-b md:border-none py-2 px-3">Logout</p>
        </ul>
        </div>
        <div className= "cursor-pointer md:hidden">
          <input class="menu-btn hidden" type="checkbox" id="menu-btn"/>
          <label class="menu-icon block cursor-pointer md:hidden px-2 py-4 relative select-none" for="menu-btn">
            <span onClick={handleToggle} class="navicon bg-white-darkest flex items-center relative"></span>
          </label>
      </div>
      </div>
    </header>





    </div>
  )
}

export default Navbar
