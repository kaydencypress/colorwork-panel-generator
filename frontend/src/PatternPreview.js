import React, {useState, useRef} from 'react';
import Pattern from './Pattern';
import Controls from './Controls';
import './PatternPreview.css';
import { useActionData } from "react-router-dom";

function PatternPreview() {
    const data = useActionData().data;
    const [pattern, setPattern] = useState(data.pattern)
    const numRows = pattern.length;
    const numColumns = pattern[0].length;
    const [ isPainting, setIsPainting ] = useState(false);
    const [ zoom, setZoom ] = useState(100);
    
    const gaugeStitches = data.gaugeStitches;
    const gaugeRows = data.gaugeRows;
    const stitchAspectRatio = gaugeRows / gaugeStitches;
    const imgAspectRatio = (numColumns / gaugeStitches) / (numRows / gaugeRows);
    const orientation = imgAspectRatio >= 1 ? 'landscape' : 'portrait';
    
    const palette = data.palette;
    let rgbPalette = [];
    palette.forEach(element => {
        rgbPalette.push({value: element, label: ""});
    });
    const defaultColor = rgbPalette[0].value;
    const selectRef = useRef(defaultColor);

    return (
        <div className='preview-page'>
            <Controls palette={rgbPalette} orientation={orientation} isPainting={isPainting} setIsPainting={setIsPainting} zoom={zoom} setZoom={setZoom} selectRef={selectRef} />
            <Pattern pattern={pattern} setPattern={setPattern} imgAspectRatio={imgAspectRatio} orientation={orientation} stitchAspectRatio={stitchAspectRatio} zoom={zoom} isPainting={isPainting} selectRef={selectRef} />
        </div>
    )
}

export default PatternPreview