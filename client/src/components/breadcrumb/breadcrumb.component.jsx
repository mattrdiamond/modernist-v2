import React, { useEffect, useState } from "react";
import { productDetailType } from "../../sharedPropTypes/sharedPropTypes";
import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";
import { Link, withRouter, useLocation } from "react-router-dom";
import { selectProductById } from "../../redux/shop/shop.selectors";
import "./breadcrumb.styles.scss";

const Breadcrumb = ({ product }) => {
  const location = useLocation();
  const [breadcrumbs, setBreadcrumbs] = useState([]);

  useEffect(() => {
    const segments = location.pathname
      .split("/")
      .filter((segment) => segment !== "");

    const replaceHyphensWithSpaces = (text) => {
      return text.replace(/-/g, " ");
    };

    let updatedBreadcrumbs = [];

    if (segments[0] === "shop") {
      // Construct breadcrumbs for shop routes
      if (segments.length === 1) {
        // If the route is /shop (only one segment), start with home
        updatedBreadcrumbs.push({ text: "Home", link: "/" });
        updatedBreadcrumbs.push({ text: "Shop", link: "/shop" });
      } else {
        // If there are multiple segments in /shop route, start with shop
        updatedBreadcrumbs.push({ text: "Shop", link: "/shop" });

        // Construct breadcrumbs for each segment
        segments.slice(1).forEach((segment, index) => {
          const isLastSegment = index === segments.length - 2;
          const isProductPage = isLastSegment && product && product.name;

          if (isProductPage) {
            // Use product name as breadcrumb for product pages
            updatedBreadcrumbs.push({
              text: product.name,
              link: `/${segments.slice(0, index + 2).join("/")}`,
            });
          } else {
            // Otherwise, use segment as breadcrumb
            updatedBreadcrumbs.push({
              text: replaceHyphensWithSpaces(segment),
              link: `/${segments.slice(0, index + 2).join("/")}`,
            });
          }
        });
      }
    } else {
      // Construct breadcrumbs for non-shop routes
      updatedBreadcrumbs.push({ text: "Home", link: "/" });
      segments.forEach((segment, index) => {
        updatedBreadcrumbs.push({
          text: replaceHyphensWithSpaces(segment),
          link: `/${segments.slice(0, index + 1).join("/")}`,
        });
      });
    }

    setBreadcrumbs(updatedBreadcrumbs);
  }, [location.pathname, product]);

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
