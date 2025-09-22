import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import CustomButton from "../custom-button/custom-button.component";
import "./section-heading.styles.scss";

export default function SectionHeading({
  heading,
  subheading,
  hideSubheadingOnMobile,
  buttonText,
  linkDestination,
}) {
  const navigate = useNavigate();
  return (
    <div className='section-heading-wrapper'>
      <div className='section-heading-text'>
        <h2 className='heading'>{heading}</h2>
        {subheading && (
          <p
            className={`subheading grey-text 
            ${hideSubheadingOnMobile ? "mobile-hidden" : ""}`}
          >
            {subheading}
          </p>
        )}
      </div>
      {linkDestination && (
        <CustomButton
          buttonStyle='text-button'
          onClick={() => navigate(linkDestination)}
        >
          {buttonText}
        </CustomButton>
      )}
    </div>
  );
}

SectionHeading.propTypes = {
  heading: PropTypes.string.isRequired,
  subheading: PropTypes.string,
  buttonText: PropTypes.string,
  linkDestination: PropTypes.string,
  hideSubheadingOnMobile: PropTypes.bool,
};
