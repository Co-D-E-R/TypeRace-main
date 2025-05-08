import React, { useEffect } from "react";
import { TypeState } from "../../../context/TypeProvider.jsx";

import styled from "styled-components";
import { SocketState } from "../../../context/SocketProvider.jsx";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
  font-family: "Roboto Mono", monospace;
`;

const StatCard = styled.div`
  background-color: #1a1a1a;
  color: #fff;
  padding: 20px;
  margin: 10px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  text-align: center;
  width: 200px;
`;

const Title = styled.h1`
  background-image: linear-gradient(90deg, #ff8c00, #ff0080);
  color: transparent;
  background-clip: text;
  -webkit-background-clip: text;
  font-size: 2.5rem;
  margin-bottom: 20px;
`;

const Result = () => {
  const { speed, accuracy, rawSpeed, setMultiplayer } = TypeState();

  // const { socket, setSocket } = SocketState();

  useEffect(() => {
    // setMultiplayer(false);
    // socket?.off("disconnect");
    // setSocket(null);
  }, []);

  return (
    <Container>
      <div style={{ display: "flex" }}>
        <StatCard>
          <h2>WPM</h2>
          <p>{speed.current < 0 ? 0 : speed.current}</p>
        </StatCard>
        <StatCard>
          <h2>Accuracy</h2>
          <p>{accuracy.current}%</p>
        </StatCard>
        <StatCard>
          <h2>Raw WPM</h2>
          <p>{rawSpeed.current}</p>
        </StatCard>
      </div>
    </Container>
  );
};

export default Result;
