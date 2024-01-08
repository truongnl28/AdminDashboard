import { call, put, takeEvery } from "redux-saga/effects";
import { memberService } from "../../../services/memberService";
import { detailMember, showMember } from "../../../constants/apiConstants";
import {
  getDetailMember,
  getDetailMemberFailed,
  getDetailMemberSuccess,
  getShowMemberFailed,
  getShowMemberSuccess,
} from "../../../actions/member";

function* getMember() {
  try {
    const response = yield call(memberService.getListMember);
    const { status, data } = response;
    if (data && status === 200) {
      yield put(getShowMemberSuccess(data));
    }
  } catch (error) {
    const msg = error.message;
    yield put(getShowMemberFailed(msg));
  }
}

function* deleteMember(payload) {
  try {
    const response = yield call(memberService.deleteMember, payload.data);
    const { status } = response;
    if (status === 200) {
      yield put(getDetailMember(payload.data.userId));
    }
  } catch (error) {
    const msg = error.message;
    yield put(getDetailMemberFailed(msg));
  }
}

function* showDetailMember(payload) {
  try {
    const response = yield call(memberService.getDetailMember, payload.userId);
    const { status, data } = response;
    if (status === 200) {
      yield put(getDetailMemberSuccess(data?.data));
    }
  } catch (error) {
    const msg = error.message;
    yield put(getDetailMemberFailed(msg));
  }
}
export function* lookupMember() {
  yield takeEvery(showMember.LIST_MEMBER, getMember);
  yield takeEvery(showMember.DELETE_MEMBER, deleteMember);
  yield takeEvery(detailMember.DETAIL_MEMBER, showDetailMember);
}
