import React from "react";
import Directory from "../../components/directory/directory.component";
import VideoBanner from "../../components/video-banner/video-banner.component";
import NewsletterSignup from "../../components/newsletter-signup/newsletter-signup.component";
import Carousel from "../../components/carousel/carousel.component";
// import About from "../../components/about/about.component";
import CuratedRoom from "../../components/curated-room/curated-room.component";
import lightingVideo from "../../assets/video/lighting_video.mp4";
import HeroSlideshow from "./components/hero-slideshow/hero-slideshow.component";
import { WindowSizeProvider } from "../../contexts/WindowSizeContext";

const Homepage = () => (
  <WindowSizeProvider debounceDelay={500}>
    <div className='homepage'>
      <HeroSlideshow />
      {/* <About /> */}
      <Directory />
      <VideoBanner videoSrc={lightingVideo} />
      <CuratedRoom />
      <NewsletterSignup />
      <Carousel />
    </div>
  </WindowSizeProvider>
);

export default Homepage;
