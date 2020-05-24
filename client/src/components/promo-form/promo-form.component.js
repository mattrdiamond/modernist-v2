import React, { useState } from "react";
import CustomButton from "../../components/custom-button/custom-button.component";
import FormInput from "../../components/form-input/form-input.component";
import "./promo-form.styles.scss";

const PromoForm = ({ applyPromo, validCode }) => {
  const [promoCode, setPromoCode] = useState({
    input: "",
    error: null,
    applied: false,
    amount: 0.2,
  });

  const { input, error, amount } = promoCode;

  const handleChange = (e) => {
    const { value } = e.target;

    // clear error if showing
    if (promoCode.error) {
      return setPromoCode({
        ...promoCode,
        input: value,
        error: null,
      });
    }
    setPromoCode({
      ...promoCode,
      input: value,
    });
  };

  console.log("valid", validCode);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.toLowerCase() !== validCode.toLowerCase()) {
      return setPromoCode({
        ...promoCode,
        error: "Your promo could not be applied. Please try again!",
      });
    } else if (
      input.toLowerCase() === validCode.toLowerCase() &&
      promoCode.applied
    ) {
      return setPromoCode({
        ...promoCode,
        error: "Promo has already been applied.",
      });
    }
    // apply promo code
    setPromoCode({
      ...promoCode,
      input: "",
      applied: true,
      error: null,
    });
    applyPromo(amount);
  };

  return (
    <div className="promo-container">
      <span>Add a promo or gift card</span>
      <form className="promo-form" onSubmit={handleSubmit}>
        <FormInput
          name="promo"
          handleChange={handleChange}
          type="text"
          value={input}
          placeholder="Promo or gift card"
          required
        />
        <CustomButton
          type="button"
          onClick={handleSubmit}
          disabled={!promoCode}
        >
          Apply
        </CustomButton>
      </form>
      {error ? <div className="alert-container">{error}</div> : null}
    </div>
  );
};

export default PromoForm;
