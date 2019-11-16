import { createSelector } from 'reselect';
import { isEmpty } from 'lodash';

export const selectedBlockSelector = state => state.ethereum.selectedBlock;
const getTransactions = state => state.ethereum.transactions;
const getKeywords = state => state.search;

export const getFilteredTransactions = createSelector(
  [ getTransactions, getKeywords ],
  (transactions, keywords) => {
    const { from, to, value } = keywords;
    return (!isEmpty(transactions) && transactions.filter(
      tx => (
        tx.from.toLowerCase().includes(from.toLowerCase()) &&
        tx.to.toLowerCase().includes(to.toLowerCase()) &&
        (value === null || parseFloat(tx.value, 10) === value * Math.pow(10, 18))
      )
    )) || [];
  }
);

export const getAvailableValues = createSelector(
  [ getTransactions ],
  (transactions) => {
    let values = [];

    !isEmpty(transactions) && transactions.forEach(tx => {
      const value = tx.value / Math.pow(10, 18);
      if (values.indexOf(value) < 0) {
        values.push(value);
      }
    });

    return values;
  }
)