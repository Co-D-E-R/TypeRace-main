import React, { useEffect, useRef, useState } from "react";
import { TypeState } from "../../../context/TypeProvider.jsx";

const CurrTimeMulti = ({ time }) => {
  const {
    isGameRunning,
    speed,
    correctWord,
    errorWord,
    accuracy,
    errorChar,
    correctChar,
    rawSpeed,
    setIsGameEnd,
    setMultiplayer,
  } = TypeState();

  const handleRawWpm = () => {
    const startTime = 30;
    if (startTime !== time)
      rawSpeed.current = parseInt(
        ((correctChar + errorChar) * 60) / (5 * (startTime - time))
      ).toFixed(0);
    else rawSpeed.current = 0;
  };

  const handleNetWpm = () => {
    const startTime = 30;
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
    if (!accuracy.current) accuracy.current = 0;
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

export default CurrTimeMulti;
