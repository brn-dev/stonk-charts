import { ColorPalette } from '../models/color-palettes';

type ColorInterpolation = (interpolationFraction: number) => string;

const interpolate: (colors: ColorPalette) => ColorInterpolation = window.require('color-interpolate');

export { ColorInterpolation, interpolate };