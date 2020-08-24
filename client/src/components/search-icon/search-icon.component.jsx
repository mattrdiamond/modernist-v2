import React, { useEffect } from "react";
import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";
import { toggleInputHidden } from "../../redux/search/search.actions";
import { selectInputHidden } from "../../redux/search/search.selectors";
import Icon from "../icon/icon.component";
import "./search-icon.styles.scss";

const SearchIcon = ({ toggleInputHidden }) => {
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      toggleInputHidden();
    }
  };

  console.log("render search icon");

  return (
    <div
      className="nav-icon"
      onClick={toggleInputHidden}
      onKeyPress={handleKeyPress}
      tabIndex="0"
    >
      <Icon icon="search" width="20px" height="20px" />
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  toggleInputHidden: () => dispatch(toggleInputHidden()),
});

export default connect(null, mapDispatchToProps)(SearchIcon);
