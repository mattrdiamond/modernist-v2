export const removeCartItem = (
  cartItems,
  cartItemToRemove,
  quantityToRemove = 1
) => {
  return cartItems.map((cartItem) =>
    cartItem.id === cartItemToRemove.id &&
    optionsAreEqual(cartItem.selectedOptions, cartItemToRemove.selectedOptions)
      ? { ...cartItem, quantity: cartItem.quantity - quantityToRemove }
      : cartItem
  );
};

export const clearItemFromCart = (cartItems, itemToRemove) => {
  return cartItems.filter((cartItem) => {
    // Compare both the id and selected options to determine uniqueness
    return (
      cartItem.id !== itemToRemove.id ||
      !optionsAreEqual(cartItem.selectedOptions, itemToRemove.selectedOptions)
    );
  });
};

// Helper function to compare options for equality
export const optionsAreEqual = (options1, options2) => {
  // Get the keys (categories) of the options objects
  const keys1 = Object.keys(options1);
  const keys2 = Object.keys(options2);

  // Check if the number of keys (categories) is the same
  if (keys1.length !== keys2.length) {
    return false;
  }

  // Iterate over each key (category) and compare the nested options
  for (const key of keys1) {
    const categoryOptions1 = options1[key];
    const categoryOptions2 = options2[key];

    if (categoryOptions1.value !== categoryOptions2.value) {
      return false;
    }
  }

  return true;
};

export const addItemToCart = (cartItems, cartItemToAdd, newQuantity) => {
  const { id, selectedOptions = {} } = cartItemToAdd;

  // Check if the item with the same id and selected options is already in the cart
  const existingCartItemIndex = cartItems.findIndex(
    (cartItem) =>
      cartItem.id === id &&
      optionsAreEqual(cartItem.selectedOptions, selectedOptions)
  );

  if (existingCartItemIndex !== -1) {
    // If the item with the same id and selected options exists, update its quantity
    const updatedCartItems = [...cartItems];
    updatedCartItems[existingCartItemIndex].quantity += newQuantity || 1;
    return updatedCartItems;
  } else {
    // If the item is not in the cart with the same selected options, add it as a new cart item
    return [...cartItems, { ...cartItemToAdd, quantity: newQuantity || 1 }];
  }
};
