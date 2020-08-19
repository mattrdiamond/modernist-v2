import React, { useEffect } from "react";
import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";
import { toggleInputHidden } from "../../redux/search/search.actions";
import { selectInputHidden } from "../../redux/search/search.selectors";
import Icon from "../icon/icon.component";
import "./search-icon.styles.scss";

const SearchIcon = ({ toggleInputHidden, focusOnInput, inputHidden }) => {
  const handleClick = () => {
    toggleInputHidden();
  };

  useEffect(() => {
    if (!inputHidden) {
      return focusOnInput();
    }
  }, [inputHidden, focusOnInput]);

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleClick();
    }
  };

  return (
    <div
      className="nav-icon"
      onClick={handleClick}
      onKeyPress={handleKeyPress}
      tabIndex="0"
    >
      <Icon icon="search" width="20px" height="20px" />
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  inputHidden: selectInputHidden,
});

const mapDispatchToProps = (dispatch) => ({
  toggleInputHidden: () => dispatch(toggleInputHidden()),
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchIcon);
