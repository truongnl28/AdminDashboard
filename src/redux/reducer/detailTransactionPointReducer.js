import { detailTransactionPoint } from "../../constants/apiConstants";

const initialState = {
    detailPoint: [],
    showError: null,
};



const detailTransactionPointReducer = (
    state = initialState,
    { type, payload }
) => {
    switch (type) {
        case detailTransactionPoint.DETAIL_POINT_SUCCESS:
            return {
                ...state,
                detailPoint: payload.data,

            }

        case detailTransactionPoint.DETAIL_POINT_FAIL:
            return {
                ...state,
                showError: payload.error
            }
        default:
            return state;
    }
};

export default detailTransactionPointReducer;