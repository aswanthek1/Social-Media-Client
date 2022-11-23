import {
  Avatar,
  Box,
  IconButton,
  InputAdornment,
  InputBase,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import Message from "./Message";
import SendIcon from "@mui/icons-material/Send";
import { useSelector } from "react-redux";
import io from 'socket.io-client'

const MessageArea = ( room) => {
  const socket = io.connect(process.env.REACT_APP_BACKEND_URL);
  console.log("room and socket",  room);
  const [chatUserState, setChatUserState] = useState({});
  const [currentMessage, setCurrentMessage] = useState();
  const refresh = useSelector((state) => state.refresh.refresh);
  const user = useSelector((state) => state.user)

  useEffect(() => {
    const chatUser = JSON.parse(localStorage.getItem("chatUser"));
    console.log(chatUser, "chatuser at message");
    setChatUserState(chatUser);
  }, [refresh]);

  const sentMessage = async() => {
    if (currentMessage !== "") {
      const messageData = {
        room,
        author: user.firstname,
        message: currentMessage,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };

      await socket.emit("send_message", messageData)
    }
  };

  useEffect(() => {
    socket.on("recieve_message ",(data) => {
        console.log("data from message",data)
    })
  },[socket])

  return (
    <>
      <div className="messagingArea">
        <List sx={{ paddingInline: "0px", paddingBlock: "0px" }}>
          <ListItem
            secondaryAction={
              <IconButton edge="end" aria-label="delete">
                {/* <DeleteIcon /> */}
              </IconButton>
            }
          >
            <ListItemAvatar>
              <Avatar
                sx={{ width: "52px", height: "52px", border: "2px solid" }}
              ></Avatar>
            </ListItemAvatar>
            <ListItemText
              sx={{ marginLeft: "19px" }}
              primary={chatUserState ? chatUserState.firstname : null}
            />
          </ListItem>
        </List>
        <div className="messagingAreaMid">
          <Message socket={socket} chatUserState={chatUserState} />
          <Message own={true} socket={socket} />
        </div>
        <div className="messageInputDiv">
          <Box
            sx={{
              width: "90%",
              height: "30px",
              borderRadius: "15px",
              padding: "0 10px",
              border: "2px solid",
              marginTop: "5%",
            }}
          >
            <InputBase
              onChange={(event) => setCurrentMessage(event.target.value)}
              fullWidth
              variant="standard"
              size="small"
              name="users"
              placeholder="Write something..."
              endAdornment={
                <InputAdornment position="end">
                  <IconButton onClick={sentMessage}>
                    <SendIcon />
                  </IconButton>
                </InputAdornment>
              }
            />
          </Box>
        </div>
      </div>
    </>
  );
};

export default MessageArea;
