import React, {useState, useRef} from 'react';
import Pattern from './Pattern';
import Controls from './Controls';
import './PatternPreview.css';
import { useActionData } from "react-router-dom";
import { toRgbStr } from './Helper';

function PatternPreview() {
    const data = useActionData().data;
    const [ pattern, setPattern ] = useState(data.pattern)
    const numRows = pattern.length;
    const numColumns = pattern[0].length;
    const [ isPainting, setIsPainting ] = useState(false);
    const [ isEditingPalette, setIsEditingPalette ] = useState(false);
    const [ zoom, setZoom ] = useState(100);
    
    const gaugeStitches = data.gaugeStitches;
    const gaugeRows = data.gaugeRows;
    const stitchAspectRatio = gaugeRows / gaugeStitches;
    const imgAspectRatio = (numColumns / gaugeStitches) / (numRows / gaugeRows);
    const orientation = imgAspectRatio >= 1 ? 'landscape' : 'portrait';
    
    console.log(data.palette)
    let colorOption = [];
    for (let id in data.palette) {
        console.log(id)
        console.log(toRgbStr(data.palette[id]))
        colorOption.push({value: toRgbStr(data.palette[id]), label: id});
    }
    const selectRef = useRef(data.palette[0]);
    const [ palette, setPalette ] = useState(colorOption);
    const [ selectedColorId, setSelectedColorId ] = useState(palette[0]);

    return (
        <div className='preview-page'>
            <Controls palette={palette} setPalette={setPalette} orientation={orientation} isPainting={isPainting} setIsPainting={setIsPainting} isEditingPalette={isEditingPalette} setIsEditingPalette={setIsEditingPalette} zoom={zoom} setZoom={setZoom} selectRef={selectRef} selectedColorId={selectedColorId} setSelectedColorId={setSelectedColorId}/>
            <Pattern pattern={pattern} setPattern={setPattern} palette={palette} selectedColorId={selectedColorId} imgAspectRatio={imgAspectRatio} orientation={orientation} stitchAspectRatio={stitchAspectRatio} zoom={zoom} isPainting={isPainting} selectRef={selectRef} />
        </div>
    )
}

export default PatternPreview