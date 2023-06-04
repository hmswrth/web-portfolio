import React, { useEffect, useState } from "react";
import { postMessage } from "../../api/ContactForm";
import Button from "../shared/Button";
import Loader from "../shared/Loader";
import "./Contact.css";

function ContactComponent() {
  const FORM_OBJ = {
    name: "",
    email: "",
    subject: "",
    message: "",
  };

  const [hoveringIndices, setHoveringIndices] = useState([])

  const [formData, setFormData] = useState(
    JSON.parse(JSON.stringify(FORM_OBJ))
  );
  const [errorData, setErrorData] = useState({
    name: false,
    email: false,
    subject: false,
    message: false,
  });
  const [submittingForm, setSubmittingForm] = useState(false);
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [backgroundImage, setBackgroundImage] = useState('')

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
  const header = "Contact Me";

  const checkForm = (e) => {
    const reEmail =
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    let key = e.target.name;
    if (key === "email") {
      if (formData[key].match(reEmail)) {
        setErrorData((prevData) => ({
          ...prevData,
          [e.target.name]: false,
        }));
      } else {
        setErrorData((prevData) => ({
          ...prevData,
          [e.target.name]: true,
        }));
      }
    } else {
      if (
        !formData[key] ||
        (formData[key].length > 0 && formData[key].length < 3)
      ) {
        setErrorData((prevData) => ({
          ...prevData,
          [e.target.name]: true,
        }));
      } else {
        setErrorData((prevData) => ({
          ...prevData,
          [e.target.name]: false,
        }));
      }
    }
  };

  const sendMessage = async () => {
    let isErrorPresent = false;
    isErrorPresent = Object.values(errorData).every((val) => val !== false);
    isErrorPresent = Object.values(formData).every((val) => val.length < 3);
    console.log(isErrorPresent);
    if (!isErrorPresent) {
      setSubmittingForm(true);
      let body = {
        ...formData,
      };
      try {
        const res = await postMessage(body);
        // reset the inp fields
        setFormData(JSON.parse(JSON.stringify(FORM_OBJ)));
        setSubmittingForm(false);
        setIsFormSubmitted(true);
        setTimeout(() => {
          setIsFormSubmitted(false);
        }, [1600]);
      } catch (error) {
        setSubmittingForm(false);
        console.log(error);
      }
    } else {
      let data = { ...errorData };
      Object.keys(formData).forEach((key) => {
        if (formData[key].length < 3) {
          data[key] = true;
        }
      });
      setErrorData(data);
    }
  };

  const handleInputChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  // reset any error data on key up
  const resetErrorData = (e) => {
    let key = e.target.name;
    if (errorData[key]) {
      setErrorData((prevData) => ({
        ...prevData,
        [e.target.name]: false,
      }));
    }
  };

  // onMount -> setup intersection observer to dynamically load the image
  useEffect(() => {
    const observer = new IntersectionObserver(async (entries) => {
      if (entries[0].isIntersecting) {
        console.log('#########container in sight##########33')
        let res = await import('../../assets/blrCustomMapComp.png')
        let image = new Image()
        image.src = res.default
        image.onload = () => setBackgroundImage(image.src)
        console.log(res)
      }
    })
    let containerNode = document.querySelector('.contact-map-container');
    containerNode && observer.observe(containerNode)

    return () => observer.disconnect()
  }, [])

  return (
    <>
      <p className="tag margin-none font-weight-bold">{"<section>"}</p>
      <p className="tag margin-none font-weight-bold">{"<h2>"}</p>
      <div
        className="contact-main-container marginL-1"
        style={{ width: "100%" }}
        id='contactMainContainer'
      >
        <div
          className="contact-text-container"
          style={{ width: "50%", paddingRight: "1rem" }}
        >
          <div className="contact-text marginL-1">
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
          <div>
            <p
              className="color-white font-size-sm font-open-sans margin-none marginL-1"
              style={{ textAlign: "justify" }}
            >
              I'm interested in full stack developer opportunities.
              <br />
              Feel free to send a message using the form below.
            </p>
          </div>
          <p className="tag margin-none font-weight-bold">{"</p>"}</p>
          <p className="tag margin-none font-weight-bold">{"<form>"}</p>
          <div className="marginL-1 flex-center">
            <div className={`textInputWrapper ${errorData.name && "error"}`}>
              <input
                placeholder="Name"
                type="text"
                className="textInput"
                value={formData.name}
                name="name"
                onChange={handleInputChange}
                onKeyUp={checkForm}
                required
                autoComplete='off'
              />
            </div>
            <div className={`textInputWrapper ${errorData.email && "error"}`}>
              <input
                placeholder="Email"
                type="email"
                className="textInput"
                value={formData.email}
                name="email"
                onChange={handleInputChange}
                onKeyUp={checkForm}
                required
                autoComplete='off'
              />
            </div>
          </div>
          <div className="marginL-1 flex-center">
            <div className={`textInputWrapper ${errorData.subject && "error"}`}>
              <input
                placeholder="Subject"
                type="text"
                className="textInput"
                value={formData.subject}
                name="subject"
                onChange={handleInputChange}
                onKeyUp={checkForm}
                required
                autoComplete='off'
              />
            </div>
          </div>
          <div className="marginL-1 flex-center">
            <div className={`textInputWrapper ${errorData.message && "error"}`}>
              <textarea
                rows={6}
                placeholder="Message"
                type="text"
                className="textInput"
                value={formData.message}
                name="message"
                onChange={handleInputChange}
                onKeyUp={checkForm}
                required
                autoComplete='off'
              ></textarea>
            </div>
          </div>
          {submittingForm && !isFormSubmitted ? (
            <div style={{ float: "right" }}>
              <Loader />
            </div>
          ) : !submittingForm && !isFormSubmitted ? (
            <span style={{ float: "right", marginRight: ".23rem" }}>
              <Button name="send message" click={sendMessage} />
            </span>
          ) : (
            <span className="message-sent-info">message sent !</span>
          )}

          <br />
          <br />
          <p className="tag margin-none font-weight-bold">{"</form>"}</p>
          <p
            className="tag margin-none font-weight-bold"
            style={{ marginLeft: "-1rem" }}
          >
            {"</section>"}
          </p>
        </div>

        <div className="contact-map-container" style={{ width: "50%" }}>
          <img src={backgroundImage} alt='' className="contact-map" style={{ opacity: backgroundImage ? '1' : '0', transition: '2s all' }} />
          <div className="map-backdrop-shimmer contact-map" style={{ opacity: backgroundImage ? '0' : '1', transition: '.3s all' }}></div>
          <div className="container">
            <div className="box">
              <span className="title ">Hemanth Mudra</span>
              <div>
                <strong>Bangalore</strong>
                <p>Karnataka, India</p>
                <span>2023</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ContactComponent;
