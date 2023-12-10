import React from 'react';
import './Zoom.css';

function Zoom(props) {
    const zoom = props.zoom;
    const setZoom = props.setZoom;

    const handleZoom = (e) => {
        setZoom(e.target.value);
    }

    return(
        <div>
            <label htmlFor='zoom'>Zoom</label>
            <input type='number' name='zoom' min='50' max='500' step='5' onChange={handleZoom} value={zoom} placeholder={100}></input>
            <span className={zoom && zoom < 100 ? 'two-digit' : 'three-digit'}>%</span>
        </div>
    )
};

export default Zoom;