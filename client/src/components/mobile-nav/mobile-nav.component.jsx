import React, { useRef } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { selectNavVisible } from "../../redux/mobile-nav/mobile-nav.selectors";
import { selectDirectorySections } from "../../redux/directory/directory.selectors";
import { selectInputValue } from "../../redux/search/search.selectors";
import { selectCollectionItems } from "../../redux/shop/shop.selectors";
import { selectCurrentUser } from "../../redux/user/user.selectors";
import { setInputValue } from "../../redux/search/search.actions";
import { fetchCollectionsStart } from "../../redux/shop/shop.actions";
import { toggleNav } from "../../redux/mobile-nav/mobile-nav.actions";

import MobileNavLink from "../mobile-nav-link/mobile-nav-link.component";
import SearchDropdown from "../search-dropdown/search-dropdown.component";
import SearchInput from "../search-input/search-input.component";

import "./mobile-nav.styles.scss";

const MobileNav = ({
  isVisible,
  sections,
  toggleNav,
  inputValue,
  setInputValue,
  collectionItems,
  fetchCollectionsStart,
  currentUser,
}) => {
  console.log("render mobileNav");

  const handleChange = (e) => {
    const { value } = e.target;
    setInputValue(value);
    if (!collectionItems.length) fetchCollectionsStart();
  };

  const handleClear = () => {
    setInputValue("");
  };

  return (
    <div className={"mobile-nav-directory" + (isVisible ? " is-open" : "")}>
      <div className="inner-wrapper page-width">
        <SearchInput
          handleChange={handleChange}
          handleClear={handleClear}
          placeholder="Search Modernist"
          value={inputValue}
          aria-hidden={isVisible}
          tabIndex={isVisible ? "-1" : "0"}
          inputValue={inputValue}
        />
        {isVisible && inputValue && (
          <SearchDropdown
            collectionItems={collectionItems}
            inputValue={inputValue}
          />
        )}

        <ul className="mbl-nav-links">
          {sections.map(({ id, ...otherSectionProps }) => (
            <MobileNavLink
              key={id}
              toggleNav={toggleNav}
              {...otherSectionProps}
            />
          ))}
          <MobileNavLink
            title={currentUser ? "Sign Out" : "Sign In"}
            linkUrl={"signin"}
            toggleNav={toggleNav}
          />
          <MobileNavLink
            title="Favorites"
            linkUrl={"favorites"}
            toggleNav={toggleNav}
          />
        </ul>
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  toggleNav: () => dispatch(toggleNav()),
  setInputValue: (inputValue) => dispatch(setInputValue(inputValue)),
  fetchCollectionsStart: () => dispatch(fetchCollectionsStart()),
});

const mapStateToProps = createStructuredSelector({
  isVisible: selectNavVisible,
  sections: selectDirectorySections,
  inputValue: selectInputValue,
  collectionItems: selectCollectionItems,
  currentUser: selectCurrentUser,
});

export default connect(mapStateToProps, mapDispatchToProps)(MobileNav);
