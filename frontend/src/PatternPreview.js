import React from 'react';
import Pattern from './Pattern';
import Palette from './Palette';
import './PatternPreview.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro'

function PatternPreview() {
    return (
        <div>
            <div className='Controls'>
                <button> <FontAwesomeIcon icon={icon({name: 'arrow-left'})} /> </button>
                <Palette/>
                <button><FontAwesomeIcon icon={icon({name: 'download'})} /></button>
            </div>
            <div className = 'Pattern'>
                <Pattern />
            </div>
        </div>
    )
}

export default PatternPreview