import React from "react";

const Waiting = () => {
  return (
    <div className="word">
      <span
        className="blink"
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        Waiting For Other Players..........
      </span>
    </div>
  );
};

export default Waiting;
