import React, { useState } from "react";
import Button from "../shared/Button";
import "./Contact.css";

function ContactComponent() {
  const [isHovering, setIsHovering] = useState(false);
  const [hoveringIndex, setHoveringIndex] = useState(null);

  // handler to check mouse hover
  const handleMouseOver = (hoveringIndex) => {
    setIsHovering(true);
    setHoveringIndex(hoveringIndex);
  };

  // handler to check mouse hover
  const handleMouseOut = () => {
    setIsHovering(false);
    setHoveringIndex(null);
  };
  const header = "Contact Me";
  return (
    <>
      <p className="tag margin-none font-weight-bold">{"<section>"}</p>
      <div
        className="contact-main-container marginL-1"
        style={{ width: "100%" }}
      >
        <p className="tag margin-none font-weight-bold">{"<h2>"}</p>
        <div style={{ width: "50%", padding:'1rem' }}>
          {[...Array(header.length)].map((_, index) => {
            return header.charAt(index) === " " ? (
              <span
                className="txt-dec-none header-text"
                style={{ width: "1.2rem" }}
              >
                &nbsp;&nbsp;&nbsp;&nbsp;
              </span>
            ) : (
              <span
                onMouseOver={() => handleMouseOver(index)}
                onMouseOut={() => handleMouseOut(index)}
                className={`color-secondary font-coolvetica header-text ${
                  header.charAt(index) === " " && "txt-dec-none"
                } ${
                  isHovering &&
                  hoveringIndex === index &&
                  "animate__animated animate__rubberBand animate__repeat-1"
                }`}
              >
                {header.charAt(index)}
              </span>
            );
          })}
          <p className="tag margin-none font-weight-bold marginL-1">
            {"</h2>"}
          </p>
          <br />
          <p className="tag margin-none font-weight-bold">{"<p>"}</p>
          <div>
            <p
              className="color-white font-size-sm font-open-sans margin-none marginL-2"
              style={{ textAlign: "justify" }}
            >
              I'm interested in full stack developer opportunities.
              <br />
              Feel free to send a message using the form below.
            </p>
          </div>
          <p className="tag margin-none font-weight-bold">{"</p>"}</p>
          <p className="tag margin-none font-weight-bold">{"<form>"}</p>
          <div className="marginL-2 flex-center">
            <div className="textInputWrapper">
              <input placeholder="Name" type="text" className="textInput" />
            </div>
            <div className="textInputWrapper">
              <input placeholder="Email" type="email" className="textInput" />
            </div>
          </div>
          <div className="marginL-2 flex-center">
            <div className="textInputWrapper">
              <input placeholder="Subject" type="text" className="textInput" />
            </div>
          </div>
          <div className="marginL-2 flex-center">
            <div className="textInputWrapper">
              <textarea rows={6} placeholder="Message" type="text" className="textInput" ></textarea>
            </div>
          </div>
          <span style={{float:'right', marginRight:'.23rem'}}>
          <Button name='send message'/>
          </span>
          <br />
          <br />
          <p className="tag margin-none font-weight-bold">{"</form>"}</p>
      <p className="tag margin-none font-weight-bold">{"</section>"}</p>

        </div>
        
        <div className="contact-map-container" style={{ width: "50%" }}>
          <div class="container">
            <div className="box">
              <span className="title ">Hemanth Mudra</span>
              <div>
                <strong>Bangalore</strong>
                <p>Karnataka, India</p>
                <span>VALID</span> <span>2022</span>
              </div>
            </div>
          </div>
        </div>
      </div>

    </>
  );
}

export default ContactComponent;
