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
import SkillsComponent from "../skills/SkillsComponent";
import ContactComponent from "../contact/ContactComponent";
import HamBurgerComponent from "../shared/HamBurgerComponent";

function HomeComponent() {
  const handlePageScroll = (type) => {
    let ele;
    if (type === "contact")
      ele = document.querySelector(".contact-main-container");
    else if (type === "skills")
      ele = document.querySelector(".skills-main-container");
    else if (type === "about")
      ele = document.querySelector(".intro-main-container");

    ele.scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });
    // window.scrollTo(0, ele.scrollHeight);
  };

  return (
    <>
      <div className="main-wrapper flex-center">
        {/* sidee nav bar goes here */}
        <div className="side-bar">
          <div className="flex-col-center cursor-pointer" href="/home">
            <img src={mainLogo} alt="hm logo" className="sidebar-header-logo" />
            {/* <span className="line-height-md color-white font-size-md font-coolvetica margin-none ">
              hemanth
            </span> */}
            {/* <p className="color-gray margin-none font-open-sans prof-title font-size-sm">
              web developer
            </p> */}
          </div>
          {/* contains navigation to parts of the page */}
          {/* TODO : add routing */}
          <div className="home-section-container flex-col-center">
            <span className="border-gray"></span>
            <span onClick={() => handlePageScroll("about")}>
              <div className="flex-center">
                <span className="color-gray text-link cursor-pointer">
                  about
                </span>
              </div>
            </span>
            <span className="border-gray"></span>

            <span onClick={() => handlePageScroll("skills")}>
              <div className="flex-center">
                <span className="color-gray text-link cursor-pointer">
                  skills
                </span>
              </div>
            </span>
            <span className="border-gray"></span>
            <span onClick={() => handlePageScroll("work")}>
              <div className="flex-center">
                <span className="color-gray text-link cursor-pointer">
                  work
                </span>
              </div>
            </span>
            <span className="border-gray"></span>
            <span onClick={() => handlePageScroll("contact")}>
              <div className="flex-center">
                <span className="color-gray text-link cursor-pointer">
                  contact
                </span>
              </div>
            </span>
            <span className="border-gray"></span>
          </div>
          <div className="social-container flex-center">
            {/* TODO : Add navigation to social links */}
            <a href="https://www.instagram.com/hems009/" target="_blank">
              <AiOutlineInstagram
                className="color-gray social-icon cursor-pointer"
                size="1.5rem"
              />
            </a>
            <a href="https://www.linkedin.com/in/hemanth-mudra/" target="_blank">
            <AiOutlineLinkedin
              className="color-gray social-icon cursor-pointer"
              size="1.5rem"
            />
            </a>

            <a href="https://github.com/hmswrth" target="_blank">
            <AiOutlineGithub
              className="color-gray social-icon cursor-pointer"
              size="1.5rem"
            />
            </a>
            <a href="https://gitlab.com/hemanth.m" target="_blank">
            <AiOutlineGitlab
              className="color-gray social-icon cursor-pointer"
              size="1.5rem"
            />
            </a>
          </div>
        </div>

        {/* main home container */}
        <div className="main-container">
          <HamBurgerComponent />
          <IntroComponent />
          <SkillsComponent />
          <ContactComponent />
        </div>
      </div>
    </>
  );
}

export default HomeComponent;
