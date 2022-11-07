import { List, Box, ListItem, ListItemButton, ListItemIcon, ListItemText,Switch } from '@mui/material'
import HomeIcon from '@mui/icons-material/Home';
import ModeNightIcon from '@mui/icons-material/ModeNight';
import React from 'react'

function Sidebar() {
  return (

    <Box flex={1} p={1} sx={{ display: { xs: 'none', md: 'block' } }} >
      <Box position='fixed'>

      <List>
        <ListItem disablePadding>
          <ListItemButton component='a' href='#'>
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary="Homepage" />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton component='a' href='#'>
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary="Homepage" />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton component='a' href='#'>
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary="Homepage" />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton component='a' href='#'>
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary="Homepage" />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton component='a' href='#'>
            <ListItemIcon>
              <ModeNightIcon />
            </ListItemIcon>
            <Switch />
          </ListItemButton>
        </ListItem>
      </List>
      </Box>
    </Box>

  )
}

export default Sidebar
