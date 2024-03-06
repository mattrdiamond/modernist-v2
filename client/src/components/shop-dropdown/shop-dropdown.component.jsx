import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { shopDropdownImages } from "./shop-dropdown-images";
import useLockBodyScroll from "../../hooks/use-lock-body-scroll";
import useOnClickOutside from "../../hooks/use-onclick-outside";
import ImageLoader from "../image-loader/image-loader.component";
import "./shop-dropdown.styles.scss";

const ShopDropdown = ({ toggleShopDropdown, sections }) => {
  const shopDropdownRef = useRef(null);

  useLockBodyScroll();

  useOnClickOutside({
    ref: shopDropdownRef,
    handler: toggleShopDropdown,
  });

  const handleKeyDown = (e) => {
    const links = shopDropdownRef.current.querySelectorAll("a");
    const lastLink = links[links.length - 1];
    // close dropdown after tabbing through last link
    if (e.keyCode === 9 && !e.shiftKey && document.activeElement === lastLink) {
      toggleShopDropdown();
    }
  };

  const handleClick = (e) => {
    let clickedElement = e.target;
    // close shop dropdown when clicking a link
    while (clickedElement) {
      if (
        clickedElement.tagName === "A" ||
        clickedElement.classList.contains("shop-dropdown-list-item")
      ) {
        return toggleShopDropdown();
      }

      // Move up the DOM hierarchy to check if the parent element is a link
      clickedElement = clickedElement.parentElement;
    }
  };

  const handleMouseEnter = () => {
    if (
      !(
        "ontouchstart" in window ||
        navigator.maxTouchPoints > 0 ||
        navigator.msMaxTouchPoints > 0
      )
    ) {
      toggleShopDropdown();
    }
  };

  return (
    <section
      className='shop-dropdown-wrapper'
      onMouseEnter={handleMouseEnter}
      onMouseLeave={toggleShopDropdown}
      onKeyDown={handleKeyDown}
      onClick={handleClick}
      ref={shopDropdownRef}
    >
      <div className='shop-dropdown-grid page-width'>
        <div className='shop-dropdown-category-container'>
          <h3 className='shop-dropdown-header'>Shop by Category</h3>
          <ul className='shop-dropdown-list grey-text' ref={shopDropdownRef}>
            {sections.map(({ id, title, linkUrl }) => (
              <li className='shop-dropdown-list-item' key={id}>
                <Link className='shop-link' to={`/${linkUrl}`}>
                  <span className='shop-link-text'>{title}</span>
                </Link>
              </li>
            ))}
            <li className='shop-dropdown-list-item'>
              <Link className='shop-link' to='/shop'>
                <span className='shop-link-text'>Shop All</span>
              </Link>
            </li>
          </ul>
        </div>
        {shopDropdownImages.map((image, index) => (
          <Link className='shop-img-link grey-text' to={image.link} key={index}>
            <div className='img-container'>
              <ImageLoader
                styles='shop-dropdown-img'
                srcSet={image.srcSet}
                src={image.src}
                alt={image.alt}
              />
            </div>
            <span className='shop-dropdown-img-caption'>{image.caption}</span>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default ShopDropdown;
