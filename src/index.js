import ReactDOM from 'react-dom';
import { ethers } from 'ethers';
import React, { useRef, useState, useEffect } from 'react';
import baABI from './abi/BlockArt.json';
import bsABI from './abi/BlockStyle.json';
import TCanvas from './components/TCanvas';

class StaticJsonRpcProvider extends ethers.providers.AlchemyProvider {
  async getNetwork() {
    if (this._network) {
      return Promise.resolve(this._network);
    }
    return super.getNetwork();
  }
}

function _getLibrary(provider) {
  const library = new StaticJsonRpcProvider();
  library.pollingInterval = 24000;
  return library;
}

const contracts = {
  BlockStyle: '0x73c8460F8043a4521c889a3CC23d1C81214a1d25',
  BlockArt: '0xb80fBF6cdb49c33dC6aE4cA11aF8Ac47b0b4C0f3',
};

const abi = {
  BlockStyle: baABI,
  BlockArt: bsABI,
};

let provider = null;

const getProvider = () => {
  if (!provider) {
    provider = new ethers.providers.CloudflareProvider();
  }
  return provider;
};
const getContract = (name, signer) => {
  return new ethers.Contract(contracts[name], abi[name], signer);
};

const getTokenMeta = async (tokenId, signer, type = 'BlockArt') => {
  if (!tokenId) return;

  const contract = getContract(type, signer);
  const meta = await contract.tokenURI(tokenId);
  // return await fetch();
  const res = await fetch(
    meta
      .replace('ipfs:/', 'https://cloudflare-ipfs.com/ipfs')
      .replace('https://gateway.pinata.cloud/', 'https://cloudflare-ipfs.com/'),
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );

  let key = type === 'blockArt' ? 'artMetadata' : 'styleMetadata';
  return await res.json();
};

const spaceHash = `ipfs://QmNyyskkXEuVGcaFGQGtrmdW3fiPZAc5CiA46DoTNkE4bd/main.js`;

const getArtStyle = async (id) => {
  const artContract = getContract('BlockArt', getProvider());
  const artMeta = await getTokenMeta(id, getProvider());
  const styleId = artMeta.style_id;
  const styleMeta = await getTokenMeta(styleId, getProvider(), 'BlockStyle');
  return [artMeta, styleMeta];

  // const styleContract = getContract('BlockStyle', getProvider());
};
/*
  Wrapped Component required to make demos compatible with EthBlock.art
  As a creative coder, in this file you can swap between the block data provided on line 40
  For the rest, you can ignore this file, check CustomStyle.js
*/
function App() {
  const [result, setResult] = useState();
  const [block, setBlock] = useState();

  useEffect(() => {
    let active = true;
    load();
    return () => {
      active = false;
    };

    async function load() {
      const [art, style] = await getArtStyle(585);

      const block = await getProvider().getBlockWithTransactions(
        parseInt(art.block_number),
        true
      );

      if (!active) {
        return;
      }

      setBlock(block);
      setResult([art, style]);
    }
  }, []);

  console.log(result, block, 'lalalala');
  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      {result && block ? (
        <TCanvas
          styleCID={result[1].component}
          block={block}
          params={{ ...result[1].options, ...result[0].settings }}
        />
      ) : null}
    </div>
  );
}

// export default App;

// const [meta] = useMemo(() => {}, []);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
