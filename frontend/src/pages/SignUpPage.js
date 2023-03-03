import { Link, useNavigate } from "react-router-dom"
import { useState } from "react"


const SignUpPage = () => {
   const navigate = useNavigate()

   const [err, setErr] = useState({
      emailErr: false,
      passwordErr: false,
      passwordLengthErr: false,
      emailExist: false
   })


   const { emailErr, passwordErr, passwordLengthErr, emailExist} = err


   const [formData, setFormData] = useState({
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      confirmPassword: ""
   })

   const {firstname, lastname, email, password, confirmPassword} = formData

   const handleChange = (e) => {
      setFormData(prevState => ({
        ...prevState, [e.target.name]:e.target.value
     }))
   }

   const handleSubmit = async (e) => {
      e.preventDefault()

      if (!/\S+@\S+\.\S+/.test(email)) {
         setErr(prevState => ({
            ...prevState, emailErr:true
         }))
         return
      } else if (password.length < 6) {
         setErr(prevState => ({
            ...prevState, passwordLengthErr:true
         }))
         return
      } else if (password !== confirmPassword) {
         setErr(prevState => ({
            ...prevState, passwordErr:true, passwordLengthErr:false
         }))
         return
      } else {
         setErr({
            email: false,
            password: false,
            passwordLengthErr: false
         })
      }


      try {
         const url = "http://localhost:8000/signup"
   
         const data = await fetch(url, {
            method: 'POST',
            headers: {
               'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
         })
   
         const res = await data.json()

         //check response status
         if (res.status === 400) {
            setErr(prevState => ({
               ...prevState, emailExist:true
            }))
            return
         }

         //navigate to login page
         navigate("/login")
      } catch (error) { 
         console.log(error)
      }

   }
  return (
     <div className='h-screen flex flex-row'>
          <div className='basis-1/2'>     
            <img className="object-cover h-screen w-full" src={process.env.PUBLIC_URL + "/assets/images/airport.jpg"} alt="guy in an airport" />
          </div>
          <div className='bg-white basis-1/2 flex flex-col justify-center px-24 py-10'>
              <div>
                  <div className='mb-4'>    
                    <h1 className='text-3xl text-black font-bold'>Create an account</h1>
                  </div>
                  <form className='flex flex-col' onSubmit={handleSubmit}>
                      <div className='mb-5'>
                         <label className='block text-lightgrey text-base'>First Name</label>
                    <input name="firstname" value={firstname} onChange={handleChange} className="border-lightgrey border-2 rounded-md w-full p-2.5 placeholder:text-darkgrey" type="text" required/>
                    
                      </div>
                      <div className='mb-5'>
                         <label className='block text-lightgrey text-base'>Last Name</label>
                         <input name="lastname" value={lastname} onChange={handleChange}  className="border-lightgrey border-2 rounded-md w-full p-2.5 placeholder:text-darkgrey" type="text"  required/>
                      </div>
                      <div className='mb-5'>
                        <label className={ emailErr || emailExist ? 'block text-red text-base font-medium' : 'block text-lightgrey text-base' }>Email</label>
                        <input name="email" value={email} onChange={handleChange} className={emailErr || emailExist ? "border-red border-2 rounded-md w-full p-2.5 placeholder:text-red" : "border-lightgrey border-2 rounded-md w-full p-2.5 placeholder:text-darkgrey"} type="email" placeholder='Abc@gmail.com' required />
                        <p className={emailErr ? "text-sm text-red font-medium" : "hidden"}>Please enter a valid email address</p>
                        <p className={emailExist ? "text-sm text-red font-medium" : "hidden"}>Email already exists</p>
                      </div>
                      <div className='mb-5'>
                        <label className={ passwordLengthErr ? 'block text-red text-base font-medium' : 'block text-lightgrey text-base' }>Password</label>
                        <input name="password" value={password} onChange={handleChange} className={passwordLengthErr ? "border-red border-2 rounded-md w-full p-2.5 placeholder:text-red" : "border-lightgrey border-2 rounded-md w-full p-2.5 placeholder:text-darkgrey"} type="password" placeholder='*******' required />
                        <p className={passwordLengthErr ? "text-sm text-red font-medium" : "hidden"}>Passwords must be 6 characters or more</p>
                      </div>
                      <div className='mb-5'>
                          <label className={ passwordErr ? 'block text-red text-base font-medium' : 'block text-lightgrey text-base' }>Confirm Password</label>
                           <input name="confirmPassword" value={confirmPassword} onChange={handleChange} className={passwordErr ? "border-red border-2 rounded-md w-full p-2.5 placeholder:text-red" : "border-lightgrey border-2 rounded-md w-full p-2.5 placeholder:text-darkgrey"} type="password" placeholder='*******' required />
                         <p className={passwordErr ? "text-sm text-red font-medium" : "hidden"}>Passwords do not match</p>
                      </div>
                      <input type="submit" value="Sign Up" className='p-3 mb-3 bg-lightgreen rounded-md text-white font-semibold transition duration-500 ease-in-out hover:bg-darkgreen' />
                    <button className='p-3 mb-3 bg-lightblack rounded-md text-white font-semibold transition duration-500 ease-in-out hover:bg-black ease-in'> <img className='h-6 w-6 inline-flex' src={process.env.PUBLIC_URL + "/assets/images/icons8-google-48.png"} alt="" /> Or sign-Up with google</button>
                  </form>
              <div className="my-8 text-center">      
                 <p >Have an account already? <Link to={"/login"} className='text-lightblue font-medium hover:text-darkblue'>Login</Link></p>
              </div>
              </div>
          </div>
    </div>
  )
}

export default SignUpPage