import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Messages from "./Messages/Messages";
import NewMessageInput from "./NewMessageInput";
import { getDirectChatHistory } from "../realtimeCommunication/socketConnection";
import { setMessages } from "../../../store/actions/chatActions";
import "./MessengerContent.scss";
import MessagesHeader from "./Messages/MessagesHeader";

const MessengerContent = () => {
  const dispatch = useDispatch();
  const chosenChatDetails = useSelector(
    (state) => state.chat.chosenChatDetails
  );

  useEffect(() => {
    getDirectChatHistory({
      receiverUserId: chosenChatDetails.id,
    })?.then((messages) => {
      dispatch(setMessages(messages));
    });
  }, [chosenChatDetails, dispatch]);

  return (
    <div className="messenger-content">
      <NewMessageInput />
      <MessagesHeader name={chosenChatDetails?.name} />
      <Messages />
    </div>
  );
};

export default MessengerContent;
