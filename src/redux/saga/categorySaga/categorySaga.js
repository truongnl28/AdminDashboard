import { call, put, takeEvery } from "redux-saga/effects";
import { showCategory } from "../../../constants/apiConstants";

import { categoryService } from "../../../services/categoryService";
import { getCategory, getCategoryFailed, getCategorySuccess } from "../../../actions/category";
import { showSuccessAlert } from "../../../constants/chooseToastify";

function* getListCategory() {
  try {
    const response = yield call(categoryService.getListCategory);
    const { status, data } = response;
    if (data && status === 200) {
      yield put(getCategorySuccess(data.data));
    }
  } catch (error) {
    const msg = error.message;
    yield put(getCategoryFailed(msg));
  }
}

function* putCategory(payload) {
  try {
    const response = yield call(categoryService.updateCategory, payload.data, payload.categoryId);
    const { status } = response;
    if (status === 200) {
      yield put(getCategory());
      showSuccessAlert('Cập nhật thành công')
    }
  } catch (error) {
    const msg = error.message;
    yield put(getCategoryFailed(msg));
  }
}
function* deleteCategory(payload) {
  try {
    const response = yield call(categoryService.deleteCategory, payload.categoryId);
    const { status } = response;
    if (status === 200) {
      yield put(getCategory());
      showSuccessAlert('Xóa thành công')
    }
  } catch (error) {
    const msg = error.message;
    yield put(getCategoryFailed(msg));
  }
}
function* createCategory(payload) {
  try {
    const response = yield call(categoryService.createCategory, payload.data);
    const { status } = response;
    if (status === 200) {
      yield put(getCategory());
      showSuccessAlert('Tạo mới thành công')
    }
  } catch (error) {
    const msg = error.message;
    yield put(getCategoryFailed(msg));
  }
}
export function* lookupCategory() {
  yield takeEvery(showCategory.LIST_CATEGORY, getListCategory);
  yield takeEvery(showCategory.UPDATE_CATEGORY, putCategory);
  yield takeEvery(showCategory.CREATE_CATEGORY, createCategory);
  yield takeEvery(showCategory.DELETE_CATEGORY, deleteCategory);
}
