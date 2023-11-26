import React from 'react';

const Stitch = (props) => {
    const rgb = `rgb(${props.rgb[0]},${props.rgb[1]},${props.rgb[2]})`
    const stitchStyle = {
        background: rgb,
        aspectRatio: props.aspectRatio,
        flexGrow: 1,
        minWidth: '1px',
        minHeight: '1px'
    }
    return (
        <div style={stitchStyle}>
        </div>
    )
}

export default Stitch;