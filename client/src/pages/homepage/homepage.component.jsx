import React from "react";
import Directory from "../../components/directory/directory.component";
import VideoBanner from "../../components/video-banner/video-banner.component";
import NewsletterSignup from "../../components/newsletter-signup/newsletter-signup.component";
import Carousel from "../../components/carousel/carousel.component";
import Landing from "../../components/landing/landing.component";
import About from "../../components/about/about.component";
import lightingVideo from "../../assets/video/lighting_video.mp4";
// import { videoPoster } from "../../assets/img/_images";
import "./homepage.styles.scss";

const Homepage = () => (
  <div className='homepage'>
    <Landing />
    <About />
    <Directory />
    <VideoBanner videoSrc={lightingVideo} />
    <NewsletterSignup />
    <Carousel />
  </div>
);

export default Homepage;
