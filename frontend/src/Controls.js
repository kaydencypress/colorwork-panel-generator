import Palette from './Palette';
import PrintButton from './PrintButton';
import BackButton from './BackButton';
import Zoom from './Zoom';
import './Controls.css';

function Controls(props) {
    const orientation = props.orientation;
    const palette = props.palette;
    const isPainting = props.isPainting;
    const setIsPainting = props.setIsPainting;
    const isEditingPalette = props.isEditingPalette;
    const setIsEditingPalette = props.setIsEditingPalette;
    const zoom = props.zoom;
    const setZoom = props.setZoom;
    const selectRef = props.selectRef;

    return (
        <div className='control-container'>
            <div className='controls'>
                <BackButton />
                <PrintButton orientation={orientation} />
                <Palette palette={palette} isPainting={isPainting} setIsPainting={setIsPainting} isEditingPalette={isEditingPalette} setIsEditingPalette={setIsEditingPalette} selectRef={selectRef}/>
                <Zoom zoom={zoom} setZoom={setZoom} />
            </div>
        </div>
    )
}

export default Controls;