// import { createSelector } from 'reselect';
import { isEmpty } from 'lodash';

export const selectedBlockSelector =
  state =>
    state.ethereum.selectedBlockId
    && !isEmpty(state.ethereum.blocks)
    && state.ethereum.blocks[state.ethereum.selectedBlockId];
