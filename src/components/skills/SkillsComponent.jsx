import React, { useState } from "react";
import TagCloudComponent from "../tagcloud/TagCloudComponent";
import "./Skills.css";

function SkillsComponent() {
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

  const header = "Me, Myself and I";
  return (
    <>
      <p className="tag margin-none font-weight-bold">{"<section>"}</p>
      <div
        className="skills-main-container marginL-1"
        style={{ width: "100%" }}
      >

        <div className="skills-text-container flex-col-center">
        <p className="tag margin-none font-weight-bold">{"<h2>"}</p>

          <div className="marginL-1">
            {[...Array(header.length)].map((_, index) => {
              return header.charAt(index) === " " ? (
                <span
                  className="txt-dec-none header-text"
                  style={{ width: "1.2rem" }}
                  key={index}
                >
                  &nbsp;&nbsp;&nbsp;&nbsp;
                </span>
              ) : (
                <span
                  onMouseOver={() => handleMouseOver(index)}
                  onMouseOut={() => handleMouseOut(index)}
                  key={index}
                  className={`color-secondary font-coolvetica header-text ${
                    header.charAt(index) === " " && "txt-dec-none"
                  } ${
                    isHovering &&
                    hoveringIndex === index &&
                    "animate__animated animate__rubberBand animate__repeat-1"
                  }`}
                >
                  {header.charAt(index)}
                </span>
              );
            })}
          </div>
      <p className="tag margin-none font-weight-bold">{"</h2>"}</p>
          <br />

      <p className="tag margin-none font-weight-bold">{"<p>"}</p>
          <div className="marginL-1">
            <span className="color-white font-size-p font-open-sans margin-none" style={{textAlign: 'justify'}}>
              Coming from the diverse field of bioinformatics, I discovered my
              passion in computer science. It reminds me more of Doctor Strange
              from the Marvel cinematic universe.
              <br />
              <br />
              I've been programming for about 3 years now and learning new
              things everyday keeps me alive. Doing the same things better
              everytime keeps me motivated.
              <br />
              <br />I drink coffee and write code on a normal day.
              <br/>
            </span>
          </div>
      <p className="tag margin-none font-weight-bold">{"</p>"}</p>
        </div>
        <div className="skills-tag-container" style={{ width: "50%" }}>
          <TagCloudComponent />
        </div>
      </div>
    </>
  );
}

export default SkillsComponent;
