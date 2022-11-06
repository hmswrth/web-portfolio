import React from "react";
import "./Intro.css";

function IntroComponent() {
  let intro = "Hi, I'm Hemanth, Full Stack Web Dev";
  return (
    <>
      <span className="tag">{"<body>"}</span>
      <h1>
        {[...Array(intro.length)].map((_, index) => {
          {
            /* intro.charAt(index) !== ',' ? */
          }
          return intro.charAt(index) !== "," ? (
            <span className="color-white font-coolvetica intro-text" key={index}
            >
              {intro.charAt(index)}
            </span>
          ) : (
            <>
              <span className="color-white font-coolvetica intro-text" key={index}>
                {intro.charAt(index)}
              </span>
              <br />
            </>
          );
        })}
      </h1>
    </>
  );
}

export default IntroComponent;
