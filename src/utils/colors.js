export function hexToFloat(value) {
  let hex = value;
  if (hex.charAt && hex.charAt(0) === '#') {
    hex = hex.substring(1);
  }

  var bigint = parseInt(hex, 16);
  var r = (bigint >> 16) & 255;
  var g = (bigint >> 8) & 255;
  var b = bigint & 255;

  return [r / 255, g / 255, b / 255];
}

/* eslint-disable */
export function floatToHex(values) {
  const [ r, g, b ] = values;
  const red = r * 255;
  const green = g * 255;
  const blue = b * 255;
  const hex = ((blue | green << 8 | red << 16) | 1 << 24).toString(16).slice(1);
  return `#${hex}`;
}
