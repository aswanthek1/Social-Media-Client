import axios from 'axios';
import React, { useEffect } from 'react'
import { Outlet, Navigate, useNavigate} from 'react-router-dom'

const AdminLogginRouter = () => {
  const navigate = useNavigate();
  let auth = {authtoken:localStorage.getItem('adminToken')}

  useEffect(() => {
    try {
      axios
        .get(`${process.env.REACT_APP_BACKEND_URL}/loginAuth`, {
          headers: { token: auth.authtoken },
        })
        .then((response) => {
          if (response.data.status) {
          }
        })
        .catch((error) => {
          console.log("error", error);
          localStorage.clear();
        });
    } catch (error) {
      console.log("error at auth", error);
    }
  }, [navigate]);
  return (
    auth.authtoken ? <Outlet/> : <Navigate to='/admin/login' />
  )
}

export default AdminLogginRouter
