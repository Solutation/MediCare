import React from 'react';

import { HeaderAdmin } from './components/HeaderAdmin';
import { Footer } from '../DefaultLayout/components/Footer';

const AdminLayout = ({ children }) => {
    return (
        <>
            <HeaderAdmin />
            {children}
        </>
    );
};

export default AdminLayout;
