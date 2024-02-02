import React from "react";
import { appliedPromosPropType } from "../../sharedPropTypes/sharedPropTypes";
import { useSelector, useDispatch } from "react-redux";

import {
  selectInput,
  selectPromoError,
  selectCodeValidationLoading,
} from "../../redux/promo/promo.selectors";
import {
  setPromoInputValue,
  validatePromoStart,
} from "../../redux/promo/promo.actions";

import FormInput from "../../components/form-input/form-input.component";
import Icon from "../../components/icon/icon.component";
import AccordionGroup from "../accordion/accordion-group.component";
import Accordion from "../accordion/accordion.component";
import CouponTag from "./components/coupon-tag/coupon-tag.component";
import CustomButtonWithSpinner from "../custom-button/custom-button-with-spinner.component";

import "./promo-form.styles.scss";

const PromoForm = ({ appliedPromos }) => {
  const inputValue = useSelector(selectInput);
  const error = useSelector(selectPromoError);
  const codeValidationLoading = useSelector(selectCodeValidationLoading);

  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { value } = e.target;
    dispatch(setPromoInputValue(value));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(validatePromoStart(inputValue));
  };

  return (
    <div className='promo-container'>
      <AccordionGroup>
        <Accordion
          title='Add Promo Code'
          customTitle={
            <span className='promo-accordion-title'>
              <Icon icon='promo' width='1rem' height='1rem' />
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
              <CustomButtonWithSpinner
                isLoading={codeValidationLoading}
                buttonStyle='transparent'
                type='button'
                onClick={handleSubmit}
                disabled={!inputValue}
              >
                Apply
              </CustomButtonWithSpinner>
            </FormInput>
          </form>
          {error ? (
            <div className='alert-container'>
              <span className='error'>{error}</span>
            </div>
          ) : null}
          {appliedPromos.length > 0 &&
            appliedPromos.map((appliedCode) => (
              <CouponTag key={appliedCode} promoCode={appliedCode} />
            ))}
        </Accordion>
      </AccordionGroup>
    </div>
  );
};

export default PromoForm;

PromoForm.propTypes = {
  appliedPromos: appliedPromosPropType,
};
