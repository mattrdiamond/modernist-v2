export const addItemToCart = (cartItems, cartItemToAdd) => {
  // 1. Check cart items to see if itemToAdd exists
  const existingCartItem = cartItems.find(
    cartItem => cartItem.id === cartItemToAdd.id
  );

  // 2. If it exists, return new state object with updated quantity
  if (existingCartItem) {
    return cartItems.map(cartItem =>
      cartItem.id === cartItemToAdd.id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    );
  }
  // 3. If not, return new state object with new item and give it a quantity of 1
  return [...cartItems, { ...cartItemToAdd, quantity: 1 }];
};
