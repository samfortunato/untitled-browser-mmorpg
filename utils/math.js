export function clampToPixel(num) {
  return Math.ceil(num);
}

export function calculateCenterOfScreenX(dimensions) {
  return (document.documentElement.clientWidth / 2) - (dimensions.width / 2);
}

export function calculateCenterOfScreenY(dimensions) {
  return (document.documentElement.clientHeight / 2) - (dimensions.height / 2);
}
