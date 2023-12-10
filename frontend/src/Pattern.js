import React from 'react';
import Stitch from './Stitch'
import './Pattern.css'
import { v4 as uuidv4 } from 'uuid';

function Pattern(props) {
    const pattern = props.pattern;
    const setPattern = props.setPattern;
    const imgAspectRatio = props.imgAspectRatio;
    const stitchAspectRatio = props.stitchAspectRatio;
    const isPainting = props.isPainting;
    const selectRef = props.selectRef;
    const orientation = props.orientation;
    const zoom = props.zoom;

    const style = { 
        aspectRatio: imgAspectRatio,
        height: zoom ? `${0.8*zoom}vh` : '80vh'
    }

    return (
        <div className='view-window'>
            <div className={`pattern ${orientation}`} style={style}>
                {pattern.map((row,r) => 
                    <div className = 'pattern-row'>
                        {row.map((stitch,c) => <Stitch initColor={stitch} aspectRatio={stitchAspectRatio} key={uuidv4()} pattern={pattern} setPattern={setPattern} row={r} column={c} isPainting={isPainting} selectRef={selectRef}/>)}
                    </div>)
                }
            </div>
        </div>
    );
}

export default Pattern;