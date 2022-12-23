import React, { useState } from "react";
import "./Intro.css";
import "animate.css";
import Button from "../shared/Button";
import HomeRoomComponent from "../homeRoom/HomeRoomComponent";
import HamBurgerComponent from "../shared/HamBurgerComponent";

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
  const [hamOpen, setHamOpen] = useState(false);

  const toggleMenu = () => {
    console.log("toggle menu");
    setHamOpen((val) => !val);
  };

  return (
    <div className="height-fs intro-main-container">
      <p className="tag margin-none font-weight-bold">{"<html>"}</p>
      <p className="tag margin-none font-weight-bold marginL-1">{"<body>"}</p>
      <div className="flex-center" style={{ height: "89vh" }}>
        <div style={{ width: "80%" }}>
          <div className="width-100">
            <p className="tag margin-none font-weight-bold marginL-2">
              {"<h1>"}
            </p>
            <div className="marginL-4">
              {[...Array(intro.length)].map((_, index) => {
                return intro.charAt(index) !== "," ? (
                  index > 2 && intro.charAt(index) === "H" ? (
                    <span
                      onMouseOver={() => handleMouseOver(index)}
                      onMouseOut={() => handleMouseOut(index)}
                      key={index}
                      className={`color-primary font-coolvetica intro-text ${
                        intro.charAt(index) === " " && "txt-dec-none"
                      } ${
                        isHovering &&
                        hoveringIndex === index &&
                        "animate__animated animate__rubberBand animate__repeat-1"
                      }`}
                    >
                      {intro.charAt(index)}
                    </span>
                  ) : intro.charAt(index) === " " ? (
                    <span className="txt-dec-none font-size-sm" key={index}>
                      &nbsp;&nbsp;&nbsp;&nbsp;
                    </span>
                  ) : (
                    <span
                      onMouseOver={() => handleMouseOver(index)}
                      onMouseOut={() => handleMouseOut(index)}
                      key={index}
                      className={`color-white font-coolvetica intro-text ${
                        intro.charAt(index) === " " && "txt-dec-none"
                      } ${
                        isHovering &&
                        hoveringIndex === index &&
                        "animate__animated animate__rubberBand animate__repeat-1"
                      }`}
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
            <span className="tag margin-none font-weight-bold marginL-2">
              {"</h1>"}
            </span>
          </div>
          <div className="width-100">
            <p className="tag margin-none font-weight-bold marginL-2">
              {"<p>"}
            </p>
            <span
              className="font-sans color-gray font-size-sm marginL-3"
              style={{ letterSpacing: "4px" }}
            >
              Full Stack Developer
            </span>
            <p className="tag margin-none font-weight-bold marginL-2">
              {"</p>"}
            </p>
          </div>
          <div className="width-100 marginT-2" style={{ marginLeft: "3rem" }}>
            <Button name="send a message" />
          </div>
        </div>
        <div style={{ width: "50%" }} className='home-room-container'>
        <HomeRoomComponent />
        </div>
      </div>
    </div>
  );
}

export default IntroComponent;
