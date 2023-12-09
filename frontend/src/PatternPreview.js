import React, {useState, useRef} from 'react';
import Pattern from './Pattern';
import Controls from './Controls';
import './PatternPreview.css';
import { useActionData } from "react-router-dom";

function rgb(arr) {
    return `rgb(${arr[0]},${arr[1]},${arr[2]})`
}

function PatternPreview() {
    const data = useActionData().data;
    const pattern = data.pattern;
    const palette = data.palette;
    const gaugeStitches = data.gaugeStitches;
    const gaugeRows = data.gaugeRows;
    const stitchAspectRatio = gaugeRows / gaugeStitches;
    const imgAspectRatio = (gaugeRows * pattern[0].length) / (gaugeStitches * pattern.length);
    const orientation = imgAspectRatio > 1 ? 'landscape' : 'portrait';
    let rgbPalette = [];
    palette.forEach(element => {
        rgbPalette.push({value: rgb(element), label: ""});
    });
    const defaultColor = rgbPalette[0].value;
    const selectRef = useRef(defaultColor);
    const [isPainting,setIsPainting] = useState(false);
    return (
        <div >
            <Controls palette={rgbPalette} orientation={orientation} isPainting={isPainting} setIsPainting={setIsPainting} selectRef={selectRef} />
            <Pattern pattern={pattern} imgAspectRatio={imgAspectRatio} orientation={orientation} stitchAspectRatio={stitchAspectRatio} isPainting={isPainting} selectRef={selectRef} />
        </div>
    )
}

export default PatternPreview