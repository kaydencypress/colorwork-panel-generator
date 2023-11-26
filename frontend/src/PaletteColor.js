import React from 'react';

const PaletteColor = (props) => {
    const rgb = `rgb(${props.rgb[0]},${props.rgb[1]},${props.rgb[2]})`
    const style = {
        background: rgb,
        display: 'flex',
        aspectRatio: 1,
        height: '100%',
        minHeight: '0px',
        flexGrow: 1
    }
    return (
        <div style={style}>
        </div>
    )
}

export default PaletteColor;