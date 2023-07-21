import { Dimensions } from '../components/dimensions.js';

/** @param {number} num */
export function clampToPixel(num) {
  return Math.ceil(num);
}

/** @param {Dimensions} entityDimensions */
export function calculateScreenCenterForEntityX(entityDimensions) {
  return (document.documentElement.clientWidth / 2) - (entityDimensions.width / 2);
}

/** @param {Dimensions} entityDimensions */
export function calculateScreenCenterForEntityY(entityDimensions) {
  return (document.documentElement.clientHeight / 2) - (entityDimensions.height / 2);
}
