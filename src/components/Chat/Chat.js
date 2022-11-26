import {
  Avatar,
  Box,
  IconButton,
  InputBase,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";
import Sidebar from "../Sidebar/Sidebar";
import "./Chat.css";
import { useFormik } from "formik";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import MessageArea from "./MessageArea";
import { refreshReducer } from "../../Redux/RefreshSlice";
import io from "socket.io-client";

const socket = io.connect(process.env.REACT_APP_BACKEND_URL);
const Chat = () => {
  console.log("socket socket", socket);
  const dispatch = useDispatch();
  const [searchUser, setSearchUser] = useState([]);
  const [roomId, setRoomId] = useState("");
  const [chatList, setChatList] = useState([]);
  const [messageArea, setMessageArea] = useState(false)
  const [uniqueChat, setUniqueChat] = useState({})
  const user = useSelector((state) => state.user);
  const allUser = useSelector((state) => state.allUsers.allUsers);
  // const userToken = localStorage.getItem('userToken')

  const setToChat = (value) => {
    const userId = user._id
    axios.post(`${process.env.REACT_APP_BACKEND_URL}/chat/addMessageForRoomId`,{value,userId}).then((response) => {
      console.log('response added by aruns idea', response)
   const roomid = response.data._id
    console.log("room id as userid ", roomid);
    setRoomId(roomid);
    socket.emit("join_room", roomid);
    localStorage.setItem("chatUser", JSON.stringify(value));

    setMessageArea(true)
    dispatch(refreshReducer());
        const userToken = localStorage.getItem('userToken')
        console.log(userToken)
        axios.get(`${process.env.REACT_APP_BACKEND_URL}/chat/getChat/${value._id}`,{headers:{token:userToken}}).then((response) => {
        console.log('rrrrrrrrrrrrrrrrrrrr', response)
        setUniqueChat(response.data)
    })

  })
  };

  const formik = useFormik({
    initialValues: {
      users: null,
    },
  });

  useEffect(() => {
    console.log(formik.values.users);
    axios
      .get(
        `${process.env.REACT_APP_BACKEND_URL}/userSearch/${formik.values.users}`,
        { headers: { user: user._id } }
      )
      .then((response) => {
        setSearchUser(response.data);
      });
  }, [formik.values.users]);

  
  useEffect(() => {
    const userToken = localStorage.getItem('userToken')
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/chat/messages`, {
        headers: { token: userToken },
      })
      .then((response) => {
        console.log("response for message getting", response);
        setChatList(response.data);
      });
  }, []);

  return (
    <>
      <Navbar />
      <div>
        <div>
          <Sidebar />
        </div>
        <div className="chatRight">
          <div className="chatList">
            <Box
              sx={{
                width: "80%",
                height: "30px",
                borderRadius: "15px",
                border: "2px solid",
                margin: "8%",
              }}
            >
              <InputBase
                fullWidth
                variant="standard"
                size="small"
                name="users"
                placeholder="Search in friends"
                onChange={formik.handleChange}
                value={formik.values.users}
              />
            </Box>
            <div className="userList">
              {formik.values.users !== "" ? (
                <List className="users">
                  {searchUser
                    ? searchUser.map((value) => {
                        return (
                          <ListItem
                            onClick={() => setToChat(value)}
                            className="chatUser"
                            secondaryAction={
                              <IconButton edge="end" aria-label="delete">
                                {/* <DeleteIcon /> */}
                              </IconButton>
                            }
                          >
                            <ListItemAvatar>
                              <Avatar
                                src={value.profileimage}
                                sx={{
                                  width: "52px",
                                  height: "52px",
                                  border: "2px solid",
                                }}
                              ></Avatar>
                            </ListItemAvatar>
                            <ListItemText
                              sx={{ marginLeft: "19px" }}
                              primary={
                                <Typography style={{ fontWeight: 500 }}>
                                  {" "}
                                  <b>{value.firstname} </b>{" "}
                                </Typography>
                              }
                            />
                          </ListItem>
                        );
                      })
                    : null}
                </List>
              ) : null}
            </div>
            <div className="userList">
              <List>
                {chatList.map((value) => {
                  return (
                    <ListItem
                      className="chatUser"
                     
                      secondaryAction={
                        <IconButton edge="end" aria-label="delete">
                          {/* <DeleteIcon /> */}
                        </IconButton>
                      }
                    >
                      {value.users.map((userValue) => {
                        return (
                          <ListItemAvatar>
                            {userValue._id === user._id ? null : (
                              <Avatar
                                src={
                                  userValue._id === user._id
                                    ? null
                                    : userValue.profileimage
                                }
                                sx={{
                                  width: "52px",
                                  height: "52px",
                                  border: "2px solid",
                                }}
                              ></Avatar>
                            )}
                          </ListItemAvatar>
                        );
                      })}
                      {value.users.map((userValue) => {
                        return (
                            
                          <ListItemText
                          onClick={() => setToChat(userValue)}
                            sx={{ marginRight: "13px" }}
                            primary={
                              <Typography style={{ fontWeight: 500 }}>
                                <b>
                                  {userValue._id === user._id
                                    ? null
                                    : userValue.firstname}
                                </b>
                              </Typography>
                            }
                          />
                        );
                      })}
                    </ListItem>
                  );
                })}
              </List>
            </div>
          </div>

         { messageArea ? <MessageArea socket={socket} room={roomId}  uniqueChat={uniqueChat} /> : 'Start a conversation'}
        </div>
      </div>
    </>
  );
};

export default Chat;
