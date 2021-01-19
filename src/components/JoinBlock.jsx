import React from "react";
import axios from "axios";

function JoinBlock({ onLogin }) {
  //  create state  //
  const [roomId, setRoomId] = React.useState("");
  const [userName, setUserName] = React.useState("");
  const [isLoading, setLoading] = React.useState(false);

  // done then "enter" button clicked //
  const onEnter = async () => {
    if (!roomId || !userName) {
      return alert("Input user data!");
    }
    const obj = {
      roomId,
      userName,
    };
    setLoading(true);
    await axios.post("/rooms", obj);
    onLogin(obj);
  };

  return (
    <div className="join-block">
      <input
        type="text"
        placeholder="Room ID"
        value={roomId}
        onChange={(e) => setRoomId(e.target.value)}
      ></input>
      <input
        type="text"
        placeholder="Your name"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
      ></input>
      <button
        className="join-block__btn"
        onClick={onEnter}
        disabled={isLoading}
      >
        {isLoading ? "Entering..." : "Start chat"}
      </button>
    </div>
  );
}

export default JoinBlock;
