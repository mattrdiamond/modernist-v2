import React from "react";
import { withRouter } from "react-router-dom";
import "./menu-item.styles.scss";

const MenuItem = ({
  title,
  linkUrl,
  history,
  match,
  images: { large, small, mobile2x, mobile1x },
}) => (
  <div
    className='menu-item'
    onClick={() => history.push(`${match.url}${linkUrl}`)}
  >
    <picture>
      <source media='(min-width: 701px)' srcSet={`${large} 2x, ${small} 1x`} />
      <source srcSet={`${mobile2x} 2x, ${mobile1x} 1x`} />
      <img className='background-image' alt={title} src={small} />
    </picture>
    <div className='content'>
      <h2 className='title'>{title}</h2>
      <span className='shop-link'>Shop Now</span>
    </div>
  </div>
);

export default withRouter(MenuItem);
