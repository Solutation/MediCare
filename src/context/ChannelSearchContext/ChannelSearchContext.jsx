import React, { useState } from 'react';

export const ChannelSearchContext = React.createContext();

const ChannelSearchProvider = ({ children }) => {
    const [channelSearchValue, setChannelSearchValue] = useState('');

    const passValue = { channelSearchValue, setChannelSearchValue };

    return <ChannelSearchContext.Provider value={passValue}>{children}</ChannelSearchContext.Provider>;
};

export default ChannelSearchProvider;
