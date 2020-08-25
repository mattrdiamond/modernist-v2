import React, { useEffect, useCallback, useRef } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import SearchDropdown from "../search-dropdown/search-dropdown.component";
import SearchInput from "../search-input/search-input.component";
import {
  selectInputValue,
  selectInputHidden,
} from "../../redux/search/search.selectors";
import { selectCollectionItems } from "../../redux/shop/shop.selectors";
import {
  setInputValue,
  closeSearchDrawer,
} from "../../redux/search/search.actions";
import { fetchCollectionsStart } from "../../redux/shop/shop.actions";
import Icon from "../icon/icon.component";
import useOnClickOutside from "../../utils/use-onclick-outside";
import useLockBodyScroll from "../../utils/use-lock-body-scroll";
import "./search-drawer.scss";

const SearchDrawer = ({
  inputHidden,
  setInputValue,
  inputValue,
  // inputRef,
  collectionItems,
  fetchCollectionsStart,
  closeSearchDrawer,
  // focusOnInput,
}) => {
  const inputRef = useRef(null);

  // focus on input when component mounts
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  // prevent scrolling when drawer open
  useLockBodyScroll();

  // useCallback prevents re-creation of function every time component rebuilds
  const handleClose = useCallback(() => {
    closeSearchDrawer();
  }, [closeSearchDrawer]);

  const handleChange = (e) => {
    const { value } = e.target;
    setInputValue(value);
    if (!collectionItems.length) fetchCollectionsStart();
  };

  const handleClear = () => {
    setInputValue("");
    inputRef.current.focus();
  };

  useOnClickOutside(inputRef, handleClose, "ignore-co-search", inputHidden);

  console.log("render search drawer");

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
  collectionItems: selectCollectionItems,
  inputHidden: selectInputHidden,
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchDrawer);
