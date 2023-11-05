import React from 'react';
import Select, { components, DropdownIndicatorProps } from 'react-select';

const Stitch = (props) => {
    const rgb = (arr) => {
        return {value: `rgb(${arr[0]},${arr[1]},${arr[2]})`, label: `rgb(${arr[0]},${arr[1]},${arr[2]})`}
    }
    const DropdownIndicator = (
        props: DropdownIndicatorProps<ColourOption, true>
      ) => {
        return (
          <components.DropdownIndicator {...props}> </components.DropdownIndicator>
        );
      };
    const width_px = 30
    const height_px = width_px * props.gaugeRatio
    const width = `${width_px}px`
    const height = `${height_px}px`
    const colorStyles = {
        control: (baseStyles,state) => ({
            ...baseStyles,
            background: state.selectProps.value.value,
            width: width,
            height: height,
            minHeight: height
        }),
        option: (baseStyles,state) => ({
            ...baseStyles,
            background: state.value,
            height: height,
            fontSize: '0px'
        }),
        valueContainer: (baseStyles,state) => ({
            ...baseStyles,
            height: '0px',
            padding: '0px',
            margin: '0px'
        }),
        input: (baseStyles,state) => ({
            ...baseStyles,
            height: '0px',
            padding: '0px',
            margin: '0px'
        }),
        indicatorsContainer: (baseStyles,state) => ({
            ...baseStyles,
            height: '0px',
            padding: '0px',
            margin: '0px'
        }),
        indicatorSeparator: (baseStyles,state) => ({
            ...baseStyles,
            height: '0px',
            padding: '0px',
            margin: '0px',
            fontSize: '0px'
        }),
        dropdownIndicator: (baseStyles,state) => ({
            ...baseStyles,
            height: '0px',
            padding: '0px',
            margin: '0px'
        }),
        downChevron: (baseStyles,state) => ({
            ...baseStyles,
            height: '0px',
            width: '0px',
            padding: '0px',
            margin: '0px',
            fontSize: '0px'
        }),
        menu: (baseStyles,state) => ({
            ...baseStyles,
            width: width,
            padding: '0px',
            margin: '0px',
            border: '1px solid hsl(0,0%,80%)'
        }),
        menuList: (baseStyles,state) => ({
            ...baseStyles,
            width: width,
            padding: '0px',
            margin: '0px',
            borderRadius: '4px',
            boxShadow: '3px 3px 7px 1px hsl(0,0%,30%);' 
        })
    }
    return (
        <Select
            defaultValue={rgb(props.defaultColor)}
            name='color'
            options={props.palette.map(p => rgb(p))}
            styles = {colorStyles}
            components={{DropdownIndicator}}
        />
    )
}

export default Stitch;