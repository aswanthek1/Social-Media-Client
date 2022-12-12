import React,{ useEffect, useState} from 'react'
import { Outlet, Navigate} from 'react-router-dom'
import axios from 'axios'



function UserRouter() {
  let auth = {authtoken:localStorage.getItem('userToken')}
  // const [loginAuthState, setLoginAuthState ] = useState(false)

  // useEffect(()=>{
  //   // ${process.env.REACT_APP_BACKEND_URL}
  // axios.get('http://localhost:5000/userLoginAuth', {headers:{token:auth.authtoken}}).then((e)=> {
  //   console.log('login auth is here ', e)
  // })
  // },[])

  return (
     auth.authtoken ? <Outlet/> : <Navigate to='/login' />
  )
}

export default UserRouter
