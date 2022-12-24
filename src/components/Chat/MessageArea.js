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
import EastOutlinedIcon from '@mui/icons-material/EastOutlined';
import { useSelector } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const MessageArea = ({ socket, room , uniqueChat, setUniqueChat, showList, setShowList, setMessageArea }) => {
  // console.log("room and socket", uniqueChat);
  const navigate = useNavigate()
  const [chatUserState, setChatUserState] = useState({});
  const [currentMessage, setCurrentMessage] = useState("");
  const refresh = useSelector((state) => state.refresh.refresh);
  const user = useSelector((state) => state.user);

  useEffect(() => {
    const chatUser = JSON.parse(localStorage.getItem("chatUser"));
    setChatUserState(chatUser);
  }, [refresh]);

  const sentMessage = async () => {
      if( currentMessage.trim() === "" ){ console.log('What you mean ? ')}
      else{
      const messageData = {
        room,
        author: user.firstname,
        authorId: user._id,
        message: currentMessage,
        receiver: chatUserState._id,
        time:new Date(),
      };

      await socket.emit("send_message", messageData);
      setUniqueChat((list) => [...list, messageData]);
      setCurrentMessage("");
      const userId = user._id;
      axios
        .post(`${process.env.REACT_APP_BACKEND_URL}/chat/addMessage`, {
          messageData,
        })
        .then((response) => {
          // console.log("response after message ", response);
        });
    }
  };

  useEffect(() => {
    socket.on("recieve_message", (data) => {
      setUniqueChat((list) => [...list,data]);
    });
    return () => socket.off();
  }, [ socket]);

  return ( 
    <>
      <div className="messagingArea">
        <List sx={{ paddingInline: "0px", paddingBlock: "0px" }}>
          <ListItem
           secondaryAction={
               <IconButton edge="end"
               onClick={() => setShowList(true) || setMessageArea(false)}
               >
               { !showList ?  <EastOutlinedIcon />: null} 
              </IconButton>
            }
          >
            <ListItemAvatar>
              <Avatar
                sx={{ width: "52px", height: "52px", border: "2px solid" }}
                src={chatUserState ? chatUserState.profileimage : null}
              ></Avatar>
            </ListItemAvatar>
            <ListItemText
              sx={{ marginLeft: "19px" }}
              primary={chatUserState ? chatUserState.firstname : null}
            />
          </ListItem>
        </List>
        <div className="messagingAreaMid">
          <Message  uniqueChat={uniqueChat}  />
          
          {/* <Message  messagesList={messagesList} own={true} /> */}
        </div>
        <div className="messageInputDiv">
          <Box
            sx={{
              width: "90%",
              height: "30px",
              borderRadius: "15px",
              padding: "0 10px",
              // border: "1.5px solid grey",
              background:{sm:'white',xs:'#272ccb4f'},
              marginTop: "3%",
              color:{sm:'grey',xs:'white'}

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
