import React from 'react';

import { Header } from '../DefaultLayout/components/Header';

const HeaderOnly = ({ children }) => {
    return (
        <>
            <Header />
            {children}
        </>
    );
};

export default HeaderOnly;
