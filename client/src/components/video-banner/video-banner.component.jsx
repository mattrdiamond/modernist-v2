import React, { useRef, useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import useIntersectionObserver from "../../hooks/useIntersectionObserver";
import CustomButton from "../custom-button/custom-button.component";
import "./video-banner.styles.scss";

function VideoBanner({ videoSrc, posterSrc = "", history }) {
  const { targetRef, isIntersecting } = useIntersectionObserver({
    threshold: 0.25,
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
  }, [isIntersecting]);

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

export default withRouter(VideoBanner);
