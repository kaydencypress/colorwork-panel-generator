import { useActionData } from "react-router-dom";
import PaletteColor from './PaletteColor';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro'
import './Palette.css'

function Palette() {
    const data = useActionData().data;
    console.log("Palette data: ")
    console.log(data)
    const palette = data.palette;
    return(
        <div className='palette'>
            <button className='palette-btn'> <FontAwesomeIcon icon={icon({name: 'pencil'})} /> </button>
            {palette.map(p => <PaletteColor rgb={p}/>)}
            <button className='palette-btn'> <FontAwesomeIcon icon={icon({name: 'fill-drip'})} /> </button>
        </div>
    )
}

export default Palette;