import { all, call } from "redux-saga/effects";
import { userSagas } from "./user/user.sagas";
import { cartSagas } from "./cart/cart.sagas";
import { shopSagas } from "./shop/shop.sagas";
import { promoSagas } from "./promo/promo.sagas";
import { checkoutSagas } from "./checkout/checkout.sagas";
import { reviewsSagas } from "./reviews/reviews.sagas";

export default function* rootSaga() {
  yield all([
    call(shopSagas),
    call(userSagas),
    call(cartSagas),
    call(checkoutSagas),
    call(reviewsSagas),
    call(promoSagas),
  ]);
}
