import React, { useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectDirectorySections } from "../../redux/directory/directory.selectors";
import { sortAsc } from "../../utils/sort";
import Icon from "../icon/icon.component";
import Accordion from "../accordion/accordion.component";
import "./footer.styles.scss";

const Footer = ({ sections }) => {
  const [expandedTitle, setExpandedTitle] = useState(null);

  const toggle = (title) => {
    // toggle closed if same title clicked twice
    if (title === expandedTitle) {
      return setExpandedTitle(null);
    }
    setExpandedTitle(title);
  };

  const sortedShopSections = sortAsc(sections, sections.title);

  return (
    <section className='footer'>
      <div className='footer-inner'>
        <div className='footer-logo'>
          <Link to='/'>
            <Icon icon='modernist' />
          </Link>
          <span className='small'>
            Copyright ©{new Date().getFullYear()} modernist.
          </span>
          <span className='small'>All Rights Reserved.</span>
        </div>
        <div className='footer-links'>
          <div className='col-1'>
            <Accordion
              title='Company'
              toggle={toggle}
              expandedTitle={expandedTitle}
              key='1'
            >
              <ul className='footer-ul'>
                <li>About Us</li>
                <li>Store Locations</li>
                <li>Privacy Policy</li>
                <li>Terms of Use</li>
                <li>Press</li>
              </ul>
            </Accordion>
          </div>
          <div className='col-2'>
            <Accordion
              title='shop'
              toggle={toggle}
              expandedTitle={expandedTitle}
            >
              <ul className='footer-ul'>
                {sortedShopSections.map(({ id, title, linkUrl }) => (
                  <li key={id}>
                    <Link to={`/${linkUrl}`}>{title}</Link>
                  </li>
                ))}
              </ul>
            </Accordion>
          </div>
          <div className='col-3'>
            <Accordion
              title='Resources'
              toggle={toggle}
              expandedTitle={expandedTitle}
            >
              <ul className='footer-ul'>
                <li>Shipping</li>
                <li>Guarantee</li>
                <li>Financing</li>
                <li>Product Safety</li>
                <li>FAQs</li>
              </ul>
            </Accordion>
          </div>
          <div className='col-4'>
            <Accordion
              title='Connect'
              toggle={toggle}
              expandedTitle={expandedTitle}
            >
              <ul className='footer-ul'>
                <li>Customer Care</li>
                <li>Blog</li>
                <li>Reviews</li>
              </ul>
            </Accordion>
            <div className='social-media'>
              <a
                className='icon-link'
                href='http://twitter.com'
                target='_blank'
                rel='noopener noreferrer'
              >
                <Icon icon='twitter' />
              </a>
              <a
                className='icon-link'
                href='http://facebook.com'
                target='_blank'
                rel='noopener noreferrer'
              >
                <Icon icon='facebook' />
              </a>
              <a
                className='icon-link'
                href='http://instagram.com'
                target='_blank'
                rel='noopener noreferrer'
              >
                <Icon icon='instagram' />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const mapStateToProps = createStructuredSelector({
  sections: selectDirectorySections,
});

export default connect(mapStateToProps)(Footer);
