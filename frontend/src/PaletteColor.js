const PaletteColor = (props) => {
    const rgb = `rgb(${props.rgb[0]},${props.rgb[1]},${props.rgb[2]})`
    let liStyle = {
        listStyleType: 'none',
        padding: 0,
        margin: 0,
        display: 'inline-block',
        height: '100%'
    }
    let squareStyle = {
        background: rgb,
        aspectRatio: 1,
        height: '100%',
        minHeight: '35px'
    }
    return (
        <li style={liStyle} value={rgb}>
            <option style={squareStyle} key={props.key} value={rgb} ref={props.selectRef} onClick={props.onClick}></option>
        </li>
    )
}

export default PaletteColor;