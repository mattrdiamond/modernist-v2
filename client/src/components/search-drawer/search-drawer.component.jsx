import { useEffect, useCallback, useRef, forwardRef } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import PropTypes from "prop-types";
import { productDetailType } from "../../sharedPropTypes/sharedPropTypes";

import SearchDropdown from "../search-dropdown/search-dropdown.component";
import SearchInput from "../search-input/search-input.component";
import Icon from "../icon/icon.component";

import {
  selectInputValue,
  selectInputHidden,
} from "../../redux/search/search.selectors";
import {
  selectAllCollectionItems,
  selectAreAllCollectionsLoaded,
} from "../../redux/shop/shop.selectors";
import {
  setInputValue,
  closeSearchDrawer,
} from "../../redux/search/search.actions";
import { fetchCollectionsStart } from "../../redux/shop/shop.actions";

import useOnClickOutside from "../../hooks/use-onclick-outside";
import useLockBodyScroll from "../../hooks/use-lock-body-scroll";

import "./search-drawer.styles.scss";

const SearchDrawer = forwardRef(
  (
    {
      inputHidden,
      setInputValue,
      inputValue,
      collectionItems,
      fetchCollectionsStart,
      closeSearchDrawer,
      allCollectionsLoaded,
    },
    ref
  ) => {
    const inputRef = useRef(null);

    // Focus on input when component mounts
    useEffect(() => {
      inputRef.current.focus();
    }, []);

    // Prevent scrolling when drawer open
    useLockBodyScroll();

    const handleClose = useCallback(() => {
      closeSearchDrawer();
    }, [closeSearchDrawer]);

    const handleChange = (e) => {
      e.preventDefault();
      const { value } = e.target;

      setInputValue(value);
      if (!allCollectionsLoaded) fetchCollectionsStart();
    };

    const handleClear = () => {
      setInputValue("");
      inputRef.current.focus();
    };

    // Close search drawer when clicked outside
    useOnClickOutside({
      ref: inputRef,
      handler: handleClose,
      ignoreOutsideElementClass: "ignore-co-search",
      isHidden: inputHidden,
    });

    return (
      <div className='search-drawer ignore-co-search page-width' ref={ref}>
        <SearchInput
          handleChange={handleChange}
          handleClear={handleClear}
          placeholder='Search Modernist'
          value={inputValue}
          ref={inputRef}
          inputValue={inputValue}
        >
          {inputValue && (
            <SearchDropdown
              collectionItems={collectionItems}
              inputValue={inputValue}
            />
          )}
        </SearchInput>

        <button className='close-button ignore-co-search' onClick={handleClose}>
          <Icon icon='collapse' title='collapse' />
        </button>
      </div>
    );
  }
);

const mapDispatchToProps = (dispatch) => ({
  setInputValue: (inputValue) => dispatch(setInputValue(inputValue)),
  fetchCollectionsStart: () => dispatch(fetchCollectionsStart()),
  closeSearchDrawer: () => dispatch(closeSearchDrawer()),
});

const mapStateToProps = createStructuredSelector({
  inputValue: selectInputValue,
  collectionItems: selectAllCollectionItems,
  inputHidden: selectInputHidden,
  allCollectionsLoaded: selectAreAllCollectionsLoaded,
});

export default connect(mapStateToProps, mapDispatchToProps, null, {
  forwardRef: true,
})(SearchDrawer);

SearchDrawer.propTypes = {
  inputHidden: PropTypes.bool.isRequired,
  setInputValue: PropTypes.func.isRequired,
  inputValue: PropTypes.string.isRequired,
  collectionItems: PropTypes.arrayOf(productDetailType).isRequired,
  fetchCollectionsStart: PropTypes.func.isRequired,
  closeSearchDrawer: PropTypes.func.isRequired,
  allCollectionsLoaded: PropTypes.bool.isRequired,
};
