import React, { useState } from 'react'
import './PeopleStyle.css'
import Sidebar from '../Sidebar/Sidebar'
import Navbar from '../Navbar/Navbar'
import { Avatar, Box, Button, Divider, List, ListItem, ListItemAvatar, ListItemButton, ListItemText, Tab, Tabs, Typography } from '@mui/material'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import axios from 'axios'
import { addAllUsers } from '../../Redux/AllUserSlice'
import { refreshReducer } from '../../Redux/RefreshSlice'
import { validateYupSchema } from 'formik'
import { useSelect } from '@mui/base'
import Unfollow from '../Unfollow'
import Swal from 'sweetalert2'
import toast, { Toaster } from 'react-hot-toast'


const People = () => {
    const dispatch = useDispatch()
    const [tabNumber, setTabNumber] = useState(1)
    const [value, setValue] = useState(0);
    const [youMayKnow, setYouMayKnow] = useState([])
    const [following, setFollowing] = useState([])
    const [followers, setFollowers] = useState([])

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };


    const refresh = useSelector(state => state.refresh.refresh)
    useEffect(() => {
        const userToken = localStorage.getItem('userToken')
        try {
            axios.get(`${process.env.REACT_APP_BACKEND_URL}/users`, { headers: { token: userToken } }).then((response) => {
                console.log("response from people", response)
                dispatch(addAllUsers(response.data.allUsers))
                setYouMayKnow(response.data.exceptFollowing)
                setFollowing(response.data.following)
                setFollowers(response.data.followers)

            })
        } catch (error) {
            console.log(error)
        }

    }, [refresh])


    const setFollow = (id) => {
        const userToken = localStorage.getItem('userToken')
        try {
            axios.post(`${process.env.REACT_APP_BACKEND_URL}/addFollow`, { id }, { headers: { token: userToken } }).then((response) => {
                console.log("resposner after follow", response)
                toast.success("Started following", {
                    duration: 3000,
                    style: {
                        width: '300px',

                    }
                })
                dispatch(refreshReducer())
            })
        } catch (error) {
            console.log(error)
        }
    }


    const remove = (id) => {
        try {
            Swal.fire({
                title: 'Do you want to remove this follower ?',
                showCancelButton: true,
                confirmButtonText: 'Yes',
            }).then((result) => {
                if (result.isConfirmed) {
                    const userToken = localStorage.getItem('userToken')

                    axios.post(`${process.env.REACT_APP_BACKEND_URL}/follwers/remove`, { id }, { headers: { token: userToken } }).then((response) => {
                        console.log('removed response ', response)
                        toast.success('Removed successfully')
                        dispatch(refreshReducer())
                    })
                }
            })
        } catch (error) {
            console.log(error)
        }
    }

    const user = useSelector(state => state.user)
    const allUsers = useSelector(state => state.allUsers.allUsers)
    console.log("followers at people ", followers)



    return (
        <>
            <Navbar />
            <div className='people'>
                <Sidebar />
                <div className="peopleRight">
                    <Box sx={{ width: '100%', bgcolor: 'wheat' }}>
                        <Tabs value={value} onChange={handleChange} centered variant='fullWidth'>
                            <Tab label="Following" onClick={() => setTabNumber(1)} />
                            <Tab label="Followers" onClick={() => setTabNumber(2)} />
                            <Tab label="You may know" onClick={() => setTabNumber(3)} />
                        </Tabs>
                    </Box>


                    <div className='cards'>
                        {tabNumber === 1 ? <div>
                            {following.map((followingValue) => {

                                return (

                                    <List
                                        sx={{ width: '100%', maxWidth: 460, bgcolor: 'background.paper' }}>
                                        <ListItem alignItems="flex-start">
                                            <ListItemAvatar>
                                                <Avatar alt="Remy Sharp" src={followingValue.profileimage} />
                                            </ListItemAvatar>
                                            <ListItemText
                                                sx={{ marginTop: '20px' }}
                                                disableTypography
                                                primary={<Typography style={{ fontWeight: 500 }}> <b>{followingValue.firstname} {followingValue.lastname} </b> </Typography>}
                                            />
                                            <Unfollow id={followingValue._id} />
                                        </ListItem>

                                        <Divider variant="inset" component="li" />

                                    </List>
                                )
                            })
                            }


                        </div> : null}

                        {tabNumber === 2 ? <div className='tabTwo'>

                            {followers.map((followersValue) => {
                                return (
                                    <List
                                        sx={{ width: '100%', maxWidth: 460, bgcolor: 'background.paper' }}>
                                        <ListItem alignItems="flex-start">
                                            <ListItemAvatar>
                                                <Avatar alt="" src={followersValue.profileimage} />
                                            </ListItemAvatar>
                                            <ListItemText
                                                sx={{ marginTop: '20px' }}
                                                disableTypography
                                                primary={<Typography style={{ fontWeight: 500 }}> <b>{followersValue.firstname} {followersValue.lastname}</b> </Typography>}
                                            />
                                            <Button
                                                onClick={() => remove(followersValue._id)}
                                                variant='contained'
                                                size='small'
                                                sx={{ marginLeft: '30px', marginTop: '19px' }}
                                            >

                                                REMOVE
                                            </Button>
                                        </ListItem>

                                        <Divider variant="inset" component="li" />
                                    </List>
                                )
                            })}
                        </div> : null}

                        {tabNumber === 3 ? <div className='tabThree'>

                            {youMayKnow.map((value) => {
                                return (


                                    <List

                                        sx={{ width: '100%', maxWidth: 460, bgcolor: 'background.paper' }}>

                                        <ListItem alignItems="flex-start">
                                            <ListItemAvatar>
                                                <Avatar alt="Remy Sharp" src={value.profileimage} />
                                            </ListItemAvatar>
                                            <ListItemText
                                                sx={{ marginTop: '20px' }}
                                                disableTypography
                                                primary={<Typography style={{ fontWeight: 500 }}> <b>{value.firstname} {value.lastname}</b> </Typography>}
                                            />
                                            <Button
                                                onClick={() => setFollow(value._id)}
                                                variant='contained'
                                                size='small' sx={{ marginLeft: '30px', marginTop: '19px' }}
                                            >
                                                Follow
                                            </Button>
                                        </ListItem>
                                        <Divider variant="inset" />
                                    </List>
                                )
                            })}
                        </div> : null}

                    </div>
                </div>
            </div>
            <Toaster />
        </>
    )
}

export default People
