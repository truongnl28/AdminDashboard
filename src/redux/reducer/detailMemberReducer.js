import { detailMember } from "../../constants/apiConstants";

const initialState = {
    detailMember: [],
    showError: null,
};



const detailMemberReducer = (
    state = initialState,
    { type, payload }
) => {
    switch (type) {
        case detailMember.DETAIL_MEMBER_SUCCESS:
            return {
                ...state,
                detailMember: payload.data,

            }

        case detailMember.DETAIL_MEMBER_FAIL:
            return {
                ...state,
                showError: payload.error
            }
        default:
            return state;
    }
};

export default detailMemberReducer;