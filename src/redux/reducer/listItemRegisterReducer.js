import { showItemRegister } from "../../constants/apiConstants";

const initialState = {
    listItemRegister: [],
    showError: null,
};



const listItemRegisterReducer = (
    state = initialState,
    { type, payload }
) => {
    switch (type) {
        case showItemRegister.LIST_ITEM_REGISTER_SUCCESS:
            return {
                ...state,
                listItemRegister: payload.data,

            }

        case showItemRegister.LIST_ITEM_REGISTER_FAIL:
            return {
                ...state,
                showError: payload.error
            }
        default:
            return state;
    }
};

export default listItemRegisterReducer;