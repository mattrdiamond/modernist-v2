import React, { useEffect, useCallback, useRef } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import SearchDropdown from "../search-dropdown/search-dropdown.component";
import SearchInput from "../search-input/search-input.component";
import Icon from "../icon/icon.component";

import {
  selectInputValue,
  selectInputHidden,
} from "../../redux/search/search.selectors";
import { selectAllCollectionItems } from "../../redux/shop/shop.selectors";
import {
  setInputValue,
  closeSearchDrawer,
} from "../../redux/search/search.actions";
import { fetchCollectionsStart } from "../../redux/shop/shop.actions";

import useOnClickOutside from "../../utils/use-onclick-outside";
import useLockBodyScroll from "../../utils/use-lock-body-scroll";

import "./search-drawer.styles.scss";

const SearchDrawer = ({
  inputHidden,
  setInputValue,
  inputValue,
  collectionItems,
  fetchCollectionsStart,
  closeSearchDrawer,
}) => {
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
    console.log("val", value);

    setInputValue(value);
    if (!collectionItems.length) fetchCollectionsStart();
  };

  const handleClear = () => {
    setInputValue("");
    inputRef.current.focus();
  };

  // Close search drawer when clicked outside
  useOnClickOutside(inputRef, handleClose, "ignore-co-search", inputHidden);

  return (
    <div className={"search-drawer ignore-co-search page-width"}>
      <SearchInput
        handleChange={handleChange}
        handleClear={handleClear}
        placeholder="Search Modernist"
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

      <button className="close-button ignore-co-search" onClick={handleClose}>
        <Icon icon="collapse" />
      </button>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  setInputValue: (inputValue) => dispatch(setInputValue(inputValue)),
  fetchCollectionsStart: () => dispatch(fetchCollectionsStart()),
  closeSearchDrawer: () => dispatch(closeSearchDrawer()),
});

const mapStateToProps = createStructuredSelector({
  inputValue: selectInputValue,
  collectionItems: selectAllCollectionItems,
  inputHidden: selectInputHidden,
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchDrawer);
