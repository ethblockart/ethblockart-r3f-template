import React, { useState, useEffect, useRef, useMemo } from 'react';
import * as THREE from 'three';
import { extend, useThree, useFrame } from 'react-three-fiber';
import MersenneTwist from 'mersenne-twister';
import { RoundedBox, TorusKnot } from '@react-three/drei';
import Color from 'color';

/*
Create your Custom style to be turned into a EthBlock.art BlockStyle NFT

Basic rules:
 - use a minimum of 1 and a maximum of 4 "modifiers", modifiers are values between 0 and 1,
 - use a minimum of 1 and a maximum of 3 colors, the color "background" will be set at the canvas root
 - Use the block as source of entropy, no Math.random() allowed!
 - You can use a "shuffle bag" using data from the block as seed, a MersenneTwister library is provided

 Arguments:
  - block: the blockData, in this example template you are given 3 different blocks to experiment with variations, check App.js to learn more
  - mod[1-3]: template modifier arguments with arbitrary defaults to get your started
  - color: template color argument with arbitrary default to get you started

Getting started:
 - Write react-three-fiber code, comsuming the block data and modifier arguments,
   make it cool and use no random() internally, component must be pure, output deterministic
 - Customize the list of arguments as you wish, given the rules listed below
 - Provide a set of initial /default values for the implemented arguments, your preset.
 - Think about easter eggs / rare attributes, display something different every 100 blocks? display something unique with 1% chance?

 - check out react-three-fiber documentation for examples!
*/
let DEFAULT_SIZE = 500;

// Handle correct scaling of scene as canvas is resized, and when generating upscaled version.
const updateCamera = (camera, width, height) => {
  let DIM = Math.min(width, height);
  let M = DIM / DEFAULT_SIZE;
  camera.zoom = M * 200;
  camera.updateProjectionMatrix();
};

const CustomStyle = React.memo(
  ({ block, mod1, mod2, color1, attributesRef }) => {
    const shuffleBag = useRef();
    const group = useRef();
    const { size, viewport, camera } = useThree();
    const { width, height } = size;

    // Required function to extract custom attributes related to style at the time of minting
    attributesRef.current = () => {
      return {
        // This is called when the final image is generated, when creator opens the Mint NFT modal.
        // should return an object structured following opensea/enjin metadata spec for attributes/properties
        // https://docs.opensea.io/docs/metadata-standards
        // https://github.com/ethereum/EIPs/blob/master/EIPS/eip-1155.md#erc-1155-metadata-uri-json-schema

        attributes: [
          {
            display_type: 'number',
            trait_type: 'your trait here number',
            value: 42,
          },

          {
            trait_type: 'your trait here text',
            value: 'replace me',
          },
        ],
      };
    };

    // Handle correct scaling of scene as canvas is resized, and when generating upscaled version.
    useEffect(() => {
      updateCamera(camera, width, height);
    }, [camera, width, height]);

    const { hash } = block;

    const [spheres, scale, color] = useMemo(() => {
      const seed = parseInt(hash.slice(0, 16), 16);
      shuffleBag.current = new MersenneTwist(seed);

      function ran255() {
        return Math.floor(255 * shuffleBag.current.random());
      }
      const color = Color([ran255(), ran255(), ran255()]).hex();

      const scale = shuffleBag.current.random() / 100;
      const spheres = block.transactions.map((tx, i) => {
        const mul = 1.5;
        const flip = i % 2 ? -1 : 1;
        const flip2 = i % 3 ? -1 : 1;
        const flip3 = i % 4 ? -1 : 1;

        return [
          shuffleBag.current.random() * mul * flip,
          shuffleBag.current.random() * mul * flip2,
          shuffleBag.current.random() * mul * flip3,
        ];
      });

      return [spheres, scale, color];
    });

    return (
      <group ref={group} position={[-0, 0, 0]} rotation={[0, mod2, 0]}>
        <ambientLight intensity={1} />
        <pointLight
          position={[10, 10, 10]}
          angle={0.2}
          penumbra={1}
          color={'hotpink'}
          intensity={2}
        />

        {spheres.map((sp) => {
          return (
            <group position={sp}>
              <TorusKnot args={[scale * 100, mod1 / 10, mod2 * 1000, 4]}>
                <meshNormalMaterial attach="material" />
              </TorusKnot>
            </group>
          );
        })}
      </group>
    );
  }
);

export default CustomStyle;
