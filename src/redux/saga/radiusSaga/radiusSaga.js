import { call, put, takeEvery } from "redux-saga/effects";
import { showRadius } from "../../../constants/apiConstants";

import { radiusService } from "../../../services/radiusService";
import { getRadius, getRadiusFailed, getRadiusSuccess } from "../../../actions/configs";
import { showSuccessAlert } from "../../../constants/chooseToastify";

function* getListRadius() {
  try {
    const response = yield call(radiusService.getListRadius);
    const { status, data } = response;
    if (data && status === 200) {
      yield put(getRadiusSuccess(data));
    }
  } catch (error) {
    const msg = error.message;
    yield put(getRadiusFailed(msg));
  }
}

function* putRadius(payload) {
  try {
    const response = yield call(radiusService.updateRadius, payload.data, payload.radiusId);
    const { status } = response;
    if ( status === 200) {
      yield put(getRadius());
      showSuccessAlert('Cập nhật thành công')

    }
  } catch (error) {
    const msg = error.message;
    yield put(getRadiusFailed(msg));
  }
}
function* deleteRadius(payload) {
  try {
    const response = yield call(radiusService.deleteRadius, payload.radiusId);
    const { status } = response;
    if ( status === 200) {
      yield put(getRadius());
      showSuccessAlert('Xóa thành công')

    }
  } catch (error) {
    const msg = error.message;
    yield put(getRadiusFailed(msg));
  }
}
function* createRadius(payload) {
  try {
    const response = yield call(radiusService.createRadius, payload.data);
    const { status } = response;
    console.log(response)
    if (status === 201) {
      yield put(getRadius());
      showSuccessAlert('Tạo mới thành công')

    }
  } catch (error) {
    const msg = error.message;
    yield put(getRadiusFailed(msg));
  }
}
export function* lookupRadius() {
  yield takeEvery(showRadius.LIST_RADIUS, getListRadius);
  yield takeEvery(showRadius.UPDATE_RADIUS, putRadius);
  yield takeEvery(showRadius.CREATE_RADIUS, createRadius);
  yield takeEvery(showRadius.DELETE_RADIUS, deleteRadius);
}
