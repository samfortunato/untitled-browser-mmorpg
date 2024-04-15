let previousTimeAtStartOfFrame = 0;
let deltaTime = 0;

/**
 * Get the change in time at the start of the previous frame,
 * vs. the start of the current frame.
 * */
export function calculateDeltaTime(currentTimeAtStartOfFrame = 0) {
  const difference = (currentTimeAtStartOfFrame - previousTimeAtStartOfFrame) / 1000;

  deltaTime = Math.min(difference, 1 / 60);

  previousTimeAtStartOfFrame = currentTimeAtStartOfFrame;
}

export function getDeltaTime() {
  return deltaTime;
}

export function getFps() {
  return Math.floor(1 / deltaTime);
}
