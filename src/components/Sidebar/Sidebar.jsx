import { List, Box, ListItem, ListItemButton, ListItemIcon, ListItemText, Switch, Typography, Paper } from '@mui/material'
import HomeIcon from '@mui/icons-material/Home';
import ModeNightIcon from '@mui/icons-material/ModeNight';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import RequestPageIcon from '@mui/icons-material/RequestPage';
import React from 'react'
// import './SidebarStyles.js'
import useStyles from './SidebarStyle.js';

function Sidebar() {

  const classes = useStyles()
  return (

    <Box flex={2} p={1} mt="2%"  sx={{ display: { xs: 'none', md: 'block' } }} >
      <Box  position='fixed' sx={{width:'22%', height:'80%'}} bgcolor='#F8FFDB'>

        <List>
          <ListItem disablePadding>
            <ListItemButton component='a' href='#'>
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText
                disableTypography
                primary={<Typography style={{ fontWeight: 500 }}> <b>Home</b> </Typography>}
              />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton component='a' href='#'>
              <ListItemIcon>
                <NotificationsActiveIcon />
              </ListItemIcon>
              <ListItemText
                disableTypography
                primary={<Typography style={{ fontWeight: 500 }}> <b>Notifications</b> </Typography>}
              />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton component='a' href='#'>
              <ListItemIcon>
                <RequestPageIcon />
              </ListItemIcon>
              <ListItemText
                disableTypography
                primary={<Typography style={{ fontWeight: 500 }}> <b>Requests</b> </Typography>}
              />
            </ListItemButton>
          </ListItem>

          {/* <ListItem disablePadding>
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
        </ListItem> */}
        </List>
      </Box>
    </Box>

  )
}

export default Sidebar
