import { combineReducers } from 'redux';
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import reducer from './Auth';
import gistReducer from './Gists';

const rootReducer = combineReducers({
  login: reducer,
  gist: gistReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));

export default store;
