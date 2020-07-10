import React from "react";
import { connect } from "react-redux";
import { selectCollection } from "../../redux/shop/shop.selectors";
import CollectionItem from "../../components/collection-item/collection-item.component";
import "./collection.styles.scss";

const CollectionPage = ({ collection }) => {
  const { title, items } = collection;
  return (
    <section className="collection-page">
      <h1 className="title">{title}</h1>
      <div className="items">
        {items.map((item) => (
          <CollectionItem key={item.id} item={item} />
        ))}
      </div>
    </section>
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
