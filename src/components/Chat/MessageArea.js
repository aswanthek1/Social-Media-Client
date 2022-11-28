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
import axios from "axios";
// import io from 'socket.io-client'

// const socket = io.connect(process.env.REACT_APP_BACKEND_URL);

const MessageArea = ({ socket, room , uniqueChat}) => {
  console.log("room and socket", uniqueChat);
  const [chatUserState, setChatUserState] = useState({});
  const [currentMessage, setCurrentMessage] = useState();
  const [messagesList, setMessagesList] = useState([]);
  const refresh = useSelector((state) => state.refresh.refresh);
  const user = useSelector((state) => state.user);

  useEffect(() => {
    const chatUser = JSON.parse(localStorage.getItem("chatUser"));
    setChatUserState(chatUser);
  }, [refresh]);

  const sentMessage = async () => {
    if (currentMessage !== "") {
      const messageData = {
        room,
        author: user.firstname,
        authorId: user._id,
        message: currentMessage,
        receiver: chatUserState._id,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };

      await socket.emit("send_message", messageData);
      setMessagesList((list) => [...list, messageData]);
      setCurrentMessage("");
      const userId = user._id;
      axios
        .post(`${process.env.REACT_APP_BACKEND_URL}/chat/addMessage`, {
          messageData,
        })
        .then((response) => {
          console.log("response after message ", response);
        });
    }
  };

  useEffect(() => {
    socket.on("recieve_message", (data) => {
      console.log("data from message", data);
      setMessagesList((list) => [...list,data]);
    });
    return () => socket.off();
  }, [, messagesList, socket]);

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
          <Message messagesList={messagesList} uniqueChat={uniqueChat}  />
          
          {/* <Message  messagesList={messagesList} own={true} /> */}
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
              value={currentMessage}
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
              onKeyPress={(event) => {
                event.key === "Enter" && sentMessage();
              }}
            />
          </Box>
        </div>
      </div>
    </>
  );
};

export default MessageArea;
