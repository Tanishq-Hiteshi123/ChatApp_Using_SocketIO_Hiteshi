import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { loginService } from '../Services/userService'
import { UserContext } from '../Context/userContext'

function Login() {
   
    const [userDetails , setUserDetails] = useState({})
    const {setUserInfo} = useContext(UserContext)

     const navigate = useNavigate()


    const handleSendToRegister = () =>{
          console.log("object")
        navigate ("/register")

    }

    const handleChange = (e) =>{
        
         setUserDetails({
             ...userDetails,
             [e.target.name] : e.target.value
         })

    }

    const handleLoginUser = async(e) =>{
        
        try {
            e.preventDefault()
            const {data} = await loginService(userDetails)

            if (data.success) {
               
            //    setUserInfo(data.data)
               console.log(data.data?.isExist)
               setUserInfo(data.data?.isExist)
              localStorage.setItem("token" , data.data?.authToken)
               setUserDetails({})
               navigate("/")
               
                
          
            }
          } catch (error) {
             console.log(error)
          }

    }

  return (
    <div className='h-screen w-full bg-gray-200 flex gap-20 items-center justify-center md:flex-col sm:flex-col'>
      <div className='leftSide flex items-start justify-center flex-col gap-1'>
             <h1 className='text-5xl font-bold text-blue-500'>Chat App</h1>
             <p className='text-lg font-semibold '>Chat with your friends in real time</p>
      </div>
      
      <div className='rightSide h-max bg-white rounded-md w-max p-4'>
        <form className='flex items-center justify-center p-5 pt-8 flex-col gap-5'>
           
             
         
                <input type="email" placeholder='email' className="placeholder:italic p-2 border-2 border-gray-400 w-[20vw] " name = "email" onChange={handleChange}  value={userDetails.email} />
                <input type="password" placeholder='password' className="placeholder:italic p-2 border-2 border-gray-400 w-[20vw] " name = "password" onChange={handleChange} value={userDetails.password} />
              
             
               <button type='submit' onClick={handleLoginUser} className='p-2 bg-blue-700 w-[20vw] text-white'>
                       Login 
               </button>
               <p onClick={handleSendToRegister} className=' text-center cursor-pointer p-2 bg-green-700 w-[20vw] text-white'>
                       Create Account
               </p>

        </form>
      </div>
    </div>
  )
}

export default Login
