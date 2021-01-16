import React, { useState } from 'react';
import ControlSlider from './ControlSlider';
import ControlColorPicker from './ControlColorPicker';
import './Sidebar.css';

const Sidebar = function ({
  mods,
  blockNumber,
  blocks,
  attributes,
  handleBlockChange,
}) {
  const [isVisible, toggleVisibility] = useState(true);
  const handleToggleVisibility = () => {
    toggleVisibility(!isVisible);
  };

  return (
    <div className={`sidebar ${isVisible ? '' : 'hidden'}`}>
      <div className="toggle-button" onClick={handleToggleVisibility}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 484.4 479.2">
          <path d="M382.4 479.2h102V0h-102v479.2zM338 239.6L206.1 126.3v64.9H0v97.9h206.1V353" />
        </svg>
      </div>

      <div className="section-header">Change Block</div>
      <div className="section-body">
        <ControlSlider
          modValue={blockNumber}
          modValueMin="0"
          modValueMax={blocks.length - 1}
          modValueStep="1"
          onChange={(e) => {
            handleBlockChange(e);
          }}
        />
      </div>

      <div className="section-header">Change Style</div>
      <div className="section-body">
        {mods.map(({ key, value, set }) => {
          if (key.includes('color') || key.includes('background')) {
            return (
              <ControlColorPicker
                key={key}
                controlLabel={key}
                modValue={value}
                onChange={set}
              />
            );
          }

          return (
            <ControlSlider
              key={key}
              controlLabel={key}
              modValue={value}
              onChange={set}
            />
          );
        })}
      </div>

      <div className="section-header">Custom Attributes</div>
      <div className="section-body">
        {attributes.attributes
          ? attributes.attributes.map((attribute, index) => {
              return (
                <div className="custom-attribute" key={index}>
                  <div className="content-header">{attribute.trait_type}</div>
                  <div>{attribute.value}</div>
                </div>
              );
            })
          : ''}
      </div>
    </div>
  );
};
export default Sidebar;
