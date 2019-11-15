// import { createSelector } from 'reselect';
import { isEmpty } from 'lodash';

export const selectedBlockSelector =
  state =>
    state.ethereum.selectedBlockId !== null
    && !isEmpty(state.ethereum.blocks)
    && state.ethereum.blocks[state.ethereum.selectedBlockId];
