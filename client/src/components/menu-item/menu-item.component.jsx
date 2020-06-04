import React from "react";
import { withRouter } from "react-router-dom";
import "./menu-item.styles.scss";

const MenuItem = ({ title, imageUrl, size, linkUrl, history, match }) => (
  /* we don't know where we will be within directory, so use match to match
  the current url and then add linkUrl (from state) to the end */
  <div
    className="menu-item"
    onClick={() => history.push(`${match.url}${linkUrl}`)}
  >
    <div
      className="background-image"
      style={{
        backgroundImage: `url(${imageUrl})`,
      }}
    />
    <div className="content">
      <h1 className="title">{title}</h1>
      <span className="subtitle">SHOP NOW</span>
    </div>
  </div>
);

// withRouter (from react-router-dom) gives menuItem access to location, match and history props
// without having to pass them as props from the <Route component={HomePage} to MenuItem (no prop drilling)
export default withRouter(MenuItem);
