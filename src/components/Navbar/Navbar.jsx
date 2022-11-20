import { AppBar, Toolbar, Typography, styled, InputBase, Badge, Avatar, Menu, MenuItem, Grid, IconButton } from '@mui/material';
import InterestsIcon from '@mui/icons-material/Interests';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Box from '@mui/material/Box';
import React from 'react'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useFormik } from 'formik'
import { useSelector, useDispatch } from 'react-redux'
import { update } from '../../Redux/UserSlice'
import { refreshReducer } from '../../Redux/RefreshSlice';
import HomeIcon from '@mui/icons-material/Home';
import ModeNightIcon from '@mui/icons-material/ModeNight';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import RequestPageIcon from '@mui/icons-material/RequestPage';
import PeopleRoundedIcon from '@mui/icons-material/PeopleRounded';
import { Settings } from '@mui/icons-material';
import { List, ListItem, ListItemButton, ListItemIcon, ListItemText, Switch, Paper, Button, Drawer, Divider } from '@mui/material'




const StyledToolBar = styled(Toolbar)({
    display: 'flex',
    justifyContent: 'space-between'
})

const Search = styled('div')(({ theme }) => ({
    backgroundColor: 'white',
    padding: '0 10px',
    borderRadius: theme.shape.borderRadius,
    width: '40%'
}))

const Icons = styled(Box)(({ theme }) => ({
    display: 'none',
    gap: '20px',
    alignItems: 'center',
    [theme.breakpoints.up('sm')]: {
        display: 'flex'
    }
}))

const UserBox = styled(Box)(({ theme }) => ({
    display: 'none',
    gap: '20px',
    alignItems: 'center',
    [theme.breakpoints.down('sm')]: {
        display: 'flex'
    }
}))



function Navbar() {



    const dispatch = useDispatch()
    const [showSearch, setShowSearch] = useState(false)
    const [searchUser, setSearchUser] = useState([])
    const refresh = useSelector(state => state.refresh.refresh)
    const formik = useFormik({
        initialValues: {
            users: null
        }
    })
    const [state, setState] = React.useState({
        left: false,
    });

    const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setState({ ...state, [anchor]: open });
    };

    const list = (anchor) => (
        <Box
            sx={{ width: 180, height: "100vh" }}
            role="presentation"
            onClick={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, false)}
            bgcolor='#F8FFDB'
        >
            <div style={{ backgroundColor: "#FF6464", marginBottom: 1, display: 'flex', justifyContent: 'center', height: '40px', padding: '10px' }}>
                <h2 style={{ fontWeight: 500,color:'white' }}><InterestsIcon sx={{color:'white'}}/> <b> Amigele</b></h2>
            </div>
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
        </Box>
    );




    useEffect(() => {
        console.log(formik.values.users)
        axios.get(`http://localhost:5000/userSearch/${formik.values.users}`).then((e) => {
            setSearchUser(e.data)
            console.log('uesr serarched result', e.data)

        })

    }, [formik.values.users])


    const userToken = localStorage.getItem('userToken')
    useEffect(() => {
        const userToken = localStorage.getItem('userToken')
        axios.get('http://localhost:5000', { headers: { token: userToken } }).then((response) => {
            console.log("userdetails at profile", response)
            if (response.data.message === 'userNotFound') {
                return null
            } else {
                dispatch(update(response.data))
                dispatch(refreshReducer())
            }
        })

    }, [])


    const navigate = useNavigate()
    const [open, setOpen] = useState(false)
    const user = useSelector(state => state.user)
    console.log('userafter profileand cover', user)
    return (
        <>
            <AppBar position='sticky' sx={{ backgroundColor: "#FF6464" }}>
                < StyledToolBar>

                    <Typography variant='h6' sx={{ display: { xs: 'none', md: 'block' } }}>
                        Amigele
                    </Typography>
                    <div onClick={toggleDrawer("left", true)}>
                        <InterestsIcon sx={{ display: { xs: 'block', md: 'none' } }} />
                    </div>
                    <Search>
                        <InputBase
                            placeholder='search'
                            name='users'
                            onChange={formik.handleChange}
                            value={formik.values.users}
                            onClick={() => setShowSearch(true)}
                        />
                    </Search>

                    <Icons>
                        <IconButton
                            onClick={() => navigate('/chat')}
                        >
                            <Badge badgeContent={4} color="error">
                                <MailIcon sx={{ color: 'white' }} />
                            </Badge>
                        </IconButton>
                        <Badge badgeContent={4} color="error">
                            <NotificationsIcon />
                        </Badge>
                        <Avatar alt={user.firstname} src={user.profileimage} sx={{ width: 30, height: 30 }}
                            onClick={e => setOpen(true)}
                        />

                    </Icons>
                    <UserBox>
                        <Avatar alt={user.firstname} src="/static/images/avatar/1.jpg" sx={{ width: 30, height: 30 }}
                            onClick={e => setOpen(true)}
                        />

                    </UserBox>
                </StyledToolBar>
                <Menu
                    id="demo-positioned-menu"
                    aria-labelledby="demo-positioned-button"
                    open={open}
                    onClose={e => setOpen(false)}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                >
                    <MenuItem sx={{ marginBottom: '10px' }}> <Avatar alt={user.firstname} src='/static/images/avatar/1.jpg' sx={{ width: 30, height: 30, marginRight: '10px' }} /> <b> {user.firstname}</b></MenuItem>
                    <MenuItem onClick={() => { navigate('/profile') }}>Profile</MenuItem>
                    <MenuItem sx={{ display: { xs: 'block', sm: 'none' } }} onClick={() => navigate('/chat')} >Messages</MenuItem>
                    <MenuItem sx={{ display: { xs: 'block', sm: 'none' } }}>Notifications</MenuItem>
                    <MenuItem>My account</MenuItem>
                    <MenuItem onClick={() => (
                        navigate('/login'),
                        localStorage.removeItem("userToken")
                    )}>Logout</MenuItem>
                </Menu>
                {formik.values.users !== '' ? <Box

                    component={Grid}
                    display={formik.values.users !== null ? 'block' : 'none'}
                    height={200}
                    width='40%'
                    bgcolor="aqua"
                    position='absolute'
                    top='80%'
                    left='28%'
                    borderRadius={5}
                >
                    {searchUser.map((value) => {
                        return (
                            <Box component={Grid} item direction='row' display='flex' marginTop='5%' marginLeft='2%' >
                                <Avatar src={value.profileimage} />
                                <Typography color='red' variant='h6' marginLeft='3%'  >{value.firstname}</Typography>
                            </Box>
                        )
                    }
                    )}
                </Box> : null}
            </AppBar>

            <div>
                {['left'].map((anchor) => (
                    <React.Fragment key={anchor}>

                        <Drawer
                            anchor={anchor}
                            open={state[anchor]}
                            onClose={toggleDrawer(anchor, false)}
                        >
                            {list(anchor)}
                        </Drawer>
                    </React.Fragment>
                ))}
            </div>
        </>
    )
}

export default Navbar
