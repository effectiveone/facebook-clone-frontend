import { Container, Typography } from "@mui/material";
import "./MessagesHeader.scss";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import VideocamIcon from "@material-ui/icons/Videocam";
import PhoneIcon from "@material-ui/icons/Phone";
import SettingsIcon from "@material-ui/icons/Settings";
import CloseIcon from "@material-ui/icons/Close";
const MessagesHeader = ({ name }) => {
  return (
    <Container className="chat skin-chat-border skin-bottom-zero">
      <div className="chat-head skin-blue skin-chat-border">
        <span className="chat-connect"></span>
        <Typography className="chat-name" component="p">
          {name}
        </Typography>
        <div className="chat-head-list-icon">
          <ul>
            <li>
              <PersonAddIcon />
            </li>
            <li>
              <VideocamIcon />
            </li>
            <li>
              <PhoneIcon />
            </li>
            <li>
              <SettingsIcon />
            </li>
            <li>
              <CloseIcon />
            </li>
          </ul>
        </div>
      </div>
    </Container>
  );
};

export default MessagesHeader;
