import Palette from './Palette';
import PrintButton from './PrintButton';
import BackButton from './BackButton';
import Zoom from './Zoom';
import './Controls.css';

function Controls(props) {
    const orientation = props.orientation;
    const palette = props.palette;
    const isPainting = props.isPainting;
    const zoom = props.zoom;
    const setZoom = props.setZoom;
    const setIsPainting = props.setIsPainting;
    const selectRef = props.selectRef;

    return (
        <div className='control-container'>
            <div className='controls'>
                <BackButton />
                <Palette palette={palette} isPainting={isPainting} setIsPainting={setIsPainting} selectRef={selectRef}/>
                <Zoom zoom={zoom} setZoom={setZoom} />
                <PrintButton orientation={orientation} />
            </div>
        </div>
    )
}

export default Controls;