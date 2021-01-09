import React, { useState, useEffect, useRef } from 'react';
import * as THREE from 'three';
import { extend, useThree } from 'react-three-fiber';
import MersenneTwist from 'mersenne-twister';
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
  ({ block, mod1, mod2, color, attributesRef }) => {
    const group = useRef();
    const { size, viewport, camera } = useThree();
    const { width, height } = size;

    // Required function to extract custom attributes related to style at the time of minting
    attributesRef.current = () => {
      return { attributes: [] };
    };

    // Handle correct scaling of scene as canvas is resized, and when generating upscaled version.
    useEffect(() => {
      updateCamera(camera, width, height);
    }, [camera, width, height]);

    return (
      <group ref={group} position={[-0, 0, 0]}>
        <ambientLight intensity={1} />
        <pointLight
          position={[10, 10, 10]}
          angle={0.2}
          penumbra={1}
          color={'red'}
          intensity={2}
        />
      </group>
    );
  }
);

export default CustomStyle;
