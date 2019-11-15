import { call, put, takeLatest } from 'redux-saga/effects';

import { actions as ethereumActions } from '../ethereum';
import { Web3 } from '../../services/web3.service';

const web3 = new Web3();

export function* loadBlocksSaga(action) {
  yield put({ type: ethereumActions.setProceedingStatus, payload: true });

  const res = yield call(web3.getLatestBlocks);
  
  yield put({ type: ethereumActions.setBlocks, payload: res });
  yield put({ type: ethereumActions.setProceedingStatus, payload: false });
}

export default function* watchCheckoutSaga() {
  yield takeLatest(ethereumActions.loadBlocks, loadBlocksSaga);
}