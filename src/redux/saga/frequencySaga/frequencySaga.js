import { call, put, takeEvery } from "redux-saga/effects";
import {showFrequency } from "../../../constants/apiConstants";

import { frequencyService } from "../../../services/frequencyService";
import { getFrequency, getFrequencyFailed, getFrequencySuccess } from "../../../actions/configs";

function* getListFrequency() {
  try {
    const response = yield call(frequencyService.getListFrequency);
    const { status, data } = response;
    if (data && status === 200) {
      yield put(getFrequencySuccess(data));
    }
  } catch (error) {
    const msg = error.message;
    yield put(getFrequencyFailed(msg));
  }
}

function* putFrequency(payload) {
  try {
    const response = yield call(frequencyService.updateFrequency,payload.data,payload.frequencyId);
    const { status, data } = response;
    if (data && status === 200) {
      yield put(getFrequency());
    }
  } catch (error) {
    const msg = error.message;
    yield put(getFrequencyFailed(msg));
  }
}
function* deleteFrequency(payload) {
  try {
    const response = yield call(frequencyService.deleteFrequency,payload.frequencyId);
    const { status, data } = response;
    if (data && status === 200) {
      yield put(getFrequency());
    }
  } catch (error) {
    const msg = error.message;
    yield put(getFrequencyFailed(msg));
  }
}
function* createFrequency(payload) {
  try {
    const response = yield call(frequencyService.createFrequency,payload.data);
    const { status} = response;
    console.log(response)
    if (status === 201) {
      yield put(getFrequency());
    }
  } catch (error) {
    const msg = error.message;
    yield put(getFrequencyFailed(msg));
  }
}
export function* lookupFrequency() {
  yield takeEvery(showFrequency.LIST_FREQUENCY, getListFrequency);
  yield takeEvery(showFrequency.UPDATE_FREQUENCY, putFrequency);
  yield takeEvery(showFrequency.CREATE_FREQUENCY, createFrequency);
  yield takeEvery(showFrequency.DELETE_FREQUENCY, deleteFrequency);
}
