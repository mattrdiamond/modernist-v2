import React, { useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import Icon from "../icon/icon.component";
import Accordion from "../accordion/accordion.component";
import "./footer.styles.scss";

const Footer = () => {
  const [expandedTitle, setExpandedTitle] = useState(null);

  const toggle = (title) => {
    // toggle closed if same title clicked twice
    if (title === expandedTitle) {
      return setExpandedTitle(null);
    }
    setExpandedTitle(title);
  };

  return (
    <section className="footer">
      <div className="footer-inner">
        <div className="footer-logo">
          <Link to="/">
            <Icon icon="logo" />
          </Link>
          <span className="small">
            Copyright ©{new Date().getFullYear()} modernist.
          </span>
          <span className="small">All Rights Reserved.</span>
        </div>
        <div className="footer-links">
          <div className="col-1">
            <Accordion
              title="Company"
              toggle={toggle}
              expandedTitle={expandedTitle}
            >
              <ul className="footer-ul">
                <li>About Us</li>
                <li>Store Locations</li>
                <li>Privacy Policy</li>
                <li>Terms of Use</li>
                <li>Press</li>
              </ul>
            </Accordion>
          </div>
          <div className="col-2">
            <Accordion
              title="shop"
              toggle={toggle}
              expandedTitle={expandedTitle}
            >
              <ul className="footer-ul">
                <Link to="/shop/hats">
                  <li>Hats</li>
                </Link>
                <Link to="/shop/jackets">
                  <li>Jackets</li>
                </Link>
                <Link to="/shop/sneakers">
                  <li>Sneakers</li>
                </Link>
                <Link to="/shop/womens">
                  <li>Women's</li>
                </Link>
                <Link to="/shop/mens">
                  <li>Men's</li>
                </Link>
              </ul>
            </Accordion>
          </div>
          <div className="col-3">
            <Accordion
              title="Resources"
              toggle={toggle}
              expandedTitle={expandedTitle}
            >
              <ul className="footer-ul">
                <li>Shipping</li>
                <li>Guarantee</li>
                <li>Financing</li>
                <li>Product Safety</li>
                <li>FAQs</li>
              </ul>
            </Accordion>
          </div>
          <div className="col-4">
            <Accordion
              title="Connect"
              toggle={toggle}
              expandedTitle={expandedTitle}
            >
              <ul className="footer-ul">
                <li>Customer Care</li>
                <li>Blog</li>
                <li>Reviews</li>
              </ul>
            </Accordion>
            <div className="social-media">
              <a
                className="icon-link"
                href="http://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Icon icon="twitter" />
              </a>
              <a
                className="icon-link"
                href="http://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Icon icon="facebook" />
              </a>
              <a
                className="icon-link"
                href="http://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Icon icon="instagram" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const mapStateToProps = createStructuredSelector({});

export default connect(mapStateToProps)(Footer);
