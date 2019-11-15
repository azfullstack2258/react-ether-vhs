import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router'

import ethereum from './ethereum';

const createRootReducer = (history) => combineReducers({
  router: connectRouter(history),
	ethereum,
});


export default createRootReducer;