import React, { forwardRef } from "react";
import Icon from "../icon/icon.component";
import "./search-input.styles.scss";

// forwardRef will pass ref on to child if included
const SearchInput = forwardRef(
  ({ handleChange, handleClear, inputValue, children, ...otherProps }, ref) => (
    <div className="search-wrapper">
      <Icon icon="search" />
      <div className="form-wrapper">
        <form className="search-form">
          <input
            className="search-input"
            onChange={handleChange}
            ref={ref}
            {...otherProps}
          />
        </form>
        {children}
      </div>
      <button
        className="clear-btn ignore-co-search"
        onClick={handleClear}
        disabled={!inputValue}
        tabIndex={inputValue ? 0 : -1}
      >
        <Icon icon="close" />
      </button>
    </div>
  )
);

export default SearchInput;
