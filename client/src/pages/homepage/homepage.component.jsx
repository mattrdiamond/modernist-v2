import React from "react";
import Directory from "../../components/directory/directory.component";
import NewsletterSignup from "../../components/newsletter-signup/newsletter-signup.component";
import Carousel from "../../components/carousel/carousel.component";
import Landing from "../../components/landing/landing.component";
import About from "../../components/about/about.component";
import "./homepage.styles.scss";

const Homepage = () => (
  <div className="homepage">
    <Landing />
    <About />
    <Directory />
    <NewsletterSignup />
    <Carousel />
  </div>
);

export default Homepage;
