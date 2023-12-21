import React from 'react';
import './Palette.css';
import Select from 'react-select';
import PaintButton from './PaintButton';
import PaletteButton from './PaletteButton';
import { strToRgbObj } from './Helper';

function Palette(props) { 
    const palette = props.palette;
    const isPainting = props.isPainting;
    const setIsPainting = props.setIsPainting;
    const isEditingPalette = props.isEditingPalette;
    const setIsEditingPalette = props.setIsEditingPalette;
    const defaultColor = palette[0].value
    const selectRef = props.selectRef;
    const setSelectedColor = props.setSelectedColor;
    const setNewColor = props.setNewColor;

    const handleChange = (e) => {
        setSelectedColor(strToRgbObj(e.value));
        setNewColor(strToRgbObj(e.value));
    }
    
    const colourStyles: StylesConfig<ColourOption> = {
        option: (styles, state) => {
            return {
                ...styles,
                backgroundColor: state.value,
                aspectRatio: 1,
                height: '35px',
                width: '45px',
                border: ((isPainting | isEditingPalette) & // only highlight selected color if the user is painting or editing the palette
                    state.value === ((selectRef.current.hasOwnProperty('getValue') && (selectRef.current.getValue()).length > 0) // check if there is a user-selected color
                        ? (selectRef.current.getValue())[0].value // highlight this color if this color is the user-selected color
                        : defaultColor)) // highlight this color if there is NOT a user-selected color, and this color is the default color
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
                flexWrap: 'wrap',
                width: '90px',
                padding: 0
            }
        },
        menu: (styles, state) => {
            return {
                ...styles,
                display: 'flex',
                margin: 0,
                width: '90px',
                position: 'auto',
                boxShadow: 'none'
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
            <PaletteButton isEditingPalette={isEditingPalette} setIsEditingPalette={setIsEditingPalette} isPainting={isPainting} setIsPainting={setIsPainting}/>
            <PaintButton isPainting={isPainting} setIsPainting={setIsPainting} isEditingPalette={isEditingPalette} setIsEditingPalette={setIsEditingPalette}/>
            <Select ref={selectRef} options={palette} menuIsOpen={true} styles={colourStyles} defaultValue={defaultColor} onChange={handleChange}></Select>
        </div>
    )
}

export default Palette;