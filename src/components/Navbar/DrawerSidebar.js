import HomeIcon from '@mui/icons-material/Home';
import ModeNightIcon from '@mui/icons-material/ModeNight';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import RequestPageIcon from '@mui/icons-material/RequestPage';
import PeopleRoundedIcon from '@mui/icons-material/PeopleRounded';
import { Settings } from '@mui/icons-material';
import { List, ListItem, ListItemButton, ListItemIcon, ListItemText, Switch, Paper, Button, Drawer, Divider, Typography } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom';

const DrawerSidebar = () => {
    const navigate = useNavigate()
  return (
    <>
       <List>
                <ListItem disablePadding>
                    <ListItemButton component='a' onClick={() => { navigate('/') }} >
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
                    <ListItemButton component='a' onClick={() => navigate('/people')}>
                        <ListItemIcon>
                            <PeopleRoundedIcon />
                        </ListItemIcon>
                        <ListItemText
                            disableTypography
                            primary={<Typography style={{ fontWeight: 500 }}> <b>People</b> </Typography>}
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

                <ListItem disablePadding>
                    <ListItemButton component='a' href='#'>
                        <ListItemIcon>
                            <Settings />
                        </ListItemIcon>
                        <ListItemText
                            primary={<Typography style={{ fontWeight: 500 }}> <b>Settings</b> </Typography>}
                        />
                    </ListItemButton>
                </ListItem>
            </List>
    </>
  )
}

export default DrawerSidebar
