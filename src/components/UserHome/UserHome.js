import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Feed from '../Feed/Feed'
import Rightbar from '../Rightbar/Rightbar'
import Sidebar from '../Sidebar/Sidebar'
import Navbar from '../Navbar/Navbar'
import { Stack, Box, createTheme, ThemeProvider, CircularProgress } from '@mui/material'
import Add from '../Add/Add'
import { light } from '@mui/material/styles/createPalette'
import { useDispatch, useSelector } from 'react-redux'
import { update } from '../../Redux/UserSlice'
import { postUpdate } from '../../Redux/PostSlice'



function UserHome() {
  const dispatch = useDispatch()

  const user = useSelector(state => state.user)

  const [userDetails , setUserDetails ] = useState({})
  const [postDetails, setPostDetails ] = useState([])

  // const [mode, setMode] = useState("light")
  // const darkTheme = createTheme({
  //   palette:{
  //     mode:mode
  //   }
  // })

  useEffect(() => {
    const userToken = localStorage.getItem('userToken')
    axios.get('http://localhost:5000',{headers:{token:userToken}}).then((e)=>{
      console.log("userdetails",e)
      if(e.data.message === 'userNotFound'){
        return null
      }else{
        setUserDetails(e.data)
        dispatch(update(e.data))
      }
    })
      
    axios.get('http://localhost:5000/getPost',{headers:{token:userToken}}).then((e)=>{
      console.log('postDetails ',e)
        // setPostDetails(e.data)
        dispatch(postUpdate(e.data))

    })

  },[])


    return (
      // <ThemeProvider theme={darkTheme} color={'text.primary'}>
      <Box bgcolor={'background.default'}>
        <Navbar />
        <Stack direction='row' spacing={2} justifyContent='space-between'>
          <Sidebar />
          <Feed />
          <Rightbar />
        </Stack>
        <Add />
      </Box>
      // </ThemeProvider>
    )
  }


export default UserHome
