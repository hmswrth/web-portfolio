import React from "react";
import "./Trails.css";
import useMeasure from "react-use-measure";
import { useTrail, animated } from "@react-spring/web";

function TrailComponent() {
  const fast = { tension: 1200, friction: 40 };
  const slow = { mass: 10, tension: 200, friction: 50 };
  const trans = (x, y) =>
    `translate3d(${x}px,${y}px,0) translate3d(-50%,-50%,0)`;

  const [trail, api] = useTrail(3, (i) => ({
    xy: [0, 0],
    config: i === 0 ? fast : slow,
  }));
  const [ref, { left, top }] = useMeasure();
  const handleMouseMove = (e) => {
    api.start({ xy: [e.clientX - left, e.clientY - top] });
  };

  return (
    <div style={{zIndex:'0', height:'100vh', width:'100%', position:'absolute'}}>
      <svg style={{ position: "absolute", width: 0, height: 0 }}>
        <filter id="goo">
          <feGaussianBlur in="SourceGraphic" result="blur" stdDeviation="30" />
        
        <feColorMatrix 
                color-interpolation-filters="sRGB"
                type="matrix"
                values="130 0   0   0   0
                        0   0.13  0   0   0
                        0   0   0.33  0   0
                        0   0   0   1   0 "/>
        </filter>
      </svg>
      <div ref={ref} className="hooksMain" onMouseMove={handleMouseMove}>
        {trail.map((props, index) => (
          <animated.div key={index} style={{ transform: props.xy.to(trans) }} />
        ))}
      </div>
    </div>
  );
}

export default TrailComponent;
