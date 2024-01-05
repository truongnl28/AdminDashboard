import { call, put, takeEvery } from "redux-saga/effects";
import {showRank } from "../../../constants/apiConstants";

import { rankService } from "../../../services/rankService";
import { getRank, getRankFailed, getRankSuccess } from "../../../actions/rank";

function* getListRank() {
  try {
    const response = yield call(rankService.getListRank);
    const { status, data } = response;
    if (data && status === 200) {
      yield put(getRankSuccess(data.data));
    }
  } catch (error) {
    const msg = error.message;
    yield put(getRankFailed(msg));
  }
}

function* putRank(payload) {
  try {
    const response = yield call(rankService.updateRank,payload.data,payload.rankId);
    const { status } = response;
    if (status === 200) {
      yield put(getRank());
    }
  } catch (error) {
    const msg = error.message;
    yield put(getRankFailed(msg));
  }
}
function* deleteRank(payload) {
  try {
    const response = yield call(rankService.deleteRank,payload.rankId);
    const { status } = response;
    if (status === 200) {
      yield put(getRank());
    }
  } catch (error) {
    const msg = error.message;
    yield put(getRankFailed(msg));
  }
}
function* createRank(payload) {
  try {
    const response = yield call(rankService.createRank,payload.data);
    const {status} = response;
    if (status === 200) {
      yield put(getRank());
    }
  } catch (error) {
    const msg = error.message;
    console.log(error)
    yield put(getRankFailed(msg));
  }
}
export function* lookupRank() {
  yield takeEvery(showRank.LIST_RANK, getListRank);
  yield takeEvery(showRank.UPDATE_RANK, putRank);
  yield takeEvery(showRank.CREATE_RANK, createRank);
  yield takeEvery(showRank.DELETE_RANK, deleteRank);
}
