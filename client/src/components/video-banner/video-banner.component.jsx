import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import useIntersectionObserver from "../../hooks/use-intersection-observer";
import CustomButton from "../custom-button/custom-button.component";
import Spinner from "../spinner/spinner.component";
import PropTypes from "prop-types";
import "./video-banner.styles.scss";

function VideoBanner({ videoSrc, posterSrc = "", history }) {
  const [isLoading, setIsLoading] = useState(true);

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
      {isLoading && <Spinner />}
      <video
        ref={targetRef}
        src={videoSrc}
        muted
        loop
        playsInline
        poster={posterSrc}
        preload='none'
        onLoadedData={() => setIsLoading(false)}
      />
      <div className='content-wrapper page-width'>
        <span className='subtitle'>Available Now</span>
        <h2 className='video-title'>Our all-new curtain&nbsp;lineup</h2>
        <CustomButton
          buttonStyle='white'
          onClick={() => history.push("/shop/decor/53")}
        >
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
