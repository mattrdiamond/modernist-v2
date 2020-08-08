import React, { useEffect, useRef, useCallback } from "react";
import { createStructuredSelector } from "reselect";
import { withRouter, Link } from "react-router-dom";
import { selectDirectorySections } from "../../redux/directory/directory.selectors";
import { connect } from "react-redux";
import { toggleDropdownHidden } from "../../redux/shop/shop.actions";
import useOnClickOutside from "../../utils/use-onclick-outside";
import "./shop-dropdown.styles.scss";

const ShopDropdown = ({ toggleShopDropdown, shopDropdownHidden, sections }) => {
  const shopDropdownRef = useRef(null);

  // Close dropdown when clicked outside
  useOnClickOutside(shopDropdownRef, toggleShopDropdown, "ignore-co-shop");

  return (
    <ul
      className="shop-dropdown"
      aria-hidden={shopDropdownHidden ? true : false}
      ref={shopDropdownRef}
    >
      {sections.map(({ id, title, linkUrl }) => (
        <li className="shop-category" key={id}>
          <Link
            className="shop-link"
            to={`/${linkUrl}`}
            onClick={toggleShopDropdown}
          >
            {title}
          </Link>
        </li>
      ))}
    </ul>
  );
};

const mapStateToProps = createStructuredSelector({
  sections: selectDirectorySections,
});

export default connect(mapStateToProps)(ShopDropdown);
