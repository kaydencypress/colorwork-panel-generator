import React from 'react';

const SimpleStitch = (props) => {
    const rgb = `rgb(${props.rgb[0]},${props.rgb[1]},${props.rgb[2]})`
    const aspect_ratio = props.gaugeRows / props.gaugeStitches
    const stitchStyle = {
        background: rgb,
        aspectRatio: aspect_ratio,
        flexGrow: 1,
        minWidth: '1px',
        minHeight: '1px'
    }
    return (
        <div style={stitchStyle}>
        </div>
    )
}

export default SimpleStitch;