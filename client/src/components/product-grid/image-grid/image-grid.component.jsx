import React from "react";
import "./image-grid.styles.scss";

const ImageGrid = ({ children, className }) => {
  return <div className={`image-grid ${className}`}>{children}</div>;
};

export default ImageGrid;
