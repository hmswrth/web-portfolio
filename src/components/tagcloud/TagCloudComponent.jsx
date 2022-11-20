import React, { useEffect } from "react";
import TagCloud from "TagCloud";
import "./TagCloud.css";

function TagCloudComponent() {
  const TAGS = [
    "React",
    "Angular",
    "HTML",
    "CSS",
    "Javascript",
    "Node",
    "AWS",
    "GCP",
    "Docker",
    "Python",
    "Java",
    "C++",
  ];
  const container = ".tag-cloud-container";
  // default options for the tag cloud rendered
  const options = {
    // radius in px
    radius: 300,
    // animation speed
    // slow, normal, fast
    maxSpeed: "fast",
    initSpeed: "fast",
    // 0 = top
    // 90 = left
    // 135 = right-bottom
    direction: 135,

    // interact with cursor move on mouse out
    keep: true,
  };

  const tagCloud = () => {
    TagCloud(container, TAGS, options);
  };

  const deleteDup = () => {
    // remove the second duplicate tagcloud from the page
    let clouds = document.getElementsByClassName("tagcloud");
    clouds[1]?.remove()
  };

  useEffect(() => {
    tagCloud();
    deleteDup();
  }, []);

  return <span className="tag-cloud-container"></span>;
}

export default TagCloudComponent;
