import React,{ useEffect, useState} from 'react'
import { Outlet, Navigate} from 'react-router-dom'
import axios from 'axios'



function UserRouter() {
  let auth = {authtoken:localStorage.getItem('userToken')}
  // const [loginAuthState, setLoginAuthState ] = useState(false)

  // useEffect(()=>{
  // axios.get('http://localhost:5000/userLoginAuth', {headers:{token:auth}}).then((e)=> {
  //   console.log('login auth is here ', e)
  // })
  // },[])

  return (
     auth.authtoken ? <Outlet/> : <Navigate to='/login' />
  )
}

export default UserRouter
