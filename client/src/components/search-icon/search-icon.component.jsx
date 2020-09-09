import React from "react";
import { connect } from "react-redux";
import { toggleInputHidden } from "../../redux/search/search.actions";
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
