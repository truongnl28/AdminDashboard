import { call, put, takeEvery } from "redux-saga/effects";
import { showPoint } from "../../../constants/apiConstants";

import { pointService } from "../../../services/pointService";
import { getPoint, getPointFailed, getPointSuccess } from "../../../actions/configs";

function* getListPoint() {
  try {
    const response = yield call(pointService.getListPoint);
    const { status, data } = response;
    if (data && status === 200) {
      yield put(getPointSuccess([data?.data]));
    }
  } catch (error) {
    const msg = error.message;
    yield put(getPointFailed(msg));
  }
}

function* putPoint(payload) {
  try {
    const response = yield call(pointService.updatePoint, payload.data);
    const { status } = response;
    if (status === 200) {
      yield put(getPoint());
    }
  } catch (error) {
    const msg = error.message;
    yield put(getPointFailed(msg));
  }
}
// function* deleteFrequency(payload) {
//   try {
//     const response = yield call(frequencyService.deleteFrequency,payload.frequencyId);
//     const { status, data } = response;
//     if (data && status === 200) {
//       yield put(getPoint());
//     }
//   } catch (error) {
//     const msg = error.message;
//     yield put(getPointFailed(msg));
//   }
// }
// function* createFrequency(payload) {
//   try {
//     const response = yield call(frequencyService.createFrequency,payload.data);
//     const { status} = response;
//     console.log(response)
//     if (status === 201) {
//       yield put(getPoint());
//     }
//   } catch (error) {
//     const msg = error.message;
//     yield put(getPointFailed(msg));
//   }
// }
export function* lookupPoint() {
  yield takeEvery(showPoint.LIST_POINT, getListPoint);
  yield takeEvery(showPoint.UPDATE_POINT, putPoint);
  // yield takeEvery(showPoint.CREATE_POINT, createFrequency);
  // yield takeEvery(showPoint.DELETE_POINT, deleteFrequency);
}
