import React from 'react';
import Avatar from './Avatar';

const Message = ({
  content,
  sameAuthor,
  username,
  date,
  sameDay,
  isCurrentUser,
}) => {
  // Specjalny przypadek dla wygasłej wiadomości
  if (content === 'expired_message') {
    return (
      <div className='message-container other-user'>
        <div className='message-expired'>
          <div className='expired-title'>Wiadomość wygasła</div>
          <div className='expired-text'>
            Ta wiadomość już nie jest dostępna.
          </div>
        </div>
      </div>
    );
  }

  // Podobna wiadomość od tego samego autora (kontynuacja)
  if (sameAuthor && sameDay) {
    if (isCurrentUser) {
      return (
        <div className='message-container current-user'>
          <div className='message-text current-user'>{content}</div>
          <div className='message-status'>Wysłano</div>
        </div>
      );
    } else {
      return (
        <div className='message-container other-user'>
          <div className='message-wrapper'>
            <div className='avatar-placeholder'></div>
            <div className='message-text other-user'>{content}</div>
          </div>
        </div>
      );
    }
  }

  // Nowa wiadomość (z datą i awatarem jeśli to inny użytkownik)
  return (
    <>
      <div className='message-time'>{date}</div>
      
      <div className={`message-container ${isCurrentUser ? 'current-user' : 'other-user'}`}>
        {!isCurrentUser ? (
          <div className='message-wrapper'>
            <div className='avatar-container'>
              <Avatar username={username} showStatus={true} />
            </div>
            <div className='message-text other-user'>{content}</div>
          </div>
        ) : (
          <>
            <div className='message-text current-user'>{content}</div>
            <div className='message-status'>Wysłano</div>
          </>
        )}
      </div>
    </>
  );
};

export default Message;
