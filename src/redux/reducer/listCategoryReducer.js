import { showCategory } from "../../constants/apiConstants";

const initialState = {
    listCategory: [],
    showError: null,
};



const listCategoryReducer = (
    state = initialState,
    { type, payload }
) => {
    switch (type) {
        case showCategory.LIST_CATEGORY_SUCCESS:
            return {
                ...state,
                listCategory: payload.data,

            }

        case showCategory.LIST_CATEGORY_FAIL:
            return {
                ...state,
                showError: payload.error
            }
        default:
            return state;
    }
};

export default listCategoryReducer;