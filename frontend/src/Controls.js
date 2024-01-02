import React, {useState} from 'react';
import Palette from './Palette';
import PrintButton from './PrintButton';
import BackButton from './BackButton';
import Zoom from './Zoom';
import ColorPicker from './ColorPicker';
import './Controls.css';

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
    const setSelectedColorId = props.setSelectedColorId;
    const selectedColorId = props.selectedColorId;
    const [ newColor, setNewColor ] = useState(selectedColorId.value);

    return (
        <div className='left-pane'>
            <div className='control-container'>
                <div className='controls'>
                    <BackButton />
                    <PrintButton orientation={orientation} />
                    <Palette palette={palette} isPainting={isPainting} setIsPainting={setIsPainting} isEditingPalette={isEditingPalette} setIsEditingPalette={setIsEditingPalette} selectedColorId={selectedColorId} setSelectedColorId={setSelectedColorId} setNewColor={setNewColor}/>
                    <Zoom zoom={zoom} setZoom={setZoom} />
                </div>
            </div>
            {isEditingPalette && <ColorPicker selectedColorId={selectedColorId} setSelectedColorId={setSelectedColorId} setIsEditingPalette={setIsEditingPalette} palette={palette} setPalette={setPalette} newColor={newColor} setNewColor={setNewColor}/>}
        </div>
        
    )
}

export default Controls;