import { Avatar, Box, IconButton, InputBase, List, ListItem, ListItemAvatar, ListItemText, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import Navbar from '../Navbar/Navbar'
import Sidebar from '../Sidebar/Sidebar'
import './Chat.css'
import { useFormik } from 'formik'
import axios from 'axios'
import { useSelector, useDispatch } from 'react-redux'
import MessageArea from './MessageArea'
import { refreshReducer } from '../../Redux/RefreshSlice'
import io from 'socket.io-client'


const Chat = () => {

    const socket = io.connect(process.env.REACT_APP_BACKEND_URL);
   console.log('socket socket', socket)
    const dispatch = useDispatch()
    const [searchUser, setSearchUser] = useState([])
    const [chatUser, setChatUser] = useState('')
    const [roomId, setRoomId] = useState('')
    const user = useSelector(state => state.user)
    const allUser = useSelector(state => state.allUsers.allUsers)

    const setToChat = (value,roomid) => {
        console.log(roomid)
        setRoomId(roomid)
        socket.emit("join_room", roomid)
        localStorage.setItem('chatUser', JSON.stringify(value));
        
        dispatch(refreshReducer())
    }

    const formik = useFormik({
        initialValues: {
            users: null
        }
    })

    useEffect(() => {
        console.log(formik.values.users)
        axios.get(`http://localhost:5000/userSearch/${formik.values.users}`, { headers: { user: user._id } }).then((e) => {
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
                                width: '80%',
                                height: '30px',
                                borderRadius: '15px',
                                border: '2px solid',
                                margin: '8%'
                            }}
                        >
                            <InputBase
                                fullWidth
                                variant='standard'
                                size='small'
                                name='users'
                                placeholder='Search in friends'
                                onChange={formik.handleChange}
                                value={formik.values.users}
                            />
                        </Box>
                        <div className='userList'>
                            {formik.values.users !== '' ? <List className='users'>
                                {searchUser ? searchUser.map((value) => {
                                    return (
                                        <ListItem
                                            onClick={() => setToChat(value,"123")}
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
                                ) : null}
                            </List> : null}
                        </div>
                    </div>


                    <MessageArea  room={roomId} />


                </div>
            </div>
        </>
    )
}

export default Chat
