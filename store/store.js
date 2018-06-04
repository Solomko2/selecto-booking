import { createStore, compose, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import axios from 'axios';
import promisedMiddleware from './promisedMiddleware';

import Home from '../src/modules/home/index';

const composeEnhancers = typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const promised = promisedMiddleware(axios);

export const initStore = (initialState = {}) => {
  const store = createStore(Home.fromState.rootReducer, {...initialState},
                            composeEnhancers(applyMiddleware(promised, logger)));

  store.dispatchPromised = function(action) {
    this.dispatch(action);
    return action.promise;
  }

  return store;
}

export function getTime(){
    return {
      promised: () => axios.get('https://jsonplaceholder.typicode.com/posts'),
      types: ['GET_DATA', 'GET_SUCCESS', 'FAILURE'],
    };
}

export const reducer = (state = {}, action) => {
  switch (action.type) {
    case 'GET_DATA':
      return state
    case 'GET_SUCCESS':
      return [...state, ...action.data.data];
    case 'FAILURE':
      return Object.assign({}, state, {error: true} );
    default: return state
  }
};
