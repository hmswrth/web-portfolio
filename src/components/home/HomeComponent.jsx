import React from "react";
import "./Home.css";
import mainLogo from "../../assets/hemanthMudraLogo.svg";

import {
  AiOutlineGithub,
  AiOutlineInstagram,
  AiOutlineLinkedin,
  AiOutlineGitlab,
} from "react-icons/ai";
import IntroComponent from "../intro/IntroComponent";
import IntroComponentLines from "../intro/IntroComponentLines";

import SkillsComponent from "../skills/SkillsComponent";
import ContactComponent from "../contact/ContactComponent";
import HamBurgerComponent from "../shared/HamBurgerComponent";
import ExperienceComponent from "../experience/ExperienceComponent";
import NavBar from "../shared/NavBar";

function HomeComponent() {
  const handlePageScroll = (type) => {
    let ele;
    if (type === "contact")
      ele = document.querySelector(".contact-main-container");
    else if (type === "skills")
      ele = document.querySelector(".skills-main-container");
    else if (type === "about")
      ele = document.querySelector(".intro-main-container");

    ele.scrollIntoView({
      behavior: "smooth",
      block: "start",
      inline: "nearest",
    });
    // window.scrollTo(0, ele.scrollHeight);
  };

  return (
    <>
      <div className="main-wrapper flex-center">
        {/* main home container */}
        <div className="main-container">
          <NavBar />
          {/* <IntroComponent /> */}
          <IntroComponentLines />
          <ExperienceComponent />
          <SkillsComponent />
          <ContactComponent />
        </div>
      </div>
    </>
  );
}

export default HomeComponent;
