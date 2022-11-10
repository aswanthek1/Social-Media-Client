import React,{useEffect, useState } from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import axios from 'axios'





function UserLoggedout() {
  let auth ={authtoken: localStorage.getItem('userToken')}
  // const [logoutAuthState, setLogoutAuthState ] = useState(false)
  // useEffect(() => {
  //   axios.get('http://localhost:5000/userLogoutAuth',{headers:{token:auth}}).then((e) => {
  //     console.log("auth is here", e)
  //   })
  // })
  return (
   
      auth.authtoken ? <Navigate to={'/'} />  : <Outlet/> 

   
  )
}

export default UserLoggedout
