import React from "react";
import { createStructuredSelector } from "reselect";
import { selectAllCollectionItems } from "../../redux/shop/shop.selectors";
import { fetchCollectionsStart } from "../../redux/shop/shop.actions";
import Spinner from "../../components/with-spinner/spinner.component";
import ImageGrid from "../../components/image-grid/image-grid.component";

import { getSearchResults } from "../../utils/utils";
import { connect } from "react-redux";
import "./search-page.styles.scss";

const SearchPage = ({
  collectionItems,
  fetchCollectionsStart,
  match,
  location,
}) => {
  if (!collectionItems.length) {
    fetchCollectionsStart();
    return <Spinner />;
  }

  // get search results based on URL query string
  const params = new URLSearchParams(location.search); // returns ?q=searchParams
  const query = params.get("q"); // returns everything after ?q=
  const searchResults = getSearchResults(query, collectionItems);

  return (
    <div className="search-page page-width">
      <h1 className="title">Search results</h1>
      {searchResults.length ? (
        <>
          <span className="search-intro">
            Showing <span className="bold">{searchResults.length}</span> results
            for <span className="bold">"{query}"</span>
          </span>
          <ImageGrid items={searchResults} />
        </>
      ) : (
        <p>
          Sorry, no search results for <span className="bold">"{query}"</span>
        </p>
      )}
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  collectionItems: selectAllCollectionItems,
});

const mapDispatchToProps = (dispatch) => ({
  fetchCollectionsStart: () => dispatch(fetchCollectionsStart()),
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchPage);
