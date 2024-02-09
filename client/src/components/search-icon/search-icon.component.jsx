import React from "react";
import handleKeyPress from "../../utils/handleKeyPress";
import Icon from "../icon/icon.component";
import "./search-icon.styles.scss";

const SearchIcon = ({ toggleInputHidden }) => (
  <div
    className='nav-icon'
    onClick={toggleInputHidden}
    onKeyDown={(e) => handleKeyPress(e, toggleInputHidden)}
    tabIndex='0'
  >
    <Icon icon='search' title='search' width='20px' height='20px' />
  </div>
);

export default SearchIcon;
