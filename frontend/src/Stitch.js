import React, {useState} from 'react';

const Stitch = (props) => {
    const initColor = props.initColor;
    const pattern = props.pattern;
    const setPattern = props.setPattern;
    const row = props.row;
    const column = props.column;
    const isPainting = props.isPainting;
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
            const color = (selectRef.current.getValue()).length > 0  ? (selectRef.current.getValue())[0].value : selectRef.current.props.value;
            setColor(color);
            pattern[row][column] = color;
            setPattern(pattern);
        }
    }
    return (
        <div style={stitchStyle} onClick={handleClick}>
        </div>
    )
}

export default Stitch;