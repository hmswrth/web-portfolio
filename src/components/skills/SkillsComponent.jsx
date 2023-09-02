import React, { useState } from "react";
import "./Skills.css";

function SkillsComponent() {
  const [hoveringIndices, setHoveringIndices] = useState([])


  // handler to check mouse hover
  const handleMouseOver = (hoveringIndex) => {
    setHoveringIndices(prevArr => [...prevArr, hoveringIndex])
  };

  // handler to check mouse hover
  const handleMouseOut = (hoveringIndex) => {
    setTimeout(() => {
      // remove the hovering index from state
      setHoveringIndices(prevVal => prevVal.filter(item => item !== hoveringIndex))
    }, [500])
  };

  const header = "Me, Myself and I";
  return (
    <>
      <p className="tag margin-none font-weight-bold">{"<section>"}</p>
      <div
        className="skills-main-container marginL-1"
        style={{ width: "100%" }}
      >

        <div className="skills-text-container flex-col-center sc-text">
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
                  className={`color-secondary font-coolvetica header-text ${header.charAt(index) === " " && "txt-dec-none"
                    } ${hoveringIndices.length > 0 &&
                    hoveringIndices.includes(index) &&
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
            <span className="color-white font-size-p font-open-sans margin-none" style={{ textAlign: 'justify' }}>
            Transitioning from the diverse field of bioinformatics, I uncovered my true passion for computer science. This newfound journey resonates with me, evoking parallels to the fascination of Doctor Strange in the Marvel cinematic universe.
              <br />
              <br />
              I've been actively engaged in programming for the past three years, and my enthusiasm for continuous learning keeps me invigorated. At present, I'm delving into the fascinating world of web3 technology.
              <br />
              <br />A typical day for me involves sipping coffee while immersed in code. 
              <br />
              <br />
              Beyond my coding pursuits, I have a genuine passion for video games, with a particular fondness for those that captivate through storytelling, artistry, and stunning graphics. Among my top gaming experiences are Red Dead Redemption 2 and the Assassin's Creed franchise.              <br />
              <br />
              Beyond my gaming and coding adventures, you'll frequently catch me chasing the breathtaking beauty of landscapes and venturing into the mesmerizing realm of astrophotography. As a fun tidbit, the logo showcased in this section isn't a Dribbble creation; it's the enigmatic <strong>Seal of the Vishanti</strong> from the mystical world of Doctor Strange.
              <br />
            </span>
          </div>
          <p className="tag margin-none font-weight-bold">{"</p>"}</p>
        </div>
      </div>
    </>
  );
}

export default SkillsComponent;
