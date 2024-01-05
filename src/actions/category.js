import { showCategory } from "../constants/apiConstants";

export const getCategory = () => {
  return {
    type: showCategory.LIST_CATEGORY,
  };
};

export const postCategory = (data) => {
    return {
      type: showCategory.CREATE_CATEGORY,
      data,
    };
  };

export const updateCategory = (data, categoryId) => {
  return {
    type: showCategory.UPDATE_CATEGORY,
    data,
    categoryId,
  };
};

export const deleteCategory = (categoryId) => {
    return {
      type: showCategory.DELETE_CATEGORY,
      categoryId,
    };
  };

export const getCategorySuccess = (data) => {
  return {
    type: showCategory.LIST_CATEGORY_SUCCESS,
    payload: {
      data,
    },
  };
};

export const getCategoryFailed = (error) => {
  return {
    type: showCategory.LIST_CATEGORY_FAIL,
    payload: {
      error,
    },
  };
};
