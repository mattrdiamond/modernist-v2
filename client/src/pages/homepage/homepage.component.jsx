import React from "react";
import Directory from "../../components/directory/directory.component";
import NewsletterSignup from "../../components/newsletter-signup/newsletter-signup.component";
import "./homepage.styles.scss";

const Homepage = () => (
  <div className="homepage">
    <Directory />
    <NewsletterSignup />
  </div>
);

export default Homepage;
