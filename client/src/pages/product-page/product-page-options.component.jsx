import React from "react";
import "./product-page-options.styles.scss";

const Option = ({ category, option, selectedOption, selectOption }) => {
  const handleSelectOption = () => {
    selectOption(category, option);
  };

  return (
    <div className={"option-wrapper"}>
      <input
        type='radio'
        name={category}
        value={option.value}
        id={option.value}
        checked={selectedOption?.value === option.value}
        onChange={handleSelectOption}
        className='visually-hidden'
        aria-label={option.value}
      />
      {option.type === "color-swatch" && (
        <button
          className={`color-swatch${
            selectedOption?.value === option.value ? " selected" : ""
          }`}
          style={{ background: option.swatch }}
          onClick={handleSelectOption}
          aria-label={`Select ${option.value}`}
        />
      )}
      {option.type.includes("image-swatch") && (
        <button
          className={`image-swatch-container${
            selectedOption?.value === option.value ? " selected" : ""
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
        <>
          <label
            htmlFor={option.value}
            className={`text-option-label${
              selectedOption?.value === option.value ? " selected" : ""
            }`}
          >
            <span>{option.value}</span>
          </label>
        </>
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
          {options[category].map((option) => (
            <Option
              key={option.value}
              option={option}
              category={category}
              selectedOption={selectedOptions[category]}
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
      {Object.keys(options).length > 0 &&
        Object.keys(options).map((category) => (
          <Category
            key={category}
            category={category}
            options={options}
            {...props}
          />
        ))}
    </div>
  );
}
