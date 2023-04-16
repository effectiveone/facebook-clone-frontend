import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { sendDirectMessage } from "../realtimeCommunication/socketConnection";
import { TextField } from "@mui/material";
import { setMessages } from "../../../store/actions/chatActions";
import CameraAltIcon from "@material-ui/icons/CameraAlt";
import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon";
import AttachFileIcon from "@material-ui/icons/AttachFile";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";

const NewMessageInput = () => {
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();
  const chosenChatDetails = useSelector(
    (state) => state.chat.chosenChatDetails
  );

  const handleMessageValueChange = (event) => {
    setMessage(event.target.value);
  };

  const handleKeyPressed = (event) => {
    if (event.key === "Enter") {
      handleSendMessage();
    }
  };

  const handleSendMessage = () => {
    if (message.length > 0) {
      sendDirectMessage({
        receiverUserId: chosenChatDetails.id,
        content: message,
      });
      dispatch(
        setMessages([
          ...chosenChatDetails.messages,
          { content: message, isSent: true },
        ])
      );
      setMessage("");
    }
  };

  return (
    <div className="New-message-input">
      <CameraAltIcon />
      <InsertEmoticonIcon />
      <TextField
        className="new-message-input__textfield"
        placeholder={`Write message to ${chosenChatDetails.name}`}
        value={message}
        onChange={handleMessageValueChange}
        onKeyDown={handleKeyPressed}
        variant="outlined"
        size="small"
      />
      <AttachFileIcon />
      <ThumbUpAltIcon />
    </div>
  );
};

export default NewMessageInput;
