import ReactDOM from 'react-dom';
import React, { useRef, useState, useEffect } from 'react';
import useDimensions from 'react-cool-dimensions';
import blocks from './blocks';
import CustomStyle from './CustomStyle';
import ControlSlider from './components/ControlSlider';
import ControlColorPicker from './components/ControlColorPicker';
import { Canvas } from 'react-three-fiber';

function App() {
  const gl = useRef(null);
  const attributesRef = useRef();

  /*
  Wrapped Component required to make demos compatible with EthBlock.art
  As a creative coder, in this file you can swap between the block data provided on line 40
  For the rest, you can ignore this file, check CustomStyle.js
*/
  const defaultBlockNumber = 2;
  const defaultMod1Value = 0.2;
  const defaultMod2Value = 0.25;
  const defaultBackgroundColor = '#cccccc';

  const [blockNumber, setBlockNumber] = useState(defaultBlockNumber);
  const [mod1, setMod1] = useState(defaultMod1Value);
  const [mod2, setMod2] = useState(defaultMod2Value);
  const [backgroundColor, setBackgroundColor] = useState(
    defaultBackgroundColor
  );

  function changeModValue(modSetFunction, e) {
    modSetFunction(e);
  }

  useEffect(() => {
    console.log('wtd');
    if (gl.current && backgroundColor) {
      gl.current.setClearColor(backgroundColor);
    }
  }, [backgroundColor, gl]);

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <div style={{ flexGrow: 1 }}>
        <div
          style={{
            margin: '0 auto',
            marginTop: '64px',
            width: '60vw',
            height: '60vw',
          }}
        >
          <p>EthBlock.art react-three-fiber boilerplate</p>

          <Canvas
            key="canvas"
            invalidateFrameloop
            colorManagement
            orthographic
            camera={{ zoom: 300, position: [0, 0, 100] }}
            gl={{ preserveDrawingBuffer: true }}
            onCreated={(context) => {
              // canvasRef.current = context.gl.domElement;
              gl.current = context.gl;
              gl.current.setClearColor(backgroundColor);
            }}
            pixelRatio={window.devicePixelRatio}
            sx={{
              width: '100%',
              height: '100%',
            }}
          >
            <CustomStyle
              block={blocks[blockNumber - 1]}
              // background={backgroundColor}
              mod1={mod1}
              mod2={mod2}
              attributesRef={attributesRef}
            />
          </Canvas>
        </div>
      </div>

      <div
        style={{
          width: '200px',
          borderLeft: '#e0e0e0 1px solid',
          backgroundColor: '#fff',
        }}
      >
        <div
          style={{
            height: '40px',
            background: '#000',
            color: '#fff',
            lineHeight: '40px',
            textAlign: 'center',
          }}
        >
          Change Block
        </div>
        <div style={{ padding: '20px' }}>
          <ControlSlider
            modValue={blockNumber}
            modValueMin="1"
            modValueMax={blocks.length}
            modValueStep="1"
            onChange={(e) => {
              changeModValue(setBlockNumber, e);
            }}
          />
        </div>

        <div
          style={{
            height: '40px',
            background: '#000',
            color: '#fff',
            lineHeight: '40px',
            textAlign: 'center',
          }}
        >
          Change Style
        </div>
        <div style={{ padding: '20px' }}>
          {
            <ControlSlider
              controlLabel="mod1"
              modValue={mod1}
              onChange={(e) => {
                changeModValue(setMod1, e);
              }}
            />
          }
          {
            <ControlSlider
              controlLabel="mod2"
              modValue={mod2}
              onChange={(e) => {
                changeModValue(setMod2, e);
              }}
            />
          }
          <ControlColorPicker
            controlLabel="background"
            modValue={backgroundColor}
            onChange={(e) => {
              changeModValue(setBackgroundColor, e);
            }}
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
