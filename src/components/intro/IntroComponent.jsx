import React, { useState } from "react";
import "./Intro.css";
import "animate.css";
import hLogo from "../../assets/hLogo.svg";
import Button from "../shared/Button";

function IntroComponent() {
  let intro = "Hi,I'm Hemanth,Web Developer";
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
      <p className="tag animate__animated animate__bounce animate__repeat-1 margin-none font-weight-bold">
        {"<html>"}
      </p>
      <p
        className="tag animate__animated animate__bounce animate__repeat-1 margin-none font-weight-bold marginL-1"
      >
        {"<body>"}
      </p>
      <div className="flex-col-center" style={{ height: "89vh" }}>
        <div className="width-100">
          <p
            className="tag animate__animated animate__bounce animate__repeat-1 margin-none font-weight-bold marginL-2"
          >
            {"<h1>"}
          </p>
          <div className="marginL-3">
            {[...Array(intro.length)].map((_, index) => {
              return intro.charAt(index) !== "," ? (
                index > 2 && intro.charAt(index) === "H" ? (
                  <img className="hlogo" src={hLogo} alt="" />
                ) : intro.charAt(index) === " " ? (
                  <span className="txt-dec-none font-size-sm">
                    &nbsp;&nbsp;&nbsp;&nbsp;
                  </span>
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
              ) : (
                <>
                  <span
                    className={`color-white font-coolvetica intro-text ${
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
          <span
            className="tag animate__animated animate__bounce animate__repeat-1 margin-none font-weight-bold marginL-2"
          >
            {"</h1>"}
          </span>
        </div>
        <div className="width-100">
          <p
            className="tag animate__animated animate__bounce animate__repeat-1 margin-none font-weight-bold marginL-2"
          >
            {"<p>"}
          </p>
          <span
            className="font-sans color-gray font-size-sm marginL-3"
            style={{ letterSpacing: "4px" }}
          >
            Full Stack Developer
          </span>
          <p
            className="tag animate__animated animate__bounce animate__repeat-1 margin-none font-weight-bold marginL-2"
          >
            {"</p>"}
          </p>
        </div>
      <div className="width-100 marginT-2" style={{marginLeft:'7rem'}} >
      <Button name='send a message' />
      </div>
      </div>

    </>
  );
}

export default IntroComponent;
