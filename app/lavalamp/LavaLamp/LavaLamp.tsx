'use client';
import React from 'react';
import styled from 'styled-components';

import Blob, { generateBlobProps } from './Blob';

const Lamp = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  height: 100vh;
  width: 100vw;
  min-width: 100vw;
  z-index: -1;
  overflow: hidden;
`;

const Lava = styled.div`
  filter: url('#goo');
  position: absolute;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
`;

const Blur = styled.div`
  position: absolute;
  height: 100%;
  width: 100%;
  background: rgba(255, 255, 255, 0);
  `;
  // filter: blur(50px);

const LavaLamp = () => (
  <Blur>
    <Lamp>
      <Lava>
        {Array.from({ length: 3 }, (_, index) => index).map((v) => {
          const {
            color,
            altColor,
            width,
            height,
            wobbleTime,
            xBlobTime,
            yBlobTime,
            blobDelay
          } = generateBlobProps();
          return (
            <Blob
              key={v}
              color={color}
              altColor={altColor}
              width={width}
              height={height}
              wobbleTime={wobbleTime}
              xBlobTime={xBlobTime}
              yBlobTime={yBlobTime}
              blobDelay={blobDelay}
            />
          );
        })}
      </Lava>
    </Lamp>
    <svg xmlns="http://www.w3.org/2000/svg" version="1.1">
      <defs>
        <filter id="goo">
          <feGaussianBlur in="SourceGraphic" stdDeviation="80" result="blur" />
          <feColorMatrix
            in="blur"
            mode="matrix"
            values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7"
            result="goo"
          />
          <feBlend in="SourceGraphic" in2="goo" />
        </filter>
      </defs>
    </svg>
  </Blur>
);

export default LavaLamp;
