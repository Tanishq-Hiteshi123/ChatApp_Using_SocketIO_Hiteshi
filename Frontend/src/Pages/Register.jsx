import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { registerService } from '../Services/userService'


function Register() {
  
       
    const [userDetails , setUserDetails] = useState({})
    const [cnfPassword , setCnfPassword] = useState("")
    const [error , setError] = useState("")
    const navigate = useNavigate()
    const handleSendToLogin = () =>{
      navigate ("/login")

  }

  const handleRegister = async(e) =>{
    
   try {
    e.preventDefault()

    if (cnfPassword != userDetails.password) {
     console.log(cnfPassword , userDetails.password)
     setError("CnfPassword & Password must match")
     return;

    }

    

  const {data} = await registerService(userDetails)
   console.log(data)
 
     
     setUserInfo(data.data)
     console.log(data.data)
     navigate("/login")
     
      


  
   } catch (error) {
      setError(error?.response?.data?.message)
   }

     

  }

  const handleChange = (e) =>{
     setUserDetails({...userDetails , [e.target.name] : e.target.value})
     setError("")
  }

  return (
    <div className='h-screen w-full bg-gray-200 flex gap-20 items-center justify-center md:flex-col sm:flex-col'>
      <div className='leftSide flex items-start justify-center flex-col gap-1'>
             <h1 className='text-5xl font-bold text-blue-500'>Chat App</h1>
             <p className='text-lg font-semibold '>Chat with your friends in real time</p>
      </div>
      
      <div className='rightSide h-max bg-white rounded-md w-max p-4'>
        <form className='flex items-center justify-center p-5 pt-8 flex-col gap-5'>
              
                {error && <p className='text-red-500 text-bold'>*{error}</p> }
             
                <input type="text" placeholder='username' className="placeholder:italic p-2 border-2 border-gray-400 w-[20vw] " name = "username" onChange={handleChange} />
                <input type="email" placeholder='email' className="placeholder:italic p-2 border-2 border-gray-400 w-[20vw] " name = "email" onChange={handleChange}  />
                <input type="password" placeholder='password' className="placeholder:italic p-2 border-2 border-gray-400 w-[20vw] " name = "password" onChange={handleChange} />
                <input type="password" placeholder='confirm Password' className="placeholder:italic p-2 border-2 border-gray-400 w-[20vw] " name = "cnfPassword" value={cnfPassword}  onChange={(e) => setCnfPassword(e.target.value)} />
             
               <button type='submit' onClick={handleRegister} className='p-2 bg-blue-700 w-[20vw] text-white'>
                       Create Account
               </button>
               <p onClick={handleSendToLogin} className='cursor-pointer p-2 text-center bg-green-700 w-[20vw] text-white'>
                       Log In Account
               </p>

        </form>
      </div>
    </div>
  )
}

export default Register
