import React from 'react';
import './Palette.css';
import Select from 'react-select';
import PaintButton from './PaintButton';
import PaletteButton from './PaletteButton';

function Palette(props) { 
    const palette = props.palette;
    const isPainting = props.isPainting;
    const setIsPainting = props.setIsPainting;
    const isEditingPalette = props.isEditingPalette;
    const setIsEditingPalette = props.setIsEditingPalette;
    const defaultColor = palette[0].value;
    const selectedColorId = props.selectedColorId;
    const setSelectedColorId = props.setSelectedColorId;
    const setNewColor = props.setNewColor;

    const handleChange = (e) => {
        setSelectedColorId(e);
        setNewColor(e.value);
    }
    
    const colourStyles: StylesConfig<ColourOption> = {
        option: (styles, state) => {
            return {
                ...styles,
                backgroundColor: state.value,
                color: 'transparent',
                aspectRatio: 1,
                height: '35px',
                width: '45px',
                border: ( (isPainting | isEditingPalette) & state.value === selectedColorId.value)
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
            <Select options={palette} menuIsOpen={true} styles={colourStyles} defaultValue={defaultColor} onChange={handleChange}></Select>
        </div>
    )
}

export default Palette;