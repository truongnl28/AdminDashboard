import { call, put, takeEvery } from "redux-saga/effects";
import { memberService } from "../../../services/memberService";
import { showMember } from "../../../constants/apiConstants";
import {
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
export function* lookupMember() {
  yield takeEvery(showMember.LIST_MEMBER, getMember);
}
