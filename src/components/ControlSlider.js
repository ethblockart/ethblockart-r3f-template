import React from 'react';

const ControlSlider = function (props) {
    const handleModChange = event => {
        props.onChange(event.target.value)
    }

    return (
        <div style={{'marginBottom': '10px'}}>
            <label style={{'display': 'block'}}>{props.controlLabel}</label>
            <div style={{'display': 'inline'}}>{props.modValue}</div>
            <input
                id="controlSlider"
                type="range"
                min={props.modValueMin || 0 } 
                max={props.modValueMax || 1} 
                defaultValue={props.modValue || 0.5} 
                step={props.modValueStep || 0.01}
                onChange={handleModChange} 

            />
        </div>
    );
}
export default ControlSlider;