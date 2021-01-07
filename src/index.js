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
  const defaultMod1Value = 0.33;
  const defaultMod2Value = 0.66;
  const defaultBackgroundColor = '#eeeeee';

  const [blockNumber, setBlockNumber] = useState(defaultBlockNumber);
  const [mod1, setMod1] = useState(defaultMod1Value);
  const [mod2, setMod2] = useState(defaultMod2Value);
  const [backgroundColor, setBackgroundColor] = useState(defaultBackgroundColor);

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
    <div style={{ display: 'flex', height: '100vh' }}>
      <div style={{ flexGrow: 1 }}>
        <div
          ref={ref}
          style={{
            margin: '0 auto',
            marginTop: '64px',
            width: '60vw',
            height: '60vw'
          }}
        >
          <p>EthBlock.art P5.js boilerplate</p>
          {width && height ? (
            <CustomStyle
              width={width}
              block={blocks[blockNumber-1]}
              height={height}
              canvasRef={canvasRef}
              attributesRef={attributesRef}
              handleResize={_onCanvasResize}
              background={backgroundColor}
              mod1={mod1}
              mod2={mod2}
            />
          ) : null}
        </div>
      </div>

      <div
        style={{
          width: '200px',
          borderLeft: '#e0e0e0 1px solid',
          backgroundColor: '#fff'
        }}
      >
        <div style={{ height: '40px', background: '#000', color: '#fff', lineHeight: '40px', textAlign: 'center' }}>Change Block</div>
        <div style={{ padding: '20px' }}>
          <ControlSlider
            modValue={blockNumber}
            modValueMin="1"
            modValueMax={blocks.length}
            modValueStep="1"
            onChange={(e) => { changeModValue(setBlockNumber, e) }}
          />
        </div>

        <div style={{ height: '40px', background: '#000', color: '#fff', lineHeight: '40px', textAlign: 'center' }}>Change Style</div>
        <div style={{ padding: '20px' }}>
          {<ControlSlider
            controlLabel="mod1"
            modValue={mod1}
            onChange={(e) => { changeModValue(setMod1, e) }}
          />}
          {<ControlSlider
            controlLabel="mod2"
            modValue={mod2}
            onChange={(e) => { changeModValue(setMod2, e) }}
          />}
          <ControlColorPicker
            controlLabel="background"
            modValue={backgroundColor}
            onChange={(e) => { changeModValue(setBackgroundColor, e) }}
          />
        </div>
      </div>
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
