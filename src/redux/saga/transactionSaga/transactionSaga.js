import { call, put, takeEvery } from "redux-saga/effects";
import { detailTransactionPoint, showTransaction, showTransactionPoint } from "../../../constants/apiConstants";

import { transactionService } from "../../../services/transactionService";
import { getTransactionFailed, getTransactionPointDetailFailed, getTransactionPointDetailSuccess, getTransactionPointFailed, getTransactionPointSuccess, getTransactionSuccess } from "../../../actions/transaction";

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

function* getListTransactionPoint() {
  try {
    const response = yield call(transactionService.getListTransactionPoint);
    const { status, data } = response;
    if (data && status === 200) {
      yield put(getTransactionPointSuccess(data?.data));
    }
  } catch (error) {
    const msg = error.message;
    yield put(getTransactionPointFailed(msg));
  }
}

function* getDetailTransactionPoint(payload) {
  try {
    const response = yield call(transactionService.getListTransactionPointDetail,payload.pointId);
    const { status, data } = response;
    if (data && status === 200) {
      yield put(getTransactionPointDetailSuccess(data?.data));
    }
  } catch (error) {
    const msg = error.message;
    yield put(getTransactionPointDetailFailed(msg));
  }
}
export function* lookupTransaction() {
  yield takeEvery(showTransaction.LIST_TRANSACTION, getListTransaction);
  yield takeEvery(showTransactionPoint.LIST_TRANSACTION_POINT, getListTransactionPoint);
  yield takeEvery(detailTransactionPoint.DETAIL_POINT, getDetailTransactionPoint);
}
