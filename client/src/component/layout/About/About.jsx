import React from "react";
import "./aboutSection.css";
import { Typography } from "@material-ui/core";
const About = () => {
  return (
    <div className="aboutSection">
      <div></div>
      <div className="aboutSectionGradient"></div>
      <div className="aboutSectionContainer">
        <Typography component="h1">Thông tin về thư viện</Typography>
      </div>
    </div>
  );
};

export default About;
