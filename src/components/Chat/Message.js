import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ScrollToBottom from "react-scroll-to-bottom";

const Message = ({ uniqueChat }) => {
  const user = useSelector((state) => state.user);

  return (
    <>
      <ScrollToBottom className="scrollToBottom">
        {uniqueChat
          ? uniqueChat.map((value) => {
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
