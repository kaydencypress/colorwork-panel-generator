import React from 'react';
import Stitch from './Stitch'
import './Pattern.css'
import { useActionData } from 'react-router-dom';

function Pattern() {
    const data = useActionData().data;
    const pattern = data.pattern;
    const palette = data.palette;
    const gaugeRatio = data.gaugeRatio;
    return (
        <div>
            {pattern.map(row => 
                <div className = 'patternRow'>
                    {row.map(s => <Stitch palette={palette} defaultColor={s} gaugeRatio={gaugeRatio}/>)}
                </div>)}
        </div>
    );
}

export default Pattern;