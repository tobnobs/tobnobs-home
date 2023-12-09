

export const getRandom = (max: number, min = 0) =>
  Math.floor(Math.random() * (max - min)) + min;

const colors = ['#078D70', '#26CEAA', '#98E8C1', '#FFFFFF', '#7BADE2', '#5049CC', '#221a78'];

export const getRandomDirection = () => getRandom(2) - 1;

export type Item = {
  x: number;
  y: number;
  blur: number;
  radius: number;
  initialXDirection: number;
  initialYDirection: number;
  initialBlurDirection: number;
  color: string;
};

export const generateItem = (width: number, height: number): Item => ({
  x: getRandom(width + 10, -10),
  y: getRandom(height + 10, -10),
  blur: getRandom(60, 5),
  radius: getRandom(60, 10),
  initialXDirection: getRandomDirection(),
  initialYDirection: getRandomDirection(),
  initialBlurDirection: getRandomDirection(),
  color: colors[getRandom(colors.length)],
});
