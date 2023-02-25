import React from 'react'


const LoginPage = () => {
  return (
      <div className='h-screen flex flex-row'>
          <div className='basis-1/2'>     
            <img className="object-cover h-screen w-full" src={process.env.PUBLIC_URL + "/assets/images/airport.jpg"} alt="guy in an airport" />
          </div>
          <div className='bg-white basis-1/2 flex flex-col justify-center items-center'>
              <div>
                  <div className='mb-4'>    
                    <h4 className='text-base text-darkgrey font-bold'>Welcome back</h4>
                    <h1 className='text-3xl text-black font-bold'>Login to your account</h1>
                  </div>
                  <form className='flex flex-col'>
                      <div className='mb-5'>
                          <label className='block text-lightgrey text-base'>Password</label>
                         <input className="border-lightgrey border-2 rounded-md w-full p-2.5 placeholder:text-darkgrey" type="text" placeholder='Abc@gmail.com' />
                      </div>
                      <div className='mb-5'>
                         <label className='block text-lightgrey text-base'>Email</label>
                         <input className="border-lightgrey border-2 rounded-md w-full p-2.5 placeholder:text-darkgrey" type="password" placeholder='*******' />
                      </div>
                      <div className='flex justify-between mb-6'>    
                        <div>  
                            <input className='mr-1.5' type="checkbox" />
                            <label className='text-darkgrey'>Remember me</label>
                        </div>
                        <a className="text-lightblue  font-medium hover:text-darkblue" href="#">Forgot password?</a>
                      </div>
                      <input type="submit" value="Login now" className='p-3 mb-3 bg-lightgreen  rounded-md text-white transition duration-500 ease-in-out hover:bg-darkgreen' />
                    <button className='p-3 mb-3 bg-lightblack rounded-md text-white transition duration-500 ease-in-out hover:bg-black ease-in'> <img className='h-6 w-6 inline-flex' src={process.env.PUBLIC_URL + "/assets/images/icons8-google-48.png"} alt="" /> Or sign-in with google</button>
                  </form>
              <div className="mt-32">      
                 <p >Don't have an account? <a href='#' className='text-lightblue font-medium hover:text-darkblue'>Sign up today</a></p>
              </div>
              </div>
          </div>
    </div>
  )
}

export default LoginPage