import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Icon from "../icon/icon.component";
import "./mobile-nav-link.styles.scss";

const MobileNavLink = ({ title, linkUrl, handleClick }) => {
  const navLinkContent = (
    <>
      <div className='link-content'>
        <div className='icon-container'>
          <Icon icon={title.replace(/ &.*| /, "").toLowerCase()} />
        </div>
        {title}
      </div>
      <Icon icon='arrow-right' />
    </>
  );

  return (
    <li className='mbl-nav-category'>
      {linkUrl ? (
        <Link className='mbl-nav-link' to={`/${linkUrl}`} onClick={handleClick}>
          {navLinkContent}
        </Link>
      ) : (
        <div
          className='mbl-nav-link'
          onClick={handleClick}
          role='button'
          tabIndex={0}
        >
          {navLinkContent}
        </div>
      )}
    </li>
  );
};

export default MobileNavLink;

MobileNavLink.propTypes = {
  title: PropTypes.string.isRequired,
  linkUrl: PropTypes.string,
  handleClick: PropTypes.func.isRequired,
};
