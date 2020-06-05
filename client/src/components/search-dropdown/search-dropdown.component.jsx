import React, { useEffect } from "react";
import { withRouter, Link } from "react-router-dom";
import SearchResult from "../search-result/search-result.component";
import "./search-dropdown.styles.scss";

const SearchInputDropdown = ({
  collectionItems,
  inputValue,
  fetchCollectionsStart,
}) => {
  // fetch collections data if not yet available
  useEffect(() => {
    if (!collectionItems.length) {
      fetchCollectionsStart();
    }
  }, []);

  // remove any special characters or extra spaces
  const removeSpecialChars = (input) =>
    input.replace(/\s\s+|[^a-zA-Z0-9 ]/gi, "");

  const userInput = removeSpecialChars(inputValue.toLowerCase());

  const searchResults = collectionItems.filter((item) => {
    const itemName = removeSpecialChars(item.name.toLowerCase());
    const wordsStartingWithInput = new RegExp("\\b" + userInput + "\\S*", "gi"); // same as /\b[input]\S*/gi
    return itemName.match(wordsStartingWithInput);
  });

  if (!collectionItems.length) return null;
  return (
    <ul className="search-results">
      {searchResults.length ? (
        searchResults
          .filter((item, index) => index < 4)
          .map((result) => <SearchResult result={result} />)
      ) : (
        <li className="result-none">No results for '{inputValue}'</li>
      )}
      {searchResults.length > 4 && (
        <li className="result-view">View all {searchResults.length} items</li>
      )}
    </ul>
  );
};

export default withRouter(SearchInputDropdown);
