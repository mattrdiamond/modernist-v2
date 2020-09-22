import React, { useState } from "react";
import "./select-dropdown.styles.scss";

const SelectDropdown = ({ handleSelect, options, selectedName }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleOpen = () => setIsOpen(!isOpen);

  const onOptionClicked = (option) => () => {
    setIsOpen(false);
    handleSelect(option);
  };

  const handleKeyPress = (e) => {
    if (e.key !== "Enter") return;
    toggleOpen();
  };

  console.log("render sortby");
  console.log("selected name", selectedName);
  return (
    <div className="sortby-component">
      <div
        className="sortby-header"
        onClick={toggleOpen}
        onKeyPress={handleKeyPress}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        tabIndex={0}
      >
        {selectedName ? selectedName : "Sort by"}
      </div>
      {isOpen && (
        <ul className="sortby-list" role="listbox">
          {options.map((option) => (
            <li
              className={
                "sortby-list-item" +
                (option.name === selectedName ? " selected" : "")
              }
              onClick={onOptionClicked(option)}
              key={option.id}
              role="option"
            >
              {option.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SelectDropdown;
