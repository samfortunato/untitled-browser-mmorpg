export function clampToPixel(num) {
  return Math.ceil(num);
}

export function calculateScreenCenterForEntityX(entityDimensions) {
  return (document.documentElement.clientWidth / 2) - (entityDimensions.width / 2);
}

export function calculateScreenCenterForEntityY(entityDimensions) {
  return (document.documentElement.clientHeight / 2) - (entityDimensions.height / 2);
}
