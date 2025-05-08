import React, { useState, useEffect } from "react";

const WindowDimensions = () => {
  const [windowDimensions, setWindowDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    console.log(window.innerWidth);
    window.addEventListener("resize", handleResize);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div>
      <h1>Window Dimensions</h1>
      <p>Width: {windowDimensions.width}</p>
      <p>Height: {windowDimensions.height}</p>
    </div>
  );
};

export default WindowDimensions;
