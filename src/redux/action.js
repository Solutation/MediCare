export const getCheckFormState = (checkError, submit = false) => ({
    type: 'GET_CHECK_FORM_STATE',
    payload: { checkError, submit }
});
export const getConsultantContactId = (payload) => ({
    type: 'GET_CONSULTANT_CONTACT_ID',
    payload
});
