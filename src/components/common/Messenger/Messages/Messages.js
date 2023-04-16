import React, { useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import MessagesHeader from "./MessagesHeader";
import DUMMY_MESSAGES from "./DUMMY_MESSAGES";
import Message from "./Message";
import DateSeparator from "./DateSeparator";

const convertDateToHumanReadable = (date, format) => {
  const map = {
    mm: date.getMonth() + 1,
    dd: date.getDate(),
    yy: date.getFullYear().toString().slice(-2),
    yyyy: date.getFullYear(),
  };

  return format.replace(/mm|dd|yy|yyy/gi, (matched) => map[matched]);
};

const Messages = () => {
  const messages = useSelector((state) => state.chat.messages);
  const chosenChatDetails = useSelector(
    (state) => state.chat.chosenChatDetails
  );
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <>
      <MessagesHeader name={chosenChatDetails?.name} />
      <div
        className="messages-container"
        style={{ height: "300px", backgroundColor: "red" }}
      >
        {messages &&
          Array.isArray(messages) &&
          messages.length > 0 &&
          messages?.map((message, index) => {
            const sameAuthor =
              index > 0 &&
              messages[index].author._id === messages[index - 1].author._id;

            const sameDay =
              index > 0 &&
              convertDateToHumanReadable(new Date(message.date), "dd/mm/yy") ===
                convertDateToHumanReadable(
                  new Date(messages[index - 1].date),
                  "dd/mm/yy"
                );

            return (
              <div key={message._id} style={{ width: "97%" }}>
                {(!sameDay || index === 0) && (
                  <DateSeparator
                    date={convertDateToHumanReadable(
                      new Date(message.date),
                      "dd/mm/yy"
                    )}
                  />
                )}
                <Message
                  content={message.content}
                  username={message.author.username}
                  sameAuthor={sameAuthor}
                  date={convertDateToHumanReadable(
                    new Date(message.date),
                    "dd/mm/yy"
                  )}
                  sameDay={sameDay}
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
