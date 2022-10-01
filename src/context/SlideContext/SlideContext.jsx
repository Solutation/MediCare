import React, { useState } from 'react';

export const SlideContext = React.createContext();

const SlideProvider = ({ children }) => {
    const [slide, setSlide] = useState(false);

    return <SlideContext.Provider value={{ slide, setSlide }}>{children}</SlideContext.Provider>;
};

export default SlideProvider;
