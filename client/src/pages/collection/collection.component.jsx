import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import {
  selectCollection,
  selectSortParam,
  selectSortedCollectionItems,
} from "../../redux/shop/shop.selectors";
import ImageGrid from "../../components/image-grid/image-grid.component";
import SortForm from "../../components/sort-form/sort-form.component";
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
    items,
    banner: { large, small },
  } = collection;

  const clearSortParam = () => {
    setSortParam("");
  };

  useEffect(() => {
    history.listen(clearSortParam);
  }, [history]);

  const handleSetSortParam = (e) => {
    setSortParam(e.target.value);
  };
  console.log("sort param", sortParam);
  console.log("");
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
          <SortForm handleChange={handleSetSortParam} value={sortParam} />
          <ImageGrid items={sortedItems} />
        </div>
      </div>
    </div>
  );
};

// @param ownProps - props of the component that we're wrapping in connect
const mapStateToProps = (state, ownProps) => ({
  // selectCollection gets the collection based on the curent route
  // selectCollection returns another function (createSelector) which we then pass state into:
  // selectCollection(ownProps.collectionId) => createSelector(state) => returns collection in state corresponding to the match.params.collectionId (i.e. collections[hats])
  collection: selectCollection(ownProps.match.params.collectionId)(state),
  sortedItems: selectSortedCollectionItems(ownProps.match.params.collectionId)(
    state
  ),
  sortParam: selectSortParam(state),
});

const mapDispatchToProps = (dispatch) => ({
  setSortParam: (param) => dispatch(setSortParam(param)),
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(CollectionPage)
);
