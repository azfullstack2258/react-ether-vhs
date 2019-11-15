import { createAction, handleActions } from 'redux-actions'

export const actions = {
  loadBlocks: 'ethereum/LOAD_BLOCKS',
  setBlocks: 'ethereum/SET_BLOCKS',
  setProceedingStatus: 'ethereum/SET_PROCEEDING_STATUS',
  initiate: 'ethereum/INITIATE'
};

export const loadBlocks = createAction(actions.loadBlocks);

const defaultState = {
  blocks: [],
  proceeding: false
};

export default handleActions({
  [actions.initiate]: () => defaultState,
  [actions.setProceedingStatus]: (state, action) => ({ ...state, proceeding: action.payload }),
  [actions.setBlocks]: (state, action) => ({ ...state, blocks: action.payload }),
}, defaultState);
