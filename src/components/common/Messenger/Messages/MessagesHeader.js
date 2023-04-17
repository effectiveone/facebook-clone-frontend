import { Typography } from "@mui/material";
import VideocamIcon from "@material-ui/icons/Videocam";
import PhoneIcon from "@material-ui/icons/Phone";
import MinimizeIcon from "@material-ui/icons/Minimize";
import CloseIcon from "@material-ui/icons/Close";
import { useDispatch } from "react-redux";
import { setChosenChatDetails } from "../../../../store/actions/chatActions";
const MessagesHeader = ({ name }) => {
  const dispatch = useDispatch();

  const endConversation = () => {
    dispatch(setChosenChatDetails(null));
  };
  return (
    <div className="chat skin-chat-border skin-bottom-zero">
      <div className="chat-head skin-blue skin-chat-border">
        <span className="chat-connect"></span>
        <Typography className="chat-name" component="p">
          {name}
        </Typography>
        <div className="chat-head-list-icon">
          <PhoneIcon />

          <VideocamIcon />

          <MinimizeIcon />
          <div onClick={endConversation}>
            <CloseIcon />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessagesHeader;
