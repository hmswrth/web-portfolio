import React from "react";
import TagCloudComponent from "../tagcloud/TagCloudComponent";

function SkillsComponent() {
  return (
    <>
      <p className="tag margin-none font-weight-bold">{"<h2>"}</p>
      <p className="tag margin-none font-weight-bold marginL-1">{"<p>"}</p>
      <div className="skills-main-container flex-center" style={{width:'100%'}}>
      <div style={{width:'50%'}}>
        <p>hello there </p>
      </div>
      <div style={{width:'50%'}}>
        <TagCloudComponent />
      </div>
      </div>
    </>
  );
}

export default SkillsComponent;
