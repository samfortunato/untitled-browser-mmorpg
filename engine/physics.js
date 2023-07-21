const DEFAULT_GRAVITY = 1;

/** Gravity constant. Defaults to `1`. */
export let GRAVITY = DEFAULT_GRAVITY;

export function setGravity(gravity) {
  GRAVITY = gravity;
}

export function resetGravity() {
  GRAVITY = DEFAULT_GRAVITY;
}
