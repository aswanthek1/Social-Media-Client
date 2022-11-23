import React from "react";

const Message = ({ own, socket,chatUserState }) => {
  return (
    <>
      <div className={own ? "message own" : "message"}>
        <div className="messageTop">
          <img
            className="messageImage"
            src="/Assets/blank-profile-picture.webp"
            alt=""
          />
          <p className="messageText">Hello this is a message</p>
        </div>
        <div className="messageBottom">1 hour ago</div>
      </div>
    </>
  );
};

export default Message;
