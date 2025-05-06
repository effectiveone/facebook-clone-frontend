import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Messages from './Messages';
import { getDirectChatHistory, sendDirectMessage } from '../Realtime-communication/socketConnection';
import { setMessages } from '../../../store/actions/chatActions';
import './MessengerContent.scss';
// Material UI icons
import CallIcon from '@mui/icons-material/Call';
import VideocamIcon from '@mui/icons-material/Videocam';
import RemoveIcon from '@mui/icons-material/Remove';
import CloseIcon from '@mui/icons-material/Close';
import MicIcon from '@mui/icons-material/Mic';
import PhotoIcon from '@mui/icons-material/Photo';
import GifIcon from '@mui/icons-material/Gif';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import AttachFileIcon from '@mui/icons-material/AttachFile';

const MessengerContent = () => {
  const dispatch = useDispatch();
  const chosenChatDetails = useSelector(
    (state) => state.chat.chosenChatDetails,
  );
  const [message, setMessage] = useState('');
  const [minimized, setMinimized] = useState(false);

  useEffect(() => {
    // Przykładowe dane wiadomości, jeśli nie ma prawdziwych
    if (!chosenChatDetails) return;

    getDirectChatHistory({
      receiverUserId: chosenChatDetails.id,
    })?.then((messages) => {
      // Jeśli nie ma wiadomości, dodajmy przykładowe
      if (!messages || messages.length === 0) {
        const exampleMessages = [
          {
            _id: 'expired1',
            author: { _id: 'other', username: chosenChatDetails.name },
            content: 'expired_message',
            date: '2020-04-06T00:20:00Z',
          },
          {
            _id: 'msg1',
            author: { _id: 'current', username: 'Ja' },
            content: 'Mama potwierdziła że jedziemy na komunię?',
            date: new Date().toISOString(),
          },
        ];

        dispatch(setMessages(exampleMessages));
      } else {
        dispatch(setMessages(messages));
      }
    });
  }, [chosenChatDetails, dispatch]);

  // Jeśli nie wybrano czatu, wyświetl informację
  if (!chosenChatDetails) {
    return (
      <div className='messenger-content'>
        <div className='messages-container'>
          <div style={{ textAlign: 'center', marginTop: '50px' }}>
            Wybierz osobę, z którą chcesz porozmawiać
          </div>
        </div>
      </div>
    );
  }

  // Handle message input change
  const handleMessageValueChange = (event) => {
    setMessage(event.target.value);
  };

  // Handle key press for sending message
  const handleKeyPressed = (event) => {
    if (event.key === 'Enter') {
      handleSendMessage();
    }
  };

  // Handle send message
  const handleSendMessage = () => {
    if (message.trim().length > 0) {
      sendDirectMessage({
        receiverUserId: chosenChatDetails.id,
        content: message.trim(),
      });
      
      // Add message to the state
      const newMessage = {
        _id: Date.now().toString(),
        author: { _id: 'current', username: 'Ja' },
        content: message.trim(),
        date: new Date().toISOString(),
      };
      
      dispatch(setMessages([...chosenChatDetails.messages || [], newMessage]));
      setMessage('');
    }
  };

  // Handle thumbs up click
  const handleThumbUpClick = () => {
    if (message.trim().length === 0) {
      // Send thumbs up if message input is empty
      const thumbsUp = '👍';
      sendDirectMessage({
        receiverUserId: chosenChatDetails.id,
        content: thumbsUp,
      });
      
      // Add thumbs up to the state
      const newMessage = {
        _id: Date.now().toString(),
        author: { _id: 'current', username: 'Ja' },
        content: thumbsUp,
        date: new Date().toISOString(),
      };
      
      dispatch(setMessages([...chosenChatDetails.messages || [], newMessage]));
    } else {
      // If there's text in the input, send it
      handleSendMessage();
    }
  };

  // Toggle minimized state
  const toggleMinimized = () => {
    setMinimized(!minimized);
  };

  return (
    <div className={`messenger-popup ${minimized ? 'minimized' : ''}`}>
      <div className='chat-container'>
        {/* Chat Header */}
        <div className='chat-header'>
          <div className='profile-container'>
            <div className='profile-pic'>
              <div className='default-avatar'></div>
              <div className='active-indicator'></div>
            </div>
            <div className='user-info'>
              <div className='user-name'>{chosenChatDetails?.name}</div>
              <div className='user-status'>Aktywny teraz</div>
            </div>
          </div>
          <div className='header-actions'>
            <div className='header-action'>
              <CallIcon className='icon-phone' />
            </div>
            <div className='header-action'>
              <VideocamIcon className='icon-video' />
            </div>
            <div className='header-action' onClick={toggleMinimized}>
              <RemoveIcon className='icon-minus' />
            </div>
            <div className='header-action close-button'>
              <CloseIcon className='icon-close' />
            </div>
          </div>
        </div>
        
        {!minimized && (
          <>
            {/* Chat Body */}
            <div className='chat-body'>
              <div className='chat-title'>{chosenChatDetails?.name}</div>
              <div className='chat-subtitle'>Jesteście znajomymi na Facebooku</div>
              
              {/* Messages will be rendered here */}
              <Messages />
            </div>
            
            {/* Chat Footer with Input */}
            <div className='chat-footer'>
              <div className='action-buttons'>
                <div className='action-button'>
                  <MicIcon className='icon-voice' />
                </div>
                <div className='action-button'>
                  <PhotoIcon className='icon-photo' />
                </div>
                <div className='action-button'>
                  <AttachFileIcon className='icon-mask' />
                </div>
                <div className='action-button'>
                  <GifIcon className='icon-gif' />
                </div>
                <div className='input-container'>
                  <input 
                    type='text' 
                    placeholder='Aa' 
                    value={message}
                    onChange={handleMessageValueChange}
                    onKeyDown={handleKeyPressed}
                  />
                  <div className='emoji-button'>
                    <InsertEmoticonIcon className='icon-emoji' />
                  </div>
                </div>
                <div className='action-button' onClick={handleThumbUpClick}>
                  <ThumbUpAltIcon className='icon-like' />
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default MessengerContent;
