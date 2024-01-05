import { showRank } from "../constants/apiConstants";

export const getRank = () => {
    return {
      type: showRank.LIST_RANK,
    };
  };
  
  export const postRank = (data) => {
      return {
        type: showRank.CREATE_RANK,
        data,
      };
    };
  
  export const updateRank = (data, rankId) => {
    console.log(data)
    return {
      type: showRank.UPDATE_RANK,
      data,
      rankId,
    };
  };
  
  export const deleteRank = (rankId) => {
      return {
        type: showRank.DELETE_RANK,
        rankId,
      };
    };
  
  export const getRankSuccess = (data) => {
    return {
      type: showRank.LIST_RANK_SUCCESS,
      payload: {
        data,
      },
    };
  };
  
  export const getRankFailed = (error) => {
    return {
      type: showRank.LIST_RANK_FAIL,
      payload: {
        error,
      },
    };
  };