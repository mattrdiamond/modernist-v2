import React from "react";
import { handleKeyPress } from "../../utils/utils";
import Icon from "../icon/icon.component";
import "./search-icon.styles.scss";

const SearchIcon = ({ toggleInputHidden }) => (
  <div
    className="nav-icon"
    onClick={toggleInputHidden}
    onKeyPress={(e) => handleKeyPress(e, toggleInputHidden)}
    tabIndex="0"
  >
    <Icon icon="search" width="20px" height="20px" />
  </div>
);

export default SearchIcon;
