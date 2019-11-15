import { createAction, handleActions } from 'redux-actions'

export const actions = {
  loadBlocks: 'ethereum/LOAD_BLOCKS',
  setBlocks: 'ethereum/SET_BLOCKS',
  selectBlock: 'ethereum/SELECT_BLOCK',
  loadTransactions: 'ethereum/LOAD_TRANSACTIONS',
  setTransactions: 'ethereum/SET_TRANSACTIONS',
  setTransactionDetail: 'ethereum/SET_TRANSACTION_DETAIL',
  setProceedingStatus: 'ethereum/SET_PROCEEDING_STATUS',
  initiate: 'ethereum/INITIATE'
};

export const loadBlocks = createAction(actions.loadBlocks);
export const loadTransactions = createAction(actions.loadTransactions);
export const selectBlock = createAction(actions.selectBlock);

const defaultState = {
  blocks: [],
  selectedBlockId: null,
  transactions: [],
  proceeding: false
};

export default handleActions({
  [actions.initiate]: () => defaultState,
  [actions.setProceedingStatus]: (state, action) => ({ ...state, proceeding: action.payload }),
  [actions.setBlocks]: (state, action) => ({ ...state, blocks: action.payload }),
  [actions.selectBlock]: (state, action) => ({ ...state, selectedBlockId: action.payload }),
  [actions.setTransactions]: (state, action) => ({ ...state, transactions: action.payload })
}, defaultState);
