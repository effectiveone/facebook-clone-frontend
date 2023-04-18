import React from "react";
import { useDispatch } from "react-redux";
import OnlineIndicator from "./OnlineIndicator";
import { setChosenChatDetails } from "../../../store/actions/chatActions";
import { chatTypes } from "../../../store/types/chartTypes";

export default function Contact({ user, isOnline }) {
  const dispatch = useDispatch();

  const handleChooseActiveConversation = () => {
    console.log("handleChooseActiveConversation");
    dispatch(
      setChosenChatDetails(
        { id: user._id, name: user.username },
        chatTypes.DIRECT
      )
    );
  };
  return (
    <div className="contact hover3" onClick={handleChooseActiveConversation}>
      {isOnline && <OnlineIndicator />}
      <div className="contact_img">
        <img src={user?.picture} alt="" />
      </div>
      <span>
        {user?.first_name} {user?.last_name}
      </span>
    </div>
  );
}
