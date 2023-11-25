import React from 'react';
import SimpleStitch from './SimpleStitch'
import './Pattern.css'
import { useActionData } from 'react-router-dom';

function Pattern() {
    const data = useActionData().data;
    const pattern = data.pattern;
    const gaugeStitches = data.gaugeStitches;
    const gaugeRows = data.gaugeRows;
    const aspectRatio = (gaugeRows * pattern[0].length) / (gaugeStitches * pattern.length)
    let style = { 
        aspectRatio: aspectRatio,
        margin: 'auto'
    }
    aspectRatio >= 1
        ? style.height = '90vh'
        : style.width = '90vh'
    return (
        <div style={style}>
            {pattern.map(row => 
                <div className = 'patternRow'>
                    {row.map(s => <SimpleStitch rgb={s} gaugeStitches={gaugeStitches} gaugeRows={gaugeRows}/>)}
                </div>)}
        </div>
    );
}

export default Pattern;