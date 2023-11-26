'use client';
import { useEffect } from 'react';
import styled, { keyframes } from 'styled-components';

const getRandom = (max: number, min = 0) =>
  Math.floor(Math.random() * (max - min)) + min;
const getRandomColor = () =>
  `rgb(${getRandom(255, 150)}, ${getRandom(255, 150)}, ${getRandom(255, 150)})`;

const blobAnimation = keyframes`
  0%,
  100% {
    transform: translatey(0%);
  }
  50% {
    transform: translatey(-${getRandom(300)}%);
  }
`;

const wobbleAnimation = keyframes`
  50% {
    border-radius: 42% 58% 70% 30% / 45% 45% 55% 55%;
  }
  100% {
    border-radius: 38% 52% 75% 36% / 50% 40% 50% 60%;
  }
`;

const minSize = 200;
const maxSize = 500;
const maxBottom = 30;
const minWobble = 10;
const maxWobble = 20;
const minBlob = 10;
const maxBlob = 30;

type BlobProps = {
  color: string;
  altColor: string;
  width: number;
  height: number;
  bottom: number;
  wobbleTime: number;
  blobTime: number;
  left: number;
};

const Blob = styled.div<BlobProps>`
  border-radius: 50%;
  background-image: linear-gradient(
    -270deg,
    ${({ color }) => color} 0%,
    ${({ altColor }) => altColor} 100%
  );
  position: absolute;
  width: ${({ width }) => width}px;
  height: ${({ height }) => height}px;
  bottom: -${({ bottom }) => bottom}%;
  left: ${({ left }) => left}%;
  animation: ${wobbleAnimation} ${({ wobbleTime }) => wobbleTime}s ease-in-out
      alternate infinite,
    ${blobAnimation} ${({ blobTime }) => blobTime}s ease-in-out infinite;
`;

export const generateBlobProps = (): BlobProps => ({
  color: getRandomColor(),
  altColor: getRandomColor(),
  width: getRandom(maxSize, minSize),
  height: getRandom(maxSize, minSize),
  bottom: getRandom(maxBottom),
  wobbleTime: getRandom(maxWobble, minWobble),
  blobTime: getRandom(maxBlob, minBlob),
  left: getRandom(100),
});

export default Blob;
