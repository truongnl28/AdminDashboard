import { showRank } from "../../constants/apiConstants";

const initialState = {
    listRank: [],
    showError: null,
};



const listRankReducer = (
    state = initialState,
    { type, payload }
) => {
    switch (type) {
        case showRank.LIST_RANK_SUCCESS:
            return {
                ...state,
                listRank: payload.data,

            }

        case showRank.LIST_RANK_FAIL:
            return {
                ...state,
                showError: payload.error
            }
        default:
            return state;
    }
};

export default listRankReducer;