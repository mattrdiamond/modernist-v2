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
    <section className="carousel-text">
      <h2>Share the love!</h2>
      <p>
        This is a paragraph of placeholder content. Will soon replace with
        meaningful content.
      </p>
      {/*<Carousel />*/}
    </section>
  </div>
);

export default Homepage;
