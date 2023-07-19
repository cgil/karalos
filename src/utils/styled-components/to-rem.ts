export const toRem = (pixels: number, pixelVsRem = 16): string =>
  `${pixels / pixelVsRem}rem`;
