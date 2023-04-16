import React from "react";
import { useSelector } from "react-redux";
import Avatar from "./Avatar";
import Typography from "@mui/material/Typography";

const Message = ({ content, sameAuthor, username, date, sameDay }) => {
  const currentUserId = useSelector((state) => state.auth.user.id);

  if (sameAuthor && sameDay) {
    return (
      <div className="same-author-message-container">
        <span className="same-author-message-text">{content}</span>
      </div>
    );
  }

  return (
    <div
      className={`message-container ${
        username === currentUserId ? "sent" : "received"
      }`}
    >
      <div className="avatar-container">
        <Avatar username={username} />
      </div>
      <div className="message-content-container">
        <Typography variant="body1" className="message-username">
          {username}
          <span className="message-date">{date}</span>
        </Typography>
        <div className="message-content">{content}</div>
      </div>
    </div>
  );
};

export default Message;
