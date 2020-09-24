import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import useLockBodyScroll from "../../utils/use-lock-body-scroll";

import { selectDirectorySections } from "../../redux/directory/directory.selectors";
import { selectInputValue } from "../../redux/search/search.selectors";
import { selectAllCollectionItems } from "../../redux/shop/shop.selectors";
import { selectCurrentUser } from "../../redux/user/user.selectors";
import { setInputValue } from "../../redux/search/search.actions";
import { fetchCollectionsStart } from "../../redux/shop/shop.actions";
import { toggleNav } from "../../redux/mobile-nav/mobile-nav.actions";

import MobileNavLink from "../mobile-nav-link/mobile-nav-link.component";
import SearchDropdown from "../search-dropdown/search-dropdown.component";
import SearchInput from "../search-input/search-input.component";

import "./mobile-nav.styles.scss";

const MobileNav = ({
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

  useLockBodyScroll();

  return (
    <div className={"mobile-nav-directory"}>
      <div className="inner-wrapper page-width">
        <SearchInput
          handleChange={handleChange}
          handleClear={handleClear}
          placeholder="Search Modernist"
          value={inputValue}
          inputValue={inputValue}
        />
        {inputValue && (
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
  sections: selectDirectorySections,
  inputValue: selectInputValue,
  collectionItems: selectAllCollectionItems,
  currentUser: selectCurrentUser,
});

export default connect(mapStateToProps, mapDispatchToProps)(MobileNav);
