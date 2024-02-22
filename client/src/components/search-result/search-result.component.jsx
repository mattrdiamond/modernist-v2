import React from "react";
import { Link } from "react-router-dom";
import { baseImgUrl } from "../../utils/constants";

import "./search-result.styles.scss";

const SearchResult = ({ result, closeSearch }) => {
  const { id, images, name, price, collection } = result;

  return (
    <li className='search-result' key={id}>
      <Link
        className='result-link ignore-co-search'
        to={`/shop/${collection}/${id}`}
        onClick={() => closeSearch()}
      >
        <img
          className='result-img'
          src={baseImgUrl + images.small}
          alt={name}
        />
        <div className='result-details'>
          <span className='result-name'>{name}</span>
          <span className='result-price'>${price}</span>
        </div>
      </Link>
    </li>
  );
};

export default SearchResult;
