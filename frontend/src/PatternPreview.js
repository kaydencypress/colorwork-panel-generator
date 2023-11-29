import React, {useState, useRef} from 'react';
import Pattern from './Pattern';
import Palette from './Palette';
import './PatternPreview.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro'
import {Form } from 'react-router-dom';
import { useActionData } from "react-router-dom";

function rgb(arr) {
    return `rgb(${arr[0]},${arr[1]},${arr[2]})`
}

function PatternPreview() {
    const data = useActionData().data;
    const palette = data.palette;
    let rgbPalette = [];
    palette.forEach(element => {
        rgbPalette.push({value: rgb(element), label: ""});
    });
    const defaultColor = rgbPalette[0].value;
    const selectRef = useRef(defaultColor);
    const [isPainting,setIsPainting] = useState(false);

    return (
        <div>
            <div className='Controls'>
                <Form action='/'>
                    <button> <FontAwesomeIcon icon={icon({name: 'arrow-left'})}/> </button>
                </Form>
                <Palette palette={rgbPalette} isPainting={isPainting} setIsPainting={setIsPainting} selectRef={selectRef}/>
                <button><FontAwesomeIcon icon={icon({name: 'download'})} /></button>
            </div>
            <div className = 'Pattern'>
                <Pattern isPainting={isPainting} selectRef={selectRef}/>
            </div>
        </div>
    )
}

export default PatternPreview