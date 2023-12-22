import React from 'react';
import Stitch from './Stitch'
import './Pattern.css'
import { v4 as uuidv4 } from 'uuid';
import { toRgbStr } from './Helper';

function Pattern(props) {
    const pattern = props.pattern;
    const setPattern = props.setPattern;
    const selectedColorId = props.selectedColorId;
    const palette = props.palette;
    const imgAspectRatio = props.imgAspectRatio;
    const stitchAspectRatio = props.stitchAspectRatio;
    const isPainting = props.isPainting;
    const selectRef = props.selectRef;
    const orientation = props.orientation;
    const zoom = props.zoom;

    const style = { 
        aspectRatio: imgAspectRatio,
        height: zoom ? `${0.9*zoom}vh` : '90vh'
    }

    console.log(palette)

    return (
        <div className='view-window'>
            <div className={`pattern ${orientation}`} style={style}>
                {pattern.map((row,y) => 
                    <div className = 'pattern-row'>
                        {row.map((color_id,x) => <Stitch initColor={toRgbStr(palette[color_id].value)} aspectRatio={stitchAspectRatio} key={uuidv4()} pattern={pattern} setPattern={setPattern} row={y} column={x} isPainting={isPainting} selectedColorId={selectedColorId} selectRef={selectRef}/>)}
                    </div>)
                }
            </div>
        </div>
    );
}

export default Pattern;