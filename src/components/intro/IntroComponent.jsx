import React, { useState } from "react";
import "./Intro.css";
import "animate.css";
import Button from "../shared/Button";
import WeatherComponent from "../shared/WeatherComponent";

function IntroComponent() {
  let intro = "Hi,I'm Hemanth,Web Developer";
  const [hoveringIndices, setHoveringIndices] = useState([])

  // sideeffect on mouse hover
  const handleMouseOver = (hoveringIndex) => {
    setHoveringIndices(prevArr => [...prevArr, hoveringIndex])
  };

  // sideEffect on mouseHoverOut
  const handleMouseOut = (hoveringIndex) => {
    setTimeout(() => {
      // remove the hovering index from state
      setHoveringIndices(prevVal => prevVal.filter(item => item !== hoveringIndex))
    }, [500])
  };

  const handleSendMsgClick = () => {
    let ele = document.querySelector('.contact-main-container')
    ele.scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });
  }

  return (
    <div className="height-fs intro-main-container">
    <WeatherComponent />
      <p className="tag margin-none font-weight-bold">{"<html>"}</p>
      <p className="tag margin-none font-weight-bold marginL-1">{"<body>"}</p>
      <div className="flex-center" style={{ height: "89vh", justifyContent: 'flex-start' }}>
        <div className="intro-text-wrapper" style={{ width: "80%" }}>
          <div className="width-100">
            <p className="tag margin-none font-weight-bold marginL-2">
              {"<h1>"}
            </p>
            <div className="marginL-4 intro-text-container">
              {[...Array(intro.length)].map((_, index) => {
                return intro.charAt(index) !== "," ? (
                  index > 2 && intro.charAt(index) === "H" ? (
                    <span
                      onMouseOver={() => handleMouseOver(index)}
                      onMouseOut={() => handleMouseOut(index)}
                      key={index}
                      className={`color-primary font-coolvetica intro-text ${intro.charAt(index) === " " && "txt-dec-none"
                        } ${hoveringIndices.length > 0 &&
                        hoveringIndices.includes(index) &&
                        "animate__animated animate__rubberBand animate__repeat-1 isInFocus"
                        }`}
                    >
                      {intro.charAt(index)}
                    </span>
                  ) : intro.charAt(index) === " " ? (
                    <span className="txt-dec-none font-size-sm" key={index}
                    >
                      &nbsp;&nbsp;&nbsp;&nbsp;
                    </span>
                  ) : (
                    <span
                      onMouseOver={() => handleMouseOver(index)}
                      onMouseOut={() => handleMouseOut(index)}
                      key={index}
                      className={`color-white font-coolvetica intro-text ${intro.charAt(index) === " " && "txt-dec-none"
                        } ${hoveringIndices.length > 0 &&
                        hoveringIndices.includes(index) &&
                        "animate__animated animate__rubberBand animate__repeat-1 isInFocus"
                        }`}
                    >
                      {intro.charAt(index)}
                    </span>
                  )
                ) : (
                  <>
                    <span
                      onMouseOver={() => handleMouseOver(index)}
                      onMouseOut={() => handleMouseOut(index)}
                      className={`color-white font-coolvetica intro-text ${hoveringIndices.length > 0 &&
                        hoveringIndices.includes(index) &&
                        "animate__animated animate__bounce animate__repeat-1 isInFocus"
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
          <div className="width-100 marginT-2 send-msg-btn" style={{ marginLeft: "3rem" }}>
            <Button name="send a message" click={handleSendMsgClick} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default IntroComponent;
