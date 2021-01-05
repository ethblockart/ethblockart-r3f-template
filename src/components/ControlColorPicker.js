import React from 'react';

const ControlColorPicker = function (props) {
    const handleColorChange = event => {
        props.onChange(event.target.value)
    }

    return (
        <div style={{'marginBottom': '10px'}}>
            <label style={{'display': 'block'}}>{props.controlLabel}</label>
            <input
                id="controlColorPicker"
                type="color"
                defaultValue={props.modValue}
                onInput={handleColorChange}
            />
        </div>
    );
}
export default ControlColorPicker;