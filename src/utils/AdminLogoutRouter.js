import React from 'react'
import { Outlet, Navigate} from 'react-router-dom'

const AdminLogoutRouter = () => {
  let auth = {authtoken:localStorage.getItem('adminToken')}
  return (
    auth.authtoken ? <Navigate to={'/admin/dash'} />  : <Outlet/>   
)
}

export default AdminLogoutRouter
