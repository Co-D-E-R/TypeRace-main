import React from "react";

const WordCard = ({ words }) => {
  return (
    <>
      {words.split(" ").map((word, index) => {
        return (
          <div className="word" key={index}>
            {word.split("").map((letter, index1) => {
              return (
                <span key={index1} className="letter">
                  {letter}
                </span>
              );
            })}
            <span className="letter space">à</span>
          </div>
        );
      })}
    </>
  );
};

export default WordCard;
