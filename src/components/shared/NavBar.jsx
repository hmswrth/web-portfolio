import React from "react";
import "./NavBar.css";
import GlassSurface from "./GlassSurface";

const NavBar = () => {
  return (
    <>
      <GlassSurface
        width={900}
        height={75}
        borderRadius={50}
        className="my-custom-class"
        style={{
          position: "absolute",
          zIndex: 3,
          top: "3rem",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <nav className="navbar">
          <ul>
            <li>
              <a href="#home">Home</a>
            </li>
            <li>
              <a href="#about">About</a>
            </li>
            <li>
              <a href="#work">Work</a>
            </li>
            <li>
              <a href="#contact">Contact</a>
            </li>
          </ul>
        </nav>
      </GlassSurface>
    </>
  );
};

export default NavBar;
