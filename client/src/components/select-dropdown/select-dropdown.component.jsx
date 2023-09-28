import React, { useState } from "react";
import PropTypes from "prop-types";
import handleKeyPress from "../../utils/handleKeyPress";
import ArrowButton from "../arrow-button/arrow-button.component";
import SelectOptions from "./select-options.component";
import "./select-dropdown.styles.scss";

const SelectDropdown = ({ handleSelect, options, selectedValue }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleOpen = () => setIsOpen(!isOpen);
  const closeDropdown = () => setIsOpen(false);

  const onOptionClicked = (option) => {
    closeDropdown();
    handleSelect(option);
  };

  return (
    <div className='select-component'>
      <div
        className={"select-header ignore-co-sort" + (isOpen ? " open" : "")}
        onClick={toggleOpen}
        onKeyDown={(e) => handleKeyPress(e, toggleOpen)}
        aria-haspopup='listbox'
        aria-expanded={isOpen}
        tabIndex={0}
      >
        <span className='select-header-text'>
          {selectedValue ? selectedValue : "Sort by"}
        </span>
        <ArrowButton isClosed={!isOpen} />
        {isOpen && (
          <SelectOptions
            options={options}
            selectedValue={selectedValue}
            onOptionClicked={onOptionClicked}
            isOpen={isOpen}
            closeDropdown={closeDropdown}
          />
        )}
      </div>
    </div>
  );
};

SelectDropdown.propTypes = {
  handleSelect: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      value: PropTypes.string.isRequired,
    })
  ).isRequired,
  selectedValue: PropTypes.string,
};

export default SelectDropdown;
