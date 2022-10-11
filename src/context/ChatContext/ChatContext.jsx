import React, { useState } from 'react';

export const ChatContext = React.createContext();

const ChatProvider = ({ children }) => {
    const [createType, setCreateType] = useState('');
    const [isCreating, setIsCreating] = useState(false);
    const [isEditing, setIsEditing] = useState(false);

    const passValue = {
        createType,
        setCreateType,
        isCreating,
        setIsCreating,
        isEditing,
        setIsEditing
    };

    return <ChatContext.Provider value={passValue}>{children}</ChatContext.Provider>;
};

export default ChatProvider;
