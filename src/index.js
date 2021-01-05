import ReactDOM from 'react-dom';
import React, { useRef, useState } from 'react';
import useDimensions from 'react-cool-dimensions';
import blocks from './blocks';
import CustomStyle from './CustomStyle';
import ControlSlider from './components/ControlSlider';
import ControlColorPicker from './components/ControlColorPicker';

function App() {
  /*
  Wrapped Component required to make p5 demos compatible with EthBlock.art
  As a creative coder, in this file you can swap between the block data provided on line 40
  For the rest, you can ignore this file, check CustomStyle.js
*/
  const defaultBlockNumber = 2;
  const defaultBackgroundColor = '#eeeeee';

  const [blockNumber, setBlockNumber] = useState(defaultBlockNumber);
  const [backgroundColor, setBackgroundColor] = useState(defaultBackgroundColor);

  // MOD1 EXAMPLE
  // Example of state for mod1 control, if you want to create more mod controls,
  // copy paste related lines and change "mod1" to "modX" where X is current mod#+1
  // const defaultMod1Value = 0.5 // set this to something in between 0 and 1
  // const [mod1, setMod1] = useState(defaultMod1Value);
  // Lastly, ensure that you are using Mod1 somewhere in the CustomStyle to affect the drawing


  function changeModValue(modSetFunction, e) {
    modSetFunction(e)
  }

  const canvasRef = useRef();
  const attributesRef = useRef();
  const { ref, width, height } = useDimensions({});
  const _onCanvasResize = (p5) => {
    p5.resizeCanvas(width, height);
  };

  return (
    <div
      ref={ref}
      style={{
        margin: '0 auto',
        marginTop: '64px',
        width: '60vw',
        height: '60vw',
      }}
    >
      <p>EthBlock.art P5.js boilerplate</p>
      <ControlSlider
        controlLabel="Block"
        modValue={blockNumber}
        modValueMin="1"
        modValueMax={blocks.length}
        modValueStep="1"
        onChange={(e) => { changeModValue(setBlockNumber, e) }}
      />
      <ControlColorPicker 
        controlLabel="Background Color"
        modValue={backgroundColor}
        onChange={(e) => { changeModValue(setBackgroundColor, e) }}
      />
      {/* MOD1 EXAMPLE */}
      {/* <ControlSlider
        controlLabel="Mod1"
        modValue={mod1}
        onChange={(e) => { changeModValue(setMod1, e) }}
      /> */}
      {width && height ? (
        <CustomStyle
          width={width}
          block={blocks[blockNumber-1]}
          height={height}
          canvasRef={canvasRef}
          attributesRef={attributesRef}
          handleResize={_onCanvasResize}
          background={backgroundColor}
          // mod1={mod1} // MOD1 EXAMPLE
        />
      ) : null}
    </div>
  );
}

// export default App;

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
