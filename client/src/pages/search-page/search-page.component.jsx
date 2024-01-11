import React from "react";
import { createStructuredSelector } from "reselect";
import {
  selectAllCollectionItems,
  selectAreAllCollectionsLoaded,
} from "../../redux/shop/shop.selectors";
import { fetchCollectionsStart } from "../../redux/shop/shop.actions";
import Spinner from "../../components/spinner/spinner.component";
import ProductGrid from "../../components/product-grid/product-grid.component";
import getSearchResults from "../../utils/getSearchResults";
import { connect } from "react-redux";
import "./search-page.styles.scss";

const SearchPage = ({
  collectionItems,
  fetchCollectionsStart,
  allCollectionsLoaded,
  location,
}) => {
  if (!allCollectionsLoaded) {
    fetchCollectionsStart();
    return <Spinner />;
  }

  // get search results based on URL query string
  const params = new URLSearchParams(location.search); // returns ?q=searchParams
  const query = params.get("q"); // returns everything after ?q=
  const searchResults = getSearchResults(query, collectionItems);

  return (
    <div className='search-page page-width'>
      <h1 className='title'>Search results</h1>
      {searchResults.length ? (
        <>
          <span className='search-intro'>
            Showing <span className='font-bold'>{searchResults.length}</span>{" "}
            results for{" "}
            <span className='font-bold'>"{query.toLowerCase()}"</span>
          </span>
          <ProductGrid items={searchResults} />
        </>
      ) : (
        <p>
          Sorry, no search results for{" "}
          <span className='font-bold'>"{query}"</span>
        </p>
      )}
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  collectionItems: selectAllCollectionItems,
  allCollectionsLoaded: selectAreAllCollectionsLoaded,
});

const mapDispatchToProps = (dispatch) => ({
  fetchCollectionsStart: () => dispatch(fetchCollectionsStart()),
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchPage);
