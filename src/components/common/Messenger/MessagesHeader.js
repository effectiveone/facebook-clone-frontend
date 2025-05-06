import { Typography } from '@mui/material';
import VideocamIcon from '@material-ui/icons/Videocam';
import PhoneIcon from '@material-ui/icons/Phone';
import MinimizeIcon from '@material-ui/icons/Minimize';
import CloseIcon from '@material-ui/icons/Close';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { useDispatch } from 'react-redux';
import { setChosenChatDetails } from '../../../store/actions/chatActions';

const MessagesHeader = ({ name }) => {
  const dispatch = useDispatch();

  const endConversation = () => {
    dispatch(setChosenChatDetails(null));
  };

  return (
    <div className='chat-header'>
      <div className='profile-container'>
        <div className='profile-pic'>
          <div className='default-avatar'></div>
          <div className='active-indicator'></div>
        </div>
        <div className='user-info'>
          <Typography className='user-name' component='p'>
            {name}
          </Typography>
          <Typography className='user-status' component='p'>
            Aktywny teraz
          </Typography>
        </div>
      </div>
      <div className='chat-dropdown'>
        <ExpandMoreIcon className='icon-dropdown' />
      </div>
      <div className='header-actions'>
        <div className='header-action'>
          <PhoneIcon className='icon-phone' />
        </div>
        <div className='header-action'>
          <VideocamIcon className='icon-video' />
        </div>
        <div className='header-action'>
          <MinimizeIcon className='icon-minus' />
        </div>
        <div className='header-action close-button' onClick={endConversation}>
          <CloseIcon className='icon-close' />
        </div>
      </div>
    </div>
  );
};

export default MessagesHeader;
