import Palette from './Palette';
import PrintButton from './PrintButton';
import BackButton from './BackButton';
import './Controls.css';

function Controls(props) {
    const orientation = props.orientation;
    const palette = props.palette;
    const isPainting = props.isPainting;
    const setIsPainting = props.setIsPainting;
    const selectRef = props.selectRef;

    return (
        <div className='control-container'>
            <div className='controls'>
                <BackButton />
                <Palette palette={palette} isPainting={isPainting} setIsPainting={setIsPainting} selectRef={selectRef}/>
                <PrintButton orientation={orientation} />
            </div>
        </div>
    )
}

export default Controls;