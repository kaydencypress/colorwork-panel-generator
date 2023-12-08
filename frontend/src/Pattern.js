import React from 'react';
import Stitch from './Stitch'
import './Pattern.css'
import { useActionData } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

function rgb(arr) {
    return `rgb(${arr[0]},${arr[1]},${arr[2]})`
}

function Pattern(props) {
    const data = useActionData().data;
    const pattern = data.pattern;
    const gaugeStitches = data.gaugeStitches;
    const gaugeRows = data.gaugeRows;
    const imgAspectRatio = (gaugeRows * pattern[0].length) / (gaugeStitches * pattern.length)
    const stitchAspectRatio = gaugeRows / gaugeStitches
    const isPainting = props.isPainting;
    const selectRef = props.selectRef;
    let style = { aspectRatio: imgAspectRatio }

    return (
        <div className='pattern' style={style}>
            {pattern.map(row => 
                <div className = 'pattern-row'>
                    {row.map(s => <Stitch initColor={rgb(s)} aspectRatio={stitchAspectRatio} key={uuidv4()} isPainting={isPainting} selectRef={selectRef}/>)}
                </div>)}
        </div>
    );
}

export default Pattern;