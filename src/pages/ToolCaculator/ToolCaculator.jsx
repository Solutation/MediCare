import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

import { BMRCalculator } from './components/BMRCalculator';
import { OvulationCalculator } from './components/OvulationCalculator';

const ToolCaculator = () => {
    const [typeCalculator, setTypeCalculator] = useState();
    const [searchParams] = useSearchParams();
    const type = searchParams.get('type');

    useEffect(() => {
        setTypeCalculator(type);
    }, [type]);

    return (
        <>
            {type && typeCalculator === 'bmr' && <BMRCalculator />}
            {type && typeCalculator === 'ovulation' && <OvulationCalculator />}
        </>
    );
};

export default ToolCaculator;
