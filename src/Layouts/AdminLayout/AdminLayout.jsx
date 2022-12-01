import React from 'react';

import { HeaderAdmin } from './components/HeaderAdmin';

const AdminLayout = ({ children }) => {
    return (
        <>
            <HeaderAdmin />
            {children}
        </>
    );
};

export default AdminLayout;
