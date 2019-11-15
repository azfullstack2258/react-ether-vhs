import { createSelector } from 'reselect';
import { isEmpty } from 'lodash';

export const selectedBlockSelector =
  state =>
    state.ethereum.selectedBlockId !== null
    && !isEmpty(state.ethereum.blocks)
    && state.ethereum.blocks[state.ethereum.selectedBlockId];

const getTransactions = (state) => state.ethereum.transactions;
const getKeywords = (state) => state.search
    
export const getFilteredTransactions = createSelector(
  [ getTransactions, getKeywords ],
  (transactions, keywords) => {
    const { from, to, value } = keywords;
    return transactions.filter(
      tx =>
        tx.from.toLowerCase().includes(from.toLowerCase()) &&
        tx.to.toLowerCase().includes(to.toLowerCase()) &&
        (value === null || tx.value === value * Math.pow(10, 18))
    );
  }
)