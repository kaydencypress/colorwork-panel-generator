import React, { useState } from 'react';
import Chrome from '@uiw/react-color-chrome';
import { rgbStringToHsva, hsvaToHex } from '@uiw/color-convert';

function ColorPicker(props) {
    const selectRef = props.selectRef;
    const selectedColor = (selectRef.current.getValue()).length > 0  ? (selectRef.current.getValue())[0].value : selectRef.current.props.value;
    const initColor = hsvaToHex(rgbStringToHsva(selectedColor));
    const [hex, setHex] = useState(initColor);

  return (
    <>
      <Chrome
        color={hex}
        onChange={(color) => {
          setHex(color.hex);
        }}
      />
    </>
  );
}
export default ColorPicker;