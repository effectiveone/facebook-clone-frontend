import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { sendDirectMessage } from "../realtimeCommunication/socketConnection";
import { TextField, Button } from "@mui/material";
import { setMessages } from "../../../store/actions/chatActions";
import CameraAltIcon from "@material-ui/icons/CameraAlt";
import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon";
import CardGiftcardIcon from "@material-ui/icons/CardGiftcard";
import SportsEsportsIcon from "@material-ui/icons/SportsEsports";
import MonetizationOnIcon from "@material-ui/icons/MonetizationOn";
import AttachFileIcon from "@material-ui/icons/AttachFile";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import "./Messages/MessagesHeader.scss";
import "./NewMessageInput.scss";
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
      <div className="chat-content skin-padding-rl"></div>
      <div className="chat-foot skin-white skin-padding-rl">
        <TextField
          className="new-message-input__textfield"
          placeholder={`Write message to ${chosenChatDetails.name}`}
          value={message}
          onChange={handleMessageValueChange}
          onKeyDown={handleKeyPressed}
          variant="outlined"
          size="small"
        />
        <div className="chat-foot-list-icon">
          <ul>
            <li>
              <CameraAltIcon />
            </li>
            <li>
              <InsertEmoticonIcon />
            </li>
            <li>
              <CardGiftcardIcon />
            </li>
            <li>
              <SportsEsportsIcon />
            </li>
            <li>
              <MonetizationOnIcon />
            </li>
            <li>
              <AttachFileIcon />
            </li>
            <li>
              <ThumbUpAltIcon />
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default NewMessageInput;
