import React, { useState} from 'react'
import { Link } from 'react-router-dom'



const ForgotPassword = () => {
    const [message, setMessage] = useState("")

    const [email, setemail] = useState("")


    const handleSubmit = (e) => {
        e.preventDefault()

        console.log(email)

        setMessage("Folllow the link sent to your email address to reset your password")

        setemail("")
      
    }

      
  return (
      <div className='h-screen w-screen flex flex-col justify-center items-center'>
          <div className='w-2/5 text-center'>
              <div className='mb-4'>    
              <h2 className='font-bold text-black mb-3 text-3xl'>Forgot Password?</h2>  
                <p className='text-black'>Dont worry. Enter email address associated with this account.</p>  
              </div>
            <form className='flex flex-col' onSubmit={handleSubmit}>
                <div className='mb-5'>
                    <label className='block text-lightgrey text-base text-start'>Email</label>
                      <input name="email" value={email} onChange={(e) => setemail(e.target.value)} className="border-lightgrey border-2 rounded-md w-full p-4 placeholder:text-darkgrey" type="email" placeholder='Enter your email' required />
                      <p className={message ? "text-sm text-darkgreen font-medium" : "hidden"}>{message }</p>
                </div>
              <button className='p-3 bg-lightgreen rounded-md text-white font-semibold transition duration-500 ease-in-out hover:bg-darkgreen'>Submit</button>
            </form>
              
            <p className='text-black my-8'>Go back to <Link className='text-lightblue' to={"/login"}>Login page</Link></p>
          </div>
        </div>

  )
}

export default ForgotPassword