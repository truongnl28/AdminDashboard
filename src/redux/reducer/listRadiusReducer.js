import { showRadius } from "../../constants/apiConstants";

const initialState = {
    listRadius: [],
    showError: null,
};



const listRadiusReducer = (
    state = initialState,
    { type, payload }
) => {
    switch (type) {
        case showRadius.LIST_RADIUS_SUCCESS:
            return {
                ...state,
                listRadius: payload.data,

            }

        case showRadius.LIST_RADIUS_FAIL:
            return {
                ...state,
                showError:payload.error
            }
        default:
            return state;
    }
};

export default listRadiusReducer;