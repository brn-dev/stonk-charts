
type ColorInterpolation = (interpolationFraction: number) => string;

const interpolate: (colors: string[]) => ColorInterpolation = window.require('color-interpolate');

export { ColorInterpolation, interpolate };