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
              Coming from the diverse field of bioinformatics, I discovered my
              passion in computer science. It reminds me more of Doctor Strange
              from the Marvel cinematic universe.
              <br />
              <br />
              I've been programming for about 3 years now. Learning new things everyday keeps me excited. I'm currently exploring web3.
              <br />
              <br />I drink coffee and write code on a normal day.
              <br />
              <br />
              I also love playing video games. More than competetive, I enjoy story, art and graphics in a video game. The best ones I played so far would be RDR2 followed by the Assassins Creed franchise.
              <br />
              <br />
              Besides video games, I also spend time taking landscape pictures and astrophotograpahy. 
              PS : The logo in this section is not from dribble. It's the <strong>Seal of the Vishanti</strong> from the doctor strange series.
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
