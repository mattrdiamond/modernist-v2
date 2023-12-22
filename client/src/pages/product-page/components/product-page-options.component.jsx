import React from "react";
import PropTypes from "prop-types";
import { optionPropType } from "../../../sharedPropTypes/sharedPropTypes";
import "./product-page-options.styles.scss";

const Option = ({ category, option, selectedOptions, selectOption }) => {
  const handleSelectOption = () => {
    selectOption(category, option);
  };

  return (
    <div className='option-wrapper'>
      <input
        type='radio'
        name={category}
        value={option.value}
        id={option.value}
        checked={selectedOptions[category]?.value === option.value}
        onChange={handleSelectOption}
        className='visually-hidden'
        aria-label={option.value}
      />
      {option.type === "color-swatch" && (
        <button
          className={`color-swatch${
            selectedOptions[category]?.value === option.value ? " selected" : ""
          }`}
          style={{ background: option.swatch }}
          onClick={handleSelectOption}
          aria-label={`Select ${option.value}`}
        />
      )}
      {option.type.includes("image-swatch") && (
        <button
          className={`image-swatch-container${
            selectedOptions[category]?.value === option.value ? " selected" : ""
          }`}
          onClick={handleSelectOption}
        >
          {option.type === "image-swatch-colorized" && (
            <div
              className='image-swatch-overlay'
              style={{ background: option.color }}
            />
          )}
          <img
            alt={option.value}
            src={option.swatch}
            className='image-swatch'
          />
        </button>
      )}
      {option.type === "text-label" && (
        <label
          htmlFor={option.value}
          className={`text-option-label${
            selectedOptions[category]?.value === option.value ? " selected" : ""
          }`}
        >
          <span>{option.value}</span>
        </label>
      )}
    </div>
  );
};

const Category = ({ category, options, selectedOptions, ...props }) => {
  const formatedCategoryLabel = category.split("_").join(" ");
  return (
    <div className={`option-category-wrapper ${category}`}>
      <fieldset>
        <legend className='option-title'>
          <span className='option-title-category'>{`${formatedCategoryLabel}: `}</span>
          <span className='option-title-selection'>
            {selectedOptions[category]?.value}
          </span>
        </legend>
        <div className='options-container'>
          {options.map((option) => (
            <Option
              key={option.value}
              category={category}
              option={option}
              selectedOptions={selectedOptions}
              {...props}
            />
          ))}
        </div>
      </fieldset>
    </div>
  );
};

export default function ProductPageOptions({ options, ...props }) {
  return (
    <div className='product-options-wrapper'>
      {options.length > 0 &&
        options.map((categoryOptions, index) => (
          <Category
            key={index}
            category={categoryOptions.name}
            options={categoryOptions.choices}
            {...props}
          />
        ))}
    </div>
  );
}

Option.propTypes = {
  category: PropTypes.string.isRequired,
  option: optionPropType.isRequired,
  selectedOptions: PropTypes.objectOf(optionPropType).isRequired,
  selectOption: PropTypes.func.isRequired,
};

Category.propTypes = {
  category: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(optionPropType).isRequired,
  selectedOptions: PropTypes.objectOf(optionPropType).isRequired,
};

ProductPageOptions.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      choices: PropTypes.arrayOf(optionPropType).isRequired,
    })
  ).isRequired,
};
