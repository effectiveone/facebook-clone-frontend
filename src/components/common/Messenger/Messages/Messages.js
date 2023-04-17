import React, { useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import Message from "./Message";
import DateSeparator from "./DateSeparator";
import { dummy_data } from "./DUMMY_MESSAGES";
import { convertDateToHumanReadable } from "../../../../utils/convertDate";

const Messages = () => {
  const messages = useSelector((state) => state.chat.messages);
  const currentUserId = useSelector((state) => state.user?.id); // Add this line

  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <>
      <div className="messages-container">
        {messages &&
          Array.isArray(messages) &&
          messages.length > 0 &&
          messages?.map((message, index) => {
            const sameAuthor =
              index > 0 &&
              messages[index]?.author?._id === messages[index - 1]?.author?._id;

            const sameDay =
              index > 0 &&
              convertDateToHumanReadable(
                new Date(message?.date),
                "dd/mm/yy"
              ) ===
                convertDateToHumanReadable(
                  new Date(messages[index - 1]?.date),
                  "dd/mm/yy"
                );

            // Messages.js
            return (
              <div key={message?._id} style={{ width: "97%" }}>
                {(!sameDay || index === 0) && (
                  <DateSeparator
                    date={convertDateToHumanReadable(
                      new Date(message?.date),
                      "dd/mm/yy"
                    )}
                  />
                )}
                <Message
                  content={message?.content}
                  username={message?.author?.username}
                  sameAuthor={sameAuthor}
                  date={convertDateToHumanReadable(
                    new Date(message?.date),
                    "dd/mm/yy"
                  )}
                  sameDay={sameDay}
                  isCurrentUser={message?.author?._id === currentUserId}
                />
              </div>
            );
          })}
        <div ref={messagesEndRef} />
      </div>
    </>
  );
};

export default Messages;
