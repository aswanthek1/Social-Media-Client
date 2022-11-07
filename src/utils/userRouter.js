import React from 'react'
import { Outlet, Navigate} from 'react-router-dom'

function userRouter() {
    let userToken = localStorage.getItem('userToken')
  return (
     userToken ? <Outlet/> : <Navigate to='/login' />
  )
}

export default userRouter
