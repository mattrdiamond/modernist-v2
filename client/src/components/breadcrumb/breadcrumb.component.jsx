import React from "react";
import { productDetailType } from "../../sharedPropTypes/sharedPropTypes";
import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";
import { Link, useParams, withRouter, useLocation } from "react-router-dom";
import { selectProductById } from "../../redux/shop/shop.selectors";
import "./breadcrumb.styles.scss";

const Breadcrumb = ({ product }) => {
  const location = useLocation();
  const { collectionId, itemId } = useParams();
  const segments = location.pathname
    .split("/")
    .filter((segment) => segment !== "");

  const replaceHyphensWithSpaces = (text) => {
    return text.replace(/-/g, " ");
  };

  const replaceSpacesWithHyphens = (breadcrumb) => {
    return breadcrumb.toLowerCase().replace(/\s/g, "-");
  };

  let breadcrumbs = [];

  if (segments[0] === "shop") {
    breadcrumbs.push({ text: "Shop", link: "/shop" });

    if (collectionId) {
      breadcrumbs.push({
        text: replaceHyphensWithSpaces(collectionId),
        link: `/shop/${replaceSpacesWithHyphens(collectionId)}`,
      });
    }

    if (itemId) {
      breadcrumbs.push({
        text: product.name,
        link: `/shop/${replaceSpacesWithHyphens(collectionId)}/${itemId}`,
      });
    }
  } else {
    breadcrumbs.push({ text: "Home", link: "/" });

    segments.forEach((segment) => {
      breadcrumbs.push({
        text: replaceHyphensWithSpaces(segment),
        link: `/${replaceSpacesWithHyphens(segment)}`,
      });
    });
  }

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
