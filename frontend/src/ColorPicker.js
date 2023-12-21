import React from 'react';
import ChromePicker from 'react-color';
import './ColorPicker.css';
import { strToRgbObj, rgbObjToStr } from './Helper';

function ColorPicker(props) {
  const setIsEditingPalette = props.setIsEditingPalette;
  const setSelectedColor = props.setSelectedColor;
  const palette = props.palette;
  const setPalette = props.setPalette;
  const initColor = strToRgbObj(props.selectedColor);
  const newColor = props.newColor;
  const setNewColor = props.setNewColor;

  const handleCancel = () => {
    setIsEditingPalette(false);
  }

  const handleOk = (e) => {
    let newPalette = [...palette];
    newPalette.forEach((color,index) => {
      if (color.value === rgbObjToStr(initColor)) {
        (newPalette[index]).value = rgbObjToStr(newColor)
      }
    });
    setPalette(newPalette);
    setSelectedColor(rgbObjToStr(newColor));
    setIsEditingPalette(false);
  }

  return (
    <div className='color-picker-container'>
      <ChromePicker
          color={strToRgbObj(newColor)}
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