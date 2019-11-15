import { all } from 'redux-saga/effects';

import watchEthereumSaga from './ethereum';

export default function* rootSaga() {
	yield all([
		watchEthereumSaga(),
	]);
}
