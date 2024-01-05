import { showMember } from "../constants/apiConstants";

export const getShowMember = () => {
  return {
    type: showMember.LIST_MEMBER,
  };
};

export const getShowMemberSuccess = (data) => {
  return {
    type: showMember.LIST_MEMBER_SUCCESS,
    payload: {
      data,
    },
  };
};

export const getShowMemberFailed = (error) => {
  return {
    type: showMember.LIST_MEMBER_FAIL,
    payload: {
      error,
    },
  };
};
