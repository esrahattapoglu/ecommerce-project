import { createStore, applyMiddleware } from 'redux';
import { thunk } from 'redux-thunk';
import logger from 'redux-logger';  
import rootReducer from './reducers';


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || ((x) => x);


const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk, logger))  
);

export default store;