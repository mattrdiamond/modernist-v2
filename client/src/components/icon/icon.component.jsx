import React from "react";
import Icons from "../../assets/icons.svg";

const Icon = (props) => (
  <svg
    className={`icon icon-${props.icon}`}
    role="img"
    height={props.height || ""}
    width={props.width || ""}
    aria-label={props.icon}
  >
    <title>{props.icon}</title>
    <use href={`${Icons}#${props.icon}`} />
  </svg>
);

export default Icon;
