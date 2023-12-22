import React from "react";
import "./collection.styles.scss";

import ProductGrid from "../../components/product-grid/product-grid.component";
import HeroImageHeader from "./components/hero-image-header/hero-image-header.component";
import CollectionHeader from "./components/collection-header/collection-header.component";

export default function CollectionPage({
  title,
  collectionItems,
  heroImages,
  showSortHeader,
  useHeroImageHeader,
}) {
  return (
    <div className='collection-page'>
      {useHeroImageHeader ? (
        <HeroImageHeader title={title} heroImages={heroImages} />
      ) : (
        <CollectionHeader heading={title} itemCount={collectionItems.length} />
      )}

      <div
        className={`collection-items-container ${
          useHeroImageHeader ? "hero-image-margin" : ""
        }`}
      >
        <ProductGrid items={collectionItems} showSortHeader={showSortHeader} />
      </div>
    </div>
  );
}
