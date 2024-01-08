import { detailMember, showMember } from "../constants/apiConstants";

export const getShowMember = () => {
  return {
    type: showMember.LIST_MEMBER,
  };
};


export const deleteMember = (data) => {
  return {
    type: showMember.DELETE_MEMBER,
    data,
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


export const getDetailMember = (userId) => {
  return {
    type: detailMember.DETAIL_MEMBER,
    userId
  };
};

export const getDetailMemberSuccess = (data) => {
  return {
    type: detailMember.DETAIL_MEMBER_SUCCESS,
    payload: {
      data,
    },
  };
};

export const getDetailMemberFailed = (error) => {
  return {
    type: detailMember.DETAIL_MEMBER_FAIL,
    payload: {
      error,
    },
  };
};
