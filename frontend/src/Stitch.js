import React, {useState} from 'react';

const Stitch = (props) => {
    const [color,setColor] = useState(props.initColor)
    const isPainting = props.isPainting;
    const selectRef = props.selectRef;
    const stitchStyle = {
        background: color,
        aspectRatio: props.aspectRatio,
        flexGrow: 1,
        minWidth: '1px',
        minHeight: '1px'
    }
    const handleClick = (evt) => {
        if (isPainting) {
            setColor((selectRef.current.getValue()).length > 0  ? (selectRef.current.getValue())[0].value : selectRef.current.props.value);
        }
    }
    return (
        <div style={stitchStyle} onClick={handleClick}>
        </div>
    )
}

export default Stitch;