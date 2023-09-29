import React, { useRef } from "react";
import handleKeyPress from "../../utils/handleKeyPress";
import useOnClickOutside from "../../hooks/use-onclick-outside";
import PropTypes from "prop-types";
import "./select-dropdown.styles.scss";

const SelectOptions = ({
  options,
  selectedValue,
  onOptionClicked,
  isOpen,
  closeDropdown,
}) => {
  const sortRef = useRef(null);

  useOnClickOutside({
    ref: sortRef,
    handler: closeDropdown,
    ignoreOutsideElementClass: "ignore-co-sort",
  });

  return (
    <ul className='select-list' role='listbox' ref={sortRef}>
      {options.map((option) => (
        <li
          className={
            "select-list-item" +
            (option.value === selectedValue ? " selected" : "")
          }
          onClick={() => onOptionClicked(option)}
          onKeyDown={(e) => handleKeyPress(e, () => onOptionClicked(option))}
          key={option.id}
          role='option'
          aria-selected={option.value === selectedValue ? "true" : "false"}
          tabIndex={isOpen ? 0 : -1}
        >
          {option.value}
        </li>
      ))}
    </ul>
  );
};

SelectOptions.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      value: PropTypes.string.isRequired,
    })
  ).isRequired,
  selectedValue: PropTypes.string,
  onOptionClicked: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  closeDropdown: PropTypes.func.isRequired,
};

export default SelectOptions;
