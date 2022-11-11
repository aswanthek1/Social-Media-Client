import { AppBar, Toolbar, Typography, styled, InputBase, Badge, Avatar, Menu, MenuItem, Grid } from '@mui/material';
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
// import { update } from '../../Redux/UserSlice'

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
    const formik = useFormik({
        initialValues: {
            users: ''
        }
    })


    useEffect(() => {
        console.log(formik.values.users)
        axios.get(`http://localhost:5000/userSearch/${formik.values.users}`).then((e) => {
            console.log("e.data", e)
            setSearchUser(e.data)

        })

    }, [formik.values.users])


    // console.log("usersearch", searchUser)
    const navigate = useNavigate()
    const [open, setOpen] = useState(false)
    const user = useSelector(state => state.user)

   

    return (
        <>

            <AppBar position='sticky'>
                < StyledToolBar>
                    <Typography variant='h6' sx={{ display: { xs: 'none', sm: 'block' } }}>
                       btvn
                    </Typography>
                    <InterestsIcon sx={{ display: { xs: 'block', sm: 'none' } }} />
                    <Search>
                        <InputBase
                            placeholder='search'
                            name='users'
                            onChange={formik.handleChange}
                            value={formik.values.users}
                            onClick={() => (setShowSearch(true))}
                        />
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
                        <Typography variant='span'>{user.firstname}</Typography>
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


                <Box
                    component={Grid}                   
                    display={showSearch ? 'block' : 'none'}
                    height={200}
                    width='40%'
                    bgcolor="aqua"
                    position='absolute'
                    top='80%'
                    left='28%'
                    borderRadius={5}
                    

                >
                    { searchUser.map((value) => {
                        return (
                            <Box component={Grid} item direction='row' display='flex' marginTop='5%' marginLeft='2%' >
                                <Avatar />
                                <Typography color='red' variant='h6' marginLeft='3%'  >{value}</Typography>
                            </Box>
                        )
                    }

                    )}
                </Box>
            </AppBar>


        </>
    )
}

export default Navbar
