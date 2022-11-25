const initialState = {
    checkError: '',
    submit: false
};

export default function reducer(state, action) {
    switch (action.type) {
        case 'GET_CHECK_FORM_STATE':
            return {
                checkError: action.payload
            };
        default:
            return state;
    }
}

export { initialState };
