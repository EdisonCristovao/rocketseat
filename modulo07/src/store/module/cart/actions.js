export const addToCart = product => ({ type: '@cart/add', product });

export const removeFromCart = id => ({ type: '@cart/remove', id });

export const updateAmount = (id, amount) => ({
  type: '@cart/UPDATE_AMOUNT',
  id,
  amount,
});
