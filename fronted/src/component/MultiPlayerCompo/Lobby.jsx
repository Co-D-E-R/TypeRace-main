import React from "react";
import "./Lobby.css";

const Lobby = ({ time }) => {
  return (
    <div
      className="word"
      style={{
        fontSize: "3rem",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
      }}
    >
      {" "}
      <span className="letter">Starts In</span>
      <span className="letter time" style={{ margin: "10px" }}>
        {time}
      </span>
    </div>
  );
};

export default Lobby;
