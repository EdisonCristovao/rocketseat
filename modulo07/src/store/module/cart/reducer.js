import produce from 'immer';

export default function cart(state = [], action) {
  switch (action.type) {
    case '@cart/add':
      return produce(state, draft => {
        const productIndex = draft.findIndex(
          item => item.id === action.product.id
        );

        if (productIndex >= 0) {
          draft[productIndex].amount += 1;
        } else {
          draft.push({ ...action.product, amount: 1 });
        }
      });
    case '@cart/remove':
      return produce(state, draft => {
        const productIndex = draft.findIndex(item => item.id === action.id);

        if (productIndex >= 0) {
          draft.splice(productIndex, 1);
        }
      });

    case '@cart/UPDATE_AMOUNT':
      return produce(state, draft => {
        const productIndex = draft.findIndex(item => item.id === action.id);

        if (action.amount > 0) {
          draft[productIndex].amount = Number(action.amount);
        }
      });
    default:
      return state;
  }
}
