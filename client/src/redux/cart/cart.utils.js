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
