import React from "react";
import { withRouter, Link } from "react-router-dom";
import CollectionItem from "../collection-item/collection-item.component";
import "./collection-preview.styles.scss";

const CollectionPreview = ({ title, items, history, match, routeName }) => (
  <section className="collection-preview">
    <Link to={`${match.path}/${routeName}`}>
      <h2 className="title">{title}</h2>
    </Link>
    <div className="preview">
      {/* filter out first 4 items for collection preview */}
      {items
        .filter((item, index) => index < 4)
        .map((item) => (
          <CollectionItem key={item.id} item={item} routeName={routeName} />
        ))}
    </div>
  </section>
);

export default withRouter(CollectionPreview);
