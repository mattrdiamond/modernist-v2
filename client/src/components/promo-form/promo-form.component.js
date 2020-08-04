import React, { useState } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import {
  selectInput,
  selectError,
  selectApplied,
} from "../../redux/promo/promo.selectors";
import CustomButton from "../../components/custom-button/custom-button.component";
import FormInput from "../../components/form-input/form-input.component";
import Icon from "../../components/icon/icon.component";
import {
  setInputValue,
  throwError,
  clearError,
  applyPromo,
} from "../../redux/promo/promo.actions";
import "./promo-form.styles.scss";

const PromoForm = ({
  inputValue,
  error,
  throwError,
  clearError,
  setInputValue,
  applyPromo,
  promoApplied,
}) => {
  const validCode = "SUPERSALE";

  const handleChange = (e) => {
    const { value } = e.target;

    if (error) {
      return clearError(value);
    }
    setInputValue(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.toLowerCase() !== validCode.toLowerCase()) {
      return throwError("Your promo could not be applied. Please try again!");
    } else if (
      inputValue.toLowerCase() === validCode.toLowerCase() &&
      promoApplied
    ) {
      return throwError("Promo has already been applied.");
    }
    // apply promo code
    applyPromo();
  };

  return (
    <div className="promo-container">
      <span className="bold">Add a promo or gift card</span>
      <form className="promo-form" onSubmit={handleSubmit}>
        <FormInput
          name="promo"
          handleChange={handleChange}
          type="text"
          value={inputValue}
          placeholder="Promo or gift card"
          required
        >
          <CustomButton
            type="button"
            onClick={handleSubmit}
            disabled={!inputValue}
            inline
          >
            Apply
          </CustomButton>
        </FormInput>
      </form>
      {error ? (
        <div className="alert-container">
          <span className="error">{error}</span>
        </div>
      ) : null}
      {promoApplied ? (
        <div className="success-container">
          <Icon icon="check" />
          <div className="success-text">
            <span className="promo-name">{validCode}</span>
            <p className="success-details">20% off your entire purchase</p>
          </div>
        </div>
      ) : null}
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  inputValue: selectInput,
  error: selectError,
  promoApplied: selectApplied,
});

const mapDispatchToProps = (dispatch) => ({
  throwError: (error) => dispatch(throwError(error)),
  setInputValue: (input) => dispatch(setInputValue(input)),
  clearError: (input) => dispatch(clearError(input)),
  applyPromo: () => dispatch(applyPromo()),
});

export default connect(mapStateToProps, mapDispatchToProps)(PromoForm);
