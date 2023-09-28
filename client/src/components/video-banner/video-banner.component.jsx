import React, { useEffect } from "react";
import { withRouter } from "react-router-dom";
import useIntersectionObserver from "../../hooks/use-intersection-observer";
import CustomButton from "../custom-button/custom-button.component";
import PropTypes from "prop-types";
import "./video-banner.styles.scss";

function VideoBanner({ videoSrc, posterSrc = "", history }) {
  const { targetRef, isIntersecting } = useIntersectionObserver({
    threshold: 0.125,
    observeOnce: false,
  });

  useEffect(() => {
    const video = targetRef.current;
    if (!video) return;
    if (isIntersecting) {
      video.play().catch((error) => {
        // TO DO: Handle play error here
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
      <div className='content-wrapper'>
        <span className='subtitle'>New Arrivals</span>
        <h2>Statement lighting you'll&nbsp;love.</h2>
        <CustomButton inverted onClick={() => history.push("/shop/lighting")}>
          Shop Now
        </CustomButton>
      </div>
    </section>
  );
}

VideoBanner.propTypes = {
  videoSrc: PropTypes.string.isRequired,
  posterSrc: PropTypes.string,
  history: PropTypes.object.isRequired,
};

export default withRouter(VideoBanner);
