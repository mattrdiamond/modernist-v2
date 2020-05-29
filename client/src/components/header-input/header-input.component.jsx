import React, { useState } from "react";
import FormInput from "../form-input/form-input.component";
import "./header-input.scss";

const HeaderInput = ({ inputHidden }) => {
  const [inputValue, setInputValue] = useState("");

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
        <FormInput
          className="header-input"
          onChange={handleChange}
          placeholder="Search Modernist"
          value={inputValue}
          aria-hidden={inputHidden}
        />
      </form>
      {/*<ul className="header-input-results">
        <li>This is a test</li>
        <li>This is a second input</li>
  </ul>*/}
    </div>
  );
};

export default HeaderInput;
