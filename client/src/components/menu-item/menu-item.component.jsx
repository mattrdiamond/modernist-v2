import React from "react";
import { withRouter } from "react-router-dom";
import ResponsiveImage from "../responsive-image/responsive-image.component";
import "./menu-item.styles.scss";

const MenuItem = ({ title, linkUrl, history, match, images }) => {
  return (
    <div
      className='menu-item'
      onClick={() => history.push(`${match.url}${linkUrl}`)}
    >
      <ResponsiveImage
        picture={{
          sources: images,
          alt: title,
          styles: "background-image",
        }}
      />
      <div className='content'>
        <h2 className='title'>{title}</h2>
        <span className='shop-link'>Shop Now</span>
      </div>
    </div>
  );
};

export default withRouter(MenuItem);
