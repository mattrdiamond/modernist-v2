import { useEffect } from "react";
import { createStructuredSelector } from "reselect";
import { useLocation, useNavigate } from "react-router-dom";
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
}) => {
  const location = useLocation();
  const navigate = useNavigate();

  // get search results based on URL query string
  const params = new URLSearchParams(location.search); // returns ?q=searchParams
  const query = params.get("q"); // returns everything after ?q=

  useEffect(() => {
    if (!allCollectionsLoaded) {
      fetchCollectionsStart();
    }
  }, [allCollectionsLoaded, fetchCollectionsStart]);

  // Redirect to home if no query param is provided
  useEffect(() => {
    if (!query?.trim()) {
      navigate("/", { replace: true });
    }
  }, [query, navigate]);

  if (!allCollectionsLoaded) {
    return <Spinner />;
  }

  const searchResults = getSearchResults(query, collectionItems);

  return (
    <div className='search-page'>
      <h1 className='title page-width'>Search results</h1>
      {searchResults.length ? (
        <>
          <span className='search-intro page-width'>
            Showing <span className='font-bold'>{searchResults.length}</span>{" "}
            results for{" "}
            <span className='font-bold'>"{query.toLowerCase()}"</span>
          </span>
          <ProductGrid items={searchResults} />
        </>
      ) : (
        <p className='page-width'>
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
