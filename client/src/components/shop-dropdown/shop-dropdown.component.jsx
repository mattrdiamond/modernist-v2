import React, { useRef } from "react";
import { Link } from "react-router-dom";
import useOnClickOutside from "../../hooks/use-onclick-outside";
import useLockBodyScroll from "../../hooks/use-lock-body-scroll";
import { sortAsc } from "../../utils/sort";
import Icon from "../icon/icon.component";
import "./shop-dropdown.styles.scss";

const ShopDropdown = ({ toggleShopDropdown, sections }) => {
  const shopDropdownRef = useRef(null);

  // Close dropdown when clicked outside
  useOnClickOutside({
    ref: shopDropdownRef,
    handler: toggleShopDropdown,
    ignoreOutsideElementClass: "ignore-co-shop",
  });

  useLockBodyScroll();

  const sortedShopSections = sortAsc(sections, sections.title);

  return (
    <ul className='shop-dropdown' ref={shopDropdownRef}>
      {sortedShopSections.map(({ id, title, linkUrl }) => (
        <li className='shop-category' key={id}>
          <Link
            className='shop-link'
            to={`/${linkUrl}`}
            onClick={toggleShopDropdown}
          >
            <div className='link-content'>
              <Icon icon={title.replace(/ &.*| /, "").toLowerCase()} />
              {title}
            </div>
            <Icon icon='arrow-right' />
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default ShopDropdown;
