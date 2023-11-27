import React, {useState, useRef} from 'react';
import { useActionData } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro'
import './Palette.css'
import { v4 as uuidv4 } from 'uuid';
import Select from 'react-select';

function rgb(arr) {
    return `rgb(${arr[0]},${arr[1]},${arr[2]})`
}

function Palette() {
    const selectRef = useRef(null);
    const set = (val) => {
        console.log(val);
    };
    const [isPainting,setIsPainting] = useState(false)
    const data = useActionData().data;
    const palette = data.palette;
    let rgbPalette = [];
    palette.forEach(element => {
        rgbPalette.push({value: rgb(element), label: ""});
    });
    const colourStyles: StylesConfig<ColourOption> = {
        option: (styles, {data}) => {
            return {
                ...styles,
                backgroundColor: data.value,
                aspectRatio: 1,
                height: '35px'
            }
        },
        menuList: (styles, {data}) => {
            return {
                ...styles,
                display: 'flex',
                padding: 0
            }
        },
        menu: (styles, {data}) => {
            return {
                ...styles,
                display: 'flex',
                minWidth: '200px',
                margin: 0,
                position: 'auto'
            }
        },
        control: (styles, {data}) => {
            return {
                ...styles,
                display: 'none',
                position: 'auto',
                height: 0
            }
        }
    };
    return(
        <div className='palette'>
            <button className='palette-btn'> <FontAwesomeIcon icon={icon({name: 'pencil'})} /> </button>
                <Select onChange={() => set(selectRef.current.props.value.value)} ref={selectRef} options={rgbPalette} menuIsOpen={true} styles={colourStyles}></Select>
            <button className='palette-btn' onClick={() => setIsPainting(!isPainting)}> <FontAwesomeIcon icon={icon({name: 'fill-drip'})} /> </button>
        </div>
    )
}

export default Palette;