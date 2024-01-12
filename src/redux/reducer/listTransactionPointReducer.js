import { showTransactionPoint } from "../../constants/apiConstants";

const initialState = {
    listTransactionPoint: [],
    showError: null,
};



const listTransactionPointReducer = (
    state = initialState,
    { type, payload }
) => {
    switch (type) {
        case showTransactionPoint.LIST_TRANSACTION_POINT_SUCCESS:
            return {
                ...state,
                listTransactionPoint: payload.data,

            }

        case showTransactionPoint.LIST_TRANSACTION_POINT_FAIL:
            return {
                ...state,
                showError: payload.error
            }
        default:
            return state;
    }
};

export default listTransactionPointReducer;