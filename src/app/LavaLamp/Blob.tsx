'use client';
import styled, { keyframes } from 'styled-components';

const colorMax = 150;
const colorMin = 50;
const minSize = 600;
const maxSize = 800;
const minWobble = 1;
const maxWobble = 5;
const minBlob = 30;
const maxBlob = 40;

const getRandom = (max: number, min = 0) =>
  Math.floor(Math.random() * (max - min)) + min;

const getRandomColor = () => {
  const primaryColor = getRandom(3);

  switch (primaryColor) {
    case 0:
      return `rgb(${getRandom(colorMax, colorMin)}, ${getRandom(
        colorMin,
        )}, ${getRandom(colorMin)})`;
    case 1:
      return `rgb(${getRandom(colorMin)}, ${getRandom(
        colorMax,
        colorMin,
        )}, ${getRandom(colorMin)})`;
    default:
      return `rgb(${getRandom(colorMin)}, ${getRandom(
        colorMin,
        )}, ${getRandom(colorMax, colorMin)})`;
  }
};

const yBlobAnimation = keyframes`
  0%,
  100% {
    transform: translatey(0%);
  }
  50% {
    transform: translatey(calc(100vh - 100%));
  }
`;

const xBlobAnimation = keyframes`
  0%,
  100% {
    transform: translatex(0%);
  }
  50% {
    transform: translatex(calc(100vw - 100%));
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

type BlobProps = {
  color: string;
  altColor: string;
  width: number;
  height: number;
  wobbleTime: number;
  xBlobTime: number;
  yBlobTime: number;
};

const BlobAtom = styled.div<BlobProps>`
  opacity: 0.7;
  border-radius: 50%;
  background-image: linear-gradient(
    -270deg,
    ${({ color }) => color} 0%,
    ${({ altColor }) => altColor} 100%
  );
  position: absolute;
  width: ${({ width }) => width}px;
  height: ${({ height }) => height}px;
  left: 0;
  animation: ${wobbleAnimation} ${({ wobbleTime }) => wobbleTime}s ease-in-out
      alternate infinite,
    ${xBlobAnimation} ${({ xBlobTime }) => xBlobTime}s ease-in-out infinite;
`;

const BlobWrapper = styled.div<BlobProps>`
  height: ${({ height }) => height}px;
  position: absolute;
  width: 100vw;
  top: 0;
  animation: ${yBlobAnimation} ${({ yBlobTime }) => yBlobTime}s ease-in-out
    infinite;
`;

const Blob = (props: BlobProps) => {
  return (
    <BlobWrapper {...props}>
      <BlobAtom {...props} />
    </BlobWrapper>
  );
};

export const generateBlobProps = (): BlobProps => ({
  color: getRandomColor(),
  altColor: getRandomColor(),
  width: getRandom(maxSize, minSize),
  height: getRandom(maxSize, minSize),
  wobbleTime: getRandom(maxWobble, minWobble),
  xBlobTime: getRandom(maxBlob, minBlob),
  yBlobTime: getRandom(maxBlob, minBlob),
});

export default Blob;
