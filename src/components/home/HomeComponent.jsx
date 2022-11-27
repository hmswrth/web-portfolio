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

function HomeComponent() {
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
            <a href="/about">
              <div className="flex-center">
                <span className="color-gray text-link cursor-pointer">
                  about
                </span>
              </div>
            </a>
            <span className="border-gray"></span>

            <a href="/skills">
              <div className="flex-center">
                <span className="color-gray text-link cursor-pointer">
                  skills
                </span>
              </div>
            </a>
            <span className="border-gray"></span>
            <a href="/work">
              <div className="flex-center">
                <span className="color-gray text-link cursor-pointer">
                  work
                </span>
              </div>
            </a>
            <span className="border-gray"></span>
            <a href="/contact">
              <div className="flex-center">
                <span className="color-gray text-link cursor-pointer">
                  contact
                </span>
              </div>
            </a>
            <span className="border-gray"></span>
          </div>
          <div className="social-container flex-center">
            {/* TODO : Add navigation to social links */}
            <AiOutlineInstagram
              className="color-gray social-icon cursor-pointer"
              size="1.5rem"
            />
            <AiOutlineLinkedin
              className="color-gray social-icon cursor-pointer"
              size="1.5rem"
            />
            <AiOutlineGithub
              className="color-gray social-icon cursor-pointer"
              size="1.5rem"
            />
            <AiOutlineGitlab
              className="color-gray social-icon cursor-pointer"
              size="1.5rem"
            />
          </div>
        </div>

        {/* main home container */}
        <div className="main-container">
          <IntroComponent />
          <SkillsComponent />
          <ContactComponent />
        </div>
      </div>
    </>
  );
}

export default HomeComponent;
