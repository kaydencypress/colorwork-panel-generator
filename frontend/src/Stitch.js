import React, {useState} from 'react';

const Stitch = (props) => {
    const initColor = props.initColor;
    const pattern = props.pattern;
    const setPattern = props.setPattern;
    const row = props.row;
    const column = props.column;
    const isPainting = props.isPainting;
    const selectedColorId = props.selectedColorId;
    const selectRef = props.selectRef;

    const [color, setColor] = useState(initColor);
    let stitchStyle = {
        background: color,
        aspectRatio: props.aspectRatio,
        display: 'flex',
        flex: '1 1 0',
        border: '1px solid #969696'
    }

    const handleClick = (evt) => {
        if (isPainting) {
            setColor(selectedColorId.value);
            pattern[row][column] = selectedColorId.label;
            setPattern(pattern);
        }
    }
    return (
        <div style={stitchStyle} onClick={handleClick}>
        </div>
    )
}

export default Stitch;