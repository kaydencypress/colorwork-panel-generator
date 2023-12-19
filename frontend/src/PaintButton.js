import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro';

function PaintButton(props) {
    const isEditingPalette = props.isEditingPalette;
    const setIsEditingPalette = props.setIsEditingPalette;
    const isPainting = props.isPainting;
    const setIsPainting = props.setIsPainting;

    const handleClick = () => {
        setIsPainting(!isPainting);
        if(isEditingPalette) {
            setIsEditingPalette(!isEditingPalette);
        }
    }

    return (
        <button className={isPainting && 'selected'} onClick={handleClick}> <FontAwesomeIcon icon={icon({name: 'fill-drip'})} /> </button>
    )
}

export default PaintButton;