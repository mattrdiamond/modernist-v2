import React from "react";
import { Route } from "react-router-dom";
import { connect } from "react-redux";
import CollectionsOverview from "../../components/collections-overview/collections-overview.component";
import CollectionPage from "../collection/collection.component";
import {
  firestore,
  convertCollectionsSnapshotToMap
} from "../../firebase/firebase.utils";
import { updateCollections } from "../../redux/shop/shop.actions";

class ShopPage extends React.Component {
  // snapshot is snapshot representation of collections array from firestore
  unsubscribeFromSnapshot = null;

  componentDidMount() {
    const { updateCollections } = this.props;
    const collectionRef = firestore.collection("collections");

    // onSnapshot() subscribes to collectionRef and listens for changes. Will return snapshot representing collections object at the time when this code renders
    this.unsubscribeFromSnapshot = collectionRef.onSnapshot(async snapshot => {
      // convert snapshot docs array into new object and only include properties needed for front end
      const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
      // Update reducer with collectionsMap
      updateCollections(collectionsMap);
    });
  }

  render() {
    const { match } = this.props;

    return (
      <div className="shop-page">
        {/* in this case, match.path will be /shop */}
        <Route exact path={`${match.path}`} component={CollectionsOverview} />
        <Route
          path={`${match.path}/:collectionId`}
          component={CollectionPage}
        />
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  updateCollections: collectionsMap =>
    dispatch(updateCollections(collectionsMap))
});

export default connect(null, mapDispatchToProps)(ShopPage);
