import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

import { PDDCalculator } from './components/PDDCalculator';
import { BMRCalculator } from './components/BMRCalculator';
import { OvulationCalculator } from './components/OvulationCalculator';
import { BMICalculator } from './components/BMICalculator';

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
            {type && typeCalculator === 'bmi' && <BMICalculator />}
            {type && typeCalculator === 'pdd' && <PDDCalculator />}
        </>
    );
};

export default ToolCaculator;
