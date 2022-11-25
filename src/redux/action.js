export const getCheckFormState = (checkError, submit = false) => ({
    type: 'GET_CHECK_FORM_STATE',
    payload: { checkError, submit }
});
