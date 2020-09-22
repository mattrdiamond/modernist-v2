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
  /* we don't know where we will be within directory, so use match to match
  the current url and then add linkUrl (from state) to the end */
  <div
    className="menu-item"
    onClick={() => history.push(`${match.url}${linkUrl}`)}
  >
    <picture>
      <source media="(min-width: 701px)" srcSet={`${large} 2x, ${small} 1x`} />
      <source srcSet={`${mobile2x} 2x, ${mobile1x} 1x`} />
      <img className="background-image" alt={title} src={small} />
    </picture>
    <div className="content">
      <h2 className="title">{title}</h2>
      <span className="subtitle">Shop Now</span>
    </div>
  </div>
);

// withRouter (from react-router-dom) gives menuItem access to location, match and history props
// without having to pass them as props from the <Route component={HomePage} to MenuItem (no prop drilling)
export default withRouter(MenuItem);
