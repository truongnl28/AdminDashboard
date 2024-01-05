import { showPoint } from "../../constants/apiConstants";

const initialState = {
    listPoint: [],
    showError: null,
};



const listPointReducer = (
    state = initialState,
    { type, payload }
) => {
    switch (type) {
        case showPoint.LIST_POINT_SUCCESS:
            return {
                ...state,
                listPoint: payload.data,

            }

        case showPoint.LIST_POINT_FAIL:
            return {
                ...state,
                showError:payload.error
            }
        default:
            return state;
    }
};

export default listPointReducer;