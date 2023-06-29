const settings = {
  isMuted: false,
};

export function getIsMuted() {
  return settings.isMuted;
}

export function setIsMuted(isMuted) {
  settings.isMuted = isMuted;
}

export function toggleMute() {
  settings.isMuted = !settings.isMuted;
}
