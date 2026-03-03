import React, { useState, useRef } from "react";
import "./Experience.css";
import { FaAngular, FaAws, FaNodeJs, FaReact } from "react-icons/fa";

import { SiMongodb } from "react-icons/si";
import { DiGoogleCloudPlatform } from "react-icons/di";

import LaserFlow from "../shared/LaserFlow";
import CardSwap, { Card } from "../shared/CardSwap";
import SplitText from "../shared/SplitText";

function ExperienceComponent() {
  const revealImgRef = useRef(null);

  const startDate = new Date("2020-05-01");
  const currentDate = new Date();
  let years = currentDate.getFullYear() - startDate.getFullYear();

  const numberFormatter = new Intl.NumberFormat("en", {
    style: "unit",
    unit: "year",
    unitDisplay: "long",
  });
  const experienceInWords = numberFormatter.format(years);

  const introText = `Over the past ${experienceInWords}, I have honed my programming skills while contributing to esteemed organizations. My experience has been predominantly focused on a wide array of web technologies within the dynamic landscape of a fast-paced startup environment. I take great pride in my commitment and accountability, consistently pushing beyond my comfort zone to refine and expand my skill set. My philosophy centers around perpetual learning through hands-on experimentation. My passion lies in crafting impactful products at scale, ones that resonate with millions of users, a challenge that continuously fuels my enthusiasm.`;
  const experienceData = [
    {
      companyName: "Nasdaq",
      companyUrl: "https://www.nasdaq.com/",
      designation: "Sr. Analyst - Software Engineering",
      duration: "2023 Jun - Present",
      responsibilities: [
        "Instrumentally contributed to the extensive redevelopment of the Nasdaq Fund Network (NFN).",
      ],
    },
    {
      companyName: "Saveo HealthTech Pvt. Ltd.",
      companyUrl: "https://web.saveo.in",
      designation: "SDE II - Full Stack",
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
        "Developed a series of Python scripts dedicated to data processing and the generation of comprehensive analytics reports.",
      ],
    },
  ];

  return (
    <>
      <div
        style={{
          height: "800px",
          position: "relative",
          overflow: "hidden",
          backgroundColor: "#060010",
        }}
        onMouseMove={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          const el = revealImgRef.current;
          if (el) {
            el.style.setProperty("--mx", `${x}px`);
            el.style.setProperty("--my", `${y + rect.height * 0.5}px`);
          }
        }}
        onMouseLeave={() => {
          const el = revealImgRef.current;
          if (el) {
            el.style.setProperty("--mx", "-9999px");
            el.style.setProperty("--my", "-9999px");
          }
        }}
      >
        <LaserFlow
          // horizontalBeamOffset={0.1}
          // verticalBeamOffset={0.0}
          // color="#CF9EFF"
          horizontalSizing={0.5}
          verticalSizing={5}
          wispDensity={2}
          horizontalBeamOffset={0.25}
          verticalBeamOffset={0.0}
          color="#CF9EFF"
          falloffStart={0.75}
        />

        {/* <div
          style={{
            position: "absolute",
            zIndex: 100,
            top: "55%",
            left: "10%",
            width: "45%",
            fontSize: "1.5rem",
          }}
        >
          <SplitText
            text={introText}
            className="color-white font-coolvetica"
            delay={50}
            duration={1.25}
            ease="power3.out"
            splitType="words"
            from={{ opacity: 0, y: 40 }}
            to={{ opacity: 1, y: 0 }}
            threshold={0.1}
            rootMargin="-100px"
            textAlign="justify"
          />
        </div> */}

        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translateX(-50%)",
            width: "86%",
            height: "60%",
            backgroundColor: "#060010",
            borderRadius: "20px",
            border: "2px solid #FF79C6",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "white",
            fontSize: "2rem",
            zIndex: 6,
          }}
        >
          <div
            style={{
              position: "relative",
              top: "50%",
              left: "40%",
              transform: "translate(-50%, -50%)",
              border: "1px solid red",
            }}
          >
            <CardSwap
              cardDistance={100}
              verticalDistance={80}
              delay={5000}
              pauseOnHover={false}
              skewAmount={3}
              onCardChange={(e) =>
                console.log(e, experienceData[e].companyName, "current card")
              }
            >
              {experienceData.map((experience, index) => (
                <Card key={index} className="font-size-sm">
                  <p>
                    {experience.designation}, {experience.companyName}
                  </p>
                  <p>{experience.duration}</p>
                  <p>{experience.responsibilities}</p>
                  <br />
                  <br />
                  <br />
                  <br />
                  <br />
                  <br />
                </Card>
              ))}
            </CardSwap>
          </div>
          {/* Your content here */}
        </div>

        <img
          ref={revealImgRef}
          src={require("../../assets/blrCustomMapComp.png")}
          alt="Reveal effect"
          style={{
            position: "absolute",
            width: "100%",
            top: "-50%",
            zIndex: 5,
            mixBlendMode: "lighten",
            opacity: 0.3,
            pointerEvents: "none",
            "--mx": "-9999px",
            "--my": "-9999px",
            WebkitMaskImage:
              "radial-gradient(circle at var(--mx) var(--my), rgba(255,255,255,1) 0px, rgba(255,255,255,0.95) 60px, rgba(255,255,255,0.6) 120px, rgba(255,255,255,0.25) 180px, rgba(255,255,255,0) 240px)",
            maskImage:
              "radial-gradient(circle at var(--mx) var(--my), rgba(255,255,255,1) 0px, rgba(255,255,255,0.95) 60px, rgba(255,255,255,0.6) 120px, rgba(255,255,255,0.25) 180px, rgba(255,255,255,0) 240px)",
            WebkitMaskRepeat: "no-repeat",
            maskRepeat: "no-repeat",
          }}
          horizontalSizing={0.5}
          verticalSizing={2}
          wispDensity={1}
          wispSpeed={15}
          wispIntensity={5}
          flowSpeed={0.35}
          flowStrength={0.25}
          fogIntensity={0.45}
          fogScale={0.3}
          fogFallSpeed={0.6}
          decay={1.1}
          falloffStart={1.2}
        />
      </div>
    </>
  );
}

export default ExperienceComponent;
