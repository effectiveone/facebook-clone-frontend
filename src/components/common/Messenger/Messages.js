import React, { useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Message from './Message';

const Messages = () => {
  const messages = useSelector((state) => state.chat.messages);
  const currentUserId = useSelector((state) => state.user?.id || 'current'); // Domyślna wartość dla przykładu

  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const formatDate = (dateString) => {
    if (!dateString) return '';

    const date = new Date(dateString);
    const today = new Date();

    // Dla wiadomości z dzisiaj pokazuj tylko godzinę
    if (date.toDateString() === today.toDateString()) {
      return date.toLocaleTimeString('pl-PL', {
        hour: '2-digit',
        minute: '2-digit',
      });
    }

    // Dla starszych wiadomości pokaż pełną datę
    return date
      .toLocaleDateString('pl-PL', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      })
      .replace(',', '');
  };

  if (!messages || !Array.isArray(messages) || messages.length === 0) {
    return <div ref={messagesEndRef} />;
  }

  return (
    <>
      {messages.map((message, index) => {
        const sameAuthor =
          index > 0 &&
          messages[index]?.author?._id === messages[index - 1]?.author?._id;

        const sameDay =
          index > 0 &&
          new Date(message?.date).toDateString() ===
            new Date(messages[index - 1]?.date).toDateString();

        const isCurrentUser = message?.author?._id === currentUserId;
        const formattedDate = formatDate(message?.date);

        return (
          <React.Fragment key={message?._id || index}>
            {(!sameDay || index === 0) && (
              <div className='message-date'>{formattedDate}</div>
            )}
            <Message
              content={message?.content}
              username={message?.author?.username}
              sameAuthor={sameAuthor}
              date={formattedDate}
              sameDay={sameDay}
              isCurrentUser={isCurrentUser}
            />
          </React.Fragment>
        );
      })}
      <div ref={messagesEndRef} />
    </>
  );
};

export default Messages;
