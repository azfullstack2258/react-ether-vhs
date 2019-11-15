import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router'

import ethereum from './ethereum';
import search from './search';

const createRootReducer = (history) => combineReducers({
  router: connectRouter(history),
  ethereum,
  search
});


export default createRootReducer;