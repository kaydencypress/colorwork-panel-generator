import React from 'react';
import Stitch from './Stitch'
import './Pattern.css'
import { v4 as uuidv4 } from 'uuid';

function rgb(arr) {
    return `rgb(${arr[0]},${arr[1]},${arr[2]})`
}

function Pattern(props) {
    const pattern = props.pattern;
    const imgAspectRatio = props.imgAspectRatio;
    const stitchAspectRatio = props.stitchAspectRatio;
    const isPainting = props.isPainting;
    const selectRef = props.selectRef;
    const orientation = props.orientation;

    return (
        <div className={`pattern ${orientation}`} style={{ aspectRatio: imgAspectRatio }}>
            {pattern.map(row => 
                <div className = 'pattern-row'>
                    {row.map(s => <Stitch initColor={rgb(s)} aspectRatio={stitchAspectRatio} key={uuidv4()} isPainting={isPainting} selectRef={selectRef}/>)}
                </div>)}
        </div>
    );
}

export default Pattern;