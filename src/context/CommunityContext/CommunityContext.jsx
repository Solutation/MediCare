import React, { useState } from 'react';

export const CommunityContext = React.createContext();

const CommunityProvider = ({ children }) => {
    const [categoryId, setCategoryId] = useState(1);
    const [loading, setLoading] = useState(false);
    const [postList, setPostList] = useState([]);
    const [item, setItem] = useState([]);

    const passValues = { categoryId, setCategoryId, item, setItem, postList, setPostList, loading, setLoading };

    return <CommunityContext.Provider value={passValues}>{children}</CommunityContext.Provider>;
};

export default CommunityProvider;
