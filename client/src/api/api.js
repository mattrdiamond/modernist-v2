import axios from "axios";

const BASE_API_URL = "/api";

export const apiValidatePromoCode = async (promoCode) => {
  try {
    const response = await axios.post(`${BASE_API_URL}/validatePromoCode`, {
      promoCode,
    });
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 400) {
      return {
        isValid: false,
        message: "Invalid promo code. Please check and try again.",
      };
    } else {
      // Other server or network errors
      throw error;
    }
  }
};

export const apiFetchUnsplashImages = async (
  collectionId,
  page,
  perPage,
  orderBy
) => {
  try {
    const response = await axios.get(
      `${BASE_API_URL}/photos?id=${collectionId}&page=${page}&perPage=${perPage}&orderBy=${orderBy}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
