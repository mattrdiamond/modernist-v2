import React from "react";
import { withRouter, Link } from "react-router-dom";
import "./search-result.styles.scss";

const SearchResult = ({ result, inputHidden, closeSearch }) => {
  const { id, imageUrl, name, price, collection } = result;

  const handleClick = () => {
    closeSearch();
  };

  return (
    <li className="search-result" key={id}>
      <Link
        className="result-link ignore-co-search"
        to={`/shop/${collection}/${id}`}
        onClick={handleClick}
      >
        <img className="result-img" src={imageUrl} alt={name} />
        <div className="result-details">
          <span className="result-name">{name}</span>
          <span className="result-price">${price}</span>
        </div>
      </Link>
    </li>
  );
};

export default withRouter(SearchResult);
