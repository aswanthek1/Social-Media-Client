import { Box, Stack } from '@mui/material'
import React from 'react'
import Navbar from '../Navbar/Navbar'
import Rightbar from '../Rightbar/Rightbar'
import Sidebar from '../Sidebar/Sidebar'
import ExploreFeed from './ExploreFeed'

const Explore = () => {
  return (
    <div>
    <Box bgcolor={"background.default"}>
        <Navbar />
        <Stack direction="row" spacing={2} justifyContent="space-between">
          <Sidebar />
          <ExploreFeed  />
          <Rightbar /> 
        </Stack>
      </Box>
    </div>
  )
}

export default Explore