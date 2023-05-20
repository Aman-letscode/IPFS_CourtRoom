import React from "react";
import { Link } from "react-router-dom";
import Button from 'react-bootstrap/Button';

import "./Home.css";

const Home = () => {
  const [roomName, setRoomName] = React.useState("");

  const handleRoomNameChange = (event) => {
    setRoomName(event.target.value);
    console.log(roomName);
  };
  const handleSubmit = (e) =>{
    e.preventDefault();
    
    localStorage.setItem('roomId',roomName);
    window.location = "/"+roomName
  }

  return (
    <div className="home-container">
      <input
        type="text"
        value={roomName}
        onChange={handleRoomNameChange}
        placeholder="Room"
        className="text-input-field"
      />
      {/* <Link to={`/${roomName}`} className="enter-room-button">
        Join room
      </Link> */}
      {/* <Button variant="primary" type="submit" onClick={handleSubmit}>
        Submit
      </Button> */}
      <button onClick={handleSubmit} className="send-message-button">
        Send
      </button>
    </div>
  );
};

export default Home;


