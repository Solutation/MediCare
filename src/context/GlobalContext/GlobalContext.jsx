import React, { useState } from 'react';

export const GlobalContext = React.createContext();

const GlobalProvider = ({ children }) => {
    const [resetPage, setResetPage] = useState(false);

    const passProps = { resetPage, setResetPage };

    return <GlobalContext.Provider value={passProps}>{children}</GlobalContext.Provider>;
};

export default GlobalProvider;
