import React, { useState } from "react";
import { Link } from "react-router-dom";
import Icon from "../icon/icon.component";
import Toggle from "../toggle/toggle.component";
import "./footer.styles.scss";

const Footer = () => {
  const [menus, setMenus] = useState([
    {
      category: "Company",
      links: ["About Us", "Store Locations", "Privacy Policy", "Terms of Use"],
      open: false,
    },
    {
      category: "Shop",
      links: ["Hats", "Jackets", "Sneakers", "Women's", "Mens"],
      open: false,
    },
    {
      category: "Resources",
      links: ["Shipping", "Guarantee", "Financing", "Product Safety", "FAQs"],
      open: false,
    },
    {
      category: "Connect",
      links: ["Customer Care", "Blog", "Reviews"],
      icons: ["twitter", "facebook", "instagram"],
      open: false,
    },
  ]);

  const [activeMenu, setActiveMenu] = useState(null);

  const handleToggle = (e) => {
    const target = e.target.innerHTML;
    if (window.innerWidth > 650) return;
    setActiveMenu(target);
  };

  // return (
  //   <section className="footer">
  //     <div className="footer-inner page-width">
  //       <div className="footer-logo">
  //         <Link to="/">
  //           <h2 className="logo">modernist.</h2>
  //         </Link>
  //         <span className="small">
  //           Copyright ©{new Date().getFullYear()} modernist.
  //         </span>
  //         <span className="small">All Rights Reserved.</span>
  //       </div>
  //       <div className="footer-links">
  //         {menus.map((menu, index) => (
  //           <FooterMenu menu={menu} index={index} toggle={handleToggle}/>
  //         ))}
  //         <div className="col-1">
  //           <h4 onClick={handleToggle}>Company</h4>
  //           <ul className="footer-ul">
  //             <li>About Us</li>
  //             <li>Store Locations</li>
  //             <li>Privacy Policy</li>
  //             <li>Terms of Use</li>
  //             <li>Press</li>
  //           </ul>
  //         </div>
  //         <div className="col-2">
  //           <h4 onClick={handleToggle}>Shop</h4>
  //           <ul className="footer-ul">
  //             <Link to="/shop/hats">
  //               <li>Hats</li>
  //             </Link>
  //             <Link to="/shop/jackets">
  //               <li>Jackets</li>
  //             </Link>
  //             <Link to="/shop/sneakers">
  //               <li>Sneakers</li>
  //             </Link>
  //             <Link to="/shop/womens">
  //               <li>Women's</li>
  //             </Link>
  //             <Link to="/shop/mens">
  //               <li>Men's</li>
  //             </Link>
  //           </ul>
  //         </div>
  //         <div className="col-3">
  //           <h4 onClick={handleToggle}>Resources</h4>
  //           <ul className="footer-ul">
  //             <li>Shipping</li>
  //             <li>Guarantee</li>
  //             <li>Financing</li>
  //             <li>Product Safety</li>
  //             <li>FAQs</li>
  //           </ul>
  //         </div>
  //         <div className="col-4">
  //           <h4>Connect</h4>
  //           <ul className="footer-ul">
  //             <li>Customer Care</li>
  //             <li>Blog</li>
  //             <li>Reviews</li>
  //           </ul>
  //           <div className="social-media">
  //             <Icon icon="twitter" />
  //             <Icon icon="facebook" />
  //             <Icon icon="instagram" />
  //           </div>
  //         </div>
  //       </div>
  //     </div>
  //   </section>
  // );

  return (
    <section className="footer">
      <div className="footer-inner page-width">
        <div className="footer-logo">
          <Link to="/">
            <h2 className="logo">modernist.</h2>
          </Link>
          <span className="small">
            Copyright ©{new Date().getFullYear()} modernist.
          </span>
          <span className="small">All Rights Reserved.</span>
        </div>
        <div className="footer-links">
          <div className="col-1">
            <Toggle title="Company">
              <ul className="footer-ul">
                <li>About Us</li>
                <li>Store Locations</li>
                <li>Privacy Policy</li>
                <li>Terms of Use</li>
                <li>Press</li>
              </ul>
            </Toggle>
          </div>
          <div className="col-2">
            <Toggle title="shop">
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
            </Toggle>
          </div>
          <div className="col-3">
            <Toggle title="Resources">
              <ul className="footer-ul">
                <li>Shipping</li>
                <li>Guarantee</li>
                <li>Financing</li>
                <li>Product Safety</li>
                <li>FAQs</li>
              </ul>
            </Toggle>
          </div>
          <div className="col-4">
            <Toggle title="Connect">
              <ul className="footer-ul">
                <li>Customer Care</li>
                <li>Blog</li>
                <li>Reviews</li>
              </ul>
            </Toggle>
            <div className="social-media">
              <Icon icon="twitter" />
              <Icon icon="facebook" />
              <Icon icon="instagram" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Footer;
