import React, { useContext, useEffect, useState } from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { UserContext } from '../Context/userContext'

function PrivateRouter() {
    const [isLoggedIn , setIsloggedIn] = useState(localStorage.getItem("token") ? true : false)
   const {userInfo} = useContext(UserContext)
    
   
    const location = useLocation()

    console.log(location.pathname , isLoggedIn)
    

    if ( !userInfo?.id  &&  !isLoggedIn) {
         return <Navigate to={"/login"} />
    }
    

    console.log(isLoggedIn)

//     if (isLoggedIn && location.pathname == "/login") {
//         console.log("object")
//          return <Navigate to={"/"} />
//     }

  return <Outlet />
}

export default PrivateRouter
