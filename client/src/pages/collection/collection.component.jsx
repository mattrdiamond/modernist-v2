import React, { useEffect } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import {
  selectSortParam,
  selectSortedCollectionItems,
  makeSelectCollection,
} from "../../redux/shop/shop.selectors";
import ImageGrid from "../../components/image-grid/image-grid.component";
import SelectDropdown from "../../components/select-dropdown/select-dropdown.component";
import CollectionItem from "../../components/collection-item/collection-item.component";
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

  const sortOptions = [
    { value: "Highest Rated", direction: "desc", sortBy: "rating", id: 0 },
    { value: "Name: A - Z", direction: "asc", sortBy: "name", id: 1 },
    { value: "Name: Z - A", direction: "desc", sortBy: "name", id: 2 },
    { value: "Price: Low to High", direction: "asc", sortBy: "price", id: 3 },
    { value: "Price: High to Low", direction: "desc", sortBy: "price", id: 4 },
  ];

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
          <SelectDropdown
            options={sortOptions}
            handleSelect={setSortParam}
            selectedValue={sortParam.value}
          />
          <ImageGrid>
            {sortedItems.map((item) => (
              <CollectionItem key={item.id} item={item} />
            ))}
          </ImageGrid>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = () => {
  // create a private copy of selectCollection for each collection to retain memoization
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
