import React from "react";
import Icons from "../../assets/icons/icons.svg";

const Icon = (props) => (
  <svg
    className={`icon icon-${props.icon}`}
    role='img'
    height={props.height || null}
    width={props.width || null}
    aria-label={props.icon}
    title={props.title}
  >
    {props.title && <title>{props.title}</title>}
    <use href={`${Icons}#${props.icon}`} />
  </svg>
);

export default Icon;
