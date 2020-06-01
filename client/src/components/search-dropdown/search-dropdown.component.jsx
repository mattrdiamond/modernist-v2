import React, { useEffect } from "react";
import "./search-dropdown.styles.scss";

const SearchInputDropdown = ({
  collectionItems,
  inputValue,
  fetchCollectionsStart,
}) => {
  // 1. fetch collections data if not yet available
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

  return (
    <ul className="search-results">
      {searchResults.length ? (
        searchResults.map((result) => <li key={result.id}>{result.name}</li>)
      ) : (
        <li>No results for '{inputValue}'</li>
      )}
    </ul>
  );
};

export default SearchInputDropdown;
