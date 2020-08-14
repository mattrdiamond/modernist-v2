import React from "react";
import { withRouter, Link } from "react-router-dom";
import SearchResult from "../search-result/search-result.component";
import { getSearchResults } from "../../utils/utils";
import Spinner from "../with-spinner/spinner.component";
import "./search-dropdown.styles.scss";

const SearchDropdown = ({ collectionItems, inputValue, closeSearchDrawer }) => {
  // get search results based on input value
  const searchResults = getSearchResults(inputValue, collectionItems);

  const handleClick = () => {
    closeSearchDrawer();
  };

  return (
    <ul className="search-results">
      {!collectionItems.length ? (
        <Spinner height="88px" />
      ) : searchResults.length ? (
        searchResults
          .filter((item, index) => index < 4)
          .map((result) => <SearchResult key={result.id} result={result} />)
      ) : (
        <li key="no-results" className="no-results ignore-co-search">
          No results for '{inputValue}'
        </li>
      )}
      {searchResults.length > 4 && (
        <li key="all-results" className="view-results">
          <Link
            to={{ pathname: "/search", search: `q=${inputValue}` }}
            className="ignore-co-search"
            onClick={handleClick}
          >
            View all {searchResults.length} items
          </Link>
        </li>
      )}
    </ul>
  );
};

export default withRouter(SearchDropdown);
