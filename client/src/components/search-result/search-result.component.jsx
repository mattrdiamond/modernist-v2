import React from "react";
import { withRouter, Link } from "react-router-dom";
import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";
import { selectInputHidden } from "../../redux/search/search.selectors";
import { closeSearchDrawer } from "../../redux/search/search.actions";
import "./search-result.styles.scss";

const SearchResult = ({ result, inputHidden, closeSearchDrawer }) => {
  const { id, imageUrl, name, price, collection } = result;

  const handleClick = () => {
    if (!inputHidden) {
      closeSearchDrawer();
    }
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

const mapDispatchToProps = (dispatch) => ({
  closeSearchDrawer: () => dispatch(closeSearchDrawer()),
});

const mapStateToProps = createStructuredSelector({
  inputHidden: selectInputHidden,
});

// export default withRouter(SearchResult);
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(SearchResult)
);
