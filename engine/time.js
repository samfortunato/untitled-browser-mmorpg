let previousTimeAtStartOfFrame = 0;
let deltaTime = 0;

/**
 * Get the change in time at the start of the previous frame,
 * vs. the start of the current frame.
 * */
export function calculateDeltaTime(currentTimeAtStartOfFrame = 0) {
  // `currentTimeAtStartOfFrame` is undefined on first frame
  deltaTime = (currentTimeAtStartOfFrame - previousTimeAtStartOfFrame) / 1000;
  previousTimeAtStartOfFrame = currentTimeAtStartOfFrame;
}

export function getDeltaTime() {
  return deltaTime;
}

export function getFps() {
  return 1 / deltaTime;
}
