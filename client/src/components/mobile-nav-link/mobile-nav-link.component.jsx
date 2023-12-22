import React from "react";
import { Link } from "react-router-dom";
import Icon from "../icon/icon.component";
import "./mobile-nav-link.styles.scss";

const MobileNavLink = ({ title, linkUrl, handleClick }) => (
  <li className='mbl-nav-category'>
    <Link className='mbl-nav-link' to={`/${linkUrl}`} onClick={handleClick}>
      <div className='link-content'>
        <div className='icon-container'>
          <Icon icon={title.replace(/ &.*| /, "").toLowerCase()} />
        </div>
        {title}
      </div>
      <Icon icon='arrow-right' />
    </Link>
  </li>
);

export default MobileNavLink;
