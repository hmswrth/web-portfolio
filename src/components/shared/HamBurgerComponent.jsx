import React, { useEffect, useState } from "react";
import "./Ham.css";
import hemLogo from "../../assets/hemanthMudraLogo.svg";
import { AiOutlineGithub, AiOutlineGitlab, AiOutlineInstagram, AiOutlineLinkedin } from "react-icons/ai";

function HamBurgerComponent() {
  const [hamOpen, setHamOpen] = useState(false);

  const toggleMenu = () => {
    console.log("toggle menu");
    setHamOpen((val) => !val);
  };

  useEffect(() => {
    if (hamOpen) {
      document
        .querySelector(".main-container")
        .classList.add("overflow-hidden");
      document.querySelector(".main-container").classList.add("padding-none");
    }

    return () => {
      document
        .querySelector(".main-container")
        .classList.remove("overflow-hidden");
      document
        .querySelector(".main-container")
        .classList.remove("padding-none");
    };
  }, [hamOpen]);

  return (
    <>
      <div class="three col" onClick={toggleMenu}>
        <div class={`hamburger ${hamOpen ? "is-active" : ""}`} id="hamburger-6">
          <span class="line"></span>
          <span class="line"></span>
          <span class="line"></span>
        </div>
      </div>
      {hamOpen && (
        <div className="ham-main-container height-fs width-100 bg-primary">
          <div className="flex-col-center bg-secondary" style={{paddingTop:'4rem', paddingBottom: '1rem'}}>
            <img
              style={{ height: "60px" }}
              src={hemLogo}
              alt="hemanth mudra logo"
            />
            <span className="font-size-md font-coolvetica font-weight-md line-height-md mt-1">
              Hemanth
            </span>
            <span className="font-size-sm font-open-sans line-height-md color-gray">
              Web Developer
            </span>
          </div>
          <div className="bg-primary">
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
            <span>
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
        </div>
      )}
    </>
  );
}

export default HamBurgerComponent;
