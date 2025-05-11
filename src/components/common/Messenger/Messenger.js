import React from 'react';
import { useSelector } from 'react-redux';
import MessengerContent from './MessengerContent';

const Messenger = () => {
  const chosenChatDetails = useSelector(
    (state) => state.chat.chosenChatDetails,
  );

  return (
    <div className='messenger-container'>
      {chosenChatDetails && <MessengerContent />}
    </div>
  );
};

export default Messenger;
