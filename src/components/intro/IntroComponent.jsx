import React, { useState } from "react";
import "./Intro.css";
import "animate.css";
import hLogo from "../../assets/hLogo.svg";

function IntroComponent() {
  let intro = "Hi, I'm Hemanth, Full Stack Web Dev";
  const [isHovering, setIsHovering] = useState(false);
  const [hoveringIndex, setHoveringIndex] = useState(null);

  // handler to check mouse hover
  const handleMouseOver = (hoveringIndex) => {
    setIsHovering(true);
    setHoveringIndex(hoveringIndex);
  };

  // handler to check mouse hover
  const handleMouseOut = () => {
    setIsHovering(false);
    setHoveringIndex(null);
  };

  return (
    <>
      <p className="tag animate__animated animate__bounce animate__repeat-1 margin-none">
        {"<body>"}
      </p>
      <div style={{ height: "100vh" }}>
        {[...Array(intro.length)].map((_, index) => {
          return intro.charAt(index) !== "," ? (
            index > 2 && intro.charAt(index) === "H" ? (
              <img className="hlogo" src={hLogo} alt="" />
            ) : (
              <span
                onMouseOver={() => handleMouseOver(index)}
                onMouseOut={() => handleMouseOut(index)}
                className={`color-white font-coolvetica intro-text ${
                  intro.charAt(index) === " " && "txt-dec-none"
                } ${
                  isHovering &&
                  hoveringIndex === index &&
                  "animate__animated animate__rubberBand animate__repeat-1"
                }`}
                key={index}
              >
                {intro.charAt(index)}
              </span>
            )
          ) : intro.charAt(index) === " " ? (
            <span className="txt-dec-none">{intro.charAt(index)}</span>
          ) : (
            <>
              <span
                className={`animate__animated animate__rubberBand color-white font-coolvetica intro-text ${
                  isHovering &&
                  hoveringIndex === index &&
                  "animate__animated animate__bounce animate__repeat-1"
                }`}
                key={index}
              >
                {intro.charAt(index)}
              </span>
              <br />
            </>
          );
        })}
      </div>
    </>
  );
}

export default IntroComponent;
