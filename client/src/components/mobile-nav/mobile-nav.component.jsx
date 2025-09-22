import { forwardRef } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import useLockBodyScroll from "../../hooks/use-lock-body-scroll";

import PropTypes from "prop-types";
import {
  currentUserType,
  sectionsType,
  productDetailType,
} from "../../sharedPropTypes/sharedPropTypes";

import { selectDirectorySections } from "../../redux/directory/directory.selectors";
import { selectInputValue } from "../../redux/search/search.selectors";
import {
  selectAllCollectionItems,
  selectAreAllCollectionsLoaded,
} from "../../redux/shop/shop.selectors";
import { selectCurrentUser } from "../../redux/user/user.selectors";
import { setInputValue } from "../../redux/search/search.actions";
import { fetchCollectionsStart } from "../../redux/shop/shop.actions";
import { toggleNav } from "../../redux/mobile-nav/mobile-nav.actions";
import { signOutStart } from "../../redux/user/user.actions";

import MobileNavLink from "../mobile-nav-link/mobile-nav-link.component";
import SearchDropdown from "../search-dropdown/search-dropdown.component";
import SearchInput from "../search-input/search-input.component";
import useRedirectToSignIn from "../../hooks/use-redirect-to-signin";

import "./mobile-nav.styles.scss";

const MobileNav = forwardRef(
  (
    {
      sections,
      toggleNav,
      inputValue,
      setInputValue,
      collectionItems,
      fetchCollectionsStart,
      currentUser,
      signOutStart,
      allCollectionsLoaded,
    },
    ref
  ) => {
    const redirectToSignIn = useRedirectToSignIn();

    const handleChange = (e) => {
      const { value } = e.target;
      setInputValue(value);
      if (!allCollectionsLoaded) fetchCollectionsStart();
    };

    const handleClear = () => {
      setInputValue("");
    };

    useLockBodyScroll();

    const handleSignAndSignUp = () => {
      if (currentUser) {
        signOutStart();
      } else {
        redirectToSignIn();
        toggleNav();
      }
    };

    return (
      <div className='mobile-nav-directory' ref={ref}>
        <div className='inner-wrapper page-width'>
          <SearchInput
            handleChange={handleChange}
            handleClear={handleClear}
            placeholder='Search Modernist'
            value={inputValue}
            inputValue={inputValue}
          />
          {inputValue && (
            <SearchDropdown
              collectionItems={collectionItems}
              inputValue={inputValue}
            />
          )}

          <ul className='mbl-nav-links'>
            {sections.map(({ id, ...otherSectionProps }) => (
              <MobileNavLink
                key={id}
                handleClick={toggleNav}
                {...otherSectionProps}
              />
            ))}
            <MobileNavLink
              title={currentUser ? "Sign Out" : "Sign In"}
              handleClick={handleSignAndSignUp}
            />
            <MobileNavLink
              title='Favorites'
              linkUrl={"favorites"}
              handleClick={toggleNav}
            />
          </ul>
        </div>
      </div>
    );
  }
);

const mapDispatchToProps = (dispatch) => ({
  toggleNav: () => dispatch(toggleNav()),
  setInputValue: (inputValue) => dispatch(setInputValue(inputValue)),
  fetchCollectionsStart: () => dispatch(fetchCollectionsStart()),
  signOutStart: () => dispatch(signOutStart()),
});

const mapStateToProps = createStructuredSelector({
  sections: selectDirectorySections,
  inputValue: selectInputValue,
  collectionItems: selectAllCollectionItems,
  currentUser: selectCurrentUser,
  allCollectionsLoaded: selectAreAllCollectionsLoaded,
});

export default connect(mapStateToProps, mapDispatchToProps, null, {
  forwardRef: true,
})(MobileNav);

MobileNav.propTypes = {
  sections: sectionsType.isRequired,
  toggleNav: PropTypes.func.isRequired,
  inputValue: PropTypes.string.isRequired,
  setInputValue: PropTypes.func.isRequired,
  collectionItems: PropTypes.arrayOf(productDetailType).isRequired,
  fetchCollectionsStart: PropTypes.func.isRequired,
  currentUser: currentUserType,
  signOutStart: PropTypes.func.isRequired,
  allCollectionsLoaded: PropTypes.bool.isRequired,
};
