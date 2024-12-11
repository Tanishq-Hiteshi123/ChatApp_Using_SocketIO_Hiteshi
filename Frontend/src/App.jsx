import { lazy, Suspense, useEffect, useState } from "react"
import { BrowserRouter as Router , Routes , Route } from "react-router-dom"
import PrivateRouter from "./Components/PrivateRouter"

function App() {



  

  const DashboardComponent = lazy(() => import("./Pages/DashBoard"))
  const LoginComponent = lazy(() => import("./Pages/Login"))
  const RegisterComponent = lazy(() => import("./Pages/Register"))
  const ProfileComponent = lazy(() => import ("./Pages/Profile"))




    
  
//  console.log(socket , "Init connection")


  
  return (
   <>
   
     <Router>

     <Suspense fallback = {<>Loading...</>}>

      <Routes>

        <Route element = {<PrivateRouter/>}>
        <Route path="/" element = {<DashboardComponent/>} />
        <Route path="/profile" element = {<ProfileComponent />} />
        </Route>
        <Route path="/login" element = {<LoginComponent/>} />
        <Route path="/register" element = {<RegisterComponent/>} />
      </Routes>
     </Suspense>

     </Router>
   </>
  )
}

export default App
