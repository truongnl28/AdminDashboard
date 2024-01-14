import { call, put, takeEvery } from "redux-saga/effects";
import { detailItem, showItem, showItemRegister } from "../../../constants/apiConstants";

import { itemService } from "../../../services/itemService";
import { getDetailItemFailed, getDetailItemSuccess, getItem, getItemFailed, getItemRegisterFailed, getItemRegisterSuccess, getItemSuccess } from "../../../actions/item";
import { showSuccessAlert } from "../../../constants/chooseToastify";

function* getListRank() {
  try {
    const response = yield call(itemService.getListItem);
    const { status, data } = response;
    if (data && status === 200) {
      yield put(getItemSuccess(data));
    }
  } catch (error) {
    const msg = error.message;
    yield put(getItemFailed(msg));
  }
}

function* getListRegister(payload) {
  try {
    const response = yield call(itemService.getListItemRegister,payload.itemId);
    const { status, data } = response;
    if (data && status === 200) {
      yield put(getItemRegisterSuccess(data?.data));
    }
  } catch (error) {
    const msg = error.message;
    yield put(getItemRegisterFailed(msg));
  }
}

function* deleteRank(payload) {
  try {
    const response = yield call(itemService.deleteItem, payload.itemId);
    const { status } = response;
    if (status === 200) {
      yield put(getItem());
      showSuccessAlert('Xóa thành công')
    }
  } catch (error) {
    const msg = error.message;
    yield put(getItemFailed(msg));
  }
}

function* showDetailItem(payload) {
  try {
    const response = yield call(itemService.getDetailItem, payload.itemId);
    const { status, data } = response;
    if (status === 200) {
      yield put(getDetailItemSuccess(data?.data));
    }
  } catch (error) {
    const msg = error.message;
    yield put(getDetailItemFailed(msg));
  }
}
export function* lookupItem() {
  yield takeEvery(showItem.LIST_ITEM, getListRank);
  yield takeEvery(showItemRegister.LIST_ITEM_REGISTER, getListRegister);
  yield takeEvery(detailItem.DETAIL_ITEM, showDetailItem);
  yield takeEvery(showItem.DELETE_ITEM, deleteRank);
}
