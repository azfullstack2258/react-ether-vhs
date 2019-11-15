import { createAction, handleActions } from 'redux-actions'

export const actions = {
  setQueryFrom: 'search/SET_QUERY_FROM',
  setQueryTo: 'search/SET_QUERY_TO',
  setQueryValue: 'search/SET_QUERY_VALUE',
  clearFilter: 'search/CLEAR_FILTER'
};

export const setQueryFrom = createAction(actions.setQueryFrom);
export const setQueryTo = createAction(actions.setQueryTo);
export const setQueryValue = createAction(actions.setQueryValue);
export const clearFilter = createAction(actions.clearFilter);

const defaultState = {
  from: '',
  to: '',
  value: null
};

export default handleActions({
  [actions.clearFilter]: () => defaultState,
  [actions.setQueryFrom]: (state, action) => ({ ...state, from: action.payload }),
  [actions.setQueryTo]: (state, action) => ({ ...state, to: action.payload }),
  [actions.setQueryValue]: (state, action) => ({ ...state, value: action.payload })
}, defaultState);
