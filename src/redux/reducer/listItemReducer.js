import { showItem } from "../../constants/apiConstants";

const initialState = {
    listItem: [],
    showError: null,
};



const listItemReducer = (
    state = initialState,
    { type, payload }
) => {
    switch (type) {
        case showItem.LIST_ITEM_SUCCESS:
            return {
                ...state,
                listItem: payload.data,

            }

        case showItem.LIST_ITEM_FAIL:
            return {
                ...state,
                showError: payload.error
            }
        default:
            return state;
    }
};

export default listItemReducer;