import React, { useState } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import FormInput from "../form-input/form-input.component";
import "./header-input.scss";
import { selectInputValue } from "../../redux/search/search.selectors";
import { setInputValue } from "../../redux/search/search.actions";

const HeaderInput = ({ inputHidden, setInputValue, inputValue, inputRef }) => {
  const handleChange = (e) => {
    const { value } = e.target;
    setInputValue(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("submit");
  };

  return (
    <div className={"header-input-container" + (inputHidden ? " hidden" : "")}>
      <form onSubmit={handleSubmit}>
        <input
          className="header-input"
          onChange={handleChange}
          placeholder="Search Modernist"
          value={inputValue}
          aria-hidden={inputHidden}
          ref={inputRef}
          tabIndex={inputHidden ? "-1" : "0"}
        />
      </form>
      {/*<ul className="header-input-results">
        <li>This is a test</li>
        <li>This is a second input</li>
  </ul>*/}
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  setInputValue: (inputValue) => dispatch(setInputValue(inputValue)),
});

const mapStateToProps = createStructuredSelector({
  inputValue: selectInputValue,
});

export default connect(mapStateToProps, mapDispatchToProps)(HeaderInput);
