import { showTransaction } from "../constants/apiConstants";

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

