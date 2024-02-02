import React, { forwardRef } from "react";
import Icon from "../icon/icon.component";
import "./search-input.styles.scss";

const SearchInput = forwardRef(
  ({ handleChange, handleClear, inputValue, children, ...otherProps }, ref) => (
    <div className='search-wrapper'>
      <Icon icon='search' title='search' />
      <div className='form-wrapper'>
        <input
          className='search-input'
          onChange={handleChange}
          ref={ref}
          {...otherProps}
        />
        {children}
      </div>
      <button
        className='clear-btn ignore-co-search'
        onClick={handleClear}
        disabled={!inputValue}
        tabIndex={inputValue ? 0 : -1}
      >
        <Icon icon='close' title='close' />
      </button>
    </div>
  )
);

export default SearchInput;
