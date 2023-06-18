import { getIsMuted } from '../engine/audio.js';
import { getHasInteracted } from '../engine/input.js';

export class MusicEmitter {
  constructor(audioName, volume = 1) {
    this.audioElement = document.createElement('audio');

    this.audioElement.src = `./assets/music/${audioName}.mp3`;
    this.audioElement.volume = volume;
  }

  update() {
    if (getIsMuted()) this.pause();
    else this.play();
  }

  play() {
    if (this.audioElement.paused) this.playOnInteraction();
  }

  loop() {
    this.audioElement.loop = true;
    if (this.audioElement.paused) this.playOnInteraction();
  }

  pause() {
    if (!this.audioElement.paused) this.audioElement.pause();
  }

  stop() {
    this.audioElement.pause();
    this.audioElement.currentTime = 0;
  }

  playOnInteraction() {
    const checkInterval = setInterval(() => {
      if (getHasInteracted()) this.audioElement.play();
    }, 1);

    if (getHasInteracted()) clearInterval(checkInterval);
  }
}
