import FloatingLines from "../shared/FloatingLines";
import SplitText from "../shared/SplitText";
import "./IntroLines.css";

const IntroComponentLines = () => {
  return (
    <>
      <div id="Home" className="height-fs intro-main-container">
        <div
          style={{
            width: "100%",
            height: "100%",
            position: "absolute",
            borderRadius: "10px",
            overflow: "hidden",
            zIndex: 0,
          }}
        >
          <FloatingLines
            enabledWaves={["top", "middle", "bottom"]}
            lineCount={5}
            lineDistance={5}
            bendRadius={5}
            bendStrength={-0.5}
            interactive={true}
            parallax={true}
          />
        </div>
        <div className="intro-text-container">
          <SplitText
            text={
              <>
                Hi,
                <br />
                I'm Hemanth
              </>
            }
            className="color-white font-coolvetica intro-text"
            delay={100}
            duration={3}
            ease="power3.out"
            splitType="chars"
            from={{ opacity: 0, y: 40 }}
            to={{ opacity: 1, y: 0 }}
            threshold={0.1}
            rootMargin="-100px"
            textAlign="center"
          />
          <br />
        </div>
      </div>
    </>
  );
};

export default IntroComponentLines;
