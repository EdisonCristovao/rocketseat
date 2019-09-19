import { createStore } from 'redux';

import reducers from './module/rooReducers';

const store = createStore(reducers);

export default store;
