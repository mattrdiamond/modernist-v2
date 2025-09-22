import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useIntersectionObserver from "../../hooks/use-intersection-observer";
import CustomButton from "../custom-button/custom-button.component";
import PropTypes from "prop-types";
import "./video-banner.styles.scss";

function VideoBanner({
  videoData: { videoSrc, posterSrc, title, subtitle, ctaText, ctaLink },
}) {
  const navigate = useNavigate();

  const { targetRef, isIntersecting } = useIntersectionObserver({
    threshold: 0.125,
    observeOnce: false,
  });

  useEffect(() => {
    const video = targetRef.current;
    if (!video) return;

    if (isIntersecting) {
      video.play().catch((error) => {
        console.error("Error playing video:", error);
      });
    } else {
      video.pause();
    }
  }, [isIntersecting, targetRef]);

  return (
    <section className='vidbanner-wrapper'>
      <video
        ref={targetRef}
        src={videoSrc}
        muted
        loop
        playsInline
        poster={posterSrc}
        preload='none'
      />
      <div className='content-wrapper page-width'>
        {subtitle && <span className='subtitle'>{subtitle}</span>}
        {title && <h2 className='video-title'>{title}</h2>}
        {ctaText && ctaLink && (
          <CustomButton buttonStyle='white' onClick={() => navigate(ctaLink)}>
            {ctaText}
          </CustomButton>
        )}
      </div>
    </section>
  );
}

export default VideoBanner;

VideoBanner.propTypes = {
  videoData: PropTypes.shape({
    videoSrc: PropTypes.string.isRequired,
    posterSrc: PropTypes.string,
    title: PropTypes.string,
    subtitle: PropTypes.string,
    ctaText: PropTypes.string,
    ctaLink: PropTypes.string,
  }).isRequired,
};
