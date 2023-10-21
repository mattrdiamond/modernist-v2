export const addItemToCart = (cartItems, cartItemToAdd, newQuantity) => {
  // 1. Check cart items to see if itemToAdd exists
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === cartItemToAdd.id
  );

  // 2. If it exists, add new quantity or 1 (default)
  if (existingCartItem) {
    return cartItems.map((cartItem) =>
      cartItem.id === cartItemToAdd.id
        ? { ...cartItem, quantity: cartItem.quantity + (newQuantity || 1) }
        : cartItem
    );
  }
  // 3. If not, return new state object with new item and quantity
  return [...cartItems, { ...cartItemToAdd, quantity: newQuantity || 1 }];
};

export const removeItemFromCart = (cartItems, cartItemToRemove) => {
  return cartItems.map((cartItem) =>
    cartItem.id === cartItemToRemove.id
      ? { ...cartItem, quantity: cartItem.quantity - 1 }
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

export const addItemWithOptionsToCart = (cartItems, itemWithOptions) => {
  const { id, selectedOptions } = itemWithOptions;

  // Check if the item with the same id and selected options is already in the cart
  const existingCartItemIndex = cartItems.findIndex(
    (cartItem) =>
      cartItem.id === id &&
      optionsAreEqual(cartItem.selectedOptions, selectedOptions)
  );

  if (existingCartItemIndex !== -1) {
    // If the item with the same id and selected options exists, update its quantity
    const updatedCartItems = [...cartItems];
    updatedCartItems[existingCartItemIndex].quantity +=
      itemWithOptions.quantity;
    return updatedCartItems;
  } else {
    // If the item is not in the cart with the same selected options, add it as a new cart item
    return [...cartItems, itemWithOptions];
  }
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
