import { takeLatest, put, all, call, select } from "redux-saga/effects";
import { firestore } from "../../firebase/firebase.utils";
import { collection, getDocs } from "firebase/firestore";
import { selectAppliedPromos } from "./promo.selectors";
import {
  fetchPromosSuccess,
  fetchPromosFailure,
  validatePromoFailure,
  validatePromoSuccess,
} from "./promo.actions";
import PromoActionTypes from "./promo.types";
import { apiValidatePromoCode } from "../../api/api";

export function* fetchPromoData() {
  try {
    const promosCollectionRef = collection(firestore, "promos");
    const promosSnapshot = yield call(getDocs, promosCollectionRef);
    const promosData = promosSnapshot.docs.map((doc) => doc.data());

    yield put(fetchPromosSuccess(promosData));
  } catch (error) {
    yield put(fetchPromosFailure(error.message));
  }
}

function* validatePromoCode({ payload }) {
  try {
    const cleanedPromoCode = payload.trim().toLowerCase();

    const appliedPromos = yield select(selectAppliedPromos);

    // Check if the code is already applied
    if (appliedPromos.includes(cleanedPromoCode)) {
      yield put(
        validatePromoFailure(
          `${cleanedPromoCode.toUpperCase()} has already been applied.`
        )
      );
      return;
    }

    const response = yield call(apiValidatePromoCode, cleanedPromoCode);

    if (response.isValid) {
      yield put(validatePromoSuccess(response.code));
    } else {
      yield put(
        validatePromoFailure(response.message || "Promo code validation failed")
      );
    }
  } catch (error) {
    console.error("Error:", error);
    yield put(validatePromoFailure("Error validating promo code"));
  }
}

export function* onFetchPromosStart() {
  yield takeLatest([PromoActionTypes.FETCH_PROMOS_START], fetchPromoData);
}

export function* onValidatePromoStart() {
  yield takeLatest([PromoActionTypes.VALIDATE_PROMO_START], validatePromoCode);
}

export function* promoSagas() {
  yield all([call(onFetchPromosStart), call(onValidatePromoStart)]);
}
