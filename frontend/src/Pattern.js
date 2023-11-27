import React from 'react';
import Stitch from './Stitch'
import './Pattern.css'
import { useActionData } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

function Pattern() {
    const data = useActionData().data;
    const pattern = data.pattern;
    const gaugeStitches = data.gaugeStitches;
    const gaugeRows = data.gaugeRows;
    const imgAspectRatio = (gaugeRows * pattern[0].length) / (gaugeStitches * pattern.length)
    const stitchAspectRatio = gaugeRows / gaugeStitches
    let style = { 
        aspectRatio: imgAspectRatio,
        margin: 'auto'
    }
    imgAspectRatio >= 1
        ? style.height = '90vh'
        : style.width = '90vh'
    return (
        <div style={style}>
            {pattern.map(row => 
                <div className = 'patternRow'>
                    {row.map(s => <Stitch rgb={s} aspectRatio={stitchAspectRatio} key={uuidv4()}/>)}
                </div>)}
        </div>
    );
}

export default Pattern;