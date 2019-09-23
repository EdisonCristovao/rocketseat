import { all, call, put, takeLatest, select } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import api from '../../../services/api';
import history from '../../../services/history';
import { addToCartSuccess, updateAmountSuccess } from './actions';
import { formatPrice } from '../../../util/format';

function* addToCart({ id }) {
  const productExists = yield select(state =>
    state.cart.find(p => p.id === id)
  );
  const stock = yield call(api.get, `/stock/${id}`);

  const currentAmount = productExists ? productExists.amount + 1 : 1;

  if (currentAmount > stock.data.amount) {
    toast.error('Sem Estoque');
    return;
  }

  if (productExists) {
    yield put(updateAmountSuccess(id, currentAmount));
  } else {
    const response = yield call(api.get, `/products/${id}`);

    const data = {
      ...response.data,
      amount: 1,
      formatedPrice: formatPrice(response.data.price),
    };
    yield put(addToCartSuccess(data));
    history.push('/cart');
  }
}

function* updateAmount({ id, amount }) {
  if (amount < 1) return;

  const stock = yield call(api.get, `/stock/${id}`);

  if (amount > stock.data.amount) {
    toast.error('Sem Estoque');
    return;
  }

  yield put(updateAmountSuccess(id, amount));
}

export default all([
  takeLatest('@cart/ADD_REQUEST', addToCart),
  takeLatest('@cart/UPDATE_AMOUNT_REQUEST', updateAmount),
]);
