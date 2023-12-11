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
        option: (styles, state) => {
            return {
                ...styles,
                backgroundColor: state.value,
                aspectRatio: 1,
                height: '35px',
                border: (isPainting & state.value === (
                    (selectRef.current.hasOwnProperty('getValue') && (selectRef.current.getValue()).length > 0)
                        ? (selectRef.current.getValue())[0].value 
                        : defaultColor
                    )) | (state.isSelected && isPainting)
                    ? '3px solid white' 
                    : state.isFocused 
                        ? '2px solid grey' 
                        : 'none'
            }
        },
        menuList: (styles, state) => {
            return {
                ...styles,
                display: 'flex',
                padding: 0
            }
        },
        menu: (styles, state) => {
            return {
                ...styles,
                display: 'flex',
                margin: 0,
                position: 'auto'
            }
        },
        control: (styles, state) => {
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
            <button className='edit-btn'> <FontAwesomeIcon icon={icon({name: 'pencil'})} /> </button>
                <Select ref={selectRef} options={palette} menuIsOpen={true} styles={colourStyles} defaultValue={defaultColor}></Select>
            <button className={isPainting ? 'paint-btn selected' : 'paint-btn'} onClick={() => setIsPainting(!isPainting)}> <FontAwesomeIcon icon={icon({name: 'fill-drip'})} /> </button>
        </div>
    )
}

export default Palette;