import React, {useState} from 'react';
import Palette from './Palette';
import PrintButton from './PrintButton';
import BackButton from './BackButton';
import Zoom from './Zoom';
import ColorPicker from './ColorPicker';
import './Controls.css';
import { strToRgbObj } from './Helper';

function Controls(props) {
    const orientation = props.orientation;
    const palette = props.palette;
    const setPalette = props.setPalette;
    const isPainting = props.isPainting;
    const setIsPainting = props.setIsPainting;
    const isEditingPalette = props.isEditingPalette;
    const setIsEditingPalette = props.setIsEditingPalette;
    const zoom = props.zoom;
    const setZoom = props.setZoom;
    const selectRef = props.selectRef;
    const setSelectedColor = props.setSelectedColor;
    const selectedColor = props.selectedColor;
    const [ newColor, setNewColor ] = useState(strToRgbObj(selectedColor));

    return (
        <div className='left-pane'>
            <div className='control-container'>
                <div className='controls'>
                    <BackButton />
                    <PrintButton orientation={orientation} />
                    <Palette palette={palette} isPainting={isPainting} setIsPainting={setIsPainting} isEditingPalette={isEditingPalette} setIsEditingPalette={setIsEditingPalette} selectRef={selectRef} selectedColor={selectedColor} setSelectedColor={setSelectedColor} setNewColor={setNewColor}/>
                    <Zoom zoom={zoom} setZoom={setZoom} />
                </div>
            </div>
            {isEditingPalette && <ColorPicker selectedColor={selectedColor} setSelectedColor={setSelectedColor} setIsEditingPalette={setIsEditingPalette} palette={palette} setPalette={setPalette} newColor={newColor} setNewColor={setNewColor}/>}
        </div>
        
    )
}

export default Controls;