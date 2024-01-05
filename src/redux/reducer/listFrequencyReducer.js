import { showFrequency } from "../../constants/apiConstants";

const initialState = {
    listFrequency: [],
    showError: null,
};



const listFrequencyReducer = (
    state = initialState,
    { type, payload }
) => {
    switch (type) {
        case showFrequency.LIST_FREQUENCY_SUCCESS:
            return {
                ...state,
                listFrequency: payload.data,

            }

        case showFrequency.LIST_FREQUENCY_FAIL:
            return {
                ...state,
                showError:payload.error
            }
        default:
            return state;
    }
};

export default listFrequencyReducer;