import React, { useState } from 'react';

export const ValidatorContext = React.createContext();

const ValidatorProvider = ({ children }) => {
    const [check, setCheck] = useState('');
    const [submit, setSubmit] = useState(false);

    const passProps = { check, setCheck, submit, setSubmit };

    return <ValidatorContext.Provider value={passProps}>{children}</ValidatorContext.Provider>;
};

export default ValidatorProvider;
