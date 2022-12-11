import React from 'react'
import { Outlet, Navigate} from 'react-router-dom'

const AdminLogginRouter = () => {
  let auth = {authtoken:localStorage.getItem('adminToken')}
  return (
    auth.authtoken ? <Outlet/> : <Navigate to='/admin/login' />

  )
}

export default AdminLogginRouter
