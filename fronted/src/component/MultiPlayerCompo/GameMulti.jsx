import React, { useEffect, useRef, useState } from "react";
import { TypeState } from "../../../context/TypeProvider.jsx";
import WordCard from "../../../features/WordCard.jsx";
import Result from "../../pages/Result.jsx";
import { SocketState } from "../../../context/SocketProvider.jsx";
// import { socket } from "./Socket.js";

const GameMulti = ({ words, setWords }) => {
  // const [words, setWords] = useState("");
  const {
    time,
    isGameStart,
    handleStart,
    reset,
    errorWord,
    arrayWord,
    correctWord,
    correctChar,
    errorChar,
    setCorrectWord,
    setErrorChar,
    setCorrectChar,
    setErrorWord,
  } = TypeState();

  const typedLetter = useRef("");
  const start = useRef(0);
  const curentMargin = useRef(0);
  const textref = useRef();
  const allCorrect = useRef(1);

  const handleStartZero = () => {
    typedLetter.current = "";
    start.current = 0;
    allCorrect.current = 1;
    curentMargin.current = 0;
    arrayWord.current = [];
    setCorrectWord(0);
    setErrorChar(0);
    setCorrectChar(0);
    setErrorWord(0);
  };

  const addClass = (el, name) => {
    if (el) {
      el.classList.add(name);
      if (name === "incorrect")
        (allCorrect.current -= 1), setErrorChar(errorChar + 1);
      else if (name === "correct") setCorrectChar(correctChar + 1);
    } else {
      console.log("Msg From Add Class : element Is Null\n");
    }
  };

  const removeClass = (el, name) => {
    if (el) {
      if (el.classList.contains(name) && name === "incorrect")
        allCorrect.current += 1;
      el.classList.remove(name);
    } else {
      console.log("Msg From Remove Class : Element is Null\n");
    }
  };

  useEffect(() => {}, []);

  const handleKeyPress = async (e) => {
    // try
    {
      if (isGameStart === false) handleStart();
      typedLetter.current = e.key;

      var isBackSpace = typedLetter.current === "Backspace";

      var currWord;
      var isFirstLetter;

      if (start.current == 0) {
        if (isBackSpace) return;
        // Add class to Word
        currWord = textref.current.querySelector(".word");
        addClass(currWord, "current");
        // Add class To Letter
        addClass(textref.current.querySelector(".letter"), "current");
      } else {
        currWord = textref.current.querySelector(".word.current");
      }
      start.current += 1;

      var currentLetterEle = textref.current.querySelector(".letter.current");

      var expectedLetter = currentLetterEle.innerHTML;

      if (expectedLetter === "à") expectedLetter = " ";
      if (expectedLetter === " " && !isBackSpace) {
        addClass(
          currentLetterEle,
          expectedLetter == typedLetter.current ? "correct" : "incorrect"
        );

        // handling correct word Count And Incorrect word Count
        arrayWord.current.push(allCorrect.current);
        setCorrectWord(correctWord + (allCorrect.current === 1));
        setErrorWord(errorWord.current + (allCorrect.current !== 1));
        allCorrect.current = 1;

        removeClass(currentLetterEle, "current");
        removeClass(textref.current.querySelector(".word.current"), "current");
        addClass(currWord.nextSibling, "current");
        removeClass(currWord, "current");
        currWord = currWord.nextSibling;
        addClass(currWord.firstElementChild, "current");
      } else {
        currentLetterEle = textref.current.querySelector(".letter.current");
        expectedLetter = currentLetterEle.innerHTML;
      }
      if (expectedLetter === "à") expectedLetter = " ";

      if (expectedLetter != " " && typedLetter.current.length == 1) {
        if (expectedLetter) {
          addClass(
            currentLetterEle,
            expectedLetter == typedLetter.current ? "correct" : "incorrect"
          );
          removeClass(currentLetterEle, "current");
          addClass(currentLetterEle.nextSibling, "current");
        }
      }

      if (isBackSpace) {
        isFirstLetter = currentLetterEle === currWord.firstElementChild;
        // Handling first Word
        if (textref.current.querySelector(".word") == currWord) {
          if (isFirstLetter) {
            if (arrayWord.current.length) {
              const temp = arrayWord.current.pop();
              if (temp == 1) setCorrectWord(correctWord - 1);
              else setErrorWord(errorWord - 1);
              allCorrect.current = 1;
            }
            return;
          }

          addClass(currentLetterEle.previousElementSibling, "current");
          removeClass(currentLetterEle.previousElementSibling, "correct");
          removeClass(currentLetterEle.previousElementSibling, "incorrect");
        }

        removeClass(currentLetterEle, "current");

        if (isFirstLetter && currWord.previousElementSibling) {
          // handling correct word Count And Incorrect word Count
          const temp = arrayWord.current.pop();
          if (temp == 1) setCorrectWord(correctWord - 1);
          else setErrorWord(errorWord - 1);
          allCorrect.current = temp;

          removeClass(currWord, "current");
          addClass(currWord.previousElementSibling.lastElementChild, "current");
          addClass(currWord.previousElementSibling, "current");
          removeClass(
            currWord.previousElementSibling.lastElementChild,
            "correct"
          );
          removeClass(
            currWord.previousElementSibling.lastElementChild,
            "incorrect"
          );
        } else {
          addClass(currentLetterEle.previousElementSibling, "current");
          removeClass(currentLetterEle.previousElementSibling, "correct");
          removeClass(currentLetterEle.previousElementSibling, "incorrect");
        }
      }

      // moving line or words
      const words = textref.current.querySelector(".words");
      var dif =
        parseInt(words.getBoundingClientRect().top) -
        parseInt(currWord.getBoundingClientRect().top);
      // console.log(dif, -35 + curentMargin.current, curentMargin.current);
      if (dif != 0) {
        var margin = parseInt(words.style.marginTop || "0px");
        if (dif < -35 + curentMargin.current) {
          margin -= 35;
          curentMargin.current -= 35;
          words.style.marginTop = margin + "px";
        } else if (dif > -35 + curentMargin.current) {
          margin += 35;
          curentMargin.current += 35;
          words.style.marginTop = margin + "px";
        }
      }

      // moving Cursor
      var nextLetter = textref.current.querySelector(".letter.current");
      var nextWord = textref.current.querySelector(".word.current");
      var cursor = textref.current.querySelector(".cursor");
      cursor.style.top =
        (nextLetter || nextWord).getBoundingClientRect().top + 2 + "px";
      cursor.style.left =
        (nextLetter || nextWord).getBoundingClientRect()[
          nextLetter ? "left" : "right"
        ] + "px";
    }
    // catch (error) {
    //   console.log(`Msg:${error}`);
    // }
  };

  useEffect(() => {
    // Handling Removing Classes
    if (textref.current) {
      // Adjusting Margin
      textref.current.querySelector(".words").style.marginTop = 0;

      const letters = textref.current.querySelectorAll(".letter");
      letters.forEach((letter) => {
        letter.classList.remove("current", "incorrect", "correct");
      });
      const words1 = textref.current.querySelectorAll(".word");
      words1.forEach((word) => {
        word.classList.remove("current");
        start.current = 0;
      });
    }

    //Reseting All Values
    handleStartZero();

    // Handles Cursor Positon When no word is Typed (Starting Position Of Word)
    var nextLetter = textref.current.querySelector(".letter");
    var nextWord = textref.current.querySelector(".word");
    var cursor = textref.current.querySelector(".cursor");
    cursor.style.top =
      (nextLetter || nextWord).getBoundingClientRect().top + 2 + "px";
    cursor.style.left =
      (nextLetter || nextWord).getBoundingClientRect()[
        nextLetter ? "left" : "right"
      ] + "px";
  }, []);

  // Handle Cursor Positon When dimension is chnaged
  const [windowDimensions, setWindowDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      if (textref.current.querySelector(".letter.current") != null) {
        var nextLetter = textref.current.querySelector(".letter.current");
        var nextWord = textref.current.querySelector(".word.current");
        var cursor = textref.current.querySelector(".cursor");
        cursor.style.top =
          (nextLetter || nextWord).getBoundingClientRect().top + 2 + "px";
        cursor.style.left =
          (nextLetter || nextWord).getBoundingClientRect()[
            nextLetter ? "left" : "right"
          ] + "px";
      } else {
        var nextLetter = textref.current.querySelector(".letter");
        var nextWord = textref.current.querySelector(".word");
        var cursor = textref.current.querySelector(".cursor");
        cursor.style.top =
          (nextLetter || nextWord).getBoundingClientRect().top + 2 + "px";
        cursor.style.left =
          (nextLetter || nextWord).getBoundingClientRect()[
            nextLetter ? "left" : "right"
          ] + "px";
      }
      setWindowDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    window.addEventListener("resize", handleResize);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Handling Cursor whenver page is scroll
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (textref.current.querySelector(".letter.current") != null) {
        var nextLetter = textref.current.querySelector(".letter.current");
        var nextWord = textref.current.querySelector(".word.current");
        var cursor = textref.current.querySelector(".cursor");
        cursor.style.top =
          (nextLetter || nextWord).getBoundingClientRect().top + 2 + "px";
        cursor.style.left =
          (nextLetter || nextWord).getBoundingClientRect()[
            nextLetter ? "left" : "right"
          ] + "px";
      } else {
        var nextLetter = textref.current.querySelector(".letter");
        var nextWord = textref.current.querySelector(".word");
        var cursor = textref.current.querySelector(".cursor");
        cursor.style.top =
          (nextLetter || nextWord).getBoundingClientRect().top + 2 + "px";
        cursor.style.left =
          (nextLetter || nextWord).getBoundingClientRect()[
            nextLetter ? "left" : "right"
          ] + "px";
      }
      const position = window.scrollY;
      setScrollPosition(position);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // not calling setCurrent inside map because it can cause infinite rendering
  return (
    <div
      className="game"
      tabIndex="0"
      onKeyDown={(e) => handleKeyPress(e)}
      ref={textref}
      style={{ overflow: "hidden" }}
    >
      <div className="words">
        <WordCard words={words} />
      </div>
      <div className="cursor"></div>
      <div className="focus-error">Click Here To Focus</div>
    </div>
  );
};

export default GameMulti;
