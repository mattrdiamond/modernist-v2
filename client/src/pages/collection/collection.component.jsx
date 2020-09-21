import React, { useEffect } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import {
  selectSortParam,
  selectSortedCollectionItems,
  makeSelectCollection,
} from "../../redux/shop/shop.selectors";
import ImageGrid from "../../components/image-grid/image-grid.component";
import SortBy from "../../components/sort-by/sort-by.component";
import { setSortParam } from "../../redux/shop/shop.actions";
import "./collection.styles.scss";

const CollectionPage = ({
  collection,
  sortedItems,
  sortParam,
  setSortParam,
  history,
}) => {
  const {
    title,
    banner: { large, small },
  } = collection;

  console.log("render collection");

  useEffect(() => {
    // Clear sort param when url changes
    let unlisten = history.listen(() => {
      if (sortParam) {
        setSortParam("");
      }
    });

    // When component unmounts, stop listening for changes
    return () => unlisten();
  }, [history, sortParam, setSortParam]);

  const handleSetSortParam = (e) => {
    setSortParam(e.target.value);
  };

  return (
    <div className="collection-page">
      <div className={`title-banner ${title.toLowerCase()}`}>
        <img
          className="background-img"
          src={small}
          srcSet={`${small} 1x, ${large} 2x`}
          alt={title}
        />
        <div className="title-content">
          <h1 className="title">{title}</h1>
          <span className="subtitle">for every style & space</span>
        </div>
      </div>
      <div className="collection-container">
        <div className="page-width">
          <SortBy handleChange={handleSetSortParam} value={sortParam} />
          <ImageGrid items={sortedItems} />
        </div>
      </div>
    </div>
  );
};

// ownProps - props of the component that we're wrapping in connect (CollectionPage)
const mapStateToProps = () => {
  // create a private copy of selectCollection for each collection (otherwise selectCollection will run every time)
  const selectCollection = makeSelectCollection();

  return (state, ownProps) => ({
    collection: selectCollection(state, ownProps),
    sortParam: selectSortParam(state),
    sortedItems: selectSortedCollectionItems(state, ownProps),
  });
};

const mapDispatchToProps = (dispatch) => ({
  setSortParam: (param) => dispatch(setSortParam(param)),
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(CollectionPage)
);
