import { combineReducers } from 'redux';
import { createStore } from 'redux';
import reducer from './Auth';

const rootReducer = combineReducers({
  login: reducer,
});

const store = createStore(rootReducer);

export default store;
