import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro'
import './Palette.css'
import Select from 'react-select';

function Palette(props) { 
    const palette = props.palette;
    const isPainting = props.isPainting;
    const setIsPainting = props.setIsPainting;
    const defaultColor = palette[0].value
    const selectRef = props.selectRef;

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
                <Select ref={selectRef} options={palette} menuIsOpen={true} styles={colourStyles} defaultValue={defaultColor}></Select>
            <button className='palette-btn' onClick={() => setIsPainting(!isPainting)}> <FontAwesomeIcon icon={icon({name: 'fill-drip'})} /> </button>
        </div>
    )
}

export default Palette;