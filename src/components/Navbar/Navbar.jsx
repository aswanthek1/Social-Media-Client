import { AppBar, Toolbar, Typography, styled, InputBase, Badge, Avatar, Menu, MenuItem } from '@mui/material';
import InterestsIcon from '@mui/icons-material/Interests';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Box from '@mui/material/Box';
import React from 'react'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useFormik } from 'formik'

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

    const [searchUser, setSearchUser] = useState([])
    const formik = useFormik({
        initialValues: {
            users: ''
        }
    })


    useEffect(() => {
        axios.get('http://localhost:5000/userSearch',{headers:{data:formik.values.users}}).then((e) => {
            console.log("e.data", e)
            try {
                if (e.data) {
                    setSearchUser(e.data)
                }
            } catch (error) {
                console.log("error ",error)
            }
        })
       
    },[searchUser])

    // console.log("usersearch", searchUser)
    const navigate = useNavigate()
    const [open, setOpen] = useState(false)

    return (

        <AppBar position='sticky'>
            < StyledToolBar>
                <Typography variant='h6' sx={{ display: { xs: 'none', sm: 'block' } }}>
                    LAMA
                </Typography>
                <InterestsIcon sx={{ display: { xs: 'block', sm: 'none' } }} />
                <Search>
                    <InputBase placeholder='search' name='users' onChange={formik.handleChange} value={formik.values.users} />
                </Search>
                <Icons>
                    <Badge badgeContent={4} color="error">
                        <MailIcon />
                    </Badge>
                    <Badge badgeContent={4} color="error">
                        <NotificationsIcon />
                    </Badge>
                    <Avatar alt="B" src="/static/images/avatar/1.jpg" sx={{ width: 30, height: 30 }}
                        onClick={e => setOpen(true)}
                    />

                </Icons>
                <UserBox>
                    <Avatar alt="A" src="/static/images/avatar/1.jpg" sx={{ width: 30, height: 30 }}
                        onClick={e => setOpen(true)}
                    />
                    <Typography variant='span'>John</Typography>
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
                <MenuItem>Profile</MenuItem>
                <MenuItem>My account</MenuItem>
                <MenuItem onClick={() => (
                    navigate('/login'),
                    localStorage.removeItem("userToken")
                )}>Logout</MenuItem>
            </Menu>
        </AppBar>

    )
}

export default Navbar
