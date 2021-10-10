import React from "react";
import THEMES from "../app/constants/Themes";
import ThemePopup from "./ThemePopup";

const Titlebar: React.FC<{ title: string }> = function (props) {
  return <div className="row">
    <h4 className="hc-text col-10">{props.title}</h4>
    <ThemePopup themes={THEMES} />
  </div>;
}

export default Titlebar;