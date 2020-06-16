import React from "react";
import { withRouter, Link } from "react-router-dom";
import SearchResult from "../search-result/search-result.component";
import { getSearchResults } from "../../utils/utils";
import Spinner from "../with-spinner/spinner.component";
import "./search-dropdown.styles.scss";

const SearchDropdown = ({ collectionItems, inputValue }) => {
  // get search results based on input value
  const searchResults = getSearchResults(inputValue, collectionItems);

  return (
    <ul className="search-results">
      {!collectionItems.length ? (
        <Spinner height="88px" />
      ) : searchResults.length ? (
        searchResults
          .filter((item, index) => index < 4)
          .map((result) => <SearchResult result={result} />)
      ) : (
        <li>No results for '{inputValue}'</li>
      )}
      {searchResults.length > 4 && (
        <Link to={{ pathname: "/search", search: `q=${inputValue}` }}>
          <li key="all-results" className="view-results">
            View all {searchResults.length} items
          </li>
        </Link>
      )}
    </ul>
  );
};

export default withRouter(SearchDropdown);
