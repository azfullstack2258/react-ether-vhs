import { put, takeLatest } from 'redux-saga/effects';

import { actions as ethereumActions } from '../ethereum';

export function* loadBlocksSaga(action) {
  yield put({ type: ethereumActions.setProceedingStatus, payload: true });
  yield put({ type: ethereumActions.setProceedingStatus, payload: false });
}

export default function* watchCheckoutSaga() {
  yield takeLatest(ethereumActions.loadBlocks, loadBlocksSaga);
}