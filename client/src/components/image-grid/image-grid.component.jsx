import React from "react";
import CollectionItem from "../../components/collection-item/collection-item.component";
import "./image-grid.styles.scss";

const ImageGrid = ({ items }) => {
  return (
    <div className="image-grid">
      {items.map((item) => (
        <CollectionItem key={item.id} item={item} />
      ))}
    </div>
  );
};

export default ImageGrid;
