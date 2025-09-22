import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { CSSTransition } from "react-transition-group"; // applies CSS transition before removing element from DOM
import ResponsiveImage from "../../../../components/responsive-image/responsive-image.component";

function PlaceholderImage({ placeholder, id, placeholderImgRef }) {
  return (
    <div ref={placeholderImgRef} className={`placeholder-img-wrapper ${id}`}>
      <img src={placeholder} alt='' className='hero-image' />
    </div>
  );
}

export default function HeroSlide({
  heading,
  id,
  subtitle,
  image,
  ctaLink,
  ctaText,
  base64LoaderImage,
}) {
  const [loading, setLoading] = useState(true);
  const placeholderImgRef = useRef(null);

  const handleImageLoad = () => {
    setLoading(false);
  };

  const headingLines = heading.split("\n");
  const numLines = headingLines.length;

  return (
    <div className='hero-slide-wrapper'>
      <ResponsiveImage picture={image} onLoaded={handleImageLoad} />
      <CSSTransition
        in={loading}
        classNames='transition-wrapper'
        timeout={500}
        unmountOnExit
        nodeRef={placeholderImgRef}
      >
        <PlaceholderImage
          placeholder={base64LoaderImage}
          id={id}
          placeholderImgRef={placeholderImgRef}
        />
      </CSSTransition>
      <div className='content-outer-wrapper'>
        <div className='page-width page-width-container'>
          <div className='content-inner-wrapper'>
            <div className='overflow-hidden'>
              <p className='subtitle'>{subtitle}</p>
            </div>
            <h2 className='hero-slide-heading'>
              {headingLines.map((line, index) => (
                <span
                  key={index}
                  className='heading-line-container overflow-hidden'
                >
                  <span className='heading-line' key={index}>
                    {line}
                  </span>
                </span>
              ))}
            </h2>
            <span className='hero-slide-cta-link-wrapper overflow-hidden'>
              <Link
                className={`hero-slide-cta-link ${
                  numLines === 2 ? "long-delay" : "short-delay"
                }`}
                to={ctaLink}
              >
                {ctaText}
              </Link>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
