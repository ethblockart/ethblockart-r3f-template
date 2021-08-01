import React, { useRef, useEffect, useState, useMemo } from 'react';
import RemoteComponent from './RemoteComponent';
function expandURI(uri) {
  if (uri.match(/^ipfs:\/\//)) {
    return `https://cloudflare-ipfs.com/ipfs/${uri.substr(7)}`; // 7 == "ipfs://".length
  }
  if (uri.match(/^https:\/\/gateway\.pinata\.cloud\//)) {
    return `https://cloudflare-ipfs.com/${uri.substr(29)}`; // 29 == "https://gateway.pinata.cloud/".length
  }
  // else
  return uri;
}

const TCanvas = React.memo(({ styleCID, block, params }) => {
  const gl = useRef(null);
  const attributesRef = useRef();

  console.log(styleCID, block, params);
  return (
    <div
      style={{
        position: 'relative',
        opacity: 1,
        width: '100%',
        height: '100%',
      }}
    >
      <RemoteComponent
        url={expandURI(styleCID)}
        render={({ err, Component }) =>
          err ? (
            <div>{err.toString()}</div>
          ) : (
            <Component
              block={block}
              {...params}
              gl={gl}
              attributesRef={attributesRef}
            />
          )
        }
      />
    </div>
  );
});

export default TCanvas;
