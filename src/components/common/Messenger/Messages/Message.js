import React from "react";
import { useSelector } from "react-redux";
import Avatar from "./Avatar";
import Typography from "@mui/material/Typography";

const Message = ({
  content,
  sameAuthor,
  username,
  date,
  sameDay,
  isCurrentUser,
}) => {
  const currentUserId = useSelector((state) => state.user?.id);

  const messageStyle = isCurrentUser
    ? {
        justifyContent: "flex-start",
        flexDirection: "row-reverse",
        alignSelf: "flex-end",
      }
    : {
        justifyContent: "flex-start",
        alignSelf: "flex-start",
      };

  const spanStyle = isCurrentUser
    ? { backgroundColor: "grey" }
    : {
        backgroundColor: "#0075ff", // Change the background color to blue for the current user's messages
      };

  if (sameAuthor && sameDay) {
    return (
      <div className="same-author-message-container" style={messageStyle}>
        <span className="same-author-message-text" style={spanStyle}>
          {content}
        </span>
      </div>
    );
  }

  return (
    <>
      <span className="message-date">{date}</span>
      <div className="message-container" style={messageStyle}>
        <div className="avatar-container">
          <Avatar username={username} />
        </div>
        <span className="message-text" style={spanStyle}>
          {content}
        </span>
      </div>
    </>
  );
};

export default Message;
