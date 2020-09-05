import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { Link } from "react-router-dom";
import { CSSTransitionGroup } from "react-transition-group";
import { getSearchResults } from "../../utils/utils";

import {
  selectInputHidden,
  selectInputValue,
} from "../../redux/search/search.selectors";
import { selectNavVisible } from "../../redux/mobile-nav/mobile-nav.selectors";
import { toggleNav } from "../../redux/mobile-nav/mobile-nav.actions";
import { setInputValue } from "../../redux/search/search.actions";
import { closeSearchDrawer } from "../../redux/search/search.actions";

import SearchResult from "../search-result/search-result.component";
import Spinner from "../with-spinner/spinner.component";

import "./search-dropdown.styles.scss";

const SearchDropdown = ({
  collectionItems,
  inputValue,
  navVisible,
  searchDrawerHidden,
  closeSearchDrawer,
  toggleNav,
  setInputValue,
}) => {
  // get search results based on input value
  const searchResults = getSearchResults(inputValue, collectionItems);

  const closeSearch = () => {
    if (navVisible) {
      toggleNav();
      setInputValue("");
    }
    if (!searchDrawerHidden) {
      closeSearchDrawer();
    }
  };

  console.log("render search dropdown");

  return (
    <div className="search-dropdown">
      <ul className="search-results">
        {!collectionItems.length ? (
          <Spinner height="88px" />
        ) : searchResults.length ? (
          searchResults
            .filter((item, index) => index < 4)
            .map((result) => (
              <SearchResult
                key={result.id}
                result={result}
                closeSearch={closeSearch}
              />
            ))
        ) : null}
      </ul>
      {searchResults.length > 4 && (
        <Link
          to={{ pathname: "/search", search: `q=${inputValue}` }}
          className="view-results ignore-co-search"
          onClick={closeSearch}
        >
          View all {searchResults.length} items
        </Link>
      )}
      {collectionItems.length && !searchResults.length ? (
        <div className="no-results ignore-co-search">
          No results for '{inputValue}'
        </div>
      ) : null}
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  searchDrawerHidden: selectInputHidden,
  navVisible: selectNavVisible,
});

const mapDispatchToProps = (dispatch) => ({
  toggleNav: () => dispatch(toggleNav()),
  closeSearchDrawer: () => dispatch(closeSearchDrawer()),
  setInputValue: (inputValue) => dispatch(setInputValue(inputValue)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchDropdown);
