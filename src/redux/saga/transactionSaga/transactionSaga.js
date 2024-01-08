import { call, put, takeEvery } from "redux-saga/effects";
import { showTransaction } from "../../../constants/apiConstants";

import { transactionService } from "../../../services/transactionService";
import { getTransactionFailed, getTransactionSuccess } from "../../../actions/transaction";

function* getListTransaction() {
  try {
    const response = yield call(transactionService.getListTransaction);
    const { status, data } = response;
    if (data && status === 200) {
      yield put(getTransactionSuccess(data?.data));
    }
  } catch (error) {
    const msg = error.message;
    yield put(getTransactionFailed(msg));
  }
}
export function* lookupTransaction() {
  yield takeEvery(showTransaction.LIST_TRANSACTION, getListTransaction);
}
