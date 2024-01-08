import { showTransaction } from "../../constants/apiConstants";

const initialState = {
    listTransaction: [],
    showError: null,
};



const listTransactionReducer = (
    state = initialState,
    { type, payload }
) => {
    switch (type) {
        case showTransaction.LIST_TRANSACTION_SUCCESS:
            return {
                ...state,
                listTransaction: payload.data,

            }

        case showTransaction.LIST_TRANSACTION_FAIL:
            return {
                ...state,
                showError: payload.error
            }
        default:
            return state;
    }
};

export default listTransactionReducer;