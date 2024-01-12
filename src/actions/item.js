import { detailItem, showItem, showItemRegister } from "../constants/apiConstants";

export const getItem = () => {
  return {
    type: showItem.LIST_ITEM,
  };
};

export const deleteItem = (itemId) => {
  return {
    type: showItem.DELETE_ITEM,
    itemId,
  };
};

export const getItemSuccess = (data) => {
  return {
    type: showItem.LIST_ITEM_SUCCESS,
    payload: {
      data,
    },
  };
};

export const getItemFailed = (error) => {
  return {
    type: showItem.LIST_ITEM_FAIL,
    payload: {
      error,
    },
  };
};

export const getDetailItem = (itemId) => {
  return {
    type: detailItem.DETAIL_ITEM,
    itemId,
  };
};

export const getDetailItemSuccess = (data) => {
  return {
    type: detailItem.DETAIL_ITEM_SUCCESS,
    payload: {
      data,
    },
  };
};

export const getDetailItemFailed = (error) => {
  return {
    type: detailItem.DETAIL_ITEM_FAIL,
    payload: {
      error,
    },
  };
};

export const getItemRegister = (itemId) => {
  return {
    type: showItemRegister.LIST_ITEM_REGISTER,
    itemId
  };
};

export const getItemRegisterSuccess = (data) => {
  return {
    type: showItemRegister.LIST_ITEM_REGISTER_SUCCESS,
    payload: {
      data,
    },
  };
};

export const getItemRegisterFailed = (error) => {
  return {
    type: showItemRegister.LIST_ITEM_REGISTER_FAIL,
    payload: {
      error,
    },
  };
};
