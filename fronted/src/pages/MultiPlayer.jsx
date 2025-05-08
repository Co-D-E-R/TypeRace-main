import React, { useEffect, useRef, useState } from "react";
import Header from "../component/Header.jsx";
import GameMulti from "../component/MultiPlayerCompo/GameMulti.jsx";
import CurrTimeMulti from "../component/MultiPlayerCompo/CurrentTimeMulti.jsx";
import { TypeState } from "../../context/TypeProvider.jsx";
import ResultMulti from "../component/MultiPlayerCompo/ResultMulti.jsx";
import ProgressBar from "../component/MultiPlayerCompo/ProgressBar.jsx";
import { SocketState } from "../../context/SocketProvider.jsx";
import { io } from "socket.io-client";
import { useLocation, useNavigate, useNavigationType } from "react-router-dom";
import Lobby from "../component/MultiPlayerCompo/Lobby.jsx";
import Waiting from "../component/MultiPlayerCompo/Waiting.jsx";
import InformationBarMulti from "../component/MultiPlayerCompo/InformationBarMulti.jsx";

let socket;
// const ENDPOINT = "https://typerace-r522.onrender.com/";
const ENDPOINT = window.location.origin.includes('localhost') 
  ? "http://localhost:8080" 
  : window.location.origin;

const MultiPlayer = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const {
    setMultiplayer,
    correctWord,
    playerName,
    setPlayerName,
    handleEndTimeMulti,
    speed,
  } = TypeState();
  const maxWords = useRef(0);
  const [words, setWords] = useState("");
  const [users, setUsers] = useState([]);
  let dummyUser = useRef([]);
  const [Looby, setLooby] = useState(false);
  const [multiGameEnd, setMultiGameEnd] = useState(false);
  const [waiting, setWaiting] = useState(true);
  const [remTime, setRemTime] = useState(null);
  const id = useRef(null);
  const [roomId, setRoomId] = useState("");

  const [time, setTime] = useState(null);
  const intervalRef = useRef(null);

  const handleUpdate = () => {
    setUsers(dummyUser);
  };

  useEffect(() => {
    if (!state) return navigate("/");
    if (state.name) setPlayerName(state.name);

    socket = io(ENDPOINT);

    socket.on("connected", (socketID) => {
      id.current = socketID;
      // console.log(socketID);
    });

    // socket.emit("infoName", state.name);

    socket.emit("Waiting", state.name);

    socket.on("joinRoom", ({ roomId, roomUsers }) => {
      // console.log(roomId, roomUsers);
      for (const roomUser of roomUsers) {
        let notFound = true;
        for (const user of dummyUser.current) {
          if (user.id === roomUser.id) {
            notFound = false;
            break;
          }
        }
        if (notFound)
          dummyUser.current.push({
            id: roomUser.id,
            name: roomUser.Name,
            progress: 0,
          });
      }
      setRoomId(roomId);
      setWaiting(false);
      setLooby(true);
      setMultiplayer(true);
    });

    socket.on("words", (ServerWords) => {
      // console.log(ServerWords);
      maxWords.current = ServerWords.split(" ").length;
      setWords(ServerWords);
    });

    socket.on("RemStartTime", (time) => {
      // console.log(time);
      setRemTime(time);
    });

    socket.on("StartGame", () => {
      setLooby(false);
      setUsers(dummyUser.current);
      // handleUpdate();
      // console.log("Game Started", dummyUser, users);
    });

    socket.on("another", (data) => {
      // dummyUser.current.map((user) => {
      //   if (user.id === data.id) {
      //     return {
      //       ...user,
      //       progress: data.progess,
      //     };
      //   }
      // });
      // console.log(data);
      const initializedDummyUsers = dummyUser.current.map((user) => {
        // console.log(user);
        if (user.id === data.id) {
          return { ...user, progress: data.progress };
        } else {
          return user;
        }
      });
      dummyUser.current = initializedDummyUsers;
      // console.log(dummyUser.current, initializedDummyUsers);
      setUsers(initializedDummyUsers);
    });

    socket.on("time", (Time) => {
      // console.log(Time);
      speed.current = 0;
      setTime(Time);
      // Clear any existing interval
      clearInterval(intervalRef.current);
      // Set up a new interval
      intervalRef.current = setInterval(() => {
        setTime((prevTime) => {
          if (prevTime <= 1) {
            handleEndTimeMulti();
            setMultiGameEnd(true);
            clearInterval(intervalRef.current);
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000); // Decrement every second
    });

    return () => {
      socket.off("time");
      clearInterval(intervalRef.current);
      socket.disconnect();
      dummyUser.current = [];
    };
  }, []);

  // It is necessary to Update Users Before Rendering
  useEffect(() => {
    // console.log("Users updated:", users);
  }, [users]);

  // Self Data
  useEffect(() => {
    // console.log(users);
    if (maxWords.current)
      socket.emit("another", {
        roomId: roomId,
        id: id.current,
        Name: playerName,
        progress: (correctWord / maxWords.current) * 100,
      });
  }, [correctWord]);

  // Another Person

  const colors = ["#a0d2eb", "#a28089"];

  return (
    <>
      <Header />
      <div id="main" style={{ marginTop: "20px" }}>
        {waiting ? (
          <Waiting />
        ) : (
          <>
            {Looby ? (
              <Lobby text="Wating" time={remTime} />
            ) : (
              <>
                {!multiGameEnd ? (
                  <>
                    <CurrTimeMulti time={time} />
                    <GameMulti words={words} setWords={setWords} />
                    <div style={{ marginTop: "10vh" }}>
                      {users.map((user, index) => (
                        <ProgressBar
                          key={user.id}
                          user={user.name}
                          color={colors[index % colors.length]}
                          progress={user.progress}
                        />
                      ))}
                    </div>
                  </>
                ) : (
                  <div style={{ marginTop: "5vh" }}>
                    <InformationBarMulti />
                    <ResultMulti />
                    {users.map((user, index) => (
                      <ProgressBar
                        key={user.id}
                        user={user.name}
                        color={colors[index % colors.length]}
                        progress={user.progress}
                      />
                    ))}
                  </div>
                )}
              </>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default MultiPlayer;
