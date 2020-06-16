import React from "react";
import { createStructuredSelector } from "reselect";
import { selectCollectionItems } from "../../redux/shop/shop.selectors";
import { fetchCollectionsStart } from "../../redux/shop/shop.actions";
import CollectionItem from "../../components/collection-item/collection-item.component";
import Spinner from "../../components/with-spinner/spinner.component";
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
      <h1>Search results</h1>
      <span className="search-intro">
        Showing <span className="bold">{searchResults.length}</span> results for{" "}
        <span className="bold">"{query}"</span>
      </span>
      <div className="search-container">
        {searchResults.length ? (
          searchResults.map((result) => (
            <CollectionItem key={result.id} item={result} />
          ))
        ) : (
          <p>
            Sorry, no search results for <span className="bold">"{query}"</span>
          </p>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  collectionItems: selectCollectionItems,
});

const mapDispatchToProps = (dispatch) => ({
  fetchCollectionsStart: () => dispatch(fetchCollectionsStart()),
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchPage);
