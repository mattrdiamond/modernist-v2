import PropTypes from "prop-types";
import {
  categoryItemType,
  responsiveImagePropType,
} from "../../sharedPropTypes/sharedPropTypes";

import ProductGrid from "../../components/product-grid/product-grid.component";
import HeroImageHeader from "./components/hero-image-header/hero-image-header.component";
import Breadcrumb from "../../components/breadcrumb/breadcrumb.component";
import BreadcrumbSortHeader from "../../components/breadcrumb-sort-header/breadcrumb-sort-header.component";

import "./collection.styles.scss";

export default function CollectionPage({
  id,
  title,
  subtitle,
  collectionItems,
  heroImages,
}) {
  const hasHeroImages = heroImages && Object.keys(heroImages).length > 0;

  return (
    <div className='collection-page'>
      {hasHeroImages ? (
        <HeroImageHeader
          key={id}
          id={id}
          title={title}
          subtitle={subtitle}
          heroImages={heroImages}
        />
      ) : (
        <div className='top-breadcrumb-container page-width'>
          <Breadcrumb />
        </div>
      )}
      <div
        className={`collection-items-container ${
          hasHeroImages ? "hero-image-margin" : ""
        }`}
      >
        <BreadcrumbSortHeader
          resultsCount={collectionItems.length || 0}
          heading={!hasHeroImages ? title : undefined}
        />
        <ProductGrid items={collectionItems} />
      </div>
    </div>
  );
}

CollectionPage.propTypes = {
  id: PropTypes.string,
  title: PropTypes.string.isRequired,
  collectionItems: PropTypes.arrayOf(categoryItemType).isRequired,
  heroImages: responsiveImagePropType,
};
