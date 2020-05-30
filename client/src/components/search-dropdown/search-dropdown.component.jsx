import React, { useEffect } from "react";
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

  const searchResults = collectionItems.filter((item) =>
    item.name
      .toLowerCase()
      .replace(/[^a-zA-Z0-9]/gi, "")
      .trim()
      .includes(
        inputValue
          .toLowerCase()
          .replace(/[^a-zA-Z0-9]/gi, "")
          .trim()
      )
  );

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
