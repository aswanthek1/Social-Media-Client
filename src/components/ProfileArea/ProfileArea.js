import { Box, Grid } from '@mui/material'
import React from 'react'

const ProfileArea = () => {
  return (
    <div>
    <Box flex={10} >
      <Box 
        xs={12} p={1} md={6}
         marginInline='auto'
        align='center'
        bgcolor='aqua'
        height='400px'
        // width='50%'
      >
        <h1>User Profile</h1>
      </Box>
    </Box>
    </div>
  )
}

export default ProfileArea
