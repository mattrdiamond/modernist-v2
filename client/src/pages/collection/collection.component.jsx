import React from "react";
import { connect } from "react-redux";
import { selectCollection } from "../../redux/shop/shop.selectors";
import CollectionItem from "../../components/collection-item/collection-item.component";
import ImageGrid from "../../components/image-grid/image-grid.component";
import "./collection.styles.scss";

const CollectionPage = ({ collection }) => {
  const {
    title,
    items,
    banner: { large, small },
  } = collection;

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
          <ImageGrid items={items}></ImageGrid>
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
});

export default connect(mapStateToProps)(CollectionPage);
