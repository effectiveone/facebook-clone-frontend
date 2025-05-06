import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setMessages } from '../../../store/actions/chatActions';
import MicIcon from '@material-ui/icons/Mic';
import ImageIcon from '@material-ui/icons/Image';
import GifIcon from '@material-ui/icons/Gif';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import { sendDirectMessage } from '../Realtime-communication/socketConnection';

const NewMessageInput = () => {
  const [message, setMessage] = useState('');
  const dispatch = useDispatch();
  const chosenChatDetails = useSelector(
    (state) => state.chat.chosenChatDetails,
  );

  const handleMessageValueChange = (event) => {
    setMessage(event.target.value);
  };

  const handleKeyPressed = (event) => {
    if (event.key === 'Enter') {
      handleSendMessage();
    }
  };

  const handleSendMessage = () => {
    if (message.trim().length > 0) {
      sendDirectMessage({
        receiverUserId: chosenChatDetails.id,
        content: message.trim(),
      });
      if (
        chosenChatDetails &&
        chosenChatDetails.messages &&
        Array.isArray(chosenChatDetails.messages)
      ) {
        dispatch(
          setMessages([
            ...chosenChatDetails.messages,
            { content: message.trim(), isSent: true },
          ]),
        );
      } else {
        dispatch(setMessages([{ content: message.trim(), isSent: true }]));
      }
      setMessage('');
    }
  };

  const handleThumbUpClick = () => {
    if (message.trim().length === 0) {
      sendDirectMessage({
        receiverUserId: chosenChatDetails.id,
        content: '👍',
      });
      if (
        chosenChatDetails &&
        chosenChatDetails.messages &&
        Array.isArray(chosenChatDetails.messages)
      ) {
        dispatch(
          setMessages([
            ...chosenChatDetails.messages,
            { content: '👍', isSent: true },
          ]),
        );
      } else {
        dispatch(setMessages([{ content: '👍', isSent: true }]));
      }
    } else {
      handleSendMessage();
    }
  };

  return (
    <div className='chat-footer'>
      <div className='action-buttons'>
        <div className='action-button'>
          <MicIcon className='icon-voice' />
        </div>
        <div className='action-button'>
          <ImageIcon className='icon-photo' />
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
  );
};

export default NewMessageInput;
