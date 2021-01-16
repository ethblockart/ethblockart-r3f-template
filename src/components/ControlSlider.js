import React from 'react';
import './ControlSlider.css';

const ControlSlider = function (props) {
  const handleModChange = (event) => {
    props.onChange(parseFloat(event.target.value));
  };

  return (
    <div className="control-slider">
      <label>{props.controlLabel}</label>
      <div className="control-input">
        <div className="value-label">{props.modValue}</div>
        <input
          id="controlSlider"
          type="range"
          min={props.modValueMin || 0}
          max={props.modValueMax || 1}
          defaultValue={props.modValue || 0.5}
          step={props.modValueStep || 0.001}
          onChange={handleModChange}
        />
      </div>
    </div>
  );
};
export default ControlSlider;
