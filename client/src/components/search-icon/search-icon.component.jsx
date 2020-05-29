import React from "react";
import Icon from "../icon/icon.component";
import { connect } from "react-redux";
import { toggleInputHidden } from "../../redux/search/search.actions";
import "./search-icon.styles.scss";

const SearchIcon = ({ toggleInputHidden, focusOnInput }) => {
  const handleClick = () => {
    toggleInputHidden();
    focusOnInput();
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleClick();
    }
  };

  return (
    <div
      className="search-icon"
      onClick={handleClick}
      onKeyPress={handleKeyPress}
      tabIndex="0"
    >
      <Icon icon="magnifying-glass" width="19px" height="19px" />
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  toggleInputHidden: () => dispatch(toggleInputHidden()),
});

export default connect(null, mapDispatchToProps)(SearchIcon);
