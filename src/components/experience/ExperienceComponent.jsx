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
      companyName: "Nasdaq",
      companyUrl: "https://www.nasdaq.com/",
      designation: "Senior Software Developer",
      duration: "2023 Jun - Present",
      responsibilities: [
        "Instrumentally contributed to the extensive redevelopment of the Nasdaq Fund Network (NFN)."
      ],
    },
    {
      companyName: "Saveo HealthTech Pvt. Ltd.",
      companyUrl: "https://web.saveo.in",
      designation: "SDE II, Full Stack Web",
      duration: "2022 Jan - 2023 Feb",
      responsibilities: [
        "Extensively contributed to the retail web experience on Saveo platform.",
        "Solely spearheaded the development of the entire wholesale web platform within the Saveo ecosystem, showcasing self-reliance and expertise in crafting a seamless digital experience.",
        "Enhanced Saveo with key internal dashboards for supply, demand, finance, logistics, and administration.",
        "Actively contributed in AWS-to-GCP cloud migration and implemented Elastic Search with ELK for efficient metric management.",
      ],
    },
    {
      companyName: "Cognizant",
      companyUrl: "https://web.saveo.in",
      designation: "Programmer Analyst",
      duration: "2020 May - 2021 Dec",
      responsibilities: [
        "Designed and implemented a query management tool to optimize the resolution time for addressing critical blockers.",
        "Orchestrated the development of an automated testing suite and an end-to-end pipeline specifically tailored for simulating telesales processes.",
        "Undertook the responsibility of codebase maintenance across a diverse range of products.",
        "Developed a series of Python scripts dedicated to data processing and the generation of comprehensive analytics reports."
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
              Over the past three years, I have honed my programming skills while contributing to esteemed organizations. My experience has been predominantly focused on a wide array of web technologies within the dynamic landscape of a fast-paced startup environment. I take great pride in my commitment and accountability, consistently pushing beyond my comfort zone to refine and expand my skill set. My philosophy centers around perpetual learning through hands-on experimentation. My passion lies in crafting impactful products at scale, ones that resonate with millions of users, a challenge that continuously fuels my enthusiasm.
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
