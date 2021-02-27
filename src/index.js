import ReactDOM from 'react-dom';
import React, { useRef, useState, useEffect } from 'react';
import blocks from './blocks';
import CustomStyle, { styleMetadata } from './CustomStyle';
import { Canvas } from 'react-three-fiber';
import { proxy, useProxy } from 'valtio';
import Sidebar from './components/Sidebar';

const store = proxy({
  blockNumber: 2,
  ...styleMetadata,
});

/*
  Wrapped Component required to make demos compatible with EthBlock.art
  As a creative coder, in this file you can swap between the block data provided on line 40
  For the rest, you can ignore this file, check CustomStyle.js
*/
function App() {
    const snap = useProxy(store);
    const gl = useRef(null);
    const attributesRef = useRef();
    const [modChangeCount,setModChangeCount] = useState(0);

    useEffect(() => {
    if (gl.current && snap.options.background) {
      gl.current.setClearColor(snap.options.background);
    }
    },[snap.options.background, gl]);

    // Allow sidebar controls to trigger a delayed re-render that catches latest attributes
    const tallyUp = () => {
        setTimeout(() => setModChangeCount(modChangeCount+1),500)
    }

    // At startup force a (more) delayed re-render to capture the initial attributes for display
    if (!modChangeCount) setTimeout(() => tallyUp(), 500);

    const mods = Object.keys(store.options).map((k) => {
        return {
          key: k,
          value: snap.options[k],
          set: (v) => {
            store.options[k] = v;
          },
        };
    });

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
              gl.current = context.gl;
              gl.current.setClearColor(snap.options.background);
            }}
            pixelRatio={window.devicePixelRatio}
            sx={{
              width: '100%',
              height: '100%',
            }}
          >
            <CustomStyle
              block={blocks[snap.blockNumber]}
              attributesRef={attributesRef}
              options={snap.options}
            />
          </Canvas>
        </div>
      </div>

      <Sidebar
        blocks={blocks}
        blockNumber={snap.blockNumber}
        attributesRef={attributesRef}
        mods={mods}
        tallyUp={tallyUp}
        handleBlockChange={(e) => (store.blockNumber = e)}
      />
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
