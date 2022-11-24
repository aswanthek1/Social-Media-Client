import React from "react";
import { useSelector } from "react-redux";
import ScrollToBottom from 'react-scroll-to-bottom'

const Message = ({ messagesList }) => {
  const user = useSelector(state => state.user)
  console.log('messagses ',messagesList)
  return (
    <>
    <ScrollToBottom className="scrollToBottom">
    {messagesList.map((value) => {
      return (
      <div className={user.firstname === value.author ? "message own" : "message"}>
        <div className="messageTop">
          <img
            className="messageImage"
            src="/Assets/blank-profile-picture.webp"
            alt=""
          />
          <p className="messageText">{value.message}</p>
        </div>
        <div className="messageBottom">{value.time}</div>
      </div>
            )
          })}
          </ScrollToBottom>
    </>
  );
};

export default Message;
