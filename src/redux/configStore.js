import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import createMiddleWareSaga from "redux-saga";
import { rootSaga } from "./saga/rootSaga";
import listMemberReducer from './reducer/listMemberReducer';
import listCategoryReducer from './reducer/listCategoryReducer';
import listRadiusReducer from './reducer/listRadiusReducer';
import listFrequencyReducer from './reducer/listFrequencyReducer';
import listPointReducer from './reducer/listPointReducer';
import listRankReducer from './reducer/listRankReducer';
import listTransactionReducer from './reducer/listTransactionReducer';
import detailMemberReducer from './reducer/detailMemberReducer';
const middleSaga = createMiddleWareSaga();
const allReducer = combineReducers({
  listMemberReducer,
  listCategoryReducer,
  listRadiusReducer,
  listFrequencyReducer,
  listPointReducer,
  listRankReducer,
  listTransactionReducer,
  detailMemberReducer,
});

const store = configureStore({
  reducer: allReducer,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({ serializableCheck: false }).concat(
      middleSaga
    );
  },
});

middleSaga.run(rootSaga);

export default store;
