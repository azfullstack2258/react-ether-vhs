import { call, put, takeLatest, select } from 'redux-saga/effects';

import { actions as ethereumActions } from '../ethereum';
import { selectedBlockSelector } from '../../selectors';
import { Web3 } from '../../services/web3.service';

const web3 = new Web3();

export function* loadBlocksSaga() {
  yield put({ type: ethereumActions.setProceedingStatus, payload: true });

  const res = yield call(web3.getLatestBlocks);
  
  yield put({ type: ethereumActions.setBlocks, payload: res });
  yield put({ type: ethereumActions.setProceedingStatus, payload: false });
}

export function* loadTransactionsSaga() {
  yield put({ type: ethereumActions.setProceedingStatus, payload: true });

  const selectedBlock = yield select(selectedBlockSelector);
  const txs = [];
  for (let i = 0; i < selectedBlock.transactions.length; i ++) {
    const res = yield call(web3.getTxFromBlock, selectedBlock.number, i);
    txs.push(res);
  }

  yield put({ type: ethereumActions.setTransactions, payload: txs });
  yield put({ type: ethereumActions.setProceedingStatus, payload: false });
}

export default function* watchCheckoutSaga() {
  yield takeLatest(ethereumActions.loadBlocks, loadBlocksSaga);
  yield takeLatest(ethereumActions.loadTransactions, loadTransactionsSaga);
}