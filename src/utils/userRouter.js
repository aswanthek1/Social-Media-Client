import React from 'react'
import { Outlet, Navigate} from 'react-router-dom'

function UserRouter() {
    let auth = {authtoken:localStorage.getItem('userToken')}
  return (
     auth.authtoken ? <Outlet/> : <Navigate to='/login' />
  )
}

export default UserRouter
