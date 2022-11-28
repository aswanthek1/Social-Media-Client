import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ScrollToBottom from "react-scroll-to-bottom";

const Message = ({ messagesList, uniqueChat }) => {
  console.log("ayyyyyyyyyyyyyyyyyyyyy", uniqueChat);
  const savedChat = uniqueChat.messages;
  console.log("at top", savedChat);
  const [allMessages, setAllMessages] = useState([]);
  const user = useSelector((state) => state.user);
  const [chatList, setChatList] = useState([]);
  const userid = user._id;
  useEffect(() => {
    // setAllMessages( [...messagesList,savedChat]);
    // messagesList.push(savedChat)
    setAllMessages((prev) => [...prev, savedChat]);
  }, [savedChat, messagesList]);

  return (
    <>
      <ScrollToBottom className="scrollToBottom">
        {savedChat
          ? savedChat.map((value, index) => {
              //  value.map((obj)=>{
              //   console.log("e", obj);
              //  })
              // messagesList.shift()
              console.log("llll", messagesList);
              console.log("e", value, index);
              return (
                <div
                  className={
                    value !== undefined && user._id === value.authorId
                      ? "message own"
                      : "message"
                  }
                >
                  <div className="messageTop">
                    <img
                      className="messageImage"
                      src="/Assets/blank-profile-picture.webp"
                      alt=""
                    />
                    <p className="messageText">
                      {value ? value.message : null}
                    </p>
                  </div>
                  <div className="messageBottom">
                    {value ? value.time : null}
                  </div>
                </div>
              );
            })
          : null}
      </ScrollToBottom>
    </>
  );
};

export default Message;
