import React from "react";
import socket from "../socket";

function Chat({ users, messages, userName, roomId, onAddMessage }) {
  //  create state  //
  const [messageValue, setMessageValue] = React.useState("");

  //  link to div messages  //
  const messagesRef = React.useRef(null);

  // func done then "send message" clicked //
  const onSendMessage = () => {
    if (!messageValue) {
      return alert("Please type your message");
    }
    socket.emit("ROOM:NEW_MESSAGE", {
      userName,
      roomId,
      text: messageValue,
    });

    // add message to yourself  //
    onAddMessage({
      userName,
      text: messageValue,
    });
    setMessageValue("");
  };

  // scroll down then div messages changed  //
  React.useEffect(() => {
    messagesRef.current.scrollTo(0, 9999);
  }, [messages]);

  return (
    <div className="chat-block">
      <div className="chat-block__users">
        <div>
          <h2>Room {roomId}</h2>
          Online
          <span>({users.length})</span>
        </div>
        <ul>
          {users.map((name, index) => (
            <li key={name + index}>{name}</li>
          ))}
        </ul>
      </div>
      <div className="chat-block__messages">
        <div className="messages" ref={messagesRef}>
          {messages.map((message) => (
            <div className="message">
              <p className="message__text">{message.text}</p>
              <p className="message__user">{message.userName}</p>
            </div>
          ))}
        </div>
        <div className="form">
          <form>
            <textarea
              placeholder="type your message..."
              className="form__text"
              value={messageValue}
              onChange={(e) => setMessageValue(e.target.value)}
              rows="3"
            ></textarea>
            <button className="send__btn" type="button" onClick={onSendMessage}>
              Send
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Chat;
