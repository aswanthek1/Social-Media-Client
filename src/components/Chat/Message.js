import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ScrollToBottom from "react-scroll-to-bottom";

const Message = ({ messagesList, uniqueChat }) => {
  const savedChat = uniqueChat.messages
const [allMessages, setAllMessages] = useState([])
  const user = useSelector((state) => state.user);
  const [chatList, setChatList] = useState([]);
     const userid = user._id
  useEffect(() => {
    // { messagesList && uniqueChat ? setAllMessages(...messagesList,...savedChat) : null}
    setAllMessages((messagesList) => [...messagesList,savedChat])
  },[])
  console.log(savedChat, messagesList, allMessages)
  return (
    <>
      <ScrollToBottom className="scrollToBottom">
        {savedChat ?  savedChat.map((value) => {
        
          console.log("e", value);
          return (
            
            <div
              className={
               value && user._id === value.authorId ? "message own" : "message" 
              }
            > 
              <div className="messageTop">
                <img
                  className="messageImage"
                  src="/Assets/blank-profile-picture.webp"
                  alt=""
                />
                <p className="messageText">{value ? value.message : null}</p>
              </div>
              <div className="messageBottom">{value ? value.time : null}</div>
            </div>
          );
        }) : null}
      </ScrollToBottom>
    </>
  );
};

export default Message;
