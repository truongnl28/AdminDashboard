import { all } from "redux-saga/effects";
import * as memberSaga from "./memberSaga/memberSaga";
import * as categorySaga from "./categorySaga/categorySaga";
import * as radiusSaga from "./radiusSaga/radiusSaga";
import * as frequencySaga from "./frequencySaga/frequencySaga";
import * as pointSaga from "./pointSaga/pointSaga";
import * as rankSaga from "./rankSaga/rankSaga";
import * as transactionSaga from "./transactionSaga/transactionSaga";
import * as itemSaga from "./itemSaga/itemSaga";

export function* rootSaga() {
  yield all([
    memberSaga.lookupMember(),
    categorySaga.lookupCategory(),
    radiusSaga.lookupRadius(),
    frequencySaga.lookupFrequency(),
    pointSaga.lookupPoint(),
    rankSaga.lookupRank(),
    transactionSaga.lookupTransaction(),
    itemSaga.lookupItem(),
  ]);
}
