import { useNavigate, useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import { sectionImageType } from "../../sharedPropTypes/sharedPropTypes";
import ResponsiveImage from "../responsive-image/responsive-image.component";
import "./menu-item.styles.scss";

const MenuItem = ({ title, linkUrl, images }) => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div
      className='menu-item'
      onClick={() => navigate(`${location.pathname}${linkUrl}`)}
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

export default MenuItem;

MenuItem.propTypes = {
  title: PropTypes.string.isRequired,
  linkUrl: PropTypes.string.isRequired,
  images: PropTypes.arrayOf(sectionImageType).isRequired,
};
