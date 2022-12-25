import {
  Avatar,
  Box,
  Divider,
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

///socket connection with backend url
import io from "socket.io-client";
const socket = io.connect(process.env.REACT_APP_BACKEND_URL);

const Chat = () => {
  const dispatch = useDispatch();
  const [searchUser, setSearchUser] = useState([]);
  const [roomId, setRoomId] = useState("");
  const [chatList, setChatList] = useState([]);
  const [messageArea, setMessageArea] = useState(false);
  const [uniqueChat, setUniqueChat] = useState([]);
  const [showList, setShowList] = useState(true);
  const user = useSelector((state) => state.user);

  const setToChat = (value) => {
    if (window.innerWidth < 600) {
      setShowList(false);
    }
    window.addEventListener("resize", (Event) => {
      if (window.innerWidth < 600) {
        setShowList(false);
      } else {
        setShowList(true);
      }
    });

    const userId = user._id;
    axios
      .post(`${process.env.REACT_APP_BACKEND_URL}/chat/addMessageForRoomId`, {
        value,
        userId,
      })
      .then((response) => {
        const roomid = response.data._id;
        setRoomId(roomid);
        socket.emit("join_room", roomid);
        localStorage.setItem("chatUser", JSON.stringify(value));

        setMessageArea(true);
        dispatch(refreshReducer());
        const userToken = localStorage.getItem("userToken");
        axios
          .get(
            `${process.env.REACT_APP_BACKEND_URL}/chat/getChat/${value._id}`,
            { headers: { token: userToken } }
          )
          .then((response) => {
            setUniqueChat(response.data.messages);
          });
      });
  };

  const formik = useFormik({
    initialValues: {
      users: null,
    },
  });

  useEffect(() => {
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
    const userToken = localStorage.getItem("userToken");
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/chat/messages`, {
        headers: { token: userToken },
      })
      .then((response) => {
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
          {showList ? (
            <div className="chatList">
              <Box
                sx={{
                  width: "80%",
                  height: "25px",
                  borderRadius: "15px",
                  border: "1px solid grey",
                  margin: "8%",
                  paddingLeft: "6px",
                  backgroundColor: "#EAF6F6",
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
              {formik.values.users !== "" ? (
                <div className="userList">
                  {formik.values.users !== "" ? (
                    <List className="users" sx={{ marginLeft: "30px" }}>
                      {searchUser
                        ? searchUser.map((value) => {
                            return (
                              <ListItem
                                key={value._id}
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
                  ) : (
                    <div style={{ position: "absolute", zIndex: 12 }}>
                      <h4>No user found</h4>
                    </div>
                  )}
                </div>
              ) : null}

              {formik.values.users ? null : (
                <div className="chatUsersList">
                  <div style={{ marginBottom: "20px" }}>
                    <h3 style={{ textAlign: "center", color: "grey" }}>
                      Recent chats
                    </h3>
                    <Divider sx={{ borderBottomWidth: 2 }} />
                  </div>
                  <List sx={{ paddingLeft: "30px", paddingRight: "28x" }}>
                    {chatList.map((value) => {
                      return (
                        <ListItem
                          sx={{ paddingLeft: "61px" }}
                          className="chatUser"
                          secondaryAction={
                            <IconButton edge="end" aria-label="delete">
                              {/* <DeleteIcon /> */}
                            </IconButton>
                          }
                        >
                          {value.users.map((userValue) => {
                            return (
                              <>
                                {userValue._id === user._id ? null : (
                                  <ListItemAvatar
                                    onClick={() =>
                                      setToChat(userValue) && setShowList(false)
                                    }
                                  >
                                    <Avatar
                                      src={
                                        userValue._id !== user._id
                                          ? userValue.profileimage
                                          : null
                                      }
                                      sx={{
                                        width: "52px",
                                        height: "52px",
                                        border: "2px solid",
                                      }}
                                    ></Avatar>
                                  </ListItemAvatar>
                                )}
                              </>
                            );
                          })}
                          {value.users.map((userValue) => {
                            return (
                              <ListItemText
                                sx={{
                                  marginLeft: "5px",
                                  position: "absolute",
                                  left: "155px",
                                }}
                                key={userValue._id}
                                onClick={() =>
                                  setToChat(userValue) && setShowList(false)
                                }
                                // sx={{ marginRight:'-113px' }}
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
              )}
            </div>
          ) : null}

          {messageArea ? (
            <MessageArea
              socket={socket}
              room={roomId}
              uniqueChat={uniqueChat}
              setUniqueChat={setUniqueChat}
              showList={showList}
              setShowList={setShowList}
              setMessageArea={setMessageArea}
            />
          ) : (
            <div className="messageAreaText">
              <h2>
                <b>Start a new conversation</b>
              </h2>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Chat;
