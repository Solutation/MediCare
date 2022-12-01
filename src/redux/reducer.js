const initialState = {
    checkError: '',
    submit: false,
    consultantContactId: ''
};

export default function reducer(state, action) {
    switch (action.type) {
        case 'GET_CHECK_FORM_STATE':
            return {
                checkError: action.payload
            };
        case 'GET_CONSULTANT_CONTACT_ID':
            return {
                consultantContactId: action.payload
            };
        default:
            return state;
    }
}

export { initialState };
