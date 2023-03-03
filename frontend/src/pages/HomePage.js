import React, { useEffect, useState} from 'react'
import { Navigate } from 'react-router-dom'

const HomePage = () => {

  const [user, setUser] = useState("")

  //get user data from localstorage
  const userData = localStorage.getItem("user")

  //get token from  ls
  let token = JSON.parse(userData)
  
  useEffect(() => {
    const fetchUser = async () => {
      const url = "http://localhost:8000/home"
  
      const headers = {
        'Authorization': `Bearer ${token}`
      }
  
      const data = await fetch(url, { headers })
      
      const res = await data.json()
      
      //set name to user state
      setUser(res.name)
      
    }

    fetchUser()    
  })

  

  //if  use data doesn't exist
  if (!userData) {
    //navigate user ro loginpage
    return <Navigate to="/login" />
  }

 
  return (
    <div>Hello {user}, welcome to the HomePage</div>
  )
}

export default HomePage