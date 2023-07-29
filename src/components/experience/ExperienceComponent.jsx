import React, { useState } from "react";
import "./Experience.css";
import {
  FaAngular,
  FaAws,
  FaNodeJs,
  FaReact,
} from "react-icons/fa";

import { SiMongodb } from 'react-icons/si';
import { DiGoogleCloudPlatform } from 'react-icons/di'

function ExperienceComponent() {
  const [hoveringIndices, setHoveringIndices] = useState([])

  const header = "My Experience";

  const experienceData = [
    {
      companyName: "Saveo HealthTech Pvt. Ltd.",
      companyUrl: "https://web.saveo.in",
      designation: "SDE II, Full Stack Web",
      duration: "2022 Jan - 2023 Jan",
      responsibilities: [
        "Worked with a team of passionate developers and designers in building the complete retail web experience for businesses",
        "Solo contributor for the complete wholesale web experience on the Saveo platform",
        "Extensively worked on the Saveo internal dashboards aiding business across various domains such as supply, demand, finance, logistics, admin processes",
        "Worked in a team of 2 in migrating the entire cloud setup from AWS to GCP. Worked on setting up elastic search with ELK stack for numerous metrics",
      ],
    },
    {
      companyName: "Cognizant",
      companyUrl: "https://web.saveo.in",
      designation: "Programmer Analyst",
      duration: "2020 May - 2021 Dec",
      responsibilities: [
        "Built a query management tool to minimize the delay of addressing major blockers",
        "Implemented an automation test suite and E2E pipeline to simulate telesales",
        "Maintenance of code bases across multiple products",
      ],
    },
  ];

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
  return (
    <>
      <p className="tag margin-none font-weight-bold">{"<section>"}</p>
      <div className=" marginL-1 flex-center" style={{ width: "100%", flexWrap: 'wrap' }}>
        <div className="skills-text-container flex-col-center exp-text">
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
            <p
              className="color-white font-size-p font-open-sans margin-none"
              style={{ textAlign: "justify" }}
            >
              I've been programming for about 3 years now working in esteemed
              organizations. I have extensively worked on various web
              technologies in a fast-paced start-up company. I take pride in
              ownership and responsibility. I always try to push myself outside
              my comfort zone to test and improve my abilities. I believe in
              constant learning by experimenting. Building products at scale
              that impact millions of users keeps me excited.
            </p>
          </div>
          <p className="tag margin-none font-weight-bold">{"</p>"}</p>
        </div>
        <div className="tech-stack-icon-container">
        <div className="tsi-wrapper">
          <FaReact className="tech-icon" />
          <FaAngular className="tech-icon" />
          <FaNodeJs className="tech-icon" />
          <SiMongodb className="tech-icon" />
          <DiGoogleCloudPlatform className='tech-icon' />
          <FaAws className="tech-icon" />
        </div>
        </div>
      </div>
      <div className="experience-cards-container flex-center marginL-2">
        {experienceData.map((item, index) => (
          <div className="experience-card-outer color-white" key={index}>
            <div className="experience-card-inner flex-col-center">
              <p className="font-coolvetica ">{item.designation}</p>
              <span className="font-size-sm mt-1">{item.companyName}</span>
              <span style={{ fontSize: "12px" }}>{item.duration}</span>
              <div className="res-container mt-1">
                {item.responsibilities.map((res, idx) => {
                  return (
                    <p
                      style={{ fontSize: "14px" }}
                      className="font-sans"
                      key={idx}
                    >
                      {res}
                    </p>
                  );
                })}
              </div>
            </div>
          </div>
        ))}
      </div>
      <p
        className="tag margin-none font-weight-bold"
      >
        {"</section>"}
      </p>
    </>
  );
}

export default ExperienceComponent;
