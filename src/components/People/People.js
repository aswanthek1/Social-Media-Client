import React from 'react'
import './PeopleStyle.css'
import Sidebar from '../Sidebar/Sidebar'
import Navbar from '../Navbar/Navbar'
import { Avatar, Box, Button, Divider, List, ListItem, ListItemAvatar, ListItemButton, ListItemText, Tab, Tabs, Typography } from '@mui/material'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import axios from 'axios'
import { addAllUsers } from '../../Redux/AllUserSlice'
import { validateYupSchema } from 'formik'






const People = () => {
    const dispatch = useDispatch()
    const [tabNumber, setTabNumber] = React.useState(1)
    const [value, setValue] = React.useState(0);
    const [followButtonState, setFollowButtonState] = React.useState('FOLLOW')

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };





    useEffect(() => {
        const userToken = localStorage.getItem('userToken') 
        try {
            axios.get('http://localhost:5000/allUsers', { headers: { token: userToken } }).then((response) => {
                console.log("response from people", response)
                dispatch(addAllUsers(response.data))
            })
        } catch (error) {
            console.log(error)
        }

    }, [])


    const setFollow = (id) => {
        const userToken = localStorage.getItem('userToken') 
        try {
            axios.post('http://localhost:5000/addFollow',{id},{headers:{token:userToken}}).then((response) => {
                console.log("resposner after follow", response)  
            })
        } catch (error) {
            console.log(error)
        }
    }

    const user = useSelector(state => state.user)
    const allUsers = useSelector(state => state.allUsers.allUsers)
    console.log(allUsers)

    return (
        <>
            <Navbar />
            <div className='people'>
                <Sidebar />
                <div className="peopleRight">
                    <Box sx={{ width: '100%', bgcolor: 'wheat' }}>
                        <Tabs value={value} onChange={handleChange} centered variant='fullWidth'>
                            <Tab label="Followers" onClick={() => setTabNumber(1)} />
                            <Tab label="Following" onClick={() => setTabNumber(2)} />
                            <Tab label="You may know" onClick={() => setTabNumber(3)} />
                        </Tabs>
                    </Box>


                    <div className='cards'>
                        {tabNumber == 1 ? <div>
                            <List
                                sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                                <ListItem alignItems="flex-start">
                                    <ListItemAvatar>
                                        <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                                    </ListItemAvatar>
                                    <ListItemText
                                        sx={{ marginTop: '20px' }}
                                        disableTypography
                                        primary={<Typography style={{ fontWeight: 500 }}> <b>Aswanth </b> </Typography>}
                                    />
                                    <Button
                                        variant='contained'
                                        size='small'
                                        sx={{ marginLeft: '30px', marginTop: '19px' }}
                                    >
                                        
                                    </Button>
                                </ListItem>

                                <Divider variant="inset" component="li" />

                            </List>


                        </div> : null}

                        {tabNumber == 2 ? <div className='tabTwo'>

                            <List
                                sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                                <ListItem alignItems="flex-start">
                                    <ListItemAvatar>
                                        <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                                    </ListItemAvatar>
                                    <ListItemText
                                        sx={{ marginTop: '20px' }}
                                        disableTypography
                                        primary={<Typography style={{ fontWeight: 500 }}> <b>Javad </b> </Typography>}
                                    />
                                    <Button
                                        variant='contained'
                                        size='small'
                                        sx={{ marginLeft: '30px', marginTop: '19px' }}
                                    >
                                        Follow
                                    </Button>
                                </ListItem>

                                <Divider variant="inset" component="li" />
                            </List>
                        </div> : null}

                        {tabNumber == 3 ? <div className='tabThree'>

                            {allUsers.map((value) => {
                                return (


                                    <List

                                        sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>

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
                                                onClick={()=>setFollow(value._id)}
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
        </>
    )
}

export default People
