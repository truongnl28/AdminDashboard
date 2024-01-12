import { detailItem } from "../../constants/apiConstants";

const initialState = {
    detailItem: [],
    showError: null,
};



const detailItemReducer = (
    state = initialState,
    { type, payload }
) => {
    switch (type) {
        case detailItem.DETAIL_ITEM_SUCCESS:
            return {
                ...state,
                detailItem: payload.data,

            }

        case detailItem.DETAIL_ITEM_FAIL:
            return {
                ...state,
                showError: payload.error
            }
        default:
            return state;
    }
};

export default detailItemReducer;