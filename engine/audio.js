const meta = {
  isMuted: false,
};

export function getIsMuted() {
  return meta.isMuted;
}

export function setIsMuted(isMuted) {
  meta.isMuted = isMuted;
}

export function toggleMute() {
  meta.isMuted = !meta.isMuted;
}
