import React, { useEffect, useRef } from "react";
import { TypeState } from "../../context/TypeProvider.jsx";

const CurrTimeSpeed = () => {
  const {
    time,
    isGameRunning,
    speed,
    correctWord,
    errorWord,
    accuracy,
    errorChar,
    correctChar,
    rawSpeed,
  } = TypeState();

  const handleRawWpm = () => {
    const startTime = parseInt(localStorage.getItem("prevSelectTime"));
    if (startTime !== time)
      rawSpeed.current = parseInt(
        ((correctChar + errorChar) * 60) / (5 * (startTime - time))
      ).toFixed(0);
    else rawSpeed.current = 0;
  };

  const handleNetWpm = () => {
    const startTime = parseInt(localStorage.getItem("prevSelectTime"));
    if (startTime !== time)
      speed.current = parseInt(
        rawSpeed.current - (errorChar * 60) / (5 * (startTime - time))
      ).toFixed(0);
    else speed.current = 0;
    //if (speed.current < 0) speed.current = 0;
  };

  useEffect(() => {
    accuracy.current = correctChar / (correctChar + errorChar);
    accuracy.current *= 100;
    accuracy.current = accuracy.current.toFixed(0);
    handleRawWpm();
    handleNetWpm();
  }, [correctChar, errorChar]);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        marginTop: "-20px",
        marginBottom: "15px",
      }}
    >
      <span>{time}</span>
      <span>
        {isGameRunning ? (speed.current < 0 ? 0 : speed.current) : ""}
      </span>
    </div>
  );
};

export default CurrTimeSpeed;
