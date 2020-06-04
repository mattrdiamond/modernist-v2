import React, { useRef, useEffect } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import SearchDropdown from "../search-dropdown/search-dropdown.component";
import { selectInputValue } from "../../redux/search/search.selectors";
import { selectCollectionItems } from "../../redux/shop/shop.selectors";
import {
  setInputValue,
  toggleInputHidden,
} from "../../redux/search/search.actions";
import { fetchCollectionsStart } from "../../redux/shop/shop.actions";
import Icon from "../icon/icon.component";
import "./search-input.scss";

const SearchInput = ({
  inputHidden,
  setInputValue,
  inputValue,
  inputRef,
  collectionItems,
  fetchCollectionsStart,
  toggleInputHidden,
}) => {
  useEffect(() => {
    // add listener when search input visible
    if (!inputHidden) {
      document.addEventListener("click", handleClick);
      // remove when closed
      return () => {
        document.removeEventListener("click", handleClick);
      };
    }
  }, [inputHidden]);

  const handleClick = (e) => {
    console.log("clicked ", e.target);
    if (
      inputRef.current.contains(e.target) ||
      e.target.classList.contains("search-wrapper")
    ) {
      // clicked within search drawer
      return;
    }
    // clicked outside search drawer
    handleClose();
  };

  const handleChange = (e) => {
    const { value } = e.target;
    setInputValue(value);
  };

  const handleClose = () => {
    if (inputValue) setInputValue("");
    toggleInputHidden();
  };

  const handleKeyPress = (e) => {
    if (e.key !== "Enter") return;
    handleClose();
  };

  return (
    <div className={"search-drawer" + (inputHidden ? " hidden" : "")}>
      <div className="search-wrapper page-width">
        <Icon icon="search" width={"19px"} height={"19px"} />
        <div className="form-wrapper">
          <form className="search-form">
            <input
              className="search-input"
              onChange={handleChange}
              placeholder="Search Modernist"
              value={inputValue}
              aria-hidden={inputHidden}
              ref={inputRef}
              tabIndex={inputHidden ? "-1" : "0"}
            />
          </form>
          {!inputHidden && inputValue && (
            <SearchDropdown
              collectionItems={collectionItems}
              inputValue={inputValue}
              fetchCollectionsStart={fetchCollectionsStart}
            />
          )}
        </div>
        <button className="close-button" onKeyPress={handleKeyPress}>
          <Icon icon="close" />
        </button>
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  setInputValue: (inputValue) => dispatch(setInputValue(inputValue)),
  fetchCollectionsStart: () => dispatch(fetchCollectionsStart()),
  toggleInputHidden: () => dispatch(toggleInputHidden()),
});

const mapStateToProps = createStructuredSelector({
  inputValue: selectInputValue,
  collectionItems: selectCollectionItems,
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchInput);
