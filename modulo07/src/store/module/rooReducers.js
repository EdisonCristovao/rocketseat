import { combineReducers } from 'redux';

import Cart from './cart/reducer';

export default combineReducers({
  cart: Cart,
});
