import { Avatar, Box, IconButton, InputAdornment, InputBase, List, ListItem, ListItemAvatar, ListItemText, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import Navbar from '../Navbar/Navbar'
import Sidebar from '../Sidebar/Sidebar'
import './Chat.css'
import SendIcon from '@mui/icons-material/Send';
import { useFormik } from 'formik'
import axios from 'axios'

const Chat = () => {
    const [searchUser, setSearchUser] = useState([])

    const formik = useFormik({
        initialValues: {
            users: null
        }
    })

    useEffect(() => {
        console.log(formik.values.users)
        axios.get(`http://localhost:5000/userSearch/${formik.values.users}`).then((e) => {
            console.log('uesr serarched result', e.data)
            setSearchUser(e.data)

        })

    }, [formik.values.users])


    return (
        <>
            <Navbar />
            <div>
                <div>
                    <Sidebar />
                </div>
                <div className='chatRight'>
                    <div className="chatList">
                        <Box
                            sx={{
                                width: '80%', marginTop: '26px',
                                height: '30px',
                                borderRadius: '15px', padding: '0 10px',
                                border: '2px solid'
                            }}
                        >
                            <InputBase
                                fullWidth
                                variant='standard'
                                size='small'
                                name='users'
                                placeholder='Search in chat'
                                onChange={formik.handleChange}
                                value={formik.values.users}
                            />
                        </Box>
                        <div className='userList'>
                            {formik.values.users !== '' ? <List className='users'>
                                {searchUser.map((value) => {
                                    return (
                                        <ListItem
                                            // onClick={() => goToChat(value._id)}
                                            className='chatUser'
                                            secondaryAction={
                                                <IconButton edge="end" aria-label="delete">
                                                    {/* <DeleteIcon /> */}
                                                </IconButton>
                                            }
                                        >
                                            <ListItemAvatar>
                                                <Avatar
                                                    src={value.profileimage}
                                                    sx={{ width: '52px', height: '52px', border: '2px solid' }}
                                                >
                                                </Avatar>
                                            </ListItemAvatar>
                                            <ListItemText
                                                sx={{ marginLeft: '19px' }}
                                                primary={<Typography style={{ fontWeight: 500 }}> <b>{value.firstname} </b> </Typography>}
                                            />
                                        </ListItem>
                                    )
                                }
                                )}
                            </List> : null}
                        </div>
                    </div>

                    <div className='messagingArea'>
                        <List sx={{ paddingInline: '0px', paddingBlock: '0px' }}>
                            <ListItem
                                secondaryAction={
                                    <IconButton edge="end" aria-label="delete">
                                        {/* <DeleteIcon /> */}
                                    </IconButton>
                                }
                            >
                                <ListItemAvatar>
                                    <Avatar
                                        sx={{ width: '52px', height: '52px', border: '2px solid' }}
                                    >
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText
                                    sx={{ marginLeft: '19px' }}
                                    primary="Alen Devasssia"
                                />
                            </ListItem>
                        </List>
                        <div className="messagingAreaMid">

                        </div>
                        <div className='messageInputDiv'>

                            <Box
                                sx={{
                                    width: '90%',
                                    height: '30px',
                                    borderRadius: '15px',
                                    padding: '0 10px',
                                    border: '2px solid',
                                    marginTop: '5%'
                                }}
                            >
                                <InputBase
                                    fullWidth
                                    variant='standard'
                                    size='small'
                                    name='users'
                                    placeholder='Search in chat'
                                    endAdornment={
                                        <InputAdornment position='end'>
                                            <IconButton>
                                                <SendIcon />
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                />
                            </Box>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Chat
