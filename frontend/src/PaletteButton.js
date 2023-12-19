import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro';

function PaletteButton(props) {
    const isEditingPalette = props.isEditingPalette;
    const setIsEditingPalette = props.setIsEditingPalette;
    const isPainting = props.isPainting;
    const setIsPainting = props.setIsPainting;

    const handleClick = () => {
        setIsEditingPalette(!isEditingPalette);
        if(isPainting) {
            setIsPainting(!isPainting);
        }
    }

    return (
        <button className={isEditingPalette && 'selected'} onClick={handleClick}> <FontAwesomeIcon icon={icon({name: 'palette'})} /> </button>
    )
}

export default PaletteButton;