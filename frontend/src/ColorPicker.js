import React from 'react';
import ChromePicker from 'react-color';
import './ColorPicker.css';
import { toRgbStr } from './Helper';

function ColorPicker(props) {
  const setIsEditingPalette = props.setIsEditingPalette;
  const selectedColorId = props.selectedColorId;
  const setSelectedColorId = props.setSelectedColorId;
  const palette = props.palette;
  const setPalette = props.setPalette;
  const newColor = props.newColor;
  const setNewColor = props.setNewColor;

  const handleCancel = () => {
    setIsEditingPalette(false);
  }

  const handleOk = (e) => {
    let newPalette = [...palette];
    const index = parseInt(selectedColorId.label);
    newPalette[index].value = toRgbStr(newColor);
    setSelectedColorId(newPalette[index]);
    setPalette(newPalette);
    setIsEditingPalette(false);
  }

  return (
    <div className='color-picker-container'>
      <ChromePicker
          color={toRgbStr(newColor)}
          onChange={(c) => {
            setNewColor(c.rgb);
          }}
          disableAlpha={true}
        />
        <div className='color-picker-btns'>
          <button onClick={handleOk}>OK</button>
          <button onClick={handleCancel}>X</button>
        </div>
    </div>
  );
}
export default ColorPicker;