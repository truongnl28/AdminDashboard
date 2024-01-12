import { detailTransactionPoint, showTransaction, showTransactionPoint } from "../constants/apiConstants";

export const getTransaction = () => {
  return {
    type: showTransaction.LIST_TRANSACTION,
  };
};

export const getTransactionSuccess = (data) => {
  return {
    type: showTransaction.LIST_TRANSACTION_SUCCESS,
    payload: {
      data,
    },
  };
};

export const getTransactionFailed = (error) => {
  return {
    type: showTransaction.LIST_TRANSACTION_FAIL,
    payload: {
      error,
    },
  };
};

export const getTransactionPoint = () => {
  return {
    type: showTransactionPoint.LIST_TRANSACTION_POINT,
  };
};

export const getTransactionPointSuccess = (data) => {
  return {
    type: showTransactionPoint.LIST_TRANSACTION_POINT_SUCCESS,
    payload: {
      data,
    },
  };
};

export const getTransactionPointFailed = (error) => {
  return {
    type: showTransactionPoint.LIST_TRANSACTION_POINT_FAIL,
    payload: {
      error,
    },
  };
};

export const getTransactionPointDetail = (pointId) => {
  return {
    type: detailTransactionPoint.DETAIL_POINT,
    pointId
  };
};

export const getTransactionPointDetailSuccess = (data) => {
  return {
    type: detailTransactionPoint.DETAIL_POINT_SUCCESS,
    payload: {
      data,
    },
  };
};

export const getTransactionPointDetailFailed = (error) => {
  return {
    type: detailTransactionPoint.DETAIL_POINT_FAIL,
    payload: {
      error,
    },
  };
};

