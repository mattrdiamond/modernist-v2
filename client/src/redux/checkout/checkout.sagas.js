import { takeLatest, put, all, call } from "redux-saga/effects";
import axios from "axios";
import CheckoutActionTypes from "./checkout.types";
import { paymentSuccess, paymentError } from "./checkout.actions";

function paymentRequest(token, priceForStripe) {
  return axios({
    url: "payment",
    method: "post",
    data: {
      amount: priceForStripe,
      token,
    },
  });
}

export function* postPaymentToStripe({
  payload: { token, priceForStripe, totals },
}) {
  try {
    let { data } = yield call(paymentRequest, token, priceForStripe);
    // Destructure values needed for confirmation
    const {
      success: {
        amount,
        created,
        payment_method_details: {
          card: { last4, brand },
        },
      },
    } = data;
    // // Create new object with confirmation values and update state
    const paymentData = { amount, card: { last4, brand }, created, ...totals };
    yield put(paymentSuccess(paymentData));
  } catch (error) {
    console.log("error", error);
    alert(
      "There was an issue with your payment. Please make sure you use the test credit card number provided"
    );
    yield put(paymentError(error.message));
  }
}

export function* onPaymentStart() {
  yield takeLatest(CheckoutActionTypes.PAYMENT_START, postPaymentToStripe);
}

export function* checkoutSagas() {
  yield all([call(onPaymentStart)]);
}
