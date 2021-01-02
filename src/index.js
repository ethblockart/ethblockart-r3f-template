import ReactDOM from 'react-dom';
import React, { useRef, useState } from 'react';
import useDimensions from 'react-cool-dimensions';
import blocks from './blocks';
import CustomStyle from './CustomStyle';

function App() {
  /*
  Wrapped Component required to make p5 demos compatible with EthBlock.art
  As a creative coder, in this file you can swap between the block data provided on line 40
  For the rest, you can ignore this file, check CustomStyle.js
*/
  const canvasRef = useRef();
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
      {width && height ? (
        <CustomStyle
          width={width}
          block={blocks[0]} // Example: Change "block = block[0]" to block[1] or block[2] to see how different blocks look with the code written
          height={height}
          canvasRef={canvasRef}
          handleResize={_onCanvasResize}
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
