import React, { useEffect, useState } from "react";
import { productDetailType } from "../../sharedPropTypes/sharedPropTypes";
import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";
import { Link, useParams, withRouter, useLocation } from "react-router-dom";
import { selectProductById } from "../../redux/shop/shop.selectors";
import "./breadcrumb.styles.scss";

const Breadcrumb = ({ product }) => {
  const location = useLocation();
  const { collectionId, itemId } = useParams();
  const [breadcrumbs, setBreadcrumbs] = useState([]);

  useEffect(() => {
    const segments = location.pathname
      .split("/")
      .filter((segment) => segment !== "");

    const replaceHyphensWithSpaces = (text) => {
      return text.replace(/-/g, " ");
    };

    const replaceSpacesWithHyphens = (breadcrumb) => {
      return breadcrumb.toLowerCase().replace(/\s/g, "-");
    };

    let updatedBreadcrumbs = [];
    let specialShopPages = [
      "bestsellers",
      "top-rated",
      "new-arrivals",
      "shop-the-look",
    ];

    if (segments[0] === "shop") {
      updatedBreadcrumbs.push({ text: "Shop", link: "/shop" });

      if (segments.length > 1 && specialShopPages.includes(segments[1])) {
        updatedBreadcrumbs.push({
          text: replaceHyphensWithSpaces(segments[1]),
          link: `/${segments.slice(0, 2).join("/")}`,
        });
      }

      if (collectionId) {
        updatedBreadcrumbs.push({
          text: replaceHyphensWithSpaces(collectionId),
          link: `/shop/${replaceSpacesWithHyphens(collectionId)}`,
        });
      }

      if (itemId) {
        updatedBreadcrumbs.push({
          text: product.name,
          link: `/shop/${replaceSpacesWithHyphens(collectionId)}/${itemId}`,
        });
      }
    } else {
      updatedBreadcrumbs.push({ text: "Home", link: "/" });

      segments.forEach((segment) => {
        updatedBreadcrumbs.push({
          text: replaceHyphensWithSpaces(segment),
          link: `/${replaceSpacesWithHyphens(segment)}`,
        });
      });
    }
    setBreadcrumbs(updatedBreadcrumbs);
  }, [location.pathname, product, collectionId, itemId]);

  return (
    <div className='breadcrumb-wrapper'>
      <ol>
        {breadcrumbs.map((breadcrumb, index) => (
          <li key={index} className='breadcrumb-list-item'>
            {index !== breadcrumbs.length - 1 ? (
              <>
                <Link to={breadcrumb.link}>{breadcrumb.text}</Link>
                <span className='breadcrumb-slash'>/</span>
              </>
            ) : (
              <span>{breadcrumb.text}</span>
            )}
          </li>
        ))}
      </ol>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  product: (state, ownProps) =>
    selectProductById(ownProps.match.params.itemId)(state),
});

export default withRouter(connect(mapStateToProps, null)(Breadcrumb));

Breadcrumb.propTypes = {
  product: productDetailType,
};
