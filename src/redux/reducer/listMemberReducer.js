import { showMember } from "../../constants/apiConstants";

const initialState = {
    listMember: [],
    showError: null,
};



const listMemberReducer = (
    state = initialState,
    { type, payload }
) => {
    switch (type) {
        case showMember.LIST_MEMBER_SUCCESS:
            return {
                ...state,
                listMember: payload.data,

            }

        case showMember.LIST_MEMBER_FAIL:
            return {
                ...state,
                showError:payload.error
            }
        default:
            return state;
    }
};

export default listMemberReducer;