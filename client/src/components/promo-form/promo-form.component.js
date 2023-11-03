import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { promoCode } from "../../utils/constants";

import {
  selectInput,
  selectError,
  selectPromoApplied,
} from "../../redux/promo/promo.selectors";
import {
  setPromoInputValue,
  throwError,
  clearError,
  applyPromo,
} from "../../redux/promo/promo.actions";

import CustomButton from "../../components/custom-button/custom-button.component";
import FormInput from "../../components/form-input/form-input.component";
import Icon from "../../components/icon/icon.component";
import AccordionGroup from "../accordion/accordion-group.component";
import Accordion from "../accordion/accordion.component";

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
  const handleChange = (e) => {
    const { value } = e.target;

    if (error) {
      return clearError(value);
    }
    setInputValue(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.toLowerCase() !== promoCode.toLowerCase()) {
      return throwError("Your promo could not be applied. Please try again!");
    } else if (
      inputValue.toLowerCase() === promoCode.toLowerCase() &&
      promoApplied
    ) {
      return throwError("Promo has already been applied.");
    }
    applyPromo();
  };

  return (
    <div className='promo-container'>
      <AccordionGroup>
        <Accordion
          title='Add Promo Code'
          customTitle={
            <span className='promo-accordion-title'>
              <Icon icon='promo' />
              Add Promo Code
            </span>
          }
        >
          <form className='promo-form' onSubmit={handleSubmit}>
            <FormInput
              name='promo'
              handleChange={handleChange}
              type='text'
              value={inputValue}
              placeholder='Promo or gift card'
              required
            >
              <CustomButton
                type='button'
                onClick={handleSubmit}
                disabled={!inputValue}
                inline
              >
                Apply
              </CustomButton>
            </FormInput>
          </form>
          {error ? (
            <div className='alert-container'>
              <span className='error'>{error}</span>
            </div>
          ) : null}
          {promoApplied ? (
            <div className='success-container'>
              <Icon icon='check' />
              <div className='success-text'>
                <span className='promo-name'>{promoCode}</span>
                <p className='success-details'>20% off your entire purchase</p>
              </div>
            </div>
          ) : null}
        </Accordion>
      </AccordionGroup>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  inputValue: selectInput,
  error: selectError,
  promoApplied: selectPromoApplied,
});

const mapDispatchToProps = (dispatch) => ({
  throwError: (error) => dispatch(throwError(error)),
  setInputValue: (input) => dispatch(setPromoInputValue(input)),
  clearError: (input) => dispatch(clearError(input)),
  applyPromo: () => dispatch(applyPromo()),
});

export default connect(mapStateToProps, mapDispatchToProps)(PromoForm);
