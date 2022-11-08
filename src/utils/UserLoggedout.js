import React from 'react'
import { Outlet, Navigate } from 'react-router-dom'


let auth ={authtoken: localStorage.getItem('userToken')}

function UserLoggedout() {
  return (
   
      auth.authtoken ? <Navigate to={'/'} />  : <Outlet/> 

   
  )
}

export default UserLoggedout
